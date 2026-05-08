"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBooking(formData: any) {
  try {
    // Create customer + booking in one transaction
    const result = await prisma.$transaction(async (tx) => {
      
      // 1. Create or find customer
      let customer = await tx.user.findUnique({
        where: { email: formData.email }
      });

      if (!customer) {
        customer = await tx.user.create({
          data: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            role: "CUSTOMER",
          },
        });
      }

      // 2. Create Booking
      const booking = await tx.booking.create({
        data: {
          customerId: customer.id,
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

      return booking;
    });

    console.log("✅ Booking created successfully! ID:", result.id);

    return { 
      success: true, 
      bookingId: result.id,
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