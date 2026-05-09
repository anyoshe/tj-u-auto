// "use server";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function createBooking(formData: any) {
//   try {
//     // Create customer + booking in one transaction
//     const result = await prisma.$transaction(async (tx) => {
      
//       // 1. Create or find customer
//       let customer = await tx.user.findUnique({
//         where: { email: formData.email }
//       });

//       if (!customer) {
//         customer = await tx.user.create({
//           data: {
//             name: formData.fullName,
//             email: formData.email,
//             phone: formData.phone,
//             role: "CUSTOMER",
//           },
//         });
//       }

//       // 2. Create Booking
//       const booking = await tx.booking.create({
//         data: {
//           customerId: customer.id,
//           vehicleMake: formData.make,
//           vehicleModel: formData.model,
//           vehicleType: formData.type,
//           registrationNo: formData.registrationNo,
//           mileage: formData.mileage ? parseInt(formData.mileage) : null,
          
//           serviceType: formData.serviceType,
//           description: formData.description,
//           preferredDate: new Date(formData.preferredDate),
//           preferredTime: formData.preferredTime,
//           expectedCompletion: formData.expectedCompletion ? new Date(formData.expectedCompletion) : null,
          
//           deliveryMethod: formData.deliveryMethod,
//           status: "PENDING",
//           notes: `Customer Phone: ${formData.phone}`,
//         },
//       });

//       return booking;
//     });

//     console.log("✅ Booking created successfully! ID:", result.id);

//     return { 
//       success: true, 
//       bookingId: result.id,
//       message: "Booking submitted successfully!" 
//     };

//   } catch (error: any) {
//     console.error("Booking error:", error);
//     return { 
//       success: false, 
//       error: error.message || "Failed to submit booking. Please try again." 
//     };
//   }
// }
"use server";

import { prisma } from "@/lib/prisma";
import {
  sendWhatsAppNotification,
  sendEmailNotification,
  generateClientWhatsAppMessage,
  generateClientBookingEmail,
  generateAdminWhatsAppMessage,
  generateAdminBookingEmail,
} from "@/lib/notifications";

export async function createBooking(formData: any) {
  try {
    const customer = await prisma.user.findUnique({
      where: { email: formData.email }
    });

    const savedCustomer = customer ?? await prisma.user.create({
      data: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
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
          year: null, // You can add year field later if needed
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: savedCustomer.id,
        vehicleMake: formData.make,
        vehicleModel: formData.model,
        vehicleType: formData.type,
        registrationNo: formData.registrationNo,
        mileage: formData.mileage ? parseInt(formData.mileage) : null,
        
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
    const customerPhone = formData.phone.replace(/\D/g, ''); // Remove non-digits
    const customerEmail = result.customer.email;
    const vehicleDetails = `${formData.make} ${formData.model}`;
    const serviceType = formData.serviceType;
    const preferredDate = new Date(formData.preferredDate).toLocaleDateString();

    // Send client WhatsApp notification
    if (customerPhone) {
      const clientMessage = generateClientWhatsAppMessage(customerName, bookingId);
      await sendWhatsAppNotification(customerPhone, clientMessage);
    }

    // Send client email notification
    if (customerEmail) {
      const clientEmailContent = generateClientBookingEmail(
        customerName,
        bookingId,
        serviceType,
        preferredDate,
        vehicleDetails
      );
      await sendEmailNotification(
        customerEmail,
        `Booking Confirmation - ID: ${bookingId}`,
        clientEmailContent
      );
    }

    // Send admin WhatsApp notification
    const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
    if (adminPhoneNumber) {
      const adminMessage = generateAdminWhatsAppMessage(bookingId, customerName, serviceType, customerPhone);
      await sendWhatsAppNotification(adminPhoneNumber, adminMessage);
    }

    // Send admin email notification
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const adminEmailContent = generateAdminBookingEmail(
        bookingId,
        customerName,
        customerPhone,
        customerEmail || "N/A",
        serviceType,
        vehicleDetails,
        preferredDate,
        formData.description
      );
      await sendEmailNotification(
        adminEmail,
        `🔔 New Booking Received - ID: ${bookingId}`,
        adminEmailContent
      );
    }

    return { 
      success: true, 
      bookingId: result.booking.id,
      vehicleId: result.vehicle.id,
      message: "Booking submitted successfully!" 
    };

  } catch (error: any) {
    console.error("Booking error:", error);
    return { 
      success: false, 
      error: error.message || "Failed to submit booking. Please try again." 
    };
  }
}