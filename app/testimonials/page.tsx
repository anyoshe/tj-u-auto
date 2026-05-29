export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Enock Wambua",
      role: "Local Guide",
      text: "Outstanding service and highly professional staff! The level of detail and care they put into their work is exceptional. The owner is friendly, hands-on, and always available. I wouldn’t hesitate to recommend them.",
      rating: 5,
      date: "10 months ago",
    },
    {
      name: "Grishon Ndungu",
      role: "Customer",
      text: "Clean job and good-hearted management. Very satisfied with the service.",
      rating: 5,
      date: "11 months ago",
    },
    {
      name: "Joel Njoroge",
      role: "Local Guide",
      text: "For all auto works with the best service..... Just in Time.",
      rating: 5,
      date: "2 years ago",
    },
    {
      name: "Lewis Muguna",
      role: "Customer",
      text: "It was an amazing garage. Highly recommended.",
      rating: 5,
      date: "9 months ago",
    },
    {
      name: "Wilfred Ngugi",
      role: "Local Guide",
      text: "Very efficient service. Professional team.",
      rating: 5,
      date: "2 years ago",
    },
    {
      name: "George Ndege",
      role: "Customer",
      text: "Very good services. Keep it up!",
      rating: 5,
      date: "2 years ago",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">What Our Customers Say</h1>
          <p className="text-gray-400 text-xl">
            Real reviews from Google
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 p-8 rounded-3xl border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>

              <p className="text-lg italic text-gray-200 mb-8 flex-grow">
                "{testimonial.text}"
              </p>

              <div className="mt-auto">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            More reviews available on our Google Business Profile
          </p>
          <a 
            href="https://www.google.com/search?q=tj+and+u&oq=t&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIOCAEQRRgnGDsYgAQYigUyBggCEEUYOTIGCAMQRRg7MhMIBBAuGIMBGMcBGLEDGNEDGIAEMg0IBRAAGIMBGLEDGIAEMgoIBhAAGLEDGIAEMhMIBxAuGIMBGMcBGLEDGNEDGIAEMg0ICBAAGIMBGLEDGIAEMg0ICRAAGIMBGLEDGIAE0gEKNTYwNDJqMGoxNagCCLACAfEFtDzyymUEtebxBbQ88splBLXm&sourceid=chrome&ie=UTF-8#sv=CAwSzQEKBmxjbF9wdhIxCgNwdnESKkNnMHZaeTh4TVdaMllqRnlNM0pySWc0S0NIUnFJR0Z1WkNCMUVBSVlBdxJZCgNscWkSUkNnaDBhaUJoYm1RZ2RVanhuZTZnNmEyQWdBaGFGaEFBRUFFUUFoZ0FHQUVZQWlJSWRHb2dZVzVrSUhXU0FRNXdZWEpyYVc1blgyZGhjbUZuWlESEgoDdGJzEgtscmY6ITNzSUFFPRINCgFxEgh0aiBhbmQgdRoSbG9jYWwtcGxhY2Utdmlld2VyGAog2J6P9Ac" 
            target="_blank"
            className="inline-block mt-4 text-yellow-400 hover:text-yellow-300 underline"
          >
            View all Google Reviews →
          </a>
        </div>
      </div>
    </div>
  );
}