import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-400/20 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">TJ & U AUTO</h3>
            <p className="text-gray-400">Professional Auto Repair & Service</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link href="/booking" className="hover:text-white">Book Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">+254 721 222 585</p>
            <p className="text-gray-400">Nairobi, Kenya</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Working Hours</h4>
            <p className="text-gray-400">Monday - Friday</p>
            <p className="text-gray-400">8:00 AM - 17:00 PM</p>
             <p className="text-gray-400">Saturday</p>
            <p className="text-gray-400">8:00 AM - 3:00 PM</p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-16 pt-8 border-t border-gray-800">
          © {new Date().getFullYear()} TJ and U Auto. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}