import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { BookingStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const bookingStatusCards = [
  {
    status: BookingStatus.PENDING,
    label: "Pending Bookings",
    className: "border-yellow-400/10 hover:border-yellow-400 text-yellow-400",
  },
  {
    status: BookingStatus.RECEIVED,
    label: "Received",
    className: "border-cyan-400/10 hover:border-cyan-400 text-cyan-400",
  },
  {
    status: BookingStatus.IN_PROGRESS,
    label: "In Progress",
    className: "border-blue-400/10 hover:border-blue-400 text-blue-400",
  },
  {
    status: BookingStatus.READY_FOR_DELIVERY,
    label: "Ready for Delivery",
    className: "border-emerald-400/10 hover:border-emerald-400 text-emerald-400",
  },
  {
    status: BookingStatus.COMPLETED,
    label: "Completed",
    className: "border-green-400/10 hover:border-green-400 text-green-400",
  },
  {
    status: BookingStatus.CANCELLED,
    label: "Cancelled",
    className: "border-red-400/10 hover:border-red-400 text-red-400",
  },
];

export default async function AdminDashboard() {
  const [totalBookings, pendingQuotesCount, statusCounts] = await Promise.all([
    prisma.booking.count(),
    prisma.quote.count({
      where: { status: "PENDING" },
    }),
    Promise.all(
      bookingStatusCards.map((card) =>
        prisma.booking.count({ where: { status: card.status } })
      )
    ),
  ]);

  const countByStatus = Object.fromEntries(
    bookingStatusCards.map((card, index) => [card.status, statusCounts[index]])
  ) as Partial<Record<BookingStatus, number>>;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Welcome Back"
        subtitle="Here's what's happening at TJ & U Auto today"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-white/10 hover:border-white/30 transition">
          <p className="text-gray-300 text-sm font-medium">TOTAL BOOKINGS</p>
          <p className="text-6xl font-bold mt-6">{totalBookings}</p>
        </div>

        {bookingStatusCards.map((card) => (
          <div
            key={card.status}
            className={`bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border transition ${card.className}`}
          >
            <p className="text-sm font-medium">{card.label.toUpperCase()}</p>
            <p className="text-6xl font-bold mt-6 text-white">
              {countByStatus[card.status] ?? 0}
            </p>
          </div>
        ))}

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-purple-400/10 hover:border-purple-400 transition">
          <p className="text-purple-400 text-sm font-medium">PENDING QUOTES</p>
          <p className="text-6xl font-bold mt-6">{pendingQuotesCount}</p>
        </div>
      </div>
    </div>
  );
}
