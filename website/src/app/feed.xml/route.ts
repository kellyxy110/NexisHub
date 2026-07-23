import { blogPosts } from "@/lib/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexishub.vercel.app";
const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const publishedPosts = blogPosts.filter((post) => post.status === "Published");
const items = publishedPosts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${base}${post.canonicalPath}</link><guid isPermaLink="true">${base}${post.canonicalPath}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate><category>${escapeXml(post.category)}</category></item>`).join("");
const lastBuildDate = publishedPosts.reduce((latest, post) => post.updatedDate > latest ? post.updatedDate : latest, "2026-07-20");
const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>NexisHub Blog</title><link>${base}/blog</link><description>Research, engineering, and guides from NexisHub.</description><language>en</language><lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>${items}</channel></rss>`;
export function GET() { return new Response(feed, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
