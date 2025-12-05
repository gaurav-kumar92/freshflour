import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../lib/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh Flour Co. - Premium Quality Flours",
  description: "Discover a wide range of high-quality, fresh flours, from traditional staples to specialty grains. Perfect for all your baking and cooking needs.",
  keywords: ["flour", "baking", "cooking", "organic", "specialty grains", "whole wheat", "all-purpose"],
  openGraph: {
    title: "Fresh Flour Co. - Premium Quality Flours",
    description: "High-quality, fresh flours for all your culinary needs.",
    url: "https://your-domain.com", // Replace with the actual domain
    siteName: "Fresh Flour Co.",
    images: [
      {
        url: "/og-image.jpg", // Replace with the actual path to an open graph image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh Flour Co. - Premium Quality Flours",
    description: "The best flours for the best results. Freshly milled and delivered to your door.",
    creator: "@your-twitter-handle", // Replace with the actual Twitter handle
    images: ["/twitter-image.jpg"], // Replace with the actual path to a Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
