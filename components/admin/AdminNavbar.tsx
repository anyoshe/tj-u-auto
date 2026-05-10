"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AdminNavbar() {
  const { data: session } = useSession();

  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  if (hour >= 17) greeting = "Good evening";

  return (
    <nav className="hidden md:block border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-bold text-xl tracking-tight text-white">
              TJ & U <span className="text-yellow-400">AUTO</span>
            </span>
            <div className="ml-4 pl-4 border-l border-zinc-700 hidden md:block">
              <span className="text-xs font-semibold bg-zinc-800 text-zinc-400 px-2 py-1 rounded uppercase tracking-widest">
                Management Tool
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-zinc-400">{greeting},</p>
              <p className="text-sm font-bold text-white">
                {session?.user?.name || "Administrator"}
              </p>
            </div>

            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-black">
              {session?.user?.name?.[0] || "A"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}