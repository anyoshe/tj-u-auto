"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type QuoteStatus = "PENDING" | "SENT" | "APPROVED" | "REJECTED";

type Quote = {
  id: string;
  totalAmount: number;
  status: QuoteStatus;
  notes: string | null;
  booking?: {
    vehicleMake: string;
    vehicleModel: string;
    registrationNo: string;
    customer?: {
      name: string | null;
      phone: string | null;
    } | null;
  } | null;
  items: Array<{
    description: string;
    category: string;
    amount: number;
  }>;
};

export default function QuoteDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const { id: quoteId } = use(params);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(`/api/quotes/${quoteId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Failed to load quote");
        }

        setQuote(data as Quote);
        setError(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load quote";
        setError(message);
      }
    }
    fetchQuote();
  }, [quoteId]);

  const updateQuoteStatus = async (newStatus: QuoteStatus) => {
    setStatusLoading(true);
    try {
      const res = await fetch(`/api/quotes/${quoteId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating quote status");
    } finally {
      setStatusLoading(false);
    }
  };

  if (error) {
    return <div className="p-10 text-center text-red-400">{error}</div>;
  }

  if (!quote) {
    return <div className="p-10 text-center">Loading quotation...</div>;
  }

  if (!quote.booking) {
    return (
      <div className="p-10 text-center text-red-400">
        Quote booking information could not be loaded.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-bold">Quotation Details</h1>
          <p className="text-gray-400">Quote ID: {quote.id}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => updateQuoteStatus("SENT")} 
            disabled={statusLoading}
            variant="outline"
            className="border-yellow-400/70 bg-transparent text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
          >
            Mark as Sent
          </Button>
          <Button 
            onClick={() => updateQuoteStatus("APPROVED")} 
            disabled={statusLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark as Approved
          </Button>
          <Button 
            onClick={() => updateQuoteStatus("REJECTED")} 
            disabled={statusLoading}
            variant="destructive"
          >
            Mark as Rejected
          </Button>
        </div>
      </div>

      {/* Customer & Vehicle Info */}
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <p><strong>Name:</strong> {quote.booking.customer?.name ?? "Unknown customer"}</p>
        <p><strong>Phone:</strong> {quote.booking.customer?.phone ?? "No phone on file"}</p>
        <p><strong>Vehicle:</strong> {quote.booking.vehicleMake} {quote.booking.vehicleModel} ({quote.booking.registrationNo})</p>
      </div>

      {/* Items Breakdown */}
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-xl font-semibold mb-6">Quotation Breakdown</h2>
        
        <div className="space-y-4">
          {quote.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-4 last:border-none">
              <div>
                <p className="font-medium">{item.description}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <p className="font-semibold">KSh {item.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between text-2xl font-bold">
          <span>Total Amount</span>
          <span className="text-yellow-400">KSh {quote.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Status & Notes */}
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <p className="text-lg"><strong>Current Status:</strong> <span className="capitalize">{quote.status.toLowerCase()}</span></p>
        {quote.notes && (
          <p className="mt-4"><strong>Notes:</strong> {quote.notes}</p>
        )}
      </div>
    </div>
  );
}
