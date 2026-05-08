"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="py-20 bg-black border-t border-yellow-400/10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Rate Our Service
          </h2>

          <p className="text-gray-400">
            Share your experience with TJ AND U AUTO
          </p>
        </div>

        {/* Review Card */}
        <div className="bg-zinc-900 border border-yellow-400/10 rounded-3xl p-8">

          {/* Interactive Stars */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 transition-all duration-200 ${
                    star <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-zinc-600"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating Text */}
          <p className="text-center text-yellow-400 mb-8 font-medium">
            {rating === 0 && "Select a rating"}
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>

          {/* Form */}
          <form className="space-y-6">

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Your Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Vehicle Serviced (Optional)
              </label>

              <input
                type="text"
                placeholder="e.g Toyota Prado"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Your Review
              </label>

              <textarea
                rows={5}
                placeholder="Tell us about your experience..."
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white focus:border-yellow-400 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
            >
              Submit Review
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}