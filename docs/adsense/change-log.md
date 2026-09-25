# AdSense Qualification Change Log

| Date | File | Before | After | Relevance | Regression result |
|---|---|---|---|---|---|
| 2026-09-25 | `website/src/app/page.tsx` | “Five focused products” | “Six focused products” | Corrects a visible publisher/product identity contradiction | Pending build and live verification |
| 2026-09-25 | `website/src/app/research/search/layout.tsx` | No route-specific metadata | Self-canonical, `noindex, follow`, descriptive title | Prevents an interactive utility from competing as a canonical publication | Pending build and live verification |
| 2026-09-25 | `website/src/app/sitemap.ts` | Search utility included | Search utility omitted | Aligns sitemap with intended indexability | Pending build and live verification |
| 2026-09-25 | `docs/adsense/*` | No Loop 0 evidence register | Baseline, risks, ledger, matrix, and change record | Makes qualification evidence auditable | Documentation-only |
