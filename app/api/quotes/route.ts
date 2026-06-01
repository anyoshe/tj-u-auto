import { prisma } from "@/lib/prisma";
import { sendEmailNotification } from "@/lib/notifications";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type QuoteItemPayload = {
  description: unknown;
  category: unknown;
  amount: unknown;
};

type ValidQuoteItem = {
  description: string;
  category: string;
  amount: number;
};

type BookingForQuote = {
  id: string;
  serviceType: string;
  vehicleMake: string;
  vehicleModel: string;
  registrationNo: string;
  customer: {
    name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
};

function isQuoteItem(item: unknown): item is ValidQuoteItem {
  if (!item || typeof item !== "object") return false;

  const candidate = item as QuoteItemPayload;

  return (
    typeof candidate.description === "string" &&
    candidate.description.trim().length > 0 &&
    typeof candidate.category === "string" &&
    candidate.category.trim().length > 0 &&
    typeof candidate.amount === "number" &&
    Number.isFinite(candidate.amount) &&
    candidate.amount > 0
  );
}

function formatMoney(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

function formatQuoteWhatsAppMessage({
  quoteId,
  booking,
  items,
  totalAmount,
  notes,
}: {
  quoteId: string;
  booking: BookingForQuote;
  items: ValidQuoteItem[];
  totalAmount: number;
  notes: string;
}) {
  const itemLines = items.map(
    (item, index) =>
      `${index + 1}. ${item.description} (${item.category}) - ${formatMoney(item.amount)}`
  );

  return [
    "TJ & U AUTO Quotation",
    "",
    `Quote ID: ${quoteId}`,
    `Booking ID: ${booking.id}`,
    `Customer: ${booking.customer?.name || "Customer"}`,
    `Vehicle: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.registrationNo})`,
    `Service: ${booking.serviceType}`,
    "",
    "Quotation Items",
    ...itemLines,
    "",
    `Total: ${formatMoney(totalAmount)}`,
    notes ? `Notes: ${notes}` : null,
    "",
    "Please reply to confirm approval or ask any questions.",
  ]
    .filter(Boolean)
    .join("\n");
}

function generateQuoteEmail({
  quoteId,
  booking,
  items,
  totalAmount,
  notes,
}: {
  quoteId: string;
  booking: BookingForQuote;
  items: ValidQuoteItem[];
  totalAmount: number;
  notes: string;
}) {
  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.description}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.category}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatMoney(item.amount)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
      <div style="background-color: #000; color: #facc15; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">TJ & U AUTO</h1>
        <p style="margin: 6px 0 0;">Quotation for your service request</p>
      </div>
      <div style="background-color: #fff; padding: 24px; border-radius: 0 0 8px 8px;">
        <p>Hello ${booking.customer?.name || "Customer"},</p>
        <p>Your quotation is ready for booking <strong>${booking.id}</strong>.</p>
        <p><strong>Quote ID:</strong> ${quoteId}</p>
        <p><strong>Vehicle:</strong> ${booking.vehicleMake} ${booking.vehicleModel} (${booking.registrationNo})</p>
        <p><strong>Service:</strong> ${booking.serviceType}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 18px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: left;">Category</th>
              <th style="padding: 10px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <p style="font-size: 20px; font-weight: bold; text-align: right; color: #000;">Total: ${formatMoney(totalAmount)}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        <p>Please reply to this email or contact us on WhatsApp to approve the quotation.</p>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, notes, items } = body;

    if (!bookingId || typeof bookingId !== "string") {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one item is required" },
        { status: 400 }
      );
    }

    if (!items.every(isQuoteItem)) {
      return NextResponse.json(
        {
          success: false,
          error: "Every item needs a description, category, and valid amount",
        },
        { status: 400 }
      );
    }

    const quoteItems: ValidQuoteItem[] = items;
    const totalAmount = quoteItems.reduce((sum, item) => sum + item.amount, 0);
    const quoteNotes = typeof notes === "string" ? notes : "";

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    const quote = await prisma.quote.create({
      data: {
        bookingId,
        totalAmount,
        status: "SENT",
        notes: quoteNotes,
        items: {
          create: quoteItems.map((item) => ({
            description: item.description,
            category: item.category,
            amount: item.amount,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/quotes");
    revalidatePath(`/admin/quotes/${quote.id}`);

    let emailSent = false;
    let emailError: string | undefined;

    if (booking.customer?.email) {
      const emailResult = await sendEmailNotification(
        booking.customer.email,
        `TJ & U AUTO Quotation - ${formatMoney(totalAmount)}`,
        generateQuoteEmail({
          quoteId: quote.id,
          booking,
          items: quoteItems,
          totalAmount,
          notes: quoteNotes,
        })
      );

      emailSent = emailResult.success;
      emailError = emailResult.error;

      if (!emailResult.success) {
        console.warn("Quote email failed:", emailResult.error);
      }
    }

    const customerPhone = booking.customer?.phone?.replace(/\D/g, "") || "";
    const whatsappMessage = formatQuoteWhatsAppMessage({
      quoteId: quote.id,
      booking,
      items: quoteItems,
      totalAmount,
      notes: quoteNotes,
    });

    return NextResponse.json({
      success: true,
      quote,
      delivery: {
        emailSent,
        emailError,
        customerEmail: booking.customer?.email ?? null,
        customerPhone: booking.customer?.phone ?? null,
        whatsappUrl: customerPhone
          ? `https://wa.me/${customerPhone}?text=${encodeURIComponent(whatsappMessage)}`
          : null,
      },
      message: "Quotation created successfully!",
    });
  } catch (error: unknown) {
    console.error("Quote creation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create quotation";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
