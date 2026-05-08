"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "RECEIVED", label: "Received" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "READY_FOR_DELIVERY", label: "Ready for Delivery" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function getStatusLabel(status: string) {
  return (
    statusOptions.find((option) => option.value === status)?.label ??
    status.replace(/_/g, " ")
  );
}

function getStatusClassName(status: string) {
  if (status === "PENDING") return "bg-yellow-400/10 text-yellow-400";
  if (status === "IN_PROGRESS") return "bg-blue-400/10 text-blue-400";
  if (status === "CANCELLED") return "bg-red-400/10 text-red-400";
  if (status === "COMPLETED") return "bg-green-400/10 text-green-400";
  return "bg-cyan-400/10 text-cyan-400";
}

export function BookingStatusUpdate({
  bookingId,
  currentStatus,
  onStatusChange,
}: {
  bookingId: string;
  currentStatus: string;
  onStatusChange?: (status: string) => void;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        onStatusChange?.(newStatus);
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function BookingStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-medium ${getStatusClassName(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

export function BookingStatusControl({
  bookingId,
  currentStatus,
  onCreateQuote,
  variant = "desktop",
}: {
  bookingId: string;
  currentStatus: string;
  onCreateQuote?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const [status, setStatus] = useState(currentStatus);
  const showQuoteButton = status === "RECEIVED";

  const quoteButton = showQuoteButton ? (
    <Button
      onClick={onCreateQuote}
      className="bg-yellow-400 text-black hover:bg-yellow-300 text-sm mt-2"
    >
      Create Quote
    </Button>
  ) : null;

  if (variant === "mobile") {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-800 pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-400">Status</p>
          <BookingStatusBadge status={status} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-400">Actions</p>
          <BookingStatusUpdate
            bookingId={bookingId}
            currentStatus={status}
            onStatusChange={setStatus}
          />
        </div>
        {quoteButton ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-gray-400">Quote</p>
            {quoteButton}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <td className="p-6">
        <BookingStatusBadge status={status} />
      </td>
      <td className="p-6">
        <BookingStatusUpdate
          bookingId={bookingId}
          currentStatus={status}
          onStatusChange={setStatus}
        />
        {quoteButton ? <div className="mt-3">{quoteButton}</div> : null}
      </td>
    </>
  );
}
