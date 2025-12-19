import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Freemans Bay Dental | Modern, Luxurious Dental Care",
  description: "Experience clinical excellence and gentle care at Freemans Bay Dental. Same-day appointments available for anxious patients and busy professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${syne.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
