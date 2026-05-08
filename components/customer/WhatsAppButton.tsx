"use client";

export default function WhatsAppButton() {
  const phoneNumber = "254736889880"; // Change to client's number

  const handleClick = () => {
    const message = "Hello TJ & U Auto, I would like to inquire about your services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-3 transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <span className="text-3xl">💬</span>
      <span className="hidden md:inline font-medium pr-2">Chat on WhatsApp</span>
    </button>
  );
}