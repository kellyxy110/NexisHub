# NexisHub — Tasks & Gaps

Single source for unresolved work after DEC-018. Product claims and pricing must remain synchronized with the live SiteNexis deployment.

---

## Priority 1 — launch implementation

| Task | Status / dependency |
|---|---|
| Complete `/products/sitenexis` | Unblocked by DEC-018 and the live SiteNexis product |
| Connect all SiteNexis CTAs | Use `https://sitenexis.vercel.app` and its public signup/login/pricing routes |
| Complete About, Contact, and Legal routes | Structure/content can ship; real company identity and legal approval remain external inputs |
| Add sitemap, robots, llms.txt, structured data, canonical metadata | Unblocked |
| Add analytics and form adapters | Implement provider-neutral boundary; provider IDs/endpoints remain [NEEDS INPUT] |
| Add tests and Vercel deployment configuration | Unblocked locally; production project/domain access remains external |
| Publish first Blog articles and Research papers | Landing platforms are built; actual titles/authors/dates/content remain [NEEDS INPUT] |

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
