"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches;
      const iosStandalone = (window.navigator as any).standalone === true;
      if (standalone || iosStandalone) {
        setIsInstalled(true);
      }
    };

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    const installedHandler = () => {
      setShowInstall(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    checkInstalled();
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    const timeout = setTimeout(() => {
      setShowInstall(true);
    }, 8000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert(
        "Install prompt not available yet. Open this page in Chrome or Edge on a supported device, then reload to trigger the install prompt."
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowInstall(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (!showInstall || isInstalled) return null;

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