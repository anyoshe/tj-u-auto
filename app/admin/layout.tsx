"use client";

import Link from "next/link";
import { LayoutDashboard, Calendar, Car, LogOut, Menu, X, FileText } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-black border-b border-yellow-400/20 p-4 flex items-center justify-between fixed w-full z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-yellow-400">TJ & U</span>
          <span className="text-lg">AUTO</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="flex h-screen pt-14 md:pt-5">
        {/* Sidebar */}
        <div className={`w-72 bg-black border-r border-yellow-400/20 p-6 flex flex-col fixed h-full transition-all duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

          <div className="mb-10 hidden md:block">
            <h1 className="text-2xl font-bold text-yellow-400">TJ & U AUTO</h1>
            <p className="text-sm font-semibold text-gray-400 mt-8 tracking-wider text-center md:text-left">
              ADMIN DASHBOARD
            </p>
          </div>

          <nav className="space-y-2 flex-1">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-white transition" onClick={() => setSidebarOpen(false)}>
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-white transition" onClick={() => setSidebarOpen(false)}>
              <Calendar size={20} />
              Bookings
            </Link>
            <Link href="/admin/quotes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-white transition" onClick={() => setSidebarOpen(false)}>
              <FileText size={20} />
              Quotations
            </Link>
            <Link href="/admin/vehicles" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-white transition" onClick={() => setSidebarOpen(false)}>
              <Car size={20} />
              Vehicles
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-white transition" onClick={() => setSidebarOpen(false)}>
              👥 Users
            </Link>
          </nav>

          <div className="pt-6 border-t border-gray-800">
            <button className="flex items-center gap-3 text-red-400 hover:text-red-500 w-full px-4 py-3 rounded-xl hover:bg-zinc-900">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-72 overflow-auto p-4 md:p-8 pt-6 md:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}