// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/customer/Navbar";
// import Footer from "@/components/customer/Footer";
// import WhatsAppButton from "@/components/customer/WhatsAppButton";
// import InstallButton from "@/components/customer/InstallButton";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TJ and U Auto | Professional Car Service in Nairobi",
//   description: "Expert auto repair, servicing, accident repair & maintenance. Book online or call +254 736 889 880.",
//   keywords: ["car service nairobi", "auto repair", "accident repair", "vehicle maintenance", "tj and u auto"],
//   authors: [{ name: "TJ and U Auto" }],
//   openGraph: {
//     title: "TJ and U Auto",
//     description: "Professional Auto Workshop in Nairobi",
//     images: [{ url: "/hero-car.jpg" }],
//     locale: "en_K E",
//   },
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="manifest" href="/manifest.json" />
//         <meta name="theme-color" content="#facc15" />
//       </head>
//       <body className={`${inter.className} bg-black text-white antialiased`}>
//         <Navbar />
//         <main className="min-h-[calc(100vh-140px)]">
//           {children}
//         </main>
//         <Footer />
//         <WhatsAppButton />
//         <InstallButton />
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/customer/Footer";
import WhatsAppButton from "@/components/customer/WhatsAppButton";
import InstallButton from "@/components/customer/InstallButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TJ and U Auto | Professional Car Service in Nairobi",
  description: "Expert auto repair, servicing, accident repair & maintenance. Book online or call +254 736 889 880.",
  keywords: ["car service nairobi", "auto repair", "accident repair", "vehicle maintenance", "tj and u auto"],
  authors: [{ name: "TJ and U Auto" }],
  openGraph: {
    title: "TJ and U Auto",
    description: "Professional Auto Workshop in Nairobi",
    images: [{ url: "/hero-car.jpg" }],
    locale: "en_KE",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#facc15" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-140px)]">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <InstallButton />
      </body>
    </html>
  );
}