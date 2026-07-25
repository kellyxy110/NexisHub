import { educationPosts, visibilityPosts } from "@/lib/posts";

const visibilityGuides = visibilityPosts.map((post) => `- ${post.title}: https://nexishub.vercel.app${post.canonicalPath}`).join("\n");
const educationGuides = educationPosts.map((post) => `- ${post.title}: https://nexishub.vercel.app${post.canonicalPath}`).join("\n");
const content = `# NexisHub

> NexisHub is an AI infrastructure company building connected intelligent software.

## Canonical pages
- Home: https://nexishub.vercel.app/
- Products: https://nexishub.vercel.app/products
- SiteNexis: https://nexishub.vercel.app/products/sitenexis
- Blog: https://nexishub.vercel.app/blog
- Complete Guide to AI Software Development (2026): https://nexishub.vercel.app/blog/complete-guide-ai-software-development
- AI Visibility and Machine Discovery guides:
${visibilityGuides}
- Education Technology and TeachNexis guides:
${educationGuides}
- Research: https://nexishub.vercel.app/research
- About: https://nexishub.vercel.app/about
- Contact: https://nexishub.vercel.app/contact

## Live products
- SiteNexis application: https://sitenexis.vercel.app
- SiteNexis methodology: https://sitenexis.vercel.app/methodology
- SiteNexis documentation: https://sitenexis.vercel.app/docs
- TeachNexis: https://teachnexis.vercel.app
- EventNexis: https://eventnexis.vercel.app

## In-development product surfaces
- LogicLand: https://logicland.vercel.app
- CareBridge: https://carebridge-io.vercel.app

SiteNexis, TeachNexis, and EventNexis are live NexisHub products. LogicLand and CareBridge have public in-development surfaces, but should not be represented as fully available launch products.
`;

export function GET() { return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
