import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { BookingsList } from "./BookingsList";


export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
  const bookingItems = bookings.map((booking) => ({
    id: booking.id,
    customerName: booking.customer?.name ?? null,
    customerPhone: booking.customer?.phone ?? null,
    vehicleMake: booking.vehicleMake,
    vehicleModel: booking.vehicleModel,
    registrationNo: booking.registrationNo,
    serviceType: booking.serviceType,
    preferredDateLabel: format(new Date(booking.preferredDate), "dd MMM yyyy"),
    status: booking.status,
  }));

  return (
    <div className="space-y-6 pt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">All Bookings</h1>
        <p className="text-gray-400">{bookings.length} Total Requests</p>
      </div>

      <BookingsList bookings={bookingItems} />
    </div>
  );
}
