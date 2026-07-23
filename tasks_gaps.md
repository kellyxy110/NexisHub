# NexisHub — Tasks & Gaps

Single source for unresolved work after DEC-020. Product claims and pricing must remain synchronized with the live SiteNexis deployment.

---

## Priority 1 — launch implementation

| Task | Status / dependency |
|---|---|
| Complete `/products/sitenexis` | **Complete locally** — verify claims and pricing against the live product before each release |
| Connect all SiteNexis CTAs | **Complete locally** — centralized in `src/lib/site-links.ts` |
| Complete About, Contact, and Legal routes | **Complete locally** — corporate identity and legal approval remain external launch gates |
| Add sitemap, robots, llms.txt, structured data, canonical metadata | **Complete locally** — production validation remains part of deployment QA |
| Add analytics and form adapters | **Provider-neutral boundary complete** — provider selection, credentials, rate limiting, and delivery tests remain |
| Add tests and Vercel deployment configuration | **Complete locally** — preview/production deployment and browser-level QA remain |
| Publish first Blog articles | **Implemented under DEC-020** — 16 total guides, including the 15-post AI Visibility cluster; editorial release gate remains |
| Publish first Research papers | Landing platform complete; real research data, methods, authors, and approval remain [NEEDS INPUT] |
| Add reciprocal SiteNexis backlinks | Manifest complete; requires the separate SiteNexis repository, deployment access, and rendered-link verification |

---

## Priority 2 — required external input before public launch

| Task | Notes |
|---|---|
| Legal review of Terms, Privacy, and Cookie Policy | Drafts are not legal advice and must not be represented as approved |
| Corporate identity | Legal entity name, registration details, jurisdiction, NexisHub domain, and company contact address |
| Form delivery | Approved destination or provider for contact and newsletter submissions |
| Analytics/monitoring | Approved provider and production credentials |
| SiteNexis screenshots | Public interface can be represented; authenticated/customer data requires approved assets |
| AdNexis relationship | Decide whether it belongs inside the NexisHub ecosystem |

---

## Priority 3 — company content

- Real founder story, leadership bios, team list, portraits, and consent to publish
- Careers state and any real openings
- Investor-page visibility and approved financial/traction material
- Press contact and approved media assets
- PRDs for TeachNexis, LogicLand, EventNexis, and CareBridge

---

## Current release sequence

1. Complete the editorial review recorded in `editorial-release-review.md`; resolve all blocking findings before production deployment.
2. Add the 15 reciprocal SiteNexis links using `sitenexis-backlink-manifest.md` and verify them in rendered production HTML.
3. Select and configure form delivery, analytics, and monitoring providers; update the legal drafts before enabling them.
4. Obtain corporate identity and legal approval.
5. Create a Vercel preview, run browser/accessibility/link/schema checks, then approve production deployment.

---

## Priority 4 — shared-platform implementation

- Select NexisAuth provider and cross-product session model
- Verify SiteNexis billing is organization-scoped; unify only when product #2 needs billing
- Route product AI calls through the NexisAI contract when the shared engine is implemented
- Select shared analytics, monitoring, secrets, and notification providers
- Add feature-flag infrastructure when a server-managed flag is required

---

## Content integrity rules

- Never invent testimonials, customer results, team biographies, legal approval, company registration details, or financial metrics.
- SiteNexis product and price claims come from the live product; synchronize them before release.
- Show `[NEEDS INPUT]` internally and an honest unavailable/not-published state publicly.
- AdNexis remains outside the accepted NexisHub product list until explicitly decided.
