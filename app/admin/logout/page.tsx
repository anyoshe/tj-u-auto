"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutPage() {
  useEffect(() => {
    // Automatically sign out and redirect after a brief delay
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/admin/login" });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-500/10 p-4 rounded-full">
            <LogOut size={48} className="text-red-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Signing Out...</h1>
          <p className="text-gray-400">You will be redirected to the login page shortly.</p>
        </div>

        <div className="flex justify-center">
          <Loader2 size={24} className="animate-spin text-yellow-400" />
        </div>

        <div className="pt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Sign Out Now
          </button>
        </div>
      </div>
    </div>
  );
}