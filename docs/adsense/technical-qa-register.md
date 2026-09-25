# AdSense Technical QA Register

Audit date: 2026-09-25

This register separates repository/runtime evidence from legal review and manual device testing. `TECHNICALLY REVIEWED` never means `LEGALLY REVIEWED`.

## Layout and advertising boundary

- Root public layout: `website/src/app/layout.tsx`.
- Research search metadata layout: `website/src/app/research/search/layout.tsx`.
- The consent-gated loader is implemented in `website/src/components/adsense-loader.tsx` and imported only by blog, article, and research pages.
- No CSP is currently configured in `website/next.config.ts`.
- Admin, authentication, API, citation endpoints, sitemap, robots, feeds, and other non-HTML resources must remain outside any future advertising loader boundary.
- If advertising is later authorized, the smallest safe integration point is a public HTML page template or explicit public-content component. It must not be placed in the root layout without route gating.

## Legal and consent consistency

| Surface | Technical status | Legal status | Evidence / follow-up |
|---|---|---|---|
| Privacy | TECHNICALLY REVIEWED | LEGAL REVIEW PENDING | Describes forms, hosting, optional analytics, retention, rights, and pending legal details. Verify provider names and retention after configuration. |
| Terms | TECHNICALLY REVIEWED | LEGAL REVIEW PENDING | Describes website use, products, content boundaries, links, availability, liability, and contact. Entity, jurisdiction, and final limitations remain pending. |
| Cookies | TECHNICALLY REVIEWED | LEGAL REVIEW PENDING | Describes consent local storage and optional analytics. Update provider/cookie details before enabling advertising. |
| Contact/forms | TECHNICALLY REVIEWED | LEGAL REVIEW PENDING | Forms validate inputs and use configured webhook delivery. Production delivery and retention require operational evidence. |
| Analytics | TECHNICALLY REVIEWED | LEGAL REVIEW PENDING | Events are gated on local consent. No third-party analytics provider is enabled by repository code alone. |
| Advertising | TECHNICAL INTEGRATION VERIFIED | LEGAL REVIEW PENDING | Exact ads.txt row returns 200; consent-gated public loader is present in the deployed bundle; no ad units or Auto Ads account setting was changed. |

## Automated and local checks

- Typecheck: passed previously for the remediation commit.
- Lint: passed previously for the remediation commit.
- Tests: 24 passed, including the AdSense integration regression test.
- Production webpack build: passed.
- Local production server: representative robots, sitemap, search, and homepage routes returned 200; local sitemap excluded `/research/search`.
- Live production: deployed remediation returned 200 for representative routes; robots, sitemap, search metadata, homepage, ads.txt, and scoped loader checks passed live verification.

## Manual QA status

| Area | Status | Required evidence |
|---|---|---|
| Mobile | NOT STARTED / NOT PROVEN | Device or browser viewport evidence for homepage, blog, article, products, research, About, Contact, and legal pages. |
| Tablet | NOT STARTED / NOT PROVEN | Representative viewport evidence and overflow review. |
| Desktop | PARTIAL | Local route/build evidence exists; visual review still required. |
| Keyboard | NOT PROVEN | Focus order, visible focus, menus, forms, consent controls, and article controls. |
| Screen reader | NOT PROVEN | Landmark, heading, label, status, and error announcements. |
| Print | PARTIAL | Research print stylesheet exists; verify a long article has no clipping or black-background waste. |
| Production performance | NOT PROVEN | Live LCP, CLS, INP where available, payload, fonts, images, and third-party script measurements. |

## Live network sample

Read-only fetches on 2026-09-25 returned HTTP 200 for the homepage, blog hub, and representative article. Approximate request timings from the audit environment were 2,663 ms, 1,148 ms, and 2,337 ms. These are request timings, not LCP, CLS, or INP measurements.

Observed HTML response sizes were approximately 56.9 KB, 147.7 KB, and 82.8 KB. Each sampled page exposed one H1 and no missing `alt` attributes in server-rendered `img` elements. Browser-based performance and accessibility testing remains required.
