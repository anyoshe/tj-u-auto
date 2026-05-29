export default function AboutPage() {
  const coreValues = [
    {
      icon: "🛡️",
      title: "Integrity",
      desc: "We believe in honesty, transparency, and doing the right thing always."
    },
    {
      icon: "💪",
      title: "Hardworking & Thorough",
      desc: "We take pride in our attention to detail and quality workmanship."
    },
    {
      icon: "⭐",
      title: "Quality",
      desc: "Delivering above and beyond customer expectations every time."
    },
    {
      icon: "🔄",
      title: "Flexibility",
      desc: "Adapting to your needs with convenient service options."
    },
    {
      icon: "😊",
      title: "Fun",
      desc: "We believe work should be enjoyable while maintaining professionalism."
    },
    {
      icon: "🔥",
      title: "Passionate",
      desc: "We are deeply passionate about cars and customer satisfaction."
    },
    {
      icon: "📋",
      title: "Accountability",
      desc: "We take full responsibility for our work and stand by our promises."
    },
  ];

  const insurancePartners = [
    "Icea Lion", "Sanlam Allianz", "First Assurance", "NCBA Insurance",
    "Kenindia", "Definite Insurance", "Metropolitan", "GA Insurance",
    "Geminia", "Madison Insurance", "Britam", "AIG", "MUA Insurance", "Mayfair"
  ];

  return (
    <div className="pt-28 pb-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            About <span className="text-yellow-400">TJ and U Auto</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trusted experts in automotive care, committed to excellence since day one.
          </p>
        </div>

        {/* Vision & Mission + Video */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-3xl">🎯</div>
                <h2 className="text-3xl font-semibold">Our Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the best and most preferred locally established auto garage in Kenya.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-3xl">🚀</div>
                <h2 className="text-3xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To retain our customers by getting the job right the first time.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative rounded-3xl overflow-hidden border border-yellow-400/10 shadow-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover aspect-video"
            >
              <source src="/videos/workshopinterior.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <p className="text-yellow-400 font-medium">Our Workshop in Action</p>
            </div>
          </div>
        </div>

        {/* ====================== CORE VALUES - IMPROVED ====================== */}
        <div className="mt-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-yellow-400/10 px-6 py-2 rounded-full mb-4">
              <span className="text-3xl">⭐</span>
              <h2 className="text-4xl font-semibold">Our Core Values</h2>
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              The principles that guide every service we provide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <div 
                key={i} 
                className="group bg-zinc-900 hover:bg-zinc-800/80 transition-all duration-300 p-8 rounded-3xl border border-transparent hover:border-yellow-400/30 flex flex-col h-full"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 text-white">{value.title}</h3>
                
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

       {/* ====================== IMPROVED INSURANCE PARTNERS ====================== */}
        <section className="mt-24 pt-20 border-t border-yellow-400/10">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-semibold mb-4">Trusted Insurance Partners</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We collaborate with leading insurance companies for fast and seamless claims processing
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {insurancePartners.map((partner, i) => (
              <div 
                key={i}
                className="group bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 p-8 rounded-3xl border border-transparent hover:border-yellow-400/30 flex items-center justify-center text-center h-full min-h-[120px]"
              >
                <p className="text-lg font-medium text-gray-200 group-hover:text-yellow-400 transition-colors">
                  {partner}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              More partnerships being strengthened regularly
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}