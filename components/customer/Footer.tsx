import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaXTwitter, 
  FaTiktok,
  FaLinkedinIn 
} from "react-icons/fa6";
import { siteContact } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-400/20 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand + Social Icons - BEST PLACEMENT */}
          <div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">TJ & U AUTO</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Professional Auto Repair &amp; Maintenance Services in Nairobi
            </p>

            {/* Social Icons Here */}
            <div className="flex gap-5">
              {siteContact.socials.map((social) => {
                const name = social.name.toLowerCase();
                let Icon;
                let colorClass = "hover:text-yellow-400";

                if (name.includes("facebook")) {
                  Icon = FaFacebookF;
                  colorClass = "hover:text-[#1877F2]";
                } else if (name.includes("instagram")) {
                  Icon = FaInstagram;
                  colorClass = "hover:text-[#E1306C]";
                } else if (name.includes("youtube")) {
                  Icon = FaYoutube;
                  colorClass = "hover:text-[#FF0000]";
                } else if (name.includes("twitter") || name.includes("x")) {
                  Icon = FaXTwitter;
                  colorClass = "hover:text-white";
                } else if (name.includes("tiktok")) {
                  Icon = FaTiktok;
                  colorClass = "hover:text-black";
                } else if (name.includes("linkedin")) {
                  Icon = FaLinkedinIn;
                  colorClass = "hover:text-[#0A66C2]";
                } else {
                  Icon = FaInstagram;
                }

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-3xl transition-all hover:scale-110 ${colorClass}`}
                    aria-label={social.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/services" className="hover:text-yellow-400 transition">Our Services</Link></li>
              <li><Link href="/gallery" className="hover:text-yellow-400 transition">Gallery</Link></li>
              <li><Link href="/booking" className="hover:text-yellow-400 transition">Book a Service</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Contact Us</h4>
            <div className="space-y-4 text-gray-400">
              <a href={siteContact.phone.href} className="flex items-center gap-3 hover:text-white transition">
                <Phone className="w-5 h-5 text-yellow-400" />
                {siteContact.phone.display}
              </a>

              {siteContact.emails.map((email, i) => (
                <a 
                  key={i}
                  href={`mailto:${email}`} 
                  className="flex items-center gap-3 hover:text-white transition break-all"
                >
                  <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  {email}
                </a>
              ))}

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>{siteContact.location}</p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-semibold mb-5 text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              Working Hours
            </h4>
            <div className="text-gray-400 space-y-2">
              <div>Monday - Friday: <span className="text-white">8:00 AM - 5:00 PM</span></div>
              <div>Saturday: <span className="text-white">8:00 AM - 3:00 PM</span></div>
              <div className="text-yellow-400 text-sm">Sunday: Closed</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TJ and U Auto. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}