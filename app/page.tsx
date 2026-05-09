import Link from "next/link";
import { Phone, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import ReviewSection from "@/components/customer/ReviewSection";

export default function Home() {
  return (
    <main className="bg-black text-white pt-20">
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-yellow-950 via-black to-black relative">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            TJ AND U <span className="text-yellow-400">AUTO</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-10">
            Expert Auto Repair &amp; Maintenance Services in Nairobi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-4 rounded-full text-lg font-semibold transition"
            >
              Book Service Now
            </Link>
            <Link
              href="/about"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-4 rounded-full text-lg font-semibold transition"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-400 mb-12">Professional care for your vehicle</p>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard title="General Servicing" desc="Routine maintenance, oil change, filters" link="/services" />
            <ServiceCard title="Mechanical Repairs" desc="Engine, suspension, transmission &amp; more" link="/services" />
            <ServiceCard title="Accident Repair &amp; Painting" desc="Insurance approved body work" link="/services" />
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-gray-400 mb-8">See our workshop and completed projects</p>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300">
            View Full Gallery <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Testimonials Teaser */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
          {/* You can add real testimonials later */}
          <p className="italic text-lg max-w-2xl mx-auto">
            "Best service I have received in Nairobi. Professional and honest team."
          </p>
          <Link href="/testimonials" className="text-yellow-400 mt-8 inline-block">
            Read More Reviews →
          </Link>
        </div>
      </section>
      {/* Customer Reviews Section */}
      <ReviewSection />

      {/* Insurance Partners */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Insurance Partners</h2>
          <p className="text-gray-400 mb-10">We are approved by leading insurance companies for seamless repairs and claims processing</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-75 hover:opacity-100 transition-all duration-300">
            <div className="text-2xl font-semibold text-gray-300">Jubilee Insurance</div>
            <div className="text-2xl font-semibold text-gray-300">CIC Insurance</div>
            <div className="text-2xl font-semibold text-gray-300">APA Insurance</div>
            <div className="text-2xl font-semibold text-gray-300">Britam</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-black border-t border-yellow-400/20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="text-yellow-400" />
                <div>
                  <p className="font-medium">+254 721 222 585</p>
                  <p className="text-sm text-gray-400">Call or WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-yellow-400" />
                <div>
                  <p>Nairobi, Kenya</p>
                  <p className="text-sm text-gray-400">Physical Location</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link href="/booking" className="block bg-yellow-400 text-black text-center py-6 rounded-2xl text-xl font-semibold hover:bg-yellow-300">
              Make a Booking →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ title, desc, link }: { title: string; desc: string; link: string }) {
  return (
    <Link href={link} className="block group">
      <div className="bg-zinc-900 p-8 rounded-3xl border border-transparent group-hover:border-yellow-400 transition-all h-full">
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-yellow-400 transition">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </div>
    </Link>
  );
}