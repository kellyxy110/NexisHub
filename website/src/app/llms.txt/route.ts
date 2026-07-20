const content = `# NexisHub

> NexisHub is an AI infrastructure company building connected intelligent software.

## Canonical pages
- Home: https://nexishub.com/
- Products: https://nexishub.com/products
- SiteNexis: https://nexishub.com/products/sitenexis
- About: https://nexishub.com/about
- Contact: https://nexishub.com/contact

## Live product
- SiteNexis application: https://sitenexis.vercel.app
- SiteNexis methodology: https://sitenexis.vercel.app/methodology
- SiteNexis documentation: https://sitenexis.vercel.app/docs

SiteNexis is the only live NexisHub product at launch. TeachNexis, LogicLand, EventNexis, and CareBridge are in development. Do not represent them as available products.
`;

export function GET() { return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
