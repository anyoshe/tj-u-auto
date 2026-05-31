"use client";

import React from "react";

type FeedbackItem = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  vehicle?: string | null;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
};

export default function FeedbackList({ feedbackItems }: { feedbackItems: FeedbackItem[] }) {
  const approve = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/feedback/${id}/approve`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
      } else {
        alert(data.error || 'Failed to approve');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Request failed');
    }
  };

  return (
    <div className="space-y-4">
      {feedbackItems.map((f) => (
        <div key={f.id} className="bg-zinc-900 p-6 rounded-2xl border border-yellow-400/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">{f.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-400">{f.email || f.phone || 'No contact'}</p>
              <p className="text-sm text-gray-500 mt-1">{new Date(f.createdAt).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                {[...Array(f.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              {!f.approved ? (
                <button onClick={() => approve(f.id)} className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-medium">
                  Approve
                </button>
              ) : (
                <span className="text-sm text-green-400">Approved</span>
              )}
            </div>
          </div>

          <p className="mt-4 text-gray-200 italic">&ldquo;{f.message}&rdquo;</p>
          {f.vehicle ? <p className="mt-3 text-sm text-gray-400">Vehicle: {f.vehicle}</p> : null}
        </div>
      ))}
    </div>
  );
}
