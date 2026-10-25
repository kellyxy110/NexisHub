import type { Metadata } from "next";
import { siteUrl } from "./site-url";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const editorialId = `${siteUrl}/editorial-policy#editorial`;

export function pageMetadata(title: string, description: string, path: string, index = true): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description, url: path, siteName: "NexisHub", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NexisHub: intelligent software, one ecosystem" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    robots: { index, follow: true, "max-image-preview": "large" },
  };
}

export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": organizationId, name: "NexisHub", url: siteUrl,
      description: "A founder-operated technology brand building connected software and AI infrastructure for work, learning, and product development.",
      logo: { "@type": "ImageObject", url: `${siteUrl}/nexishub-logo.jpeg` },
      founder: { "@id": `${siteUrl}/about#founder` },
      publishingPrinciples: `${siteUrl}/editorial-policy` },
    { "@type": "WebSite", "@id": websiteId, name: "NexisHub", url: siteUrl, inLanguage: "en", publisher: { "@id": organizationId } },
  ],
};

export function breadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) };
}

// JSON-LD can contain editorial text. Escape HTML-significant characters before insertion.
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }

export const indexableResearchSections = new Set(["publications", "roadmap", "faq"]);
