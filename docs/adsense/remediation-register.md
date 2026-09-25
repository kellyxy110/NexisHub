# AdSense Remediation Register

| ID | Priority | Finding | Status | Evidence |
|---|---|---|---|---|
| ADS-001 | P0 | `/ads.txt` returns 404 and no publisher ID is configured | Repository remediation implemented; production verification pending | Exact owner-supplied row is `google.com, pub-3694194350196538, DIRECT, f08c47fec0942fa0`; deploy and fetch |
| ADS-002 | P0 | No AdSense loader or site verification evidence | Repository remediation implemented; production/browser verification pending | Scoped loader uses the exact authorized client ID and waits for consent; verify after deployment |
| ADS-003 | P0 | Legal pages are drafts, not approved policies | Pending external review | Live legal pages and source status marker |
| ADS-004 | P1 | Research search was in sitemap with homepage canonical | Remediated in code; live redeploy verification pending | Repository fix and Loop 0 live baseline |
| ADS-005 | P1 | Homepage product count contradicted product registry | Remediated in code; live redeploy verification pending | Six registry records vs “Five focused products” |
| ADS-006 | P1 | Static core sitemap dates use hard-coded 2026-07-20 | Open | `src/app/sitemap.ts` |
| ADS-007 | P1 | High-overlap editorial cluster requires manual review | Open | Similar topic families identified; no automatic pruning performed |
| ADS-008 | P1 | Social-proof relationship evidence/permissions not present in repository | Owner verification required | Homepage/About links to Genshipyard and Truvyx |
| ADS-009 | P1 | Consent and advertising runtime behaviour not proven | Open | No active AdSense integration; legal review pending |
| ADS-010 | P2 | Robots `Host:` directive may be redundant | Open recommendation | Live robots and Google robots documentation |
