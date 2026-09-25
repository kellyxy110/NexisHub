# AdSense Technical QA Register

Audit date: 2026-09-25

This register separates repository/runtime evidence from legal review and manual device testing. `TECHNICALLY REVIEWED` never means `LEGALLY REVIEWED`.

## Layout and advertising boundary

- Root public layout: `website/src/app/layout.tsx`.
- Research search metadata layout: `website/src/app/research/search/layout.tsx`.
- No dedicated AdSense loader exists.
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
| Advertising | NOT CONFIGURED | LEGAL REVIEW PENDING | No AdSense loader, ads.txt, or advertising cookies are active. |

## Automated and local checks

- Typecheck: passed previously for the remediation commit.
- Lint: passed previously for the remediation commit.
- Tests: 23 passed.
- Production webpack build: passed.
- Local production server: representative robots, sitemap, search, and homepage routes returned 200; local sitemap excluded `/research/search`.
- Live production: remains pre-remediation until authenticated deployment and post-deployment crawl are completed.

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
