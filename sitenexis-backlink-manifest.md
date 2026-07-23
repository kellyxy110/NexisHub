# SiteNexis → NexisHub backlink implementation manifest

Prepared: 2026-07-23

This manifest is the handoff for the separate SiteNexis repository. The source pages are live on `sitenexis.vercel.app`; they cannot be edited from the NexisHub workspace.

## Editorial rules

- Publish and verify the NexisHub destination before adding its backlink.
- Add one contextual HTML link in the main article body and, where the template supports it, one related-reading card.
- Use the suggested anchor as a starting point, then adjust it to read naturally in the sentence.
- Do not mark editorial links `nofollow` or generate them only after client interaction.
- Keep the reciprocal NexisHub link to the SiteNexis technical field note because it provides additional technical depth.
- Verify production URLs, status codes, canonicals, and rendered anchors after deployment.

## Backlink map

| # | SiteNexis source page to edit | NexisHub destination | Suggested contextual anchor |
|---|---|---|---|
| 1 | [Hub Pages and Topical Authority](https://sitenexis.vercel.app/blog/link-graph-hub-pages) | [Complete Guide to AI Visibility](https://nexishub.vercel.app/blog/complete-guide-ai-visibility) | complete guide to AI visibility and machine discovery |
| 2 | [What Is GEO?](https://sitenexis.vercel.app/blog/what-is-geo-generative-engine-optimisation-guide) | [AI Visibility vs Traditional SEO](https://nexishub.vercel.app/blog/ai-visibility-vs-traditional-seo) | how AI visibility differs from traditional SEO |
| 3 | [Internal Link Topology and AI Retrieval](https://sitenexis.vercel.app/blog/link-graph-internal-topology) | [AI-Readable Website Architecture](https://nexishub.vercel.app/blog/ai-readable-website-architecture) | designing an AI-readable website architecture |
| 4 | [Anchor Text as an Entity Signal](https://sitenexis.vercel.app/blog/link-graph-anchor-text-entity-signal) | [Internal Linking for AI Discovery](https://nexishub.vercel.app/blog/internal-linking-ai-discovery) | practical internal linking for AI discovery |
| 5 | [Schema Markup as AI Trust Infrastructure](https://sitenexis.vercel.app/blog/schema-markup-ai-trust-signals-2025) | [Structured Data for AI Products](https://nexishub.vercel.app/blog/structured-data-ai-machine-trust) | structured data, entities, and machine trust |
| 6 | [Entity Optimization](https://sitenexis.vercel.app/blog/entity-optimization-the-signal-ai-systems-weight-most) | [Entity Clarity](https://nexishub.vercel.app/blog/entity-clarity-ai-systems) | helping AI systems understand a brand entity |
| 7 | [Chunk Engineering](https://sitenexis.vercel.app/blog/aive-chunk-engineering) | [Content Structure for AI Retrieval](https://nexishub.vercel.app/blog/content-structure-ai-retrieval) | structuring content for semantic retrieval |
| 8 | [Citation Readiness vs Retrieval Readiness](https://sitenexis.vercel.app/blog/pvf-citation-readiness-vs-retrieval) | [Creating Citation-Ready Content](https://nexishub.vercel.app/blog/create-citation-ready-content) | creating content AI systems can cite responsibly |
| 9 | [robots.txt Audit for AI Crawlers](https://sitenexis.vercel.app/blog/dom-robots-txt-audit) | [Technical AI Crawlability Checklist](https://nexishub.vercel.app/blog/technical-ai-crawlability-checklist) | technical AI crawlability checklist |
| 10 | [RAG and SEO](https://sitenexis.vercel.app/blog/rag-seo-retrieval-augmented-generation-content-strategy) | [RAG, Search, and Content Discovery](https://nexishub.vercel.app/blog/rag-search-content-discovery) | the full RAG content discovery pipeline |
| 11 | [How AI Systems Choose Citations](https://sitenexis.vercel.app/blog/how-chatgpt-perplexity-claude-choose-citations) | [How AI Platforms Discover Sources](https://nexishub.vercel.app/blog/how-ai-platforms-discover-sources) | how major AI platforms discover sources |
| 12 | [Increasing Citation Probability](https://sitenexis.vercel.app/blog/how-to-increase-citation-probability-ai-search) | [Measuring AI Visibility](https://nexishub.vercel.app/blog/measure-ai-visibility) | measuring AI visibility without vanity metrics |
| 13 | [Why AI Systems Ignore Your Content](https://sitenexis.vercel.app/blog/why-ai-systems-ignore-70-percent-of-your-content) | [Why Good Content Becomes AI-Invisible](https://nexishub.vercel.app/blog/why-content-becomes-ai-invisible) | diagnosing why useful content becomes AI-invisible |
| 14 | [Retrieval Readiness Checklist](https://sitenexis.vercel.app/blog/aive-retrieval-readiness-checklist) | [Practical GEO Strategy](https://nexishub.vercel.app/blog/practical-geo-strategy) | a cross-functional GEO operating strategy |
| 15 | [Heading Hierarchy and Semantic Chunk Boundaries](https://sitenexis.vercel.app/blog/dom-heading-hierarchy-extraction) | [90-Day AI Visibility Roadmap](https://nexishub.vercel.app/blog/90-day-ai-visibility-roadmap) | a 90-day AI visibility roadmap |

## SiteNexis execution checklist

- [ ] Confirm all 15 NexisHub destinations return `200` and declare self-referencing canonicals.
- [ ] Add the contextual links to the 15 source articles.
- [ ] Add related-reading cards where supported.
- [ ] Review anchor diversity and sentence-level relevance.
- [ ] Build and deploy SiteNexis.
- [ ] Crawl the rendered SiteNexis pages and confirm all 15 anchors are present and followable.
- [ ] Re-run the SiteNexis link-graph analysis and save the baseline comparison.
