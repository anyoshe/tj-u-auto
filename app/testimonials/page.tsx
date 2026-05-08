export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "John Kamau",
      vehicle: "Toyota Prado",
      text: "Best service I have received in Nairobi. Professional team and honest pricing.",
      rating: 5,
    },
    {
      name: "Mercy Wanjiku",
      vehicle: "Subaru Forester",
      text: "They fixed my accident damage perfectly. Highly recommended!",
      rating: 5,
    },
    {
      name: "David Otieno",
      vehicle: "Nissan X-Trail",
      text: "Fast turnaround and quality work. Will definitely come back.",
      rating: 4,
    },
  ];

  return (
    <div className="pt-20 pb-16 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-5xl font-bold text-center mb-4">What Our Customers Say</h1>
        <p className="text-center text-gray-400 text-xl mb-16">Real feedback from real clients</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-zinc-900 p-8 rounded-3xl border border-yellow-400/10 hover:border-yellow-400/30 transition">
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
              <p className="text-lg italic mb-8">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.vehicle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}