import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const feedback = await prisma.feedback.update({ where: { id }, data: { approved: true } });

    return NextResponse.json({ success: true, feedback });
  } catch (error: unknown) {
    console.error('Approve feedback error:', error);
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
