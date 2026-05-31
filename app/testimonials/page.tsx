import { prisma } from '@/lib/prisma';

type Testimonial = {
  id: string;
  name: string;
  message: string;
  rating: number;
  vehicle?: string | null;
  createdAt: string;
  isApproved?: boolean;
};

async function getApprovedFeedbacks(): Promise<Testimonial[]> {
  try {
    // @ts-ignore
    const results = await prisma.feedback.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: 12,
    });

    return results.map((r: any) => ({
      id: r.id,
      name: r.name || 'Anonymous',
      message: r.message,
      rating: r.rating,
      vehicle: r.vehicle,
      createdAt: r.createdAt.toISOString(),
      isApproved: true,
    }));
  } catch (error) {
    // If Prisma migration hasn't run yet, return empty array
    console.warn('Could not fetch feedbacks from DB:', error);
    return [];
  }
}

const hardcodedTestimonials: Testimonial[] = [
  {
    id: 'ew-1',
    name: 'Enock Wambua',
    message: 'Outstanding service and highly professional staff! The level of detail and care they put into their work is exceptional. The owner is friendly, hands-on, and always available. I wouldn\'t hesitate to recommend them.',
    rating: 5,
    createdAt: new Date(Date.now() - 10 * 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'gn-1',
    name: 'Grishon Ndungu',
    message: 'Clean job and good-hearted management. Very satisfied with the service.',
    rating: 5,
    createdAt: new Date(Date.now() - 11 * 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'jn-1',
    name: 'Joel Njoroge',
    message: 'For all auto works with the best service..... Just in Time.',
    rating: 5,
    createdAt: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lm-1',
    name: 'Lewis Muguna',
    message: 'It was an amazing garage. Highly recommended.',
    rating: 5,
    createdAt: new Date(Date.now() - 9 * 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'wn-1',
    name: 'Wilfred Ngugi',
    message: 'Very efficient service. Professional team.',
    rating: 5,
    createdAt: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'gn-2',
    name: 'George Ndege',
    message: 'Very good services. Keep it up!',
    rating: 5,
    createdAt: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default async function TestimonialsPage() {
  const approvedFeedbacks = await getApprovedFeedbacks();
  const testimonials = [...approvedFeedbacks, ...hardcodedTestimonials];

  return (
    <div className="pt-28 pb-20 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">What Our Customers Say</h1>
          <p className="text-gray-400 text-xl">Real reviews from our customers</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-zinc-900 p-8 rounded-3xl border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 flex flex-col">
              <div className="flex mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>

              <p className="text-lg italic text-gray-200 mb-8 flex-grow">"{t.message}"</p>

              <div className="mt-auto">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">More reviews available on our Google Business Profile</p>
          <a href="https://www.google.com/search?q=tj+and+u" target="_blank" className="inline-block mt-4 text-yellow-400 hover:text-yellow-300 underline">View all Google Reviews →</a>
        </div>
      </div>
    </div>
  );
}