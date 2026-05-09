# Booking Notifications Setup Guide

This document explains how to set up WhatsApp and Email notifications for bookings.

## Installation

First, install the required package:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Environment Variables

Add these variables to your `.env.local` file:

### Admin Contact Information
```env
# Admin's phone number for WhatsApp notifications (format: 254736889880 without +)
ADMIN_PHONE_NUMBER=254736889880

# Admin's email for email notifications
ADMIN_EMAIL=admin@tjandauto.com

# Your app URL (used in email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Twilio Configuration (for WhatsApp)

Sign up at [Twilio.com](https://www.twilio.com) and get:

```env
# Your Twilio Account SID
TWILIO_ACCOUNT_SID=your_account_sid_here

# Your Twilio Auth Token
TWILIO_AUTH_TOKEN=your_auth_token_here

# Your Twilio WhatsApp-enabled phone number
TWILIO_WHATSAPP_NUMBER=whatsapp:+1415555236
```

### Email Configuration

Choose one of the options below:

#### Option 1: Gmail (Recommended for Testing)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
EMAIL_FROM=your-email@gmail.com
```

#### Option 2: Custom SMTP (Production)

```env
EMAIL_SERVICE=custom-smtp
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@tjandauto.com
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
```

#### Option 3: SendGrid (Cloud Solution)

```bash
npm install @sendgrid/mail
```

Then update `lib/notifications.ts` to use SendGrid API.

## How It Works

### When a Booking is Submitted:

1. **Customer WhatsApp Message** ✅
   - Receives booking confirmation with booking ID
   - Gets support contact information

2. **Customer Email** 📧
   - Receives detailed booking confirmation
   - Includes all booking details and status

3. **Admin WhatsApp Message** 🔔
   - Gets instant notification of new booking
   - Includes customer details and dashboard link

4. **Admin Email** 📨
   - Receives comprehensive booking details
   - Formatted for easy reading and action
   - Includes direct link to dashboard

## Testing

### Test WhatsApp (Without Twilio Setup)

The system gracefully handles missing Twilio credentials - it will log a warning but won't crash. You can:

1. Set `TWILIO_ACCOUNT_SID=test` and `TWILIO_AUTH_TOKEN=test` to prevent errors
2. Check server logs to see if the system attempted to send

### Test Email (Without Email Service)

Similarly, email notifications will fail gracefully if credentials aren't configured.

## Troubleshooting

### WhatsApp Message Not Sending

- Check Twilio dashboard for active connections
- Verify phone numbers are in international format (no + symbol)
- Ensure WhatsApp is enabled on the Twilio phone number
- Check server logs for specific error messages

### Email Not Sending

- Verify SMTP credentials are correct
- For Gmail: Make sure you're using an App Password, not your regular password
- Check spam/junk folder
- Verify sender email matches `EMAIL_FROM`

### Missing Environment Variables

If variables are missing, the system will:
- Log a warning message
- Return a graceful error to the notification function
- Continue booking creation without crashing
- The booking will be created even if notifications fail

## Production Checklist

- [ ] Configure all required environment variables in your hosting provider
- [ ] Test with actual phone numbers from staging
- [ ] Set up email forwarding rules on your domain
- [ ] Enable email authentication (SPF, DKIM, DMARC)
- [ ] Monitor Twilio usage to avoid overages
- [ ] Set up email delivery tracking/logging
- [ ] Test error handling with invalid numbers/emails

## Cost Considerations

- **Twilio WhatsApp**: ~$0.005 per message (varies by country)
- **Gmail**: Free (up to 500 emails/day for personal accounts)
- **SendGrid**: Free tier includes 100 emails/day
- **Custom SMTP**: Depends on your provider

## Next Steps

1. Install the package: `npm install nodemailer`
2. Configure environment variables
3. Test with a booking submission
4. Check logs and email inbox to verify delivery
5. Adjust email templates in `lib/notifications.ts` if needed
