import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Search | Nexis Research Institute",
  description: "Search the Nexis Research Institute programme registry by title, area, status, or topic.",
  alternates: { canonical: "/research/search" },
  robots: { index: false, follow: true },
};

export default function ResearchSearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
