"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuoteItem {
  description: string;
  category: string;
  amount: number;
}

interface QuoteModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type QuoteDelivery = {
  quoteId: string;
  emailSent: boolean;
  emailError?: string;
  customerEmail: string | null;
  customerPhone: string | null;
  whatsappUrl: string | null;
};

export default function QuoteModal({ bookingId, isOpen, onClose, onSuccess }: QuoteModalProps) {
  const [items, setItems] = useState<QuoteItem[]>([
    { description: "", category: "Parts", amount: 0 }
  ]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState<QuoteDelivery | null>(null);

  const addItem = () => {
    setItems([...items, { description: "", category: "Parts", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

  const resetForm = () => {
    setItems([{ description: "", category: "Parts", amount: 0 }]);
    setNotes("");
    setDelivery(null);
  };

  const finishQuoteFlow = () => {
    resetForm();
    onClose();
    onSuccess();
  };

  const openWhatsApp = () => {
    if (!delivery?.whatsappUrl) return;
    window.open(delivery.whatsappUrl, "_blank", "noopener,noreferrer");
    finishQuoteFlow();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.some(item => !item.description || item.amount <= 0)) {
      alert("Please fill all item details");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          totalAmount,
          notes,
          items,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDelivery({
          quoteId: data.quote.id,
          emailSent: Boolean(data.delivery?.emailSent),
          emailError: data.delivery?.emailError,
          customerEmail: data.delivery?.customerEmail ?? null,
          customerPhone: data.delivery?.customerPhone ?? null,
          whatsappUrl: data.delivery?.whatsappUrl ?? null,
        });
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.error || "Failed to create quotation");
      }
    } catch {
      alert("Error creating quotation");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-zinc-900 border-yellow-400/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl">
            {delivery ? "Quotation Created" : "Create Itemized Quotation"}
          </DialogTitle>
        </DialogHeader>

        {delivery ? (
          <div className="space-y-5">
            <DialogDescription className="text-gray-300">
              The quotation has been saved. Email delivery was attempted, and you can also open WhatsApp with the quote details filled in for the customer.
            </DialogDescription>

            <div className="rounded-2xl border border-yellow-400/10 bg-zinc-800 p-5 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-white">Quote ID:</span>{" "}
                {delivery.quoteId}
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                {delivery.customerEmail || "No customer email on file"}
              </p>
              <p>
                <span className="font-semibold text-white">Email Status:</span>{" "}
                {delivery.emailSent ? "Sent" : delivery.emailError || "Not sent"}
              </p>
              <p>
                <span className="font-semibold text-white">WhatsApp:</span>{" "}
                {delivery.customerPhone || "No customer phone on file"}
              </p>
            </div>

            <DialogFooter className="border-zinc-800 bg-zinc-900/80">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={finishQuoteFlow} className="border-gray-600 bg-transparent text-white hover:bg-zinc-800 hover:text-white">
                  Done
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={openWhatsApp}
                disabled={!delivery.whatsappUrl}
                className="bg-yellow-400 text-black hover:bg-yellow-300 disabled:text-black"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Open WhatsApp
              </Button>
            </DialogFooter>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg">Quotation Items</Label>
              <Button
                type="button"
                onClick={addItem}
                variant="outline"
                size="sm"
                className="border-yellow-400/40 bg-transparent text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="bg-zinc-800 p-4 rounded-2xl mb-4 grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <Input
                    placeholder="Part / Service description"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <select
                    className="w-full bg-zinc-900 border border-gray-700 rounded-md p-2 text-sm"
                    value={item.category}
                    onChange={(e) => updateItem(index, "category", e.target.value)}
                  >
                    <option value="Parts">Parts</option>
                    <option value="Labour">Labour</option>
                    <option value="Consumables">Consumables</option>
                    <option value="Towing">Towing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) => updateItem(index, "amount", parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-1 flex items-center">
                  <button type="button" onClick={() => removeItem(index)} className="text-red-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-zinc-800 p-6 rounded-2xl text-right">
            <p className="text-sm text-gray-400">Total Amount</p>
            <p className="text-4xl font-bold text-yellow-400">KSh {totalAmount.toLocaleString()}</p>
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Warranty information, validity period, payment terms..."
              rows={3}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black disabled:text-black"
            >
              {loading ? "Creating Quote..." : "Create Quotation"}
            </Button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
