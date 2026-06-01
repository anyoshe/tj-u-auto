import { prisma } from '@/lib/prisma';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import FeedbackList from './FeedbackList';

export const dynamic = 'force-dynamic';

export default async function AdminFeedbackPage() {
  let feedbackItems: Awaited<ReturnType<typeof prisma.feedback.findMany>> = [];

  try {
    feedbackItems = await prisma.feedback.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    // If Prisma migration hasn't run yet, return empty array
    console.warn('Could not fetch feedback from DB:', error);
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Feedback" subtitle="View and approve customer feedback" />

      <div className="bg-zinc-900 p-8 rounded-3xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Incoming Feedback</h2>
        <FeedbackList feedbackItems={feedbackItems.map((f) => ({
          ...f,
          createdAt: f.createdAt.toISOString(),
        }))} />
      </div>
    </div>
  );
}
