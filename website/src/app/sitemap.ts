import { siteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
import { allEditorialPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const routes = ["", "/products", "/products/sitenexis", "/products/pnyx", "/studio", "/about", "/blog", "/research", "/research/ai-visibility-index", "/research/roadmap", "/research/publications", "/contact", "/legal", "/legal/privacy", "/legal/terms", "/legal/cookies"];
  return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-07-20"), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/products/sitenexis" ? 0.9 : 0.7 })), ...allEditorialPosts.filter((post) => post.status === "Published").map((post) => ({ url: `${base}${post.canonicalPath}`, lastModified: new Date(post.updatedDate), changeFrequency: "monthly" as const, priority: 0.85 }))];
}
