import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { format } from "date-fns";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type VehicleWithCustomer = Prisma.VehicleGetPayload<{ include: { customer: true } }>;
type VehicleStat = { bookingCount: number; lastBooking: { createdAt: Date } | null };

export const dynamic = "force-dynamic";

export default async function VehiclesPage() {
  const vehicles: VehicleWithCustomer[] = await prisma.vehicle.findMany({
    include: {
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Get booking counts for each vehicle
  const vehicleBookingCounts = await Promise.all(
    vehicles.map(async (vehicle: VehicleWithCustomer) => {
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
  }, {} as Record<string, VehicleStat>);

  return (
    <div className="space-y-6 px-4 md:px-0">
      <AdminPageHeader
        title="Vehicle Management"
        subtitle="Manage registered vehicles, view usage details, and service history."
        trailing={<span className="bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">{vehicles.length} Vehicles</span>}
      />

      {vehicles.length === 0 ? (
        <div className="bg-zinc-900 rounded-2xl p-12 text-center border border-gray-800">
          <p className="text-gray-400 text-lg">No vehicles registered yet</p>
        </div>
      ) : (
        <>
          {/* ==================== DESKTOP TABLE VIEW ==================== */}
          <div className="hidden md:block bg-zinc-900 rounded-2xl overflow-hidden border border-gray-800">
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
                {vehicles.map((vehicle: VehicleWithCustomer) => {
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

          {/* ==================== MOBILE CARD VIEW ==================== */}
          <div className="block md:hidden space-y-4">
            {vehicles.map((v: VehicleWithCustomer) => {
              const stats = vehicleStats[v.id];
              return (
                <div 
                  key={v.id} 
                  className="bg-zinc-900 p-6 rounded-3xl border border-gray-800 space-y-4 shadow-xl"
                >
                  {/* Top Header: Car Info & Registration */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {v.make} {v.model}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">Year: {v.year}</p>
                    </div>
                    <span className="bg-zinc-950 px-3 py-1.5 rounded-xl font-mono text-sm font-bold text-yellow-400 border border-white/5 whitespace-nowrap">
                      {v.registrationNo}
                    </span>
                  </div>

                  <hr className="border-zinc-800" />

                  {/* Customer Block info */}
                  <div className="bg-zinc-950/40 p-3 rounded-2xl border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Customer Owner</p>
                    <p className="text-gray-200 font-semibold text-sm">{v.customer.name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{v.customer.phone}</p>
                  </div>

                  {/* Detailed Meta Grid layout */}
                  <div className="grid grid-cols-2 gap-4 pt-1 text-sm">
                    <div>
                      <span className="text-gray-500 block text-xs">Chassis Number</span>
                      <span className="text-gray-300 font-mono text-xs break-all block mt-0.5">
                        {v.chassisNo || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Last Service Run</span>
                      <span className="text-gray-300 font-semibold block mt-0.5">
                        {stats?.lastBooking 
                          ? format(new Date(stats.lastBooking.createdAt), "dd MMM yyyy")
                          : "—"}
                      </span>
                    </div>
                  </div>

                  <hr className="border-zinc-800" />

                  {/* Bottom Strip for Total Bookings Badge */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Total Workshop Bookings</span>
                    <span className="bg-yellow-400/10 text-yellow-400 px-4 py-1 rounded-full text-xs font-bold border border-yellow-400/20">
                      {stats?.bookingCount || 0}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}