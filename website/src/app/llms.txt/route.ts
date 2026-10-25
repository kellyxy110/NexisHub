import { educationPosts, visibilityPosts } from "@/lib/posts";

const visibilityGuides = visibilityPosts.map((post) => `- ${post.title}: https://www.thenexishub.org${post.canonicalPath}`).join("\n");
const educationGuides = educationPosts.map((post) => `- ${post.title}: https://www.thenexishub.org${post.canonicalPath}`).join("\n");
const content = `# NexisHub

> NexisHub is an AI infrastructure company building connected intelligent software.

## Canonical pages
- Home: https://www.thenexishub.org/
- Products: https://www.thenexishub.org/products
- SiteNexis: https://www.thenexishub.org/products/sitenexis
- Blog: https://www.thenexishub.org/blog
- Complete Guide to AI Software Development (2026): https://www.thenexishub.org/blog/complete-guide-ai-software-development
- AI Visibility and Machine Discovery guides:
${visibilityGuides}
- Education Technology and TeachNexis guides:
${educationGuides}
- Research: https://www.thenexishub.org/research
- About: https://www.thenexishub.org/about
- Contact: https://www.thenexishub.org/contact

## Live products
- SiteNexis application: https://sitenexis.com
- SiteNexis methodology: https://sitenexis.com/methodology
- SiteNexis documentation: https://sitenexis.com/docs
- TeachNexis: https://teachnexis.vercel.app
- EventNexis: https://eventnexis.vercel.app

## In-development product surfaces
- LogicLand: https://logicland.vercel.app
- CareBridge: https://carebridge-io.vercel.app

SiteNexis, TeachNexis, and EventNexis are live NexisHub products. LogicLand and CareBridge have public in-development surfaces, but should not be represented as fully available launch products.
`;

export function GET() { return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
