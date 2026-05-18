import { prisma } from "@/lib/prisma";
import { QuoteStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!Object.values(QuoteStatus).includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/quotes");
    revalidatePath(`/admin/quotes/${id}`);

    return NextResponse.json({
      success: true,
      quote,
    });
  } catch (error: unknown) {
    console.error("Quote status update error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update quote status";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
