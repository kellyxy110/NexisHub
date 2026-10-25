# AdSense Remediation Register

| ID | Priority | Finding | Status | Evidence |
|---|---|---|---|---|
| ADS-001 | P0 | `/ads.txt` returned 404 and no publisher ID was configured | Closed technically | Live 200/plain-text response contains the exact owner-authorized row |
| ADS-002 | P0 | No AdSense loader or site verification evidence | Closed technically; account approval separate | Deployed public bundle contains the exact consent-gated client loader; no account approval is implied |
| ADS-003 | P0 | Legal pages are drafts, not approved policies | Pending external review | Live legal pages and source status marker |
| ADS-004 | P1 | Research search was in sitemap with homepage canonical | Closed and live-verified | Live route is self-canonical/noindex and absent from the 94-URL sitemap |
| ADS-005 | P1 | Homepage product count contradicted product registry | Closed and live-verified | Live homepage says “Six focused products” |
| ADS-006 | P1 | Static core sitemap dates used hard-coded 2026-07-20 | Closed technically in discovery release | Core routes omit invented modification dates; articles use their recorded update dates |
| ADS-007 | P1 | High-overlap editorial cluster requires manual review | Open | Similar topic families identified; no automatic pruning performed |
| ADS-008 | P1 | Social-proof relationship evidence/permissions not present in repository | Closed as owner-verification gate | Founder explicitly confirmed the Genshipyard and Truvyx relationships; no additional claims were added |
| ADS-009 | P0 for personalised ads in applicable regions | Regional advertising consent signals not fully proven | Partial; covered-region runtime test pending | New-domain CMP message published. Independent default-off ad-loading preference replaces analytics coupling; runtime tests cover route scope, opt-in and unload. Local opt-in does not grant personalised-ad consent. Provider TCF/rejection behavior remains a separate verification gate |
| ADS-010 | P2 | Robots `Host:` directive may be redundant | Open recommendation | Live robots and Google robots documentation |

New-domain account status (2026-10-25): thenexishub.org ownership verified, ads.txt Authorized, Review requested / Getting ready. Approval remains pending.
