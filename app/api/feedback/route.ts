import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmailNotification } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, vehicle, rating, message } = body;
    const numericRating = Number(rating);

    if (!message || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        name: name || null,
        email: email || null,
        phone: phone || null,
        vehicle: vehicle || null,
        rating: numericRating,
        message,
      },
    });

    // Notify admin by email; WhatsApp is handled manually through the UI flow.
    const adminEmail = process.env.ADMIN_EMAIL;

    if (adminEmail) {
      const html = `<h2>New Feedback Received</h2><p><strong>From:</strong> ${name || 'Anonymous'}</p><p><strong>Rating:</strong> ${rating}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Email:</strong> ${email || 'N/A'}</p><p><strong>Vehicle:</strong> ${vehicle || 'N/A'}</p><h3>Message</h3><p>${message}</p>`;
      const result = await sendEmailNotification(adminEmail, `New Feedback - ${name || 'Anonymous'}`, html);
      if (!result.success) console.warn('Feedback email notification failed:', result.error);
    }

    return NextResponse.json({ success: true, feedback });
  } catch (error: unknown) {
    console.error('Feedback API error:', error);
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
