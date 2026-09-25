# Loop Engineering Ledger

## Loop 0 — Forensic discovery baseline

- Finding: The production property has public crawl surfaces but no ads.txt or AdSense integration.
- Evidence: Live 200 robots and sitemap; live 404 ads.txt; repository search found no AdSense code or publisher ID.
- Hypothesis: The site is technically crawlable but cannot yet provide the publisher/account evidence required for a defensible monetization setup.
- Root cause: AdSense has not been configured and the owner has not supplied an authorized publisher ID.
- Blast radius: Monetization setup and qualification only; no public content was removed.
- Proposed change: Do not invent publisher data. Keep monetization disabled and request exact owner/account evidence.
- Implementation: Documentation only.
- Tests: Live HTTP checks; repository search; official Google documentation review.
- Live verification: Completed for baseline.
- Outcome: P0 owner gate remains open.

## Loop 1 — Indexability contradiction

- Finding: `/research/search` appeared in the sitemap while using the homepage canonical and `index, follow`.
- Hypothesis: The interactive utility is not a standalone publication intended for search indexing.
- Root cause: The route had no route-specific metadata and was included in the static route list.
- Blast radius: One research utility URL; no programme or publication pages.
- Change: Add a route metadata layout with self-canonical and `noindex, follow`; remove the URL from the sitemap.
- Verification required: Build, sitemap parse, live headers/HTML after deployment.
- Local verification: production webpack build passed; local `next start` returned 200 for robots, sitemap, search, and homepage; generated sitemap had 83 URLs and excluded `/research/search`. Live verification passed after deployment: robots 200, sitemap 200/83 URLs, search self-canonical plus `noindex, follow`.

## Loop 2 — Product claim contradiction

- Finding: Homepage said “Five focused products” while the product registry rendered six records including Pnyx.
- Root cause: Copy was not updated when Pnyx was added.
- Change: Update the visible count to six.
- Verification required: Live homepage text and regression tests.
- Local verification: production webpack build passed; local homepage contains “Six focused products”. Live verification passed on `https://nexishub.vercel.app`.

## Remaining uncertainty

- Google Search Console indexing state is not available in the repository.
- AdSense account status, publisher ID, ownership verification, consent certification, and review status are not available.
- Manual content originality, factual accuracy, accessibility, mobile, and performance review remains incomplete.

## Loop 3 — Robots directive cleanup

- Finding: The live robots response included a redundant `Host` directive.
- Hypothesis: Removing it leaves a simpler, standards-aligned response without affecting crawl access or sitemap discovery.
- Root cause: The metadata route emitted `host: base`.
- Blast radius: Robots response only.
- Change: Remove the `host` property and retain the wildcard rule plus canonical sitemap.
- Verification: Production build passed; live robots returned 200 without `Host:` after deployment.
- Outcome: Closed.
