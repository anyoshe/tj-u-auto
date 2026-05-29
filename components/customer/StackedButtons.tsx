// "use client";

// import { useState, useEffect } from "react";
// // import { Download } from "lucide-react";
// import { Download, MessageCircle, Phone } from "lucide-react";

// type BeforeInstallPromptEvent = Event & {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
// };

// export default function StackedButtons() {
//   const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
//   const [showInstall, setShowInstall] = useState(false);
//   const [isInstalled, setIsInstalled] = useState(false);

//   const phoneNumber = "254721222585"; // Replace with your actual phone number in international format without the '+' sign

//   const handleWhatsAppClick = () => {
//     const message = "Hello TJ & U Auto, I would like to inquire about your services.";
//     window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   useEffect(() => {
//     const isAppInstalled = () => {
//       return (
//         window.matchMedia("(display-mode: standalone)").matches ||
//         window.matchMedia("(display-mode: fullscreen)").matches ||
//         (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
//         localStorage.getItem("pwa-installed") === "true"
//       );
//     };

//     const syncInstallVisibility = () => {
//       if (isAppInstalled()) {
//         setIsInstalled(true);
//         setShowInstall(false);
//         setDeferredPrompt(null);
//         return;
//       }

//       setIsInstalled(false);

//       if (localStorage.getItem("pwa-install-dismissed") === "true") {
//         setShowInstall(false);
//       }
//     };

//     const handler = (e: Event) => {
//       e.preventDefault();
//       const promptEvent = e as BeforeInstallPromptEvent;

//       if (isAppInstalled() || localStorage.getItem("pwa-install-dismissed") === "true") {
//         setShowInstall(false);
//         return;
//       }

//       setDeferredPrompt(promptEvent);
//       setShowInstall(true);
//     };

//     const installedHandler = () => {
//       setShowInstall(false);
//       setDeferredPrompt(null);
//       setIsInstalled(true);
//       localStorage.setItem("pwa-installed", "true");
//     };

//     const mediaQuery = window.matchMedia("(display-mode: standalone)");

//     syncInstallVisibility();

//     window.addEventListener("beforeinstallprompt", handler);
//     window.addEventListener("appinstalled", installedHandler);
//     mediaQuery.addEventListener("change", syncInstallVisibility);

//     // Register service worker for PWA
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.register('/sw.js')
//         .then((registration) => {
//           console.log('Service Worker registered successfully:', registration);
//         })
//         .catch((error) => {
//           console.log('Service Worker registration failed:', error);
//         });
//     }

//     return () => {
//       window.removeEventListener("beforeinstallprompt", handler);
//       window.removeEventListener("appinstalled", installedHandler);
//       mediaQuery.removeEventListener("change", syncInstallVisibility);
//     };
//   }, []);

//   const handleInstall = async () => {
//     if (!deferredPrompt) {
//       alert(
//         "Install prompt not available yet. Open this page in Chrome or Edge on a supported device, then reload to trigger the install prompt."
//       );
//       return;
//     }

//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;

//     if (outcome === "accepted") {
//       setShowInstall(false);
//       setIsInstalled(true);
//       localStorage.setItem("pwa-installed", "true");
//     } else if (outcome === "dismissed") {
//       // User dismissed the install prompt
//       localStorage.setItem("pwa-install-dismissed", "true");
//       setShowInstall(false);
//     }
//     setDeferredPrompt(null);
//   };

// //   return (
// //     <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
// //       {/* Install Button - Top */}
// //       {showInstall && !isInstalled && (
// //         <button
// //           onClick={handleInstall}
// //           className="bg-zinc-800 hover:bg-zinc-700 border border-yellow-400/50 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-110"
// //         >
// //           <Download size={24} className="text-yellow-400" />
// //           <span className="hidden md:inline font-medium pr-1">Install App</span>
// //         </button>
// //       )}

// //       {/* WhatsApp Button - Bottom */}
// //       <button
// //         onClick={handleWhatsAppClick}
// //         className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-110"
// //         aria-label="Chat on WhatsApp"
// //       >
// //         <span className="text-3xl">💬</span>
// //         <span className="hidden md:inline font-medium pr-2">Chat on WhatsApp</span>
// //       </button>
// //     </div>
// //   );
// // }
// return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      
//       {/* Install App Button */}
//       {showInstall && !isInstalled && (
//         <button
//           onClick={handleInstall}
//           className="group bg-zinc-900 hover:bg-zinc-800 border border-yellow-400/30 hover:border-yellow-400 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
//         >
//           <Download size={26} className="text-yellow-400 group-hover:rotate-12 transition" />
//           <span className="hidden md:inline font-medium">Install App</span>
//         </button>
//       )}

//       {/* WhatsApp Button - Primary */}
//       <button
//         onClick={handleWhatsAppClick}
//         className="group bg-[#25D366] hover:bg-[#20BA5C] text-white p-5 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
//         aria-label="Chat on WhatsApp"
//       >
//         <MessageCircle size={28} className="group-hover:scale-110 transition" />
//         <span className="hidden md:inline ml-3 font-semibold text-base">WhatsApp</span>
        
//         {/* Small green glow effect */}
//         <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform origin-center" />
//       </button>

//       {/* Optional Call Button */}
//       <a
//         href="tel:+254721222585"
//         className="group bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
//         aria-label="Call us"
//       >
//         <Phone size={28} className="group-hover:rotate-12 transition" />
//         <span className="hidden md:inline ml-3 font-semibold text-base">Call Now</span>
//       </a>
//     </div>
//   );
// }

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
