import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker, PrivacyControls } from "@/components/privacy-controls";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nexishub.vercel.app"),
  title: {
    default: "NexisHub — Intelligent Software, One Ecosystem",
    template: "%s — NexisHub",
  },
  description:
    "NexisHub builds connected AI products that help people work, learn, create, organize, and make better decisions.",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "NexisHub — Intelligent Software, One Ecosystem",
    description:
      "Connected AI products for businesses, educators, healthcare providers, event organizers, and future innovators.",
    type: "website",
    siteName: "NexisHub",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>{children}<AnalyticsTracker /><PrivacyControls /></body>
    </html>
  );
}
