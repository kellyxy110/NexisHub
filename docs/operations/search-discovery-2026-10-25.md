# NexisHub search and answer discovery: 25 October 2026

Scope: SEO (search-engine optimisation), GEO (generative-engine optimisation), AEO (answer-engine optimisation) and DEO, interpreted here as discovery-engine optimisation. DEO is an operational label in this report, not a provider certification or a separate ranking standard.

## Evidence and decisions

Live baseline after the custom-domain migration:

| Finding | Evidence | Correction |
| --- | --- | --- |
| Soft 404s | Nonexistent research section, programme, citation and Studio URLs returned HTTP 200 with fallback content. | Validate records and call Next.js notFound; test real HTTP 404, including a prototype-property name. |
| Admin indexing | `/admin/sign-in` emitted `index, follow` and inherited the homepage canonical. | Admin layout noindex/nofollow, matching response headers, and no default homepage canonical inherited from the root layout. |
| Generic social metadata | Most company/service pages inherited the homepage preview rather than their own title, description and URL. | Shared page metadata for current company, product, research, legal and service pages. |
| Missing service discovery | Five substantive Studio service pages were absent from the 87-URL sitemap. | Derive service routes from their existing shared registry. |
| Planned research indexed | Planned programme and empty publication-category surfaces were indexable despite having no published research. | Keep pages accessible and linked but noindex/follow; retain research overview, working paper, roadmap, publication index and FAQ as indexable. |
| Incomplete identity links | Homepage Organization schema and article publisher/author strings did not link durable entity identities. | Organization and WebSite IDs, founder Person record on About, editorial byline ID and publishing-policy relationship. |
| Incomplete machine navigation | llms.txt omitted many published editorial guides and Pnyx. | Derive navigation from all published posts and current product registry, with explicit research/product limits. |
| Weak answer entry point | Homepage did not directly answer basic entity, service and research-status questions. | Four visible questions and concise answers, with supporting internal links and matching FAQ schema. |

## Implemented boundaries

- Added `/editorial-policy`: founder responsibility, meaning of the editorial byline, evidence categories, AI assistance, commercial interests, dates, corrections and the distinction between guides, working papers and planned work. It does not claim an independent editorial board or completed fact checking of every article.
- Article schema now links publishing identity and the editorial-policy byline; dynamic guides include their existing visible lead and reference URLs as abstract/citation data. Bodies, original publication dates, slugs, consent controls and ads.txt are preserved.
- Removed a fixed 60-second SiteNexis audit claim and no-account-required claim in favour of current access terms and scope-dependent timing.
- Removed an unsupported research-funder statement from programme schema; stated the planned status in its description.
- Added max-image-preview:large while preserving snippet access. No extra crawler training restrictions, paid services, fabricated ratings, review claims, or guaranteed AI citation language were introduced.
- Sitemap now contains 94 indexable destinations. Published article update dates remain authoritative; the shared arbitrary July static-page lastmod value was removed rather than replaced with a fake global freshness date.
- llms.txt is an optional navigation aid. It is not treated as a recognised ranking requirement or a substitute for HTML/robots/sitemaps.
- Exact fix branch automatic deployment is disabled. Main release behaviour is unchanged.

## Validation before release

- 39/39 tests passed; includes real Next route-matching and metadata/JSON-LD safety tests.
- TypeScript and ESLint passed.
- Webpack production build passed: 223 static pages generated.
- `npm run verify:discovery` passed against the production server: all 94 sitemap destinations return HTTP 200, self-canonical, indexable, one H1, unique titles, page-specific Open Graph URLs, Twitter preview metadata and linked identity graph.
- Article publishing identities, dates and breadcrumbs; all published blog links in llms.txt; five invalid routes returning HTTP 404; noindex utility/planned pages; admin noindex response headers; and basic Googlebot/OAI-SearchBot/bingbot requests passed.
- The invalid-route implementation was refined to avoid Next 16's NoFallbackError log path while preserving genuine HTTP 404 responses.
- Local discovery checks do not submit forms, send authentication email or access production databases. The local admin index-control check uses a nonexistent admin path's response headers; a full local sign-in flow was not tested because production authentication is not provisioned locally.
- Local browser screenshots were attempted but the Chromium download was unavailable/corrupt. This is not a visual-QA pass. Responsive visual checks and field Core Web Vitals remain unverified until separately inspected.
- `git diff --check` passed.

## Account access and remaining measurement

The owner subsequently supplied a Google Search Console DNS verification token. The authoritative nameservers and Vercel zone were confirmed, and the supplied TXT value was added at the domain root (record `rec_4dfdff43de49baa7100623c7`, TTL 300) without changing the existing records. This prepares domain ownership verification; it does not establish that Search Console accepted the property.

Search Console, AdSense and GA4 dashboard settings were not modified. No sufficient connected account tool was available. An optional Windsor.ai integration was identified for Search Console/GA4 reporting; it has not been connected, and its presence does not establish account configuration or write capabilities. AdSense review requires access to the actual AdSense account.

No GA4 measurement ID was found in the inspected website source/template. The existing implementation uses consent-gated first-party events; this does not prove that GA4 receives those events. Do not invent a GA4 ID or label GA4 configured without account evidence.

Next account actions: verify the new Search Console Domain property, submit the canonical sitemap, inspect representative URLs, verify any Change of Address eligibility, check AdSense site/consent/domain status, and confirm GA4 stream configuration and event reception. Track search clicks, impressions, indexed URLs and referral/conversion outcomes over actual dated windows. AI answer presence requires recorded queries, system, mode, date, citation and representation evidence. No ranking, indexation, traffic or citation improvement is claimed by these implementation tests.

## Primary guidance consulted

- Google AI features and website guidance: https://developers.google.com/search/docs/appearance/ai-features
- Google generative AI optimisation guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google structured-data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots

Google documents that established SEO fundamentals remain relevant to AI features and that eligibility does not guarantee indexing or appearance. Structured data must describe the visible content. These principles govern the implementation.
