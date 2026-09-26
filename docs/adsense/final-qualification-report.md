# NexisHub AdSense Qualification Report

Audit date: 2026-09-26

Property: `https://nexishub.vercel.app`

## Executive verdict

**CONDITIONALLY READY — HERO FIX REQUIRES PRODUCTION VERIFICATION BEFORE FINAL READY.**

This is an evidence-based engineering and content-readiness assessment, not a prediction of Google’s decision. The founder reports that the site is added to AdSense, ownership is verified through ads.txt, the site status is `Requires review`, the request button is available, and Google Privacy & Messaging is published. The founder has also verified the Genshipyard and Truvyx relationships. Conditional status remains until the observed featured-card cropping defect is deployed and production-verified, and until the two consent surfaces are tested together in a real browser.

## Critical blockers

- Live `/ads.txt` returns 200 `text/plain` with the exact row `google.com, pub-3694194350196538, DIRECT, f08c47fec0942fa0`.
- A consent-gated AdSense loader is present in the deployed public client bundle for blog, article, and research pages. It is not in the root layout and does not affect admin, API, legal, product, or non-HTML surfaces.
- AdSense review has not been requested. The owner reports Google Privacy & Messaging `NexisHub European Consent` is published with Consent, Do not consent, and Manage options.
- Terms, privacy, and cookies pages are present but marked as drafts for legal review.
- Production deployment is verified through the existing `kellyxy110` GitHub account and existing Vercel `nexis-hub` project. No replacement project or domain was created.

## Technical readiness

- Robots: live response returns 200, allows public pages, disallows `/api/`, exposes the canonical sitemap, and no longer contains `Host:`.
- Sitemap: live XML returns 200 with 83 production URLs and excludes the interactive research search route.
- Crawlability: representative public routes returned 200 during the baseline crawl.
- Canonicalization: `/research/search` had an incorrect homepage canonical in production baseline; live route metadata now supplies a self-canonical and `noindex,follow`.
- ads.txt: technically verified in production.
- AdSense loader: technically verified in the deployed public bundle; browser consent interaction remains to be manually verified.
- Build: local production webpack build passed after remediation.
- Featured blog visual: the fix changes the text-bearing featured image from cropping to containment and removes its redundant accessible announcement.
- Featured blog visual live check: blog HTTP 200, empty decorative alt present, deployed CSS contains the scoped `object-fit: contain` rule. Browser screenshot verification remains unavailable.

## Content readiness

The sitemap exposes 67 blog URLs and substantive research/product surfaces. Quantity is not treated as quality evidence. High-overlap topic families around AI visibility, machine discovery, structured data, retrieval, and citation readiness require manual pair review for differentiation and factual accuracy. No mass deletion or filler generation was performed.

## Trust readiness

The About page identifies NexisHub and the founder. The founder explicitly verified the existing `genshipyard.com` and `truvyx.org` relationships; the public claim remains limited to the existing “Trusted by” names and links. Legal pages exist and are linked, but legal review is pending. Contact delivery was not independently proven in production.

## Policy risk

No ad placement, Auto Ads setting, or second consent vendor was changed. The owner reports Google Privacy & Messaging is published. The repository still contains a first-party analytics consent banner that can appear alongside Google’s message; runtime interaction must be verified before classifying the combined consent architecture as a full pass.

## SEO readiness

The public site has canonical metadata, generated sitemap and robots endpoints, Open Graph metadata, structured data on article pages, and internal navigation. The search utility contradiction was fixed locally. Search Console indexing and manual-action state remain unverified.

## GEO/DEO readiness

The site clearly separates products, research, and editorial surfaces in its navigation and content. Research status language is intentionally conservative. Machine-readable discovery files and citation metadata exist, but these are not evidence of indexing or AI citation.

## Security readiness

Baseline headers include content-type sniffing protection, referrer policy, permissions policy, and same-origin framing protection. Admin routes use server-side authorization. Robots is not treated as security. A fuller production security review, including API abuse/rate limiting and deployment headers, remains required.

## Mobile/accessibility readiness

