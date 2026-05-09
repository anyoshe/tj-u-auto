"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function StackedButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const phoneNumber = "254736889880";

  const handleWhatsAppClick = () => {
    const message = "Hello TJ & U Auto, I would like to inquire about your services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  useEffect(() => {
    const checkInstalled = () => {
      // Check if app is in standalone mode (PWA installed)
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;

      // Check if user previously dismissed install or app was installed
      const installDismissed = localStorage.getItem("pwa-install-dismissed") === "true";
      const appInstalled = localStorage.getItem("pwa-installed") === "true";

      // If any of these conditions are true, consider the app installed
      if (isStandalone || isIOSStandalone || appInstalled) {
        setIsInstalled(true);
        setShowInstall(false);
        return true; // Return true to indicate app is installed
      }

      // If user dismissed install before, don't show again
      if (installDismissed) {
        setShowInstall(false);
        return false;
      }

      return false; // App not installed
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
      localStorage.setItem("pwa-installed", "true");
    };

    const isAppInstalled = checkInstalled();

    // Only set up install prompt timeout if app is not installed
    let timeout: NodeJS.Timeout | undefined;
    if (!isAppInstalled) {
      timeout = setTimeout(() => {
        setShowInstall(true);
      }, 8000);
    }

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

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
      if (timeout) clearTimeout(timeout);
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
      localStorage.setItem("pwa-installed", "true");
    } else if (outcome === "dismissed") {
      // User dismissed the install prompt
      localStorage.setItem("pwa-install-dismissed", "true");
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Install Button - Top */}
      {showInstall && !isInstalled && (
        <button
          onClick={handleInstall}
          className="bg-zinc-800 hover:bg-zinc-700 border border-yellow-400/50 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-110"
        >
          <Download size={24} className="text-yellow-400" />
          <span className="hidden md:inline font-medium pr-1">Install App</span>
        </button>
      )}

      {/* WhatsApp Button - Bottom */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <span className="text-3xl">💬</span>
        <span className="hidden md:inline font-medium pr-2">Chat on WhatsApp</span>
      </button>
    </div>
  );
}