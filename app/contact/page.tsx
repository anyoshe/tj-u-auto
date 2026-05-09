export default function ContactPage() {
  return (
    <div className="pt-20 pb-16 bg-black">
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-4">Get In Touch</h1>
        <p className="text-center text-gray-400 text-xl mb-12">We are ready to serve you</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-zinc-900 p-8 rounded-3xl">
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
                <textarea rows={6} className="w-full bg-black border border-gray-700 rounded-xl p-4" placeholder="How can we help you today?"></textarea>
              </div>
              <button type="button" className="w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold hover:bg-yellow-300 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Google Maps + Info */}
          <div>
            <div className="bg-zinc-900 rounded-3xl overflow-hidden mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d36.8!3d-1.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13bf3fcfd715%3A0x75605cc9f9d62f0b!2sTJ%20and%20U%20Auto!5e0!3m2!1sen!2ske!4v1746800000000" 
                width="100%" 
                height="400" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="font-semibold mb-6 text-xl">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-yellow-400 font-medium">Phone / WhatsApp</p>
                  <p className="text-2xl">+254 721 222 585</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-medium">Location</p>
                  <p>Nairobi, Kenya</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-medium">Working Hours</p>
                  <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}