Automated repository checks pass, but manual device, keyboard, screen-reader, reduced-motion, zoom, and print verification has not been completed. This area is not proven.

## Monetization architecture

Advertising remains conservative: the authorized loader is consent-gated, but no ad units or Auto Ads account setting was changed. Account-level review and CMP configuration remain owner actions.

## Deployment status

- GitHub account: verified as `kellyxy110`.
- Repository: verified as `kellyxy110/NexisHub`, with administrative access.
- GitHub push: verified through `22d8f33`.
- Vercel account/team: verified as `kellyxy110` / Kellyxy's projects.
- Vercel project: existing `nexis-hub`; no replacement project created.
- Production deployment: `READY`; existing `https://nexishub.vercel.app` alias reassigned to the new deployment.
- Application deployment source: production deployment `dpl_3ks4ymg4QPNRJJZbE7asrRibried`, serving the hero fix from commit `22d8f33`.
- Live route verification: passed for robots, sitemap, search, homepage, blog, representative article, products, research, About, Contact, and legal routes.

## Remaining owner actions

1. Deploy and live-verify the bounded featured-card hero fix.
2. In a real browser, verify Google Privacy & Messaging and the first-party banner do not create contradictory consent or loader behavior.
3. Manually request AdSense review only after the production fix is verified.
4. Complete legal review of Terms, Privacy, and Cookies.
5. Complete editorial review of high-overlap article clusters and factual/source claims.

The exact trust-claim questions are recorded in [`owner-verification.md`](./owner-verification.md). Technical/legal separation and QA status are recorded in [`technical-qa-register.md`](./technical-qa-register.md).

## Post-approval recommendations

Use conservative, content-led ad placements only after approval. Monitor layout stability, accidental-click risk, user experience, policy notices, and article-level performance. Do not enable ads on forms, legal pages, private routes, or thin utility surfaces without a documented reason.

## Evidence table

| Criterion | Status | Evidence | Remaining Action |
|---|---|---|---|
| Public crawlability | PASS | Live robots, sitemap, and selected public routes returned 200 | Monitor for regression |
| Sitemap/indexability consistency | PASS | Live 83-URL sitemap excludes search utility; search is self-canonical/noindex | Monitor for regression |
| ads.txt | PASS | Live HTTP 200 `text/plain`; exact row verified | Monitor AdSense account status |
| AdSense integration | PASS — TECHNICAL INTEGRATION VERIFIED | Exact client ID found in deployed public client bundle; no root/admin loader | Do not confuse technical integration with Google approval |
| Original/useful content | NOT PROVEN | 67 blog URLs; overlap and factual review incomplete | Editorial review |
| Publisher identity | PASS — OWNER VERIFIED | About page identifies NexisHub and founder; founder verified existing Trusted by relationships | Do not add unsupported claims |
| Legal/privacy | PARTIAL — TECHNICAL PASS | Pages are linked, coherent, and marked drafts | Qualified legal review |
| Accessibility/mobile/performance | PARTIAL — RESIDUAL QA | Programmatic production checks passed; browser/device evidence unavailable | Complete proportionate manual QA |
| Consent/CMP | PARTIAL — ACCOUNT PASS, RUNTIME PENDING | Owner reports published Google message; browser interaction with the first-party banner is unverified | Test combined flow and loader behavior |
| Hero visual quality | P1 — FIX IN PROGRESS | Owner-observed crop traced to `object-fit: cover` on a text-bearing 1200×630 OG image | Deploy and verify |
| Account review | OWNER ACTION — REQUEST AVAILABLE | Owner reports site added, ownership verified, status `Requires review`, request button available, not requested | Owner clicks Request review after final production verification |

## Official references

- [Google AdSense eligibility requirements](https://support.google.com/adsense/answer/9724)
- [Google guidance for pages ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Google ads.txt FAQs](https://support.google.com/adsense/answer/9785052)
- [Google consent management requirements for publishers](https://support.google.com/adsense/answer/13554116)
- [Google AdSense Privacy & messaging setup](https://support.google.com/adsense/answer/7670013)
- [Google robots.txt guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
- [Google robots meta-tag guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
