// import { prisma } from "@/lib/prisma";
// import { format } from "date-fns";

// export default async function QuotesPage() {
//   const quotes = await prisma.quote.findMany({
//     include: {
//       booking: {
//         include: { customer: true },
//       },
//       items: true,
//     },
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <div className="space-y-6 mt-10">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-3xl md:text-4xl font-bold">Quotations</h1>
//         <p className="text-gray-400">{quotes.length} Total Quotations</p>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block bg-zinc-900 rounded-3xl overflow-hidden">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-800">
//               <th className="text-left p-6">Customer</th>
//               <th className="text-left p-6">Vehicle</th>
//               <th className="text-left p-6">Total Amount</th>
//               <th className="text-left p-6">Items</th>
//               <th className="text-left p-6">Status</th>
//               <th className="text-left p-6">Date</th>
//               <th className="text-left p-6">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quotes.map((quote) => (
//               <tr key={quote.id} className="border-b border-gray-800 hover:bg-zinc-800/50">
//                 <td className="p-6">
//                   <p className="font-medium">{quote.booking.customer?.name}</p>
//                   <p className="text-sm text-gray-400">{quote.booking.customer?.phone}</p>
//                 </td>
//                 <td className="p-6">
//                   {quote.booking.vehicleMake} {quote.booking.vehicleModel}
//                 </td>
//                 <td className="p-6 font-bold text-yellow-400">
//                   KSh {quote.totalAmount.toLocaleString()}
//                 </td>
//                 <td className="p-6 text-sm text-gray-400">
//                   {quote.items.length} item(s)
//                 </td>
//                 <td className="p-6">
//                   <span className={`px-4 py-1 rounded-full text-xs font-medium
//                     ${quote.status === "APPROVED" ? "bg-green-400/10 text-green-400" : 
//                       quote.status === "REJECTED" ? "bg-red-400/10 text-red-400" : 
//                       "bg-yellow-400/10 text-yellow-400"}`}>
//                     {quote.status}
//                   </span>
//                 </td>
//                 <td className="p-6 text-sm text-gray-400">
//                   {format(new Date(quote.createdAt), "dd MMM yyyy")}
//                 </td>
//                 <td className="p-6">
//                   <a href={`/admin/quotes/${quote.id}`} className="text-yellow-400 hover:underline">
//                     View →
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards - Better for small screens */}
//       <div className="md:hidden space-y-4">
//         {quotes.map((quote) => (
//           <div key={quote.id} className="bg-zinc-900 p-6 rounded-3xl">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="font-semibold">{quote.booking.customer?.name}</p>
//                 <p className="text-sm text-gray-400">{quote.booking.customer?.phone}</p>
//               </div>
//               <span className={`px-4 py-1 rounded-full text-xs font-medium
//                 ${quote.status === "APPROVED" ? "bg-green-400/10 text-green-400" : 
//                   quote.status === "REJECTED" ? "bg-red-400/10 text-red-400" : 
//                   "bg-yellow-400/10 text-yellow-400"}`}>
//                 {quote.status}
//               </span>
//             </div>

//             <div className="mt-4 space-y-2 text-sm">
//               <p><strong>Vehicle:</strong> {quote.booking.vehicleMake} {quote.booking.vehicleModel}</p>
//               <p><strong>Total:</strong> <span className="font-bold text-yellow-400">KSh {quote.totalAmount.toLocaleString()}</span></p>
//               <p><strong>Items:</strong> {quote.items.length}</p>
//               <p><strong>Date:</strong> {format(new Date(quote.createdAt), "dd MMM yyyy")}</p>
//             </div>

//             <a 
//               href={`/admin/quotes/${quote.id}`}
//               className="block mt-6 text-center bg-yellow-400 text-black py-3 rounded-2xl font-medium hover:bg-yellow-300"
//             >
//               View Quotation Details →
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function QuotesPage() {
  let quotes: any[] = [];

  try {
    quotes = await prisma.quote.findMany({
      include: {
        booking: {
          include: {
            customer: true,
          },
        },
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Quotations</h1>
        <p className="text-gray-400">{quotes.length} Total Quotations</p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-zinc-900 rounded-3xl p-20 text-center">
          <p className="text-2xl text-gray-400">No quotations found yet</p>
          <p className="text-sm text-gray-500 mt-4">
            Go to Bookings → Change status to "RECEIVED" → Create Quote
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-zinc-900 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-6">Customer</th>
                  <th className="text-left p-6">Vehicle</th>
                  <th className="text-left p-6">Total Amount</th>
                  <th className="text-left p-6">Items</th>
                  <th className="text-left p-6">Status</th>
                  <th className="text-left p-6">Date</th>
                  <th className="text-left p-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote: any) => (
                  <tr key={quote.id} className="border-b border-gray-800 hover:bg-zinc-800/50">
                    <td className="p-6">
                      <p className="font-medium">{quote.booking?.customer?.name || "N/A"}</p>
                      <p className="text-sm text-gray-400">{quote.booking?.customer?.phone}</p>
                    </td>
                    <td className="p-6">
                      {quote.booking?.vehicleMake} {quote.booking?.vehicleModel}
                    </td>
                    <td className="p-6 font-bold text-yellow-400">
                      KSh {Number(quote.totalAmount).toLocaleString()}
                    </td>
                    <td className="p-6 text-sm text-gray-400">
                      {quote.items?.length || 0} item(s)
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1 rounded-full text-xs font-medium capitalize
                        ${quote.status === "APPROVED" ? "bg-green-400/10 text-green-400" : 
                          quote.status === "REJECTED" ? "bg-red-400/10 text-red-400" : 
                          "bg-yellow-400/10 text-yellow-400"}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="p-6 text-sm text-gray-400">
                      {format(new Date(quote.createdAt), "dd MMM yyyy")}
                    </td>
                    <td className="p-6">
                      <a 
                        href={`/admin/quotes/${quote.id}`} 
                        className="text-yellow-400 hover:underline font-medium"
                      >
                        View →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {quotes.map((quote: any) => (
              <div key={quote.id} className="bg-zinc-900 p-6 rounded-3xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{quote.booking?.customer?.name}</p>
                    <p className="text-sm text-gray-400">{quote.booking?.customer?.phone}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-medium capitalize
                    ${quote.status === "APPROVED" ? "bg-green-400/10 text-green-400" : 
                      quote.status === "REJECTED" ? "bg-red-400/10 text-red-400" : 
                      "bg-yellow-400/10 text-yellow-400"}`}>
                    {quote.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <p><strong>Vehicle:</strong> {quote.booking?.vehicleMake} {quote.booking?.vehicleModel}</p>
                  <p><strong>Total:</strong> <span className="font-bold text-yellow-400">KSh {Number(quote.totalAmount).toLocaleString()}</span></p>
                  <p><strong>Items:</strong> {quote.items?.length || 0}</p>
                </div>

                <a 
                  href={`/admin/quotes/${quote.id}`}
                  className="block mt-6 text-center bg-yellow-400 text-black py-3 rounded-2xl font-medium hover:bg-yellow-300"
                >
                  View Quotation Details →
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}