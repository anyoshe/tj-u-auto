import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
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

type CreatedQuoteItem = {
  id: string;
  quoteId: string;
  description: string;
  category: string;
  amount: number;
  createdAt: Date;
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

    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const quoteId = randomUUID();
    const createdAt = new Date();
    const quoteNotes = typeof notes === "string" ? notes : "";

    const quote = await prisma.$transaction(async (tx) => {
      const [createdQuote] = await tx.$queryRaw<
        Array<{
          id: string;
          bookingId: string;
          totalAmount: number;
          status: string;
          notes: string | null;
          createdAt: Date;
          updatedAt: Date;
        }>
      >`
        INSERT INTO "Quote" ("id", "bookingId", "totalAmount", "status", "notes", "createdAt", "updatedAt")
        VALUES (${quoteId}, ${bookingId}, ${totalAmount}, 'PENDING', ${quoteNotes}, ${createdAt}, ${createdAt})
        RETURNING "id", "bookingId", "totalAmount", "status", "notes", "createdAt", "updatedAt"
      `;

      const createdItems: CreatedQuoteItem[] = [];

      for (const item of items) {
        const [createdItem] = await tx.$queryRaw<CreatedQuoteItem[]>`
          INSERT INTO "QuoteItem" ("id", "quoteId", "description", "category", "amount", "createdAt")
          VALUES (${randomUUID()}, ${quoteId}, ${item.description}, ${item.category}, ${item.amount}, ${createdAt})
          RETURNING "id", "quoteId", "description", "category", "amount", "createdAt"
        `;

        createdItems.push(createdItem);
      }

      return {
        ...createdQuote,
        items: createdItems,
      };
    });

    return NextResponse.json({
      success: true,
      quote,
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
