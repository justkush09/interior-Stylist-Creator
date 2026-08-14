import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Indian Minimalist | Home Decor & Styling Consultation Studio",
  description:
    "Editorial home decor and interior styling studio bringing warm Indian textures, serene minimalist aesthetics, and custom consultation to your living space.",
  keywords: [
    "Indian Minimalist",
    "Home Styling India",
    "Interior Decor Consultation",
    "Minimalist Home Decor",
    "Bangalore Interior Designer",
    "Mumbai Home Styling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-background text-charcoal font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
