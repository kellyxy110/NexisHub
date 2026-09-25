# AdSense Remediation Register

| ID | Priority | Finding | Status | Evidence |
|---|---|---|---|---|
| ADS-001 | P0 | `/ads.txt` returned 404 and no publisher ID was configured | Closed technically | Live 200/plain-text response contains the exact owner-authorized row |
| ADS-002 | P0 | No AdSense loader or site verification evidence | Closed technically; account approval separate | Deployed public bundle contains the exact consent-gated client loader; no account approval is implied |
| ADS-003 | P0 | Legal pages are drafts, not approved policies | Pending external review | Live legal pages and source status marker |
| ADS-004 | P1 | Research search was in sitemap with homepage canonical | Closed and live-verified | Live route is self-canonical/noindex and absent from the 83-URL sitemap |
| ADS-005 | P1 | Homepage product count contradicted product registry | Closed and live-verified | Live homepage says “Six focused products” |
| ADS-006 | P1 | Static core sitemap dates use hard-coded 2026-07-20 | Open | `src/app/sitemap.ts` |
| ADS-007 | P1 | High-overlap editorial cluster requires manual review | Open | Similar topic families identified; no automatic pruning performed |
| ADS-008 | P1 | Social-proof relationship evidence/permissions not present in repository | Closed as owner-verification gate | Founder explicitly confirmed the Genshipyard and Truvyx relationships; no additional claims were added |
| ADS-009 | P0 for personalised ads in applicable regions | Consent and advertising runtime behaviour not fully proven | Owner/account action required | Loader is consent-gated; Google Privacy & messaging/CMP account configuration, TCF signals, and browser interaction remain unverified |
| ADS-010 | P2 | Robots `Host:` directive may be redundant | Open recommendation | Live robots and Google robots documentation |
