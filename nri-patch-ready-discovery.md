# NRI Patch-Ready Discovery Updates

The existing Research page and sitemap files may require a manual patch when filesystem ACLs permit updates. Apply these entries:

## Research navigation

- Publications: `/research/publications`
- White Papers: `/research/white-papers`
- Technical Reports: `/research/technical-reports`
- Benchmarks: `/research/benchmarks`
- Research Notes: `/research/research-notes`
- Annual Reports: `/research/annual-reports`
- Engineering Journals: `/research/journals`
- Research Labs: `/research/labs`
- Open Source: `/research/open-source`
- Open Data: `/research/open-data`
- Research Roadmap: `/research/roadmap`
- Research Ethics: `/research/ethics`
- Contribute: `/research/contribute`
- Collaborations: `/research/collaborations`
- FAQ: `/research/faq`
- Search: `/research/search`

## Sitemap entries

Add the routes above plus `/research/ai-visibility-index` and all generated `/research/programmes/{slug}` routes. Generated programme slugs are available from `website/src/lib/nri-programmes.ts`.

## Robots and RSS

Keep `/research`, `/research/publications`, and published or working-paper routes crawlable. Do not expose private review, consent, or participant records. Add published NRI work to RSS only after its publication status is approved.
