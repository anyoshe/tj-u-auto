"use client";

import { useState, useEffect } from "react";
import { Download, MessageCircle, Phone } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type NavigatorWithInstallChecks = Navigator & {
  standalone?: boolean;
  getInstalledRelatedApps?: () => Promise<unknown[]>;
};

export default function StackedButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const phoneNumber = "254721222585";

  const handleWhatsAppClick = () => {
    const message = "Hello TJ & U Auto, I would like to inquire about your services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // PWA Install Logic
  useEffect(() => {
    const navigatorWithInstallChecks = window.navigator as NavigatorWithInstallChecks;

    const isRunningAsInstalledApp = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: fullscreen)").matches ||
        navigatorWithInstallChecks.standalone === true
      );
    };

    const hasInstalledRelatedApp = async () => {
      if (!navigatorWithInstallChecks.getInstalledRelatedApps) {
        return false;
      }

      try {
        const relatedApps = await navigatorWithInstallChecks.getInstalledRelatedApps();
        return relatedApps.length > 0;
      } catch {
        return false;
      }
    };

    const syncInstallState = async () => {
      const installed =
        isRunningAsInstalledApp() ||
        (await hasInstalledRelatedApp()) ||
        localStorage.getItem("pwa-installed") === "true";

      setIsInstalled(installed);

      if (installed) {
        setShowInstall(false);
        setDeferredPrompt(null);
      }
    };

    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;

      // If the browser offers an install prompt, the stale "installed" flag no longer applies.
      localStorage.removeItem("pwa-installed");
      setIsInstalled(false);

      if (isRunningAsInstalledApp() || localStorage.getItem("pwa-install-dismissed") === "true") {
        setShowInstall(false);
        return;
      }

      setDeferredPrompt(promptEvent);
      setShowInstall(true);
    };

    const installedHandler = () => {
      setShowInstall(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
      localStorage.setItem("pwa-installed", "true");
    };

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const syncDisplayMode = () => {
      void syncInstallState();
    };

    void syncInstallState();

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);
    mediaQuery.addEventListener("change", syncDisplayMode);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
      mediaQuery.removeEventListener("change", syncDisplayMode);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstall(false);
      setIsInstalled(true);
      localStorage.setItem("pwa-installed", "true");
    } else {
      localStorage.setItem("pwa-install-dismissed", "true");
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      
      {/* WhatsApp Button - Always Visible */}
      <button
        onClick={handleWhatsAppClick}
        className="group bg-[#25D366] hover:bg-[#20BA5C] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 min-w-[58px] sm:min-w-[210px]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition" />
        <span className="hidden sm:inline font-semibold text-base">WhatsApp Us</span>
      </button>

      {/* Call Button - Visible only on Mobile */}
      <a
        href={`tel:${phoneNumber}`}
        className="group md:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 min-w-[58px]"
        aria-label="Call us"
      >
        <Phone size={28} className="group-hover:rotate-12 transition" />
        <span className="hidden sm:inline font-semibold text-base">Call Now</span>
      </a>

      {/* Install App Button - Less prominent */}
      {showInstall && !isInstalled && (
        <button
          onClick={handleInstall}
          className="group bg-zinc-800 hover:bg-zinc-700 border border-yellow-400/40 hover:border-yellow-400 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 min-w-[58px] sm:min-w-[210px]"
        >
          <Download size={26} className="text-yellow-400 group-hover:rotate-12 transition" />
          <span className="hidden sm:inline font-medium">Install App</span>
        </button>
      )}
    </div>
  );
}
