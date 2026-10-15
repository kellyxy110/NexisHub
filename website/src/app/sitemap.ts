import type { MetadataRoute } from "next";
import { allEditorialPosts } from "@/lib/posts";
import { plannedStoreResources } from "@/lib/store-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexishub.vercel.app";
  const routes = ["", "/products", "/products/sitenexis", "/products/pnyx", "/store", "/studio", "/about", "/blog", "/research", "/research/ai-visibility-index", "/research/roadmap", "/research/publications", "/contact", "/legal", "/legal/privacy", "/legal/terms", "/legal/cookies"];
  return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-07-20"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/products/sitenexis" ? 0.9 : 0.7 })), ...plannedStoreResources.map((resource) => ({ url: `${base}/store/${resource.slug}`, lastModified: new Date("2026-10-15"), changeFrequency: "monthly" as const, priority: 0.4 })), ...allEditorialPosts.filter((post) => post.status === "Published").map((post) => ({ url: `${base}${post.canonicalPath}`, lastModified: new Date(post.updatedDate), changeFrequency: "monthly" as const, priority: 0.85 }))];
}
