import { prisma } from "@/lib/prisma"; // 1. IMPORT PRISMA

export const dynamic = 'force-dynamic'; // 2. PREVENTS STALE DATA

export default async function AdminDashboard() {
  // 3. FETCH ACTUAL COUNTS FROM NEON
  const pendingCount = await prisma.booking.count({
    where: { status: 'PENDING' } // Adjust 'PENDING' to match your Schema
  });
  
  const inProgressCount = await prisma.booking.count({
    where: { status: 'IN_PROGRESS' }
  });

  const completedCount = await prisma.booking.count({
    where: { 
      status: 'COMPLETED',
      // Optional: filter for today
    }
  });
// export default function AdminDashboard() {
  return (
    <div className="space-y-8 pt-10">
      <div>
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-gray-400">Here's what's happening at TJ & U Auto today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-yellow-400/10 hover:border-yellow-400 transition">
          <p className="text-yellow-400 text-sm font-medium">PENDING BOOKINGS</p>
          <p className="text-6xl font-bold mt-6">12</p>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-blue-400/10 hover:border-blue-400 transition">
          <p className="text-blue-400 text-sm font-medium">IN PROGRESS</p>
          <p className="text-6xl font-bold mt-6">7</p>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-green-400/10 hover:border-green-400 transition">
          <p className="text-green-400 text-sm font-medium">COMPLETED TODAY</p>
          <p className="text-6xl font-bold mt-6">4</p>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-3xl border border-purple-400/10 hover:border-purple-400 transition">
          <p className="text-purple-400 text-sm font-medium">QUOTES PENDING</p>
          <p className="text-6xl font-bold mt-6">3</p>
        </div>
      </div>
    </div>
  );
}