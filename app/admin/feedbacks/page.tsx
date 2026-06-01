import { prisma } from '@/lib/prisma';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import FeedbackList from './FeedbackList';

export const dynamic = 'force-dynamic';

export default async function AdminFeedbackPage() {
  // 1. Explicitly pull the type from your Prisma schema so TypeScript knows exactly what fields exist
  let feedbackItems: Awaited<ReturnType<typeof prisma.feedback.findMany>> = [];

  try {
    feedbackItems = await prisma.feedback.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
  } catch (error) {
    // Fallback if the database/migration isn't ready
    console.warn('Could not fetch feedback from DB:', error);
    feedbackItems = [];
  }

  // 2. Since feedbackItems is typed safely, 'f' will be cleanly inferred without errors
  const formattedFeedback = feedbackItems.map((f) => ({
    ...f,
    createdAt: f.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8 pt-10">
      <AdminPageHeader title="Feedback" subtitle="View and approve customer feedback" />
      <div className="bg-zinc-900 p-8 rounded-3xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Incoming Feedback</h2>
        <FeedbackList feedbackItems={formattedFeedback} />
      </div>
    </div>
  );
}