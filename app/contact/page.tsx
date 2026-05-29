// import Link from "next/link";
// import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaYoutube, 
//   FaXTwitter, 
//   FaTiktok,
//   FaLinkedinIn 
// } from "react-icons/fa6";
// import { siteContact } from "@/lib/site";

// const socialIcons = {
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   youtube: FaYoutube,
//   twitter: FaXTwitter,
//   x: FaXTwitter,
//   tiktok: FaTiktok,
//   linkedin: FaLinkedinIn,
// };

// export default function ContactPage() {
//   return (
//     <div className="pt-20 pb-16 bg-black">
//       <div className="max-w-6xl mx-auto px-6 mt-10">
//         <h1 className="text-5xl font-bold text-center mb-4">Get In Touch</h1>
//         <p className="text-center text-gray-400 text-xl mb-12">We are ready to serve you</p>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-zinc-900 p-8 rounded-3xl">
//             <h2 className="text-2xl font-semibold mb-8">Send us a Message</h2>
//             <form className="space-y-6">
//               <div>
//                 <label className="block text-sm mb-2">Full Name</label>
//                 <input type="text" className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="Your Name" />
//               </div>
//               <div>
//                 <label className="block text-sm mb-2">Phone Number</label>
//                 <input type="tel" className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="+254 7XX XXX XXX" />
//               </div>
//               <div>
//                 <label className="block text-sm mb-2">Email</label>
//                 <input type="email" className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="your@email.com" />
//               </div>
//               <div>
//                 <label className="block text-sm mb-2">Message</label>
//                 <textarea rows={6} className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="How can we help you today?"></textarea>
//               </div>
//               <button type="button" className="w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold hover:bg-yellow-300 transition">
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Google Maps + Info */}
//           <div>
//             <div className="bg-zinc-900 rounded-3xl overflow-hidden mb-8">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d36.8!3d-1.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13bf3fcfd715%3A0x75605cc9f9d62f0b!2sTJ%20and%20U%20Auto!5e0!3m2!1sen!2ske!4v1746800000000"
//                 width="100%"
//                 height="400"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//               ></iframe>
//             </div>

//             <div className="bg-zinc-900 p-8 rounded-3xl">
//               <h3 className="font-semibold mb-6 text-xl">Contact Information</h3>
//               <div className="space-y-6">
//                 <div>
//                   <p className="text-yellow-400 font-medium flex items-center gap-2">
//                     <Phone className="w-5 h-5" />
//                     Phone / WhatsApp
//                   </p>
//                   <a href={siteContact.phone.href} className="text-2xl hover:text-yellow-400 transition">
//                     {siteContact.phone.display}
//                   </a>
//                 </div>

//                 <div>
//                   <p className="text-yellow-400 font-medium flex items-center gap-2">
//                     <Mail className="w-5 h-5" />
//                     Email
//                   </p>
//                   <div className="mt-2 space-y-2">
//                     {siteContact.emails.map((email) => (
//                       <a
//                         key={email}
//                         href={`mailto:${email}`}
//                         className="block text-gray-200 hover:text-yellow-400 transition break-all"
//                       >
//                         {email}
//                       </a>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-yellow-400 font-medium flex items-center gap-2">
//                     <MapPin className="w-5 h-5" />
//                     Location
//                   </p>
//                   <p>{siteContact.location}</p>
//                 </div>

//                 <div>
//                   <p className="text-yellow-400 font-medium">Follow Us</p>
//                   <div className="mt-3 flex flex-wrap gap-3">
//                     {siteContact.socials.map((social) => {
//                       const name = social.name.toLowerCase();
//                       const Icon =
//                         Object.entries(socialIcons).find(([key]) => name.includes(key))?.[1] ??
//                         ExternalLink;

//                       return (
//                         <a
//                           key={social.name}
//                           href={social.href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/30 px-4 py-3 text-gray-200 hover:border-yellow-400 hover:text-yellow-400 transition"
//                         >
//                           <Icon className="w-5 h-5" />
//                           {social.name}
//                         </a>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-yellow-400 font-medium">Working Hours</p>
//                   <p className="text-gray-400">Monday - Friday</p>
//                   <p className="text-gray-400">8:00 AM - 17:00 PM</p>
//                   <p className="text-gray-400">Saturday</p>
//                   <p className="text-gray-400">8:00 AM - 3:00 PM</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaXTwitter, 
  FaTiktok,
  FaLinkedinIn 
} from "react-icons/fa6";
import { siteContact } from "@/lib/site";
import { useState, useEffect } from "react";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  x: FaXTwitter,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
};

const quotes = [
  "Outstanding service and highly professional staff! The owner is friendly and always available.",
  "Clean job and good-hearted management. Very satisfied with the service.",
  "For all auto works with the best service..... Just in Time.",
  "It was an amazing garage. Highly recommended!",
  "Very efficient and professional team.",
];

export default function ContactPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 pb-16 bg-black">
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-4">Get In Touch</h1>
        <p className="text-center text-gray-400 text-xl mb-12">We are ready to serve you</p>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* ==================== LEFT SIDE - FORM + QUOTES ==================== */}
          <div className="flex flex-col gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl flex-1">
              <h2 className="text-2xl font-semibold mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input type="text" className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="+254 7XX XXX XXX" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input type="email" className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea rows={5} className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="How can we help you today?"></textarea>
                </div>
                <button type="button" className="w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold hover:bg-yellow-300 transition">
                  Send Message
                </button>
              </form>
            </div>

            {/* Rotating Testimonials - Inside Form Card Area */}
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <p className="text-yellow-400 font-medium mb-4">What Our Customers Say</p>
              <div className="italic text-gray-300 min-h-[100px] transition-all duration-700">
                "{quotes[currentQuoteIndex]}"
              </div>
            </div>
          </div>

          {/* ==================== RIGHT SIDE - MAP + INFO ==================== */}
          <div className="flex flex-col gap-8">
            <div className="bg-zinc-900 rounded-3xl overflow-hidden flex-shrink-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d36.8!3d-1.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13bf3fcfd715%3A0x75605cc9f9d62f0b!2sTJ%20and%20U%20Auto!5e0!3m2!1sen!2ske!4v1746800000000"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl flex-1">
              <h3 className="font-semibold mb-6 text-xl">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-yellow-400 font-medium flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Phone / WhatsApp
                  </p>
                  <a href={siteContact.phone.href} className="text-2xl hover:text-yellow-400 transition">
                    {siteContact.phone.display}
                  </a>
                </div>

                <div>
                  <p className="text-yellow-400 font-medium flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </p>
                  <div className="mt-2 space-y-2">
                    {siteContact.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`} className="block text-gray-200 hover:text-yellow-400 transition break-all">
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-yellow-400 font-medium flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </p>
                  <p>{siteContact.location}</p>
                </div>

                <div>
                  <p className="text-yellow-400 font-medium">Follow Us</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {siteContact.socials.map((social) => {
                      const name = social.name.toLowerCase();
                      const Icon = Object.entries(socialIcons).find(([key]) => name.includes(key))?.[1] ?? ExternalLink;

                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/30 px-4 py-3 text-gray-200 hover:border-yellow-400 hover:text-yellow-400 transition"
                        >
                          <Icon className="w-5 h-5" />
                          {social.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}