import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexishub.vercel.app";
  const routes = ["", "/products", "/products/sitenexis", "/about", "/blog", "/research", "/contact", "/legal", "/legal/privacy", "/legal/terms", "/legal/cookies"];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-07-20"), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/products/sitenexis" ? 0.9 : 0.7 }));
}
