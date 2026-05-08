export default function ServicesPage() {
  const services = [
    {
      title: "General Servicing",
      desc: "Routine maintenance, oil change, filter replacement, brake inspection",
      icon: "🔧"
    },
    {
      title: "Mechanical Repairs",
      desc: "Engine repair, suspension, transmission, electrical systems",
      icon: "⚙️"
    },
    {
      title: "Accident Repair & Painting",
      desc: "Body work, panel beating, professional spray painting",
      icon: "🎨"
    },
    {
      title: "Diagnostics",
      desc: "Computer diagnostics, fault finding & performance tuning",
      icon: "📟"
    },
    {
      title: "Towing & Recovery",
      desc: "24/7 emergency towing and breakdown assistance",
      icon: "🚚"
    },
  ];

  return (
    <div className="pt-20 pb-16 bg-black">
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-4">Our Services</h1>
        <p className="text-center text-gray-400 text-xl mb-16">Professional auto care for all vehicle makes</p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-zinc-900 p-8 rounded-3xl border border-yellow-400/10 hover:border-yellow-400 transition group">
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-yellow-400 transition">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}