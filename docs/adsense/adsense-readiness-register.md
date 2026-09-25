# AdSense Readiness Register

Status as of 2026-09-25: `NOT READY TO SUBMIT`.

| Area | Requirement | Evidence | Current status | Risk | Remediation / verification |
|---|---|---|---|---|---|
| Publisher ownership | Owner can access site source and AdSense account | Repository and Vercel access verified; AdSense account not available | OWNER ACTION REQUIRED | High | Owner verifies site/property in AdSense; do not claim completion |
| ads.txt | Valid publisher record at root | Live `/ads.txt` returned 404 | FAIL | P0 | Owner supplies exact publisher ID; add only after authorization; live verify 200/plain text |
| AdSense loader | Correct, non-duplicated loader | No loader or publisher ID found | NOT PROVEN | P0 | Implement only after owner provides account/publisher decision |
| robots | Public content crawlable and sitemap discoverable | Live robots 200; `/api/` disallowed; sitemap valid | PARTIAL | P1 | Review redundant `Host:` directive and API rendering dependencies |
| sitemap | Contains canonical, valuable URLs | 84 URLs; search utility removed in code | PARTIAL | P1 | Redeploy and re-audit; correct source-of-truth dates |
| indexability | No contradictory sitemap/canonical/robots signals | `/research/search` contradiction found and fixed locally | PARTIAL | P1 | Live verify after deployment |
| content originality | Unique, useful, relevant material | 67 blog URLs; source and overlap audit pending | NOT PROVEN | P1 | Human review high-overlap clusters and factual claims |
| navigation | Clear user navigation | Public hubs and internal links exist | PARTIAL | P1 | Crawl internal graph; repair orphans/broken links |
| authorship | Accountable publisher/author identity | Founder and NexisHub visible | PARTIAL | P1 | Verify biography/experience claims and editorial ownership |
| legal/privacy | Accurate policy and consent behaviour | Pages exist and are marked drafts | OWNER ACTION REQUIRED | P0/P1 | Qualified legal review; verify runtime consent behaviour |
| contact | Working public contact path | Form route exists; delivery not independently proven | NOT PROVEN | P1 | Safe end-to-end test with approved webhook/configuration |
| mobile/accessibility | Usable page templates | Automated repository checks exist; manual QA pending | NOT PROVEN | P1 | Manual mobile, keyboard, screen-reader, print QA |
| performance | Stable user experience after monetization | Local build evidence; production metrics not measured | NOT PROVEN | P1 | Measure representative production routes before ads |
| account review | Google review requested and ready | No account-level evidence | OWNER ACTION REQUIRED | High | Do not submit until technical and owner gates close |
