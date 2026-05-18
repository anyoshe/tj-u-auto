import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { BookingsList } from "./BookingsList";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

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
    chassisNo: booking.chassisNo,
    serviceType: booking.serviceType,
    preferredDateLabel: format(new Date(booking.preferredDate), "dd MMM yyyy"),
    status: booking.status,
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="All Bookings"
        subtitle="Review and manage incoming service requests for the workshop."
        trailing={<p className="text-gray-400">{bookings.length} Total Requests</p>}
      />

      <BookingsList bookings={bookingItems} />
    </div>
  );
}
