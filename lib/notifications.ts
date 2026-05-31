// lib/notifications.ts

// WhatsApp notification via Twilio
export async function sendWhatsAppNotification(
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.warn('Twilio credentials not configured');
      return { success: false, error: 'WhatsApp service not configured' };
    }

    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + process.env.TWILIO_ACCOUNT_SID + '/Messages.json', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'From': process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155552368',
        'To': `whatsapp:+${phoneNumber}`,
        'Body': message,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }

    return { success: true };
  } catch (error: any) {
    console.error('WhatsApp notification error:', error);
    return { success: false, error: error.message };
  }
}

// Email notification using Nodemailer
export async function sendEmailNotification(
  email: string,
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured');
      return { success: false, error: 'Email service not configured' };
    }

    // Dynamically import nodemailer only when needed
    let nodemailer: any;
    try {
      // @ts-ignore
      nodemailer = await import('nodemailer');
    } catch (e) {
      console.warn('nodemailer package not installed. Run: npm install nodemailer');
      return { success: false, error: 'Email service not available - package not installed' };
    }

    const transporter = nodemailer.default.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error('Email notification error:', error);
    return { success: false, error: error.message };
  }
}

// Generate client booking confirmation message
export function generateClientWhatsAppMessage(customerName: string, bookingId: string): string {
  return `Hello ${customerName}! 👋

Your booking has been submitted successfully! ✅

📌 Booking ID: ${bookingId}

We've received your service request and our team will review it shortly. You will receive updates on your booking status via WhatsApp and email.

Thank you for choosing TJ & U AUTO! 🚗

If you have any questions, feel free to reach out.`;
}

// Generate client booking confirmation email
export function generateClientBookingEmail(
  customerName: string,
  bookingId: string,
  serviceType: string,
  preferredDate: string,
  vehicleDetails: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #000; color: #facc15; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">TJ & U AUTO</h1>
        <p style="margin: 5px 0 0 0;">Booking Confirmation</p>
      </div>
      
      <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #000; margin-top: 0;">Hello ${customerName},</h2>
        
        <p style="color: #333; font-size: 16px;">Your booking has been submitted successfully! ✅</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #facc15; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
          <p style="margin: 5px 0;"><strong>Service Type:</strong> ${serviceType}</p>
          <p style="margin: 5px 0;"><strong>Vehicle:</strong> ${vehicleDetails}</p>
          <p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #ff9800;">PENDING REVIEW</span></p>
        </div>
        
        <p style="color: #333;">Our team will review your booking and send you updates shortly. You can also track your booking status through our WhatsApp support line.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #666;"><strong>Need Help?</strong></p>
          <p style="margin: 5px 0; color: #666;">WhatsApp: <a href="https://wa.me/254736889880" style="color: #facc15; text-decoration: none;">+254 736 889 880</a></p>
          <p style="margin: 5px 0; color: #666;">Phone: +254 736 889 880</p>
        </div>
        
        <p style="color: #999; font-size: 14px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
          Thank you for choosing TJ & U AUTO. We look forward to serving you! 🚗
        </p>
      </div>
    </div>
  `;
}

// Generate admin notification message
export function generateAdminWhatsAppMessage(
  bookingId: string,
  customerName: string,
  serviceType: string,
  phoneNumber: string,
  customerEmail: string
): string {
  return `🔔 New Booking Received!

Booking ID: ${bookingId}
Customer: ${customerName}
Phone: ${phoneNumber}
Email: ${customerEmail}
Service Type: ${serviceType}

Please log in to the admin dashboard to review and respond to this booking.

Dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/bookings`;
}

// Generate admin notification email
export function generateAdminBookingEmail(
  bookingId: string,
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  serviceType: string,
  vehicleDetails: string,
  preferredDate: string,
  description: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #000; color: #facc15; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🔔 NEW BOOKING ALERT</h1>
      </div>
      
      <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #ff9800; margin-top: 0;">New Service Request Received</h2>
        
        <div style="background-color: #fffbf0; padding: 20px; border-radius: 5px; border: 2px solid #ff9800; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Booking ID:</strong> <span style="color: #ff9800; font-size: 18px; font-weight: bold;">${bookingId}</span></p>
        </div>
        
        <h3 style="color: #000; border-bottom: 2px solid #facc15; padding-bottom: 10px;">Customer Information</h3>
        <table style="width: 100%; margin: 15px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333; width: 30%;">Name:</td>
            <td style="padding: 8px; color: #333;">${customerName}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 8px; color: #333;"><a href="tel:${customerPhone}" style="color: #facc15; text-decoration: none;">${customerPhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px; color: #333;"><a href="mailto:${customerEmail}" style="color: #facc15; text-decoration: none;">${customerEmail}</a></td>
          </tr>
        </table>
        
        <h3 style="color: #000; border-bottom: 2px solid #facc15; padding-bottom: 10px;">Service Details</h3>
        <table style="width: 100%; margin: 15px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333; width: 30%;">Service Type:</td>
            <td style="padding: 8px; color: #333;">${serviceType}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold; color: #333;">Vehicle:</td>
            <td style="padding: 8px; color: #333;">${vehicleDetails}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #333;">Preferred Date:</td>
            <td style="padding: 8px; color: #333;">${preferredDate}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold; color: #333; vertical-align: top;">Description:</td>
            <td style="padding: 8px; color: #333;">${description || 'No description provided'}</td>
          </tr>
        </table>
        
        <div style="background-color: #000; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/bookings" style="color: #facc15; text-decoration: none; font-weight: bold; font-size: 16px;">
            👉 VIEW IN DASHBOARD →
          </a>
        </div>
        
        <p style="color: #999; font-size: 14px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
          Please respond to this booking as soon as possible to provide a quote or confirmation to the customer.
        </p>
      </div>
    </div>
  `;
}
