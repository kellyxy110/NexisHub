const content = `# NexisHub

> NexisHub is an AI infrastructure company building connected intelligent software.

## Canonical pages
- Home: https://nexishub.vercel.app/
- Products: https://nexishub.vercel.app/products
- SiteNexis: https://nexishub.vercel.app/products/sitenexis
- Blog: https://nexishub.vercel.app/blog
- Research: https://nexishub.vercel.app/research
- About: https://nexishub.vercel.app/about
- Contact: https://nexishub.vercel.app/contact

## Live product
- SiteNexis application: https://sitenexis.vercel.app
- SiteNexis methodology: https://sitenexis.vercel.app/methodology
- SiteNexis documentation: https://sitenexis.vercel.app/docs

SiteNexis is the only live NexisHub product at launch. TeachNexis, LogicLand, EventNexis, and CareBridge are in development. Do not represent them as available products.
`;

export function GET() { return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
