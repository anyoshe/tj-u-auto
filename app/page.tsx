"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ReviewSection from "@/components/customer/ReviewSection";

type BackgroundMedia =
  | {
      type: "video";
      sources: { src: string; type: string }[];
      alt: string;
      poster: string;
    }
  | { type: "image"; src: string; alt: string };

const backgroundMedia: BackgroundMedia[] = [
  {
    type: "video",
    sources: [{ src: "/videos/workshopinterior.mp4", type: "video/mp4" }],
    alt: "Workshop Interior",
    poster: "/images/workshopinteriorthumbnail.jpg",
  },
  { type: "image", src: "/images/beforeandafter.png", alt: "Workshop 2" },
  {
    type: "video",
    sources: [{ src: "/videos/beforeaftertju-video.mp4", type: "video/mp4" }],
    alt: "Repair Work",
    poster: "/images/beforeandafterthumbnail.jpg",
  },
  { type: "image", src: "/images/tjuimage4.jpeg", alt: "Workshop 3" },
  {
    type: "video",
    sources: [{ src: "/videos/tjubackground-video1.mp4", type: "video/mp4" }],
    alt: "Painting Work",
    poster: "/images/backgroundthumbnail.jpg",
  },
  { type: "image", src: "/images/tjuentry.png", alt: "Our Gate" },
  {
    type: "video",
    sources: [{ src: "/videos/tjubackground-video.mp4", type: "video/mp4" }],
    alt: "Workshop 1",
    poster: "/images/tjuimage1.jpeg",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto advance logic
  useEffect(() => {
    const currentMedia = backgroundMedia[currentIndex];

    if (currentMedia.type === "image") {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgroundMedia.length);
      }, 7000);
      return () => clearTimeout(timer);
    }
    // For videos, we rely on onEnded event
  }, [currentIndex]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main className="bg-black text-white">
      <section className="min-h-[100vh] flex items-center justify-center relative overflow-hidden">

        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100">
            {backgroundMedia[currentIndex].type === "video" ? (
              <video
                muted
                playsInline
                className="object-cover w-full h-full brightness-[0.65]"
                onEnded={() => {
                  setCurrentIndex((prev) => (prev + 1) % backgroundMedia.length);
                }}
                autoPlay
                loop={false}
                preload="metadata"
                poster={backgroundMedia[currentIndex].poster}
              >
                {backgroundMedia[currentIndex].sources.map((source) => (
                  <source key={source.src} src={source.src} type={source.type} />
                ))}
              </video>
            ) : (
              <Image
                src={backgroundMedia[currentIndex].src}
                alt={backgroundMedia[currentIndex].alt}
                fill
                className="object-cover w-full h-full brightness-[0.65]"
                sizes="100vw"
                priority
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-5 py-2 rounded-full text-sm font-medium">
            Trusted Auto Experts in Nairobi
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-6 tracking-tighter leading-none">
            TJ AND U <span className="text-yellow-400">AUTO</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Expert Auto Repair, Maintenance &amp; Body Work Services
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/booking"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 sm:px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center gap-3 group w-full sm:w-auto"
            >
              Book Service Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 sm:px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xl">★</span> 4.9/5 from Happy Customers
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> +254 721 222 585
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Nairobi, Kenya
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-3">
            {backgroundMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-yellow-400 scale-125" : "bg-white/50 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 text-sm animate-bounce pointer-events-none">
          Scroll to explore
          <span className="text-2xl mt-1">↓</span>
        </div>
      </section>

      {/* ====================== REST OF THE PAGE ====================== */}
      {/* Services Section */}
      <section className="py-16 md:py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-400 mb-12">Professional care for your vehicle</p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard title="General Servicing" desc="Routine maintenance, oil change, filters &amp; brake service" link="/services" />
            <ServiceCard title="Mechanical Repairs" desc="Engine, suspension, transmission, gearbox &amp; diagnostics" link="/services" />
            <ServiceCard title="Accident Repair &amp; Painting" desc="Insurance approved body work and quality painting" link="/services" />
          </div>
        </div>
      </section>
      {/* ====================== SERVICES SECTION ====================== */}
      <section className="py-16 md:py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-400 mb-12">Professional care for your vehicle</p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard
              title="General Servicing"
              desc="Routine maintenance, oil change, filters &amp; brake service"
              link="/services"
            />
            <ServiceCard
              title="Mechanical Repairs"
              desc="Engine, suspension, transmission, gearbox &amp; diagnostics"
              link="/services"
            />
            <ServiceCard
              title="Accident Repair &amp; Painting"
              desc="Insurance approved body work and quality painting"
              link="/services"
            />
          </div>
        </div>
      </section>

      {/* ====================== GALLERY TEASER ====================== */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Work Speaks</h2>
          <p className="text-gray-400 mb-8">See some of our recent projects</p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-lg font-medium"
          >
            View Full Gallery <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ====================== TESTIMONIALS ====================== */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
          <div className="max-w-2xl mx-auto italic text-lg text-gray-300">
            &quot;Best service I have received in Nairobi. Honest, professional and timely. Highly recommended!&quot;
          </div>
          <p className="mt-4 text-yellow-400">- John Mwangi, Toyota Owner</p>

          <Link href="/testimonials" className="text-yellow-400 mt-10 inline-block hover:underline">
            Read More Reviews →
          </Link>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ReviewSection />

      {/* ====================== INSURANCE PARTNERS ====================== */}
<section className="py-20 bg-zinc-950">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-4 text-white">Trusted Insurance Partners</h2>
    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
      We work with leading insurance companies in Kenya for fast and seamless claims processing
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-8 text-center">
      {[
        "Icea Lion",
        "Sanlam Allianz",
        "First Assurance",
        "NCBA Insurance",
        "Kenindia",
        "Definite Insurance",
        "Metropolitan",
        "GA Insurance",
        "Geminia",
        "Madison Insurance",
        "Britam",
        "AIG",
        "MUA Insurance",
        "Mayfair"
      ].map((partner, index) => (
        <div
          key={index}
          className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 py-6 px-8 rounded-2xl text-lg font-medium text-gray-200 hover:text-yellow-400 border border-transparent hover:border-yellow-400/20"
        >
          {partner}
        </div>
      ))}
    </div>

    <p className="text-gray-500 text-sm mt-12">
      More partnerships being added regularly
    </p>
  </div>
</section>

      {/* ====================== CONTACT / FINAL CTA ====================== */}
      <section className="py-20 bg-black border-t border-yellow-400/20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Ready to Service Your Vehicle?</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="text-yellow-400 w-6 h-6" />
                <div>
                  <p className="font-medium text-lg">+254 721 222 585</p>
                  <p className="text-gray-400">Call or WhatsApp us</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-yellow-400 w-6 h-6" />
                <div>
                  <p className="font-medium">TJ and U Complex, Nairobi</p>
                  <p className="text-gray-400">Visit our workshop</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Link
              href="/booking"
              className="block bg-yellow-400 text-black text-center py-8 rounded-3xl text-2xl font-semibold hover:bg-yellow-300 transition"
            >
              Book Your Service Now →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );

}


// ServiceCard Component
function ServiceCard({ title, desc, link }: { title: string; desc: string; link: string }) {
  return (
    <Link href={link} className="block group">
      <div className="bg-zinc-900 p-8 rounded-3xl border border-transparent group-hover:border-yellow-400 transition-all h-full hover:scale-[1.02]">
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-yellow-400 transition">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </div>
    </Link>
  );
}
