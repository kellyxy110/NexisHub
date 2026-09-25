# AdSense Qualification Change Log

| Date | File | Before | After | Relevance | Regression result |
|---|---|---|---|---|---|
| 2026-09-25 | `website/src/app/page.tsx` | “Five focused products” | “Six focused products” | Corrects a visible publisher/product identity contradiction | Pending build and live verification |
| 2026-09-25 | `website/src/app/research/search/layout.tsx` | No route-specific metadata | Self-canonical, `noindex, follow`, descriptive title | Prevents an interactive utility from competing as a canonical publication | Pending build and live verification |
| 2026-09-25 | `website/src/app/sitemap.ts` | Search utility included | Search utility omitted | Aligns sitemap with intended indexability | Pending build and live verification |
| 2026-09-25 | `docs/adsense/*` | No Loop 0 evidence register | Baseline, risks, ledger, matrix, and change record | Makes qualification evidence auditable | Documentation-only |
| 2026-09-25 | `website/public/ads.txt` | Root `/ads.txt` returned 404 | Exact owner-authorized Google ads.txt row added | Resolves the publisher authorization file requirement | Requires production fetch after deployment |
| 2026-09-25 | `website/src/components/adsense-loader.tsx` and public editorial routes | No loader | Consent-gated loader using authorized client ID on blog, articles, and research only | Enables bounded account connection without private/admin/API contamination | Requires production/browser verification |
| 2026-09-25 | `website/src/app/robots.ts` | Robots output included a redundant `Host` directive | Wildcard rules and canonical sitemap only | Reduces crawl-instruction ambiguity | Pending build and live verification |
