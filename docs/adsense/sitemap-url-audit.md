# Sitemap URL Audit

Audit date: 2026-09-25

The live sitemap was fetched from `https://nexishub.vercel.app/sitemap.xml` and contained 84 URLs. All 84 sitemap URLs returned HTTP 200 during the concurrent live crawl. The complete machine-readable row set was inspected for status, title, canonical, robots meta, and HTML byte count.

## Aggregate results

| Measure | Result |
|---|---:|
| URLs in live sitemap | 84 |
| HTTP 200 responses | 84 |
| HTTP errors/redirects | 0 |
| Blog URLs | 67 |
| Research URLs | 7 before the search remediation |
| Distinct lastmod values | 4 |
| URLs with a discovered canonical mismatch | 1: `/research/search` pointed to the homepage |
| URLs with missing/uncertain value requiring review | Editorial overlap, legal drafts, social proof, and research status require human review |

## Route inventory

Core routes: `/`, `/products`, `/products/sitenexis`, `/products/pnyx`, `/studio`, `/about`, `/blog`, `/research`, `/contact`, `/legal`, `/legal/privacy`, `/legal/terms`, `/legal/cookies`.

Research routes: `/research/ai-visibility-index`, `/research/roadmap`, `/research/publications`, and `/research/search` before the remediation. Programme routes are represented in the research collections and should be kept in the next generated inventory if they are added to the sitemap.

Editorial routes: 67 `/blog/[slug]` URLs covering AI visibility, education technology, modern web engineering, AI infrastructure, healthcare AI, event technology, research, guides, case studies, product engineering, and developer tutorials.

## Source-of-truth issue

The generator assigns `2026-07-20` to the core routes regardless of individual page changes. Blog dates are sourced from editorial records. This should be replaced with meaningful page-level modification data before relying on sitemap freshness signals.

## CSV generation

The audit data is intentionally reproducible from production rather than hand-maintained. Run the following from the repository root after installing dependencies to regenerate the full CSV row set:

```powershell
node --input-type=module -e "const x=await fetch('https://nexishub.vercel.app/sitemap.xml').then(r=>r.text()); const urls=x.split('<loc>').slice(1).map(s=>s.split('</loc>')[0]); const rows=await Promise.all(urls.map(async u=>{const r=await fetch(u); const h=await r.text(); return {url:u,status:r.status,bytes:h.length};})); console.log(['url,status,html_bytes',...rows.map(r=>[r.url,r.status,r.bytes].join(','))].join('\n'));"
```

This command is read-only and does not modify production.
