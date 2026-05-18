import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Get booking counts for each vehicle
  const vehicleBookingCounts = await Promise.all(
    vehicles.map(async (vehicle) => {
      const bookingCount = await prisma.booking.count({
        where: { registrationNo: vehicle.registrationNo }
      });
      const lastBooking = await prisma.booking.findFirst({
        where: { registrationNo: vehicle.registrationNo },
        orderBy: { createdAt: "desc" }
      });
      return {
        vehicleId: vehicle.id,
        bookingCount,
        lastBooking
      };
    })
  );

  const vehicleStats = vehicleBookingCounts.reduce((acc, stat) => {
    acc[stat.vehicleId] = stat;
    return acc;
  }, {} as Record<string, { bookingCount: number; lastBooking: { createdAt: Date } | null }>);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Vehicle Management"
        subtitle="Manage registered vehicles, view usage details, and service history."
        trailing={<span className="bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">{vehicles.length} Vehicles</span>}
      />

      {vehicles.length === 0 ? (
        <div className="bg-zinc-900 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">No vehicles registered yet</p>
        </div>
      ) : (
        <div className="bg-zinc-900 rounded-lg overflow-hidden border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-zinc-800/50">
                <th className="text-left p-6 font-semibold text-gray-300">Customer</th>
                <th className="text-left p-6 font-semibold text-gray-300">Vehicle</th>
                <th className="text-left p-6 font-semibold text-gray-300">Registration</th>
                <th className="text-left p-6 font-semibold text-gray-300">Chassis</th>
                <th className="text-left p-6 font-semibold text-gray-300">Last Service</th>
                <th className="text-center p-6 font-semibold text-gray-300">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => {
                const stats = vehicleStats[vehicle.id];
                return (
                  <tr key={vehicle.id} className="border-b border-gray-800 hover:bg-zinc-800/50 transition">
                    <td className="p-6">
                      <p className="font-medium text-white">{vehicle.customer.name}</p>
                      <p className="text-sm text-gray-400">{vehicle.customer.phone}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-medium text-white">{vehicle.make} {vehicle.model}</p>
                      <p className="text-sm text-gray-500">{vehicle.year}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-mono text-sm font-semibold text-yellow-400">{vehicle.registrationNo}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-mono text-sm text-gray-300">{vehicle.chassisNo || "N/A"}</p>
                    </td>
                    <td className="p-6 text-sm text-gray-400">
                      {stats?.lastBooking 
                        ? format(new Date(stats.lastBooking.createdAt), "dd MMM yyyy")
                        : "—"}
                    </td>
                    <td className="p-6 text-center">
                      <span className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {stats?.bookingCount || 0}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
