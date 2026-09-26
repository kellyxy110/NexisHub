# AdSense Readiness Register

Status as of 2026-09-26: `CONDITIONALLY READY — HERO FIX DEPLOYMENT AND CONSENT RECONCILIATION EVIDENCE PENDING`.

| Area | Requirement | Evidence | Current status | Risk | Remediation / verification |
|---|---|---|---|---|---|
| Publisher ownership | Owner can access site source and AdSense account | Owner supplied `pub-3694194350196538`; official Google format verified | PASS — OWNER-SUPPLIED AND VERIFIED FORMAT | High | Keep account-level approval and site status separate |
| ads.txt | Valid publisher record at root | Live `/ads.txt` returns 200 `text/plain` with exact authorized Google row | PASS | P1 | Recheck if publisher/account instructions change |
| AdSense loader | Correct, non-duplicated loader | Deployed public client bundle contains one scoped loader using `ca-pub-3694194350196538`; absent from root layout/admin HTML | PASS — TECHNICAL INTEGRATION VERIFIED | P1 | Keep actual ad units and Auto Ads account settings separately controlled |
| robots | Public content crawlable and sitemap discoverable | Live 200 response has wildcard allow, `/api/` disallow, and canonical sitemap without `Host:` | PASS | P1 | Continue independent API security audit |
| sitemap | Contains canonical, valuable URLs | Live 200 XML contains 83 production URLs and excludes search utility | PASS | P1 | Review source-of-truth dates in later editorial loop |
| indexability | No contradictory sitemap/canonical/robots signals | Live search route is self-canonical and `noindex, follow`; it is absent from the sitemap | PASS for remediated finding | P1 | Reopen only if production regresses |
| content originality | Unique, useful, relevant material | 67 blog URLs; source and overlap audit pending | NOT PROVEN | P1 | Human review high-overlap clusters and factual claims |
| navigation | Clear user navigation | Public hubs and internal links exist | PARTIAL | P1 | Crawl internal graph; repair orphans/broken links |
| authorship | Accountable publisher/author identity | Founder and NexisHub visible | PARTIAL | P1 | Verify biography/experience claims and editorial ownership |
| legal/privacy | Accurate policy and consent behaviour | Pages exist, are technically consistent, and remain marked drafts | PARTIAL — TECHNICAL PASS, LEGAL REVIEW PENDING | P1 | External legal review and advertising/CMP account decisions remain separate |
| contact | Working public contact path | Form route exists; delivery not independently proven | NOT PROVEN | P1 | Safe end-to-end test with approved webhook/configuration |
| trust claims | “Trusted by” relationships are accurate | Founder explicitly confirmed Genshipyard and Truvyx relationships in Loop 3 | PASS — OWNER VERIFIED | P1 | Do not embellish beyond the existing names/links |
| consent/CMP | Advertising consent is suitable for applicable traffic | Owner reports Google Privacy & Messaging “NexisHub European Consent” is published for `nexishub.vercel.app`; interaction with the first-party banner and loader remains unverified | PASS — ACCOUNT CONFIGURATION REPORTED; RUNTIME RECONCILIATION PENDING | P0 only if serving personalised ads without valid signals | Verify one effective consent flow in a real browser; do not add a competing CMP |
| mobile/accessibility | Usable page templates | Automated checks exist; no browser/device environment is available in this audit | PARTIAL — RESIDUAL MANUAL QA | P2 | Complete bounded browser QA when a real browser/device is available |
| performance | Stable user experience after monetization | Live HTTP request sizes/timings exist; LCP/CLS/INP browser measurements are unavailable | PARTIAL — RESIDUAL MEASUREMENT | P2 | Measure representative pages in a browser-capable environment |
| hero visual quality | Featured editorial visual is contained and non-redundant | Owner observed cropped text in the featured blog card; bounded fix is implemented locally and awaits production verification | P1 — FIX IN PROGRESS | Visible production quality defect | Deploy and verify the featured card at representative widths |
| account/site review | Google review requested and ready | Owner reports site added, ownership verified through ads.txt, status `Requires review`, and request button available; review not requested | OWNER ACTION — READY FOR MANUAL REQUEST AFTER FIX | High | Owner manually requests review after production fix verification |
