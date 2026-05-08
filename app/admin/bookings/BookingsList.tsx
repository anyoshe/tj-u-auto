"use client";

import { useState } from "react";
import QuoteModal from "@/components/admin/QuoteModal";
import { BookingStatusControl } from "./BookingStatusUpdate";

type BookingListItem = {
  id: string;
  customerName: string | null;
  customerPhone: string | null;
  vehicleMake: string;
  vehicleModel: string;
  registrationNo: string;
  serviceType: string;
  preferredDateLabel: string;
  status: string;
};

export function BookingsList({ bookings }: { bookings: BookingListItem[] }) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const openQuoteModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setShowQuoteModal(true);
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-zinc-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-6">Customer</th>
              <th className="text-left p-6">Vehicle</th>
              <th className="text-left p-6">Service</th>
              <th className="text-left p-6">Date</th>
              <th className="text-left p-6">Status</th>
              <th className="text-left p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-gray-800 hover:bg-zinc-800/50"
              >
                <td className="p-6">
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-gray-400">
                    {booking.customerPhone}
                  </p>
                </td>
                <td className="p-6">
                  <p>
                    {booking.vehicleMake} {booking.vehicleModel}
                  </p>
                  <p className="text-sm text-gray-400">
                    {booking.registrationNo}
                  </p>
                </td>
                <td className="p-6">{booking.serviceType}</td>
                <td className="p-6 text-sm">{booking.preferredDateLabel}</td>
                <BookingStatusControl
                  bookingId={booking.id}
                  currentStatus={booking.status}
                  onCreateQuote={() => openQuoteModal(booking.id)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-zinc-900 p-6 rounded-3xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{booking.customerName}</p>
                <p className="text-sm text-gray-400">{booking.customerPhone}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>Vehicle:</strong> {booking.vehicleMake}{" "}
                {booking.vehicleModel} ({booking.registrationNo})
              </p>
              <p>
                <strong>Service:</strong> {booking.serviceType}
              </p>
              <p>
                <strong>Date:</strong> {booking.preferredDateLabel}
              </p>
            </div>

            <BookingStatusControl
              bookingId={booking.id}
              currentStatus={booking.status}
              variant="mobile"
              onCreateQuote={() => openQuoteModal(booking.id)}
            />
          </div>
        ))}
      </div>

      <QuoteModal
        bookingId={selectedBookingId || ""}
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </>
  );
}
