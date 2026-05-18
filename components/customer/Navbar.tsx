"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-yellow-400/20 fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/tj-gold-logo.png"
            alt="TJ & U Auto"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-yellow-400">TJ & U</span>
            <span className="text-xl font-semibold">AUTO</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link href="/services" className="hover:text-yellow-400 transition">Services</Link>
          <Link href="/gallery" className="hover:text-yellow-400 transition">Gallery</Link>
          <Link href="/testimonials" className="hover:text-yellow-400 transition">Testimonials</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
        </div>

        <Link
          href="/booking"
          className="hidden md:block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-full font-semibold transition"
        >
          Book Now
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-yellow-400/20 py-8">
          <div className="flex flex-col px-6 space-y-6 text-lg font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">About</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Services</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Gallery</Link>
            <Link href="/testimonials" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Testimonials</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}  className="hover:text-yellow-400 transition">Contact</Link>

            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-black py-4 text-center rounded-full font-semibold mt-4"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}