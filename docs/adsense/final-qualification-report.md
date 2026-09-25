# NexisHub AdSense Qualification Report

Audit date: 2026-09-25

Property: `https://nexishub.vercel.app`

## Executive verdict

**CONDITIONALLY READY — SITE TECHNICALLY READY FOR OWNER REVIEW; GOOGLE CMP/ACCOUNT CONFIGURATION AND BROWSER EVIDENCE REMAIN.**

This is an evidence-based engineering and content-readiness assessment, not a prediction of Google’s decision. The repository has a valid crawlable public site, the initial indexability contradiction is remediated and live-verified, and the authorized ads.txt record and scoped loader are technically verified in production. The founder has verified the Genshipyard and Truvyx relationships. Conditional status remains because Google account/CMP configuration and real-browser evidence are not available from repository evidence or the current execution environment.

## Critical blockers

- Live `/ads.txt` returns 200 `text/plain` with the exact row `google.com, pub-3694194350196538, DIRECT, f08c47fec0942fa0`.
- A consent-gated AdSense loader is present in the deployed public client bundle for blog, article, and research pages. It is not in the root layout and does not affect admin, API, legal, product, or non-HTML surfaces.
- AdSense account review state, Privacy & messaging/CMP configuration, consent signals, and Search Console state are not available to this audit.
- Terms, privacy, and cookies pages are present but marked as drafts for legal review.
- Production deployment is now verified through the existing `kellyxy110` GitHub account and existing Vercel `nexis-hub` project. No replacement project or domain was created.

## Technical readiness

- Robots: live response returns 200, allows public pages, disallows `/api/`, exposes the canonical sitemap, and no longer contains `Host:`.
- Sitemap: live XML returns 200 with 83 production URLs and excludes the interactive research search route.
- Crawlability: representative public routes returned 200 during the baseline crawl.
- Canonicalization: `/research/search` had an incorrect homepage canonical in production baseline; live route metadata now supplies a self-canonical and `noindex,follow`.
- ads.txt: technically verified in production.
- AdSense loader: technically verified in the deployed public bundle; browser consent interaction remains to be manually verified.
- Build: local production webpack build passed after remediation.

## Content readiness

The sitemap exposes 67 blog URLs and substantive research/product surfaces. Quantity is not treated as quality evidence. High-overlap topic families around AI visibility, machine discovery, structured data, retrieval, and citation readiness require manual pair review for differentiation and factual accuracy. No mass deletion or filler generation was performed.

## Trust readiness

The About page identifies NexisHub and the founder. The founder explicitly verified the existing `genshipyard.com` and `truvyx.org` relationships; the public claim remains limited to the existing “Trusted by” names and links. Legal pages exist and are linked, but legal review is pending. Contact delivery was not independently proven in production.

## Policy risk

No ad placement, Auto Ads setting, publisher account setting, or second consent vendor was changed. Google’s current guidance makes CMP/account configuration an owner gate for personalised ads in the EEA, UK, and Switzerland. The existing first-party consent UI is not proof of Google Privacy & messaging or certified TCF configuration.

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
- GitHub push: verified through `e336104`.
- Vercel account/team: verified as `kellyxy110` / Kellyxy's projects.
- Vercel project: existing `nexis-hub`; no replacement project created.
- Production deployment: `READY`; existing `https://nexishub.vercel.app` alias reassigned to the new deployment.
- Application deployment source: the pushed remediation state through `e8f40f6`; the later `e336104` documentation commit was pushed separately and does not change application output.
- Live route verification: passed for robots, sitemap, search, homepage, blog, representative article, products, research, About, Contact, and legal routes.

## Remaining owner actions

1. In AdSense, verify that `nexishub.vercel.app` is added as the site and inspect its review/status state.
2. In AdSense Privacy & messaging, configure the applicable European regulations message/CMP path, or document the selected compliant alternative, before serving personalised ads.
3. Run the bounded consent and mobile/desktop accessibility/performance checks in a real browser/device environment.
4. Complete legal review of Terms, Privacy, and Cookies.
5. Complete editorial review of high-overlap article clusters and factual/source claims.

The exact trust-claim questions are recorded in [`owner-verification.md`](./owner-verification.md). Technical/legal separation and QA status are recorded in [`technical-qa-register.md`](./technical-qa-register.md).

## Post-approval recommendations

Use conservative, content-led ad placements only after approval. Monitor layout stability, accidental-click risk, user experience, policy notices, and article-level performance. Do not enable ads on forms, legal pages, private routes, or thin utility surfaces without a documented reason.

## Evidence table

| Criterion | Status | Evidence | Remaining Action |
|---|---|---|---|
| Public crawlability | PARTIAL | Live robots, sitemap, and representative routes returned 200 | Recheck after deployment |
| Sitemap/indexability consistency | PARTIAL | Local build excludes search utility; live baseline still predates fix | Deploy and recrawl |
| ads.txt | PASS | Live HTTP 200 `text/plain`; exact row verified | Monitor AdSense account status |
| AdSense integration | PASS — TECHNICAL INTEGRATION VERIFIED | Exact client ID found in deployed public client bundle; no root/admin loader | Do not confuse technical integration with Google approval |
| Original/useful content | NOT PROVEN | 67 blog URLs; overlap and factual review incomplete | Editorial review |
| Publisher identity | PASS — OWNER VERIFIED | About page identifies NexisHub and founder; founder verified existing Trusted by relationships | Do not add unsupported claims |
| Legal/privacy | PARTIAL — TECHNICAL PASS | Pages are linked, coherent, and marked drafts | Qualified legal review |
| Accessibility/mobile/performance | PARTIAL — RESIDUAL QA | Programmatic production checks passed; browser/device evidence unavailable | Complete proportionate manual QA |
| Consent/CMP | OWNER ACTION REQUIRED | First-party consent gates loader; no account/CMP/TCF evidence | Configure and verify applicable AdSense consent path |
| Account review | OWNER ACTION REQUIRED | Site status and review state unavailable | Owner verifies account/property state |

## Official references

- [Google AdSense eligibility requirements](https://support.google.com/adsense/answer/9724)
- [Google guidance for pages ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Google ads.txt FAQs](https://support.google.com/adsense/answer/9785052)
- [Google consent management requirements for publishers](https://support.google.com/adsense/answer/13554116)
- [Google AdSense Privacy & messaging setup](https://support.google.com/adsense/answer/7670013)
- [Google robots.txt guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
- [Google robots meta-tag guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
