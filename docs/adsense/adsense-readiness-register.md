# AdSense Readiness Register

Status as of 2026-09-25: `CONDITIONALLY READY — GOOGLE CMP/ACCOUNT AND BROWSER EVIDENCE REMAIN OWNER GATES`.

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
| consent/CMP | Advertising consent is suitable for applicable traffic | Local consent banner gates the loader; no AdSense Privacy & messaging/CMP account evidence or browser interaction evidence is available | OWNER ACTION REQUIRED | P0 for personalized ads in applicable regions | Configure and verify Google Privacy & messaging or another certified TCF CMP before serving personalized ads |
| mobile/accessibility | Usable page templates | Automated checks exist; no browser/device environment is available in this audit | PARTIAL — RESIDUAL MANUAL QA | P2 | Complete bounded browser QA when a real browser/device is available |
| performance | Stable user experience after monetization | Live HTTP request sizes/timings exist; LCP/CLS/INP browser measurements are unavailable | PARTIAL — RESIDUAL MEASUREMENT | P2 | Measure representative pages in a browser-capable environment |
| account review | Google review requested and ready | No account-level evidence | OWNER ACTION REQUIRED | High | Do not submit until technical and owner gates close |
