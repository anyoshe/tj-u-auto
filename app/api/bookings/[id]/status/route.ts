import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!Object.values(BookingStatus).includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/bookings");

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error: unknown) {
    console.error("Status update error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update status";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
