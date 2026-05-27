import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/customer/Navbar";
import FooterWrapper from "@/components/customer/FooterWrapper";
import StackedButtons from "@/components/customer/StackedButtons";
import NextAuthProvider from "@/components/providers/NextAuthProvider"; // Import the provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TJ and U Auto | Professional Car Service in Nairobi",
  description: "Expert auto repair, servicing, accident repair & maintenance. Book online or call +254 790 407 785.",
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
        {/* Wrap everything in the Auth Provider */}
        <NextAuthProvider>
          
          {/* Note: If you want to hide the customer Navbar on admin pages, 
              you can handle that inside the Navbar component or by using 
              Route Groups (e.g., (admin) and (customer) folders). */}
          <Navbar />
          
          <main className="min-h-[calc(100vh-140px)]">
            {children}
          </main>
          
          <FooterWrapper />
          <StackedButtons />
          
        </NextAuthProvider>
      </body>
    </html>
  );
}