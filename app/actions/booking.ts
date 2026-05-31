"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  sendEmailNotification,
  generateClientBookingEmail,
  generateAdminBookingEmail,
} from "@/lib/notifications";
import { siteContact } from "@/lib/site";

type BookingFormData = {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  make: string;
  model: string;
  type?: string | null;
  registrationNo: string;
  chassisNo?: string | null;
  mileage?: string | number | null;
  serviceType: string;
  description?: string | null;
  preferredDate: string | Date;
  preferredTime?: string | null;
  expectedCompletion?: string | Date | null;
  deliveryMethod: string;
};

type CreateBookingResult =
  | {
      success: true;
      bookingId: string;
      vehicleId: string;
      message: string;
      whatsappUrl: string;
    }
  | {
      success: false;
      error: string;
    };

function formatBookingWhatsAppMessage({
  bookingId,
  customerName,
  customerPhone,
  customerEmail,
  vehicleDetails,
  formData,
  preferredDate,
}: {
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleDetails: string;
  formData: BookingFormData;
  preferredDate: string;
}) {
  return [
    "New Booking Request",
    "",
    `Booking ID: ${bookingId}`,
    `Customer: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Email: ${customerEmail}`,
    "",
    "Vehicle Details",
    `Make/Model: ${vehicleDetails}`,
    `Type: ${formData.type || "N/A"}`,
    `Registration: ${formData.registrationNo}`,
    `Chassis No: ${formData.chassisNo || "N/A"}`,
    `Mileage: ${formData.mileage || "N/A"}`,
    "",
    "Service Request",
    `Service Type: ${formData.serviceType}`,
    `Description: ${formData.description || "No description provided"}`,
    `Preferred Date: ${preferredDate}`,
    `Preferred Time: ${formData.preferredTime || "N/A"}`,
    `Expected Completion: ${formData.expectedCompletion || "N/A"}`,
    `Delivery Method: ${formData.deliveryMethod}`,
  ].join("\n");
}

export async function createBooking(formData: BookingFormData): Promise<CreateBookingResult> {
  try {
    const email = formData.email?.trim() || null;
    const phone = formData.phone?.replace(/\D/g, "") || null;

    const customerByEmail = email
      ? await prisma.user.findUnique({ where: { email } })
      : null;
    const customerByPhone = !customerByEmail && phone
      ? await prisma.user.findFirst({ where: { phone } })
      : null;

    const savedCustomer = customerByEmail || customerByPhone || await prisma.user.create({
      data: {
        name: formData.fullName,
        email,
        phone,
        role: "CUSTOMER",
      },
    });

    let vehicle = await prisma.vehicle.findUnique({
      where: { registrationNo: formData.registrationNo }
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          customerId: savedCustomer.id,
          make: formData.make,
          model: formData.model,
          registrationNo: formData.registrationNo,
          chassisNo: formData.chassisNo || null,
          year: null, // You can add year field later if needed
        },
      });
    } else if (!vehicle.chassisNo && formData.chassisNo) {
      vehicle = await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { chassisNo: formData.chassisNo },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: savedCustomer.id,
        vehicleMake: formData.make,
        vehicleModel: formData.model,
        vehicleType: formData.type,
        registrationNo: formData.registrationNo,
        chassisNo: formData.chassisNo || null,
        mileage: formData.mileage ? parseInt(String(formData.mileage), 10) : null,
        
        serviceType: formData.serviceType,
        description: formData.description,
        preferredDate: new Date(formData.preferredDate),
        preferredTime: formData.preferredTime,
        expectedCompletion: formData.expectedCompletion ? new Date(formData.expectedCompletion) : null,
        
        deliveryMethod: formData.deliveryMethod,
        status: "PENDING",
        notes: `Customer Phone: ${formData.phone}`,
      },
    });

    const result = { booking, vehicle, customer: savedCustomer };

    console.log("✅ Booking & Vehicle saved successfully! Booking ID:", result.booking.id);

    // Send notifications after booking is created
    const bookingId = result.booking.id;
    const customerName = result.customer.name || "Customer";
    const customerPhone = phone;
    const customerEmail = email;
    const vehicleDetails = `${formData.make} ${formData.model}`;
    const serviceType = formData.serviceType;
    const preferredDate = new Date(formData.preferredDate).toLocaleDateString();

    // Send client email notification when email is provided
    if (customerEmail) {
      const clientEmailContent = generateClientBookingEmail(
        customerName,
        bookingId,
        serviceType,
        preferredDate,
        vehicleDetails
      );
      const result = await sendEmailNotification(
        customerEmail,
        `Booking Confirmation - ID: ${bookingId}`,
        clientEmailContent
      );
      if (!result.success) {
        console.warn("Client booking email failed:", result.error);
      }
    }

    // Send admin email notification
    const adminEmail = process.env.ADMIN_EMAIL || siteContact.emails?.[0];
    if (adminEmail) {
      const adminEmailContent = generateAdminBookingEmail(
        bookingId,
        customerName,
        customerPhone || "N/A",
        customerEmail || "N/A",
        serviceType,
        vehicleDetails,
        preferredDate,
        formData.description ?? ""
      );
      const result = await sendEmailNotification(
        adminEmail,
        `🔔 New Booking Received - ID: ${bookingId}`,
        adminEmailContent
      );
      if (!result.success) {
        console.warn("Admin booking email failed:", result.error);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    revalidatePath("/admin/vehicles");

    const adminWhatsAppNumber = (process.env.ADMIN_PHONE_NUMBER || siteContact.phone.whatsapp).replace(/\D/g, "");
    const whatsappMessage = formatBookingWhatsAppMessage({
      bookingId,
      customerName,
      customerPhone: customerPhone || "N/A",
      customerEmail: customerEmail || "N/A",
      vehicleDetails,
      formData,
      preferredDate,
    });

    return { 
      success: true, 
      bookingId: result.booking.id,
      vehicleId: result.vehicle.id,
      message: "Booking submitted successfully!",
      whatsappUrl: `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    };

  } catch (error: unknown) {
    console.error("Booking error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to submit booking. Please try again." 
    };
  }
}
