const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexishub.vercel.app";
const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>NexisHub Blog</title><link>${base}/blog</link><description>Research, engineering, and guides from NexisHub.</description><language>en</language><lastBuildDate>${new Date("2026-07-20").toUTCString()}</lastBuildDate></channel></rss>`;
export function GET() { return new Response(feed, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
