export default function AboutPage() {
  return (
    <div className="pt-20 pb-16 bg-black">
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-8">About TJ and U Auto</h1>

        <div className="prose prose-invert max-w-none text-lg">
          <p className="text-xl text-gray-300">
            TJ and U Auto is a modern, professional auto workshop committed to delivering
            high-quality vehicle repair and maintenance services with honesty and integrity.
          </p>

          <div className="my-12 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Our Mission</h3>
              <p className="text-gray-400">
                To provide reliable, transparent, and professional auto services that exceed
                customer expectations while building long-term relationships.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-400">
                <li>✓ Experienced & Certified Technicians</li>
                <li>✓ Genuine & High-Quality Spare Parts</li>
                <li>✓ Transparent Pricing</li>
                <li>✓ Modern Diagnostic Equipment</li>
                <li>✓ Warranty on Services</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Insurance Partners on About Page */}
        <section className="mt-20 pt-16 border-t border-yellow-400/10">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Trusted Insurance Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-75">
              <div className="text-xl font-medium">Jubilee Insurance</div>
              <div className="text-xl font-medium">CIC Insurance</div>
              <div className="text-xl font-medium">APA Insurance</div>
              <div className="text-xl font-medium">Britam</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}