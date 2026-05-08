"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Also show button after some time for users who already have PWA
    const timeout = setTimeout(() => {
      setShowInstall(true);
    }, 8000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("Installation prompt not available. Try using Chrome or Edge on desktop/mobile.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-7 md:bottom-6 left-6 bg-zinc-800 hover:bg-zinc-700 border border-yellow-400/50 text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-3 transition-all hover:scale-110"
    >
      <Download size={24} className="text-yellow-400" />
      <span className="hidden md:inline font-medium pr-1">Install App</span>
    </button>
  );
}