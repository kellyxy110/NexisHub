import { allEditorialPosts } from "@/lib/posts";
import { products } from "@/lib/products";
import { siteUrl } from "@/lib/site-url";
import { siteNexisLinks } from "@/lib/site-links";

const guides = allEditorialPosts.filter((post) => post.status === "Published").map((post) => `- ${post.title}: ${siteUrl}${post.canonicalPath}`).join("\n");
const productRecords = products.map((product) => `- ${product.name} (${product.status}): ${product.href?.startsWith("/") ? siteUrl + product.href : product.href}`).join("\n");
const content = `# NexisHub

> NexisHub is a founder-operated technology brand building connected software and AI infrastructure. Its canonical website is ${siteUrl}.

## Identity and publishing responsibility
- About NexisHub and founder Ekeleme Kelechi David: ${siteUrl}/about
- Editorial policy, AI assistance, sources and corrections: ${siteUrl}/editorial-policy
- Contact: ${siteUrl}/contact

## Products and services
- Product registry and availability: ${siteUrl}/products
- Software development and AI product Studio: ${siteUrl}/studio
${productRecords}
- SiteNexis application: ${siteNexisLinks.home}
- SiteNexis methodology: ${siteNexisLinks.methodology}
- SiteNexis documentation: ${siteNexisLinks.docs}

## Research and evidence boundaries
- Research overview: ${siteUrl}/research
- AI Visibility Index pre-review working paper: ${siteUrl}/research/ai-visibility-index
- Research FAQ: ${siteUrl}/research/faq

The working paper proposes a framework; it does not publish validated rankings or empirical findings. Programme pages describe planned work, not completed studies. Blog guides are educational articles, not peer-reviewed papers. Illustrative examples and diagnostic scores are not measured customer outcomes.

## Published guides
- Blog and topic navigation: ${siteUrl}/blog
- RSS feed: ${siteUrl}/feed.xml
${guides}

## Discovery
- Sitemap: ${siteUrl}/sitemap.xml
- Robots rules: ${siteUrl}/robots.txt
`;

// An optional plain-text navigation aid, not an indexing or citation guarantee.
export function GET() { return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } }); }
