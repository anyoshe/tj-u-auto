"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useState, useEffect } from "react";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  thumbnail?: string;
};

export default function GalleryPage() {
  const galleryItems: GalleryItem[] = [
    
    { 
      type: "video", 
      src: "/videos/workshopinterior.mp4", 
      alt: "Workshop Interior Tour",
      thumbnail: "/images/workshopinteriorthumbnail.jpg" 
    },
    { type: "image", src: "/images/gateimage.png", alt: "Workshop Exterior" },
    { 
      type: "video", 
      src: "/videos/tjuvideoprecision.mp4", 
      alt: "In a Nutshell: Precision Work",
      thumbnail: "/images/inanutshell.jpg" 
    },
    { type: "image", src: "/images/beforeandafter.png", alt: "Before & After Repair" },
    { 
      type: "video", 
      src: "/videos/beforeaftertju-video.mp4", 
      alt: "Before & After Comparison",
      thumbnail: "/images/beforeandafterthumbnail.jpg" 
    },
    { type: "image", src: "/images/tjuimage4.jpeg", alt: "Workshop Entry Area" },

    { 
      type: "video", 
      src: "/videos/tjubackground-video.mp4", 
      alt: "Spray Painting Work",
      thumbnail: "/images/spraybodyworkthumbnail.jpg"
    },
    { type: "image", src: "/images/enginework.png", alt: "Professional Engine Work" },
    { 
      type: "video", 
      src: "/videos/dailyworkshop.mp4", 
      alt: "Daily Workshop Activity",
      thumbnail: "/images/dailyworkshopthumbnail.jpg"
    },
  ];

  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close when clicking outside the content
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedItem(null);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-4 text-white">Our Gallery</h1>
        <p className="text-center text-gray-400 text-xl mb-12">
          See our work, facilities, and satisfied customers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl aspect-video bg-zinc-900 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <>
                  <Image
                    src={item.thumbnail || "/images/video-placeholder.jpg"}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-black/60 backdrop-blur-sm p-5 rounded-full group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-white" fill="white" />
                    </div>
                  </div>
                </>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 z-30">
                <p className="text-white font-medium text-sm">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================== FULL SCREEN LIGHTBOX ====================== */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={handleOutsideClick}
        >
          <div className="max-w-5xl w-full relative">
            
            {/* Close Button - Very Visible */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-14 right-4 text-white hover:text-yellow-400 transition-all text-4xl z-50 bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              ✕
            </button>

            <div className="bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
              {selectedItem.type === "image" ? (
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="w-full h-auto max-h-[85vh] object-contain"
                  priority
                />
              ) : (
                <video
                  controls
                  autoPlay
                  preload="metadata"
                  poster={selectedItem.thumbnail}
                  className="w-full max-h-[85vh] rounded-t-2xl"
                >
                  <source src={selectedItem.src} type="video/mp4" />
                </video>
              )}

              {/* Caption */}
              <div className="p-6 text-center border-t border-zinc-800">
                <p className="text-white text-lg font-medium">{selectedItem.alt}</p>
              </div>
            </div>

            {/* Hint Text */}
            <p className="text-center text-gray-500 text-sm mt-4">
              Click outside or press ESC to return to gallery
            </p>
          </div>
        </div>
      )}
    </div>
  );
}