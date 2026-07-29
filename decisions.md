# NexisHub — Decision Log

Format: lightweight ADR (Architecture/Product Decision Record). Add new entries at the top. Each entry: context → decision → status.

### DEC-025 — Production completion uses truthful operational scaffolding
**Context:** NRI and Nexis Studio require legal review, appointments, consent, permissions, and other real-world actions that cannot be completed by repository code.
**Decision:** Build the complete repository-side workflows, schemas, templates, status systems, empty states, authorization boundaries, exports, and documentation. Keep legal review, reviewer appointments, pilot participation, findings, permissions, and manual QA pending until evidence exists.
**Status:** Accepted.

### DEC-024 — Nexis Research Institute remains Founder-Led Stage
**Context:** NRI has a charter, programmes, a Version 0.1 working paper, governance documents, and pilot infrastructure, but no completed external review or pilot findings.
**Decision:** NRI operates as a founder-led initiative within NexisHub. Ekeleme Kelechi David is the Founding Research Lead and Executive Director. Technical, methodology, and ethics reviewers remain Vacant / To Be Appointed. Legal review remains Pending External Legal Review. The AI Visibility Index remains Version 0.1, Pre-Review Working Paper.
**Status:** Accepted.

### DEC-023 — Pnyx is a NexisHub flagship product
**Context:** The founder supplied `https://pnyx-psi.vercel.app`. The public page responds successfully and identifies Pnyx as a technology knowledge network whose conversations become organised knowledge.
**Decision:** Add Pnyx to the product registry as a Live flagship product at `https://pnyx-psi.vercel.app`. Use only the verified public positioning until a fuller product brief is approved.
**Status:** Accepted.


---

### DEC-022 — TeachNexis and EventNexis are live products
**Context:** After public product surfaces were linked under DEC-021, the founder confirmed that EventNexis and TeachNexis are live.
**Decision:** Mark TeachNexis and EventNexis as `Live` in the NexisHub product registry and machine-readable guidance. Keep LogicLand and CareBridge as `In development` until a separate launch-status decision is made. SiteNexis remains live and keeps its dedicated full product page.
**Status:** Accepted.

---

### DEC-021 — Public in-development product surfaces are linked from NexisHub
**Context:** The founder provided public Vercel URLs for TeachNexis, LogicLand, EventNexis, and CareBridge after the initial launch-candidate implementation.
**Decision:** Add those URLs to the NexisHub product registry and machine-readable guidance as public in-development product surfaces: TeachNexis `https://teachnexis.vercel.app`, LogicLand `https://logicland.vercel.app`, EventNexis `https://eventnexis.vercel.app`, and CareBridge `https://carebridge-io.vercel.app`. Keep SiteNexis as the only product marked `Live` until the founder explicitly approves a launch-status change for the other products.
**Status:** Accepted; product-status portion superseded by DEC-022 for TeachNexis and EventNexis.

---

### DEC-020 — Initial AI Visibility editorial cluster is approved for implementation
**Context:** DEC-019 established an honest empty publication state because no articles had been authorized. The founder subsequently requested an initial 15-post AI Visibility cluster, approved its topic/backlink plan, and directed implementation of the complete publishing tasks.
**Decision:** Publish a NexisHub AI Visibility & Machine Discovery cluster consisting of one canonical pillar and 14 supporting field guides. Every guide must link to its pillar, relevant sibling guides, the AI Software Development pillar where applicable, primary authority references, and one complementary SiteNexis technical note. The content must distinguish verified documentation, observation, inference, and modeled estimates; it must not promise rankings or citations. SiteNexis reciprocal links are maintained as a separate-repository deployment task. Bulk publication remains subject to the editorial release review and production deployment gate.
**Status:** Accepted. Supersedes DEC-019's empty blog state while preserving its evidence and content-integrity requirements.

---

### DEC-019 — Canonical website URL and editorial platform
**Context:** The NexisHub Vercel project is deployed and the founder supplied `blog.md`, defining a premium knowledge platform and research experience. No approved articles, authors, dates, or research papers were supplied.
**Decision:** The canonical production URL is `https://nexishub.vercel.app`. Build `/blog` and `/research` now as complete discovery/landing experiences, including editorial hubs, filtering/search architecture, RSS, metadata, and honest empty publication states. Do not fabricate posts or papers; populate the archive only from approved source content.
**Status:** Accepted. Empty-publication provision superseded by DEC-020; platform and canonical-URL decisions remain active.

---

### DEC-018 — Live SiteNexis deployment is the public product source of truth
**Context:** The original website PRD used provisional SiteNexis language and marked features, pricing, screenshots, and go-to-market as unknown. The live product at `https://sitenexis.vercel.app` now publishes its methodology, feature set, pricing, documentation, and self-serve audit flow.
**Decision:** NexisHub uses the live SiteNexis product as the source of truth for public product claims. Canonical positioning is “AI Retrieval & Machine Trust Intelligence.” Public features include 16 intelligence agents, four dependency layers, 12 explainable scores, six-stage retrieval simulation, entity intelligence, citation probability, recommendation-surface mapping, and P0/P1/P2 fix planning. Pricing is Free ($0), Starter ($29/month), Pro ($79/month), and Agency ($249/month), subject to synchronization with the live pricing page. NexisHub CTAs link to the live application. AdNexis is not added to the accepted NexisHub ecosystem until its relationship to NexisHub is explicitly decided.
**Status:** Accepted. Supersedes provisional SiteNexis wording and open feature/pricing questions in the PRD.

---

### DEC-017 — Website ships as a single Next.js repo; monorepo restructuring deferred
**Context:** `master-architecture.md` §5/§7 flagged monorepo-vs-multi-repo as the one remaining question gated on the tech-stack decision.
**Decision:** Build the website as a single standard Next.js app repo. No monorepo/shared-package structure yet — there's only one deployable thing (the marketing site) right now. Revisit when a second product needs actual shared *code* (not just shared design tokens/docs), consistent with the "build infrastructure when a real product needs it" principle already applied in DEC-009 and DEC-012.
**Status:** Accepted.

---

### DEC-016 — SiteNexis go-to-market motion: self-serve with free tier/trial
**Context:** `PRD.md` §8 open question; blocked CTA design and pricing-page structure.
**Decision:** Self-serve — visitors sign up and use the product directly. Primary CTA language: "Start Free" / "Get Started," not "Book a Demo" or "Join the Waitlist."
**Status:** Accepted. See `PRD.md` §8.

---

### DEC-015 — Website content is hardcoded/MDX in the repo, not a headless CMS
**Context:** `PRD.md` §5 flagged CMS choice as needed before content architecture could be finalized.
**Decision:** Engineers manage content (product pages, blog/research articles, legal pages) via code + PR, using MDX where long-form content benefits from it. Revisit a headless CMS if/when content ownership shifts to non-engineering team members.
**Status:** Accepted. See `PRD.md` §5.

---

### DEC-014 — Tech stack: Next.js + Vercel
**Context:** Tech stack was the top blocking Priority 1 item in `tasks_gaps.md`, gating `master-architecture.md`'s remaining "still needs" rows, the CMS choice, and Volume III of `documentation.md`.
**Decision:** Next.js on Vercel. Rationale: fits the design system's performance-budgeted, animation-heavy homepage (SSR/ISR for LCP, straightforward reduced-motion fallback rendering per DEC-002), and Vercel gives per-PR preview deployments without separate CI setup.
**Status:** Accepted. See `master-architecture.md` §4, §5; `documentation.md` Volume III.

---

### DEC-013 — AI human-review checkpoints are a shared mechanism, per-product policy
**Context:** `master-architecture.md` §3.3 flagged that AI output risk varies sharply by product (a SiteNexis visibility score vs. a CareBridge patient-facing suggestion) and needed a decision on how review gets enforced.
**Decision:** NexisAI exposes a shared review/confidence-checkpoint mechanism (confidence scoring, human-sign-off flag, user-override hook). Each product configures its own bar on top of it — e.g. SiteNexis can auto-publish, CareBridge would require mandatory human sign-off before patient-facing output ships. No platform-wide review bar is hardcoded, but every product must configure one.
**Status:** Accepted. See `master-architecture.md` §3.3.

---

### DEC-012 — Billing launches standalone for SiteNexis, unifies into NexisPay when product #2 needs it
**Context:** `master-architecture.md` §3.2 flagged whether org-level billing should be unified across products from day one or built per-product first.
**Decision:** SiteNexis launches with its own standalone billing integration. Shared NexisPay only gets built when a second paying product actually needs it — consistent with `documentation.md` Volume II's "build infrastructure when a real product needs it" recommendation. Billing data stays modeled at the Organization level (not per-user) from the start, so unification later is a backend consolidation, not a data migration.
**Status:** Accepted. See `master-architecture.md` §3.2.

---

### DEC-011 — NexisHub Master Architecture drafted stack-agnostic, ahead of the stack decision
**Context:** DEC-010 called for the Master Architecture doc before a second product starts development, but tech stack is still undecided (Priority 1 in `tasks_gaps.md`).
**Decision:** Draft the doc now defining shared-platform *contracts and responsibilities* (identity, billing, AI core, analytics, design system, security/monitoring, deployment shape) without committing to implementations, so it doesn't block on the stack decision and doesn't need to be re-derived once the stack is chosen — only the "still needs" rows in `master-architecture.md` §4 depend on it.
**Status:** Accepted. Reviewed — see DEC-012, DEC-013 for the two open questions it surfaced. `master-architecture.md` is now v1.0/Accepted, with monorepo-vs-multi-repo structure the only remaining item still gated on the tech-stack decision.

---

### DEC-010 — NexisHub Master Architecture is the next document, before a second product starts
**Context:** Constitution recommends a Master Architecture doc (auth, billing, AI core, analytics, design system, deployment) that every product inherits from.
**Decision:** Write it before TeachNexis/LogicLand/EventNexis/CareBridge move past "purpose defined" into active development.
**Status:** Accepted, not started. Tracked in `tasks_gaps.md`.

---

### DEC-009 — Future products are shared infrastructure, not standalone verticals
**Context:** Original future-products list (FinanceNexis, RecruitNexis, CommerceNexis, ResearchNexis, GovNexis) implied separate vertical products.
**Decision:** Reframed as an infrastructure suite the company builds for itself first: NexisAI (shared intelligence engine), NexisCloud, NexisDeploy, NexisDocs, NexisForms, NexisCRM, NexisMail, NexisAuth, NexisPay.
**Status:** Accepted. Supersedes the vertical-products framing in the original brainstorm.

---

### DEC-008 — Each core product has a defined one-line purpose
**Context:** Products previously existed only as names.
**Decision:** SiteNexis = AI Visibility Intelligence Platform; TeachNexis = AI-powered education platform; LogicLand = interactive learning (coding/math/logic); EventNexis = event management (invitations/registration/QR/reporting); CareBridge = healthcare provider–patient communication/workflows.
**Status:** Accepted. See `PRD.md` §4.2 and `documentation.md` Volume II.

---

### DEC-007 — NexisHub is positioned as an AI Infrastructure Company, not a single-product company with a corporate wrapper
**Context:** Original framing risked reading as "the company that owns SiteNexis."
**Decision:** Position as an AI infrastructure company where every product shares common platform infrastructure (auth, billing, AI layer, analytics, design system) and extends it rather than reinventing it.
**Status:** Accepted. This is now the top-level frame for `PRD.md`, `CLAUDE.md`, and Volume I of `documentation.md`.

---

### DEC-006 — Documentation scope is staged, not all-at-once
**Context:** Original vision called for a single 400–600+ page master documentation set across 15 volumes, built up front.
**Decision:** Build the skeleton now (`documentation.md`), but write each volume when the company actually reaches the stage that volume describes (e.g., Sales volume once there's a sales process), rather than pre-writing speculative content for stages that don't exist yet.
**Status:** Accepted
**Reasoning:** Documentation written ahead of reality tends to be fiction that has to be rewritten anyway; staged docs stay accurate and get finished faster where it matters (Foundation, Product, Design).

---

### DEC-005 — AI prompt bar is v2, not v1
**Context:** Homepage concept includes a persistent "What would you like to build today?" input that routes visitors intelligently.
**Decision:** Ship the marketing site without it first; build the backend recommendation logic before designing the frontend for it.
**Status:** Accepted
**Reasoning:** A prompt bar that doesn't actually respond intelligently undermines the "intelligent company" positioning it's meant to reinforce.

---

### DEC-004 — Product ecosystem is visualized as a network/galaxy, not a card grid
**Context:** Homepage needs to communicate "connected ecosystem," not "list of separate products."
**Decision:** NexisHub as center node, five products as connected satellite nodes, pulsing connections, mouse-reactive.
**Status:** Accepted, needs performance fallback (see DEC-002).

---

### DEC-003 — Each product gets a dedicated accent color
**Context:** Five products need to feel distinct while remaining part of one visual system.
**Decision:** SiteNexis = Blue, TeachNexis = Emerald, EventNexis = Purple, LogicLand = Orange, CareBridge = Rose. Base palette stays Graphite Black / White across all products; only the accent shifts.
**Status:** Accepted.

---

### DEC-002 — Heavy homepage animation requires a reduced-motion / low-power fallback
**Context:** Animated network background + scroll-pinned morphing laptop is a real performance and accessibility risk.
**Decision:** Build a static/simplified version first; treat the full animated version as progressive enhancement gated behind performance budget (see `PRD.md` §5) and `prefers-reduced-motion`.
**Status:** Accepted.

---

### DEC-001 — SiteNexis is the flagship product for launch
**Context:** Five products exist in the roadmap (SiteNexis, TeachNexis, EventNexis, LogicLand, CareBridge), but only one needs to be fully real at website launch.
**Decision:** Website and PRD treat SiteNexis as the only "live" product at v1; others show as "in development" with waitlist capture.
**Status:** Accepted; product-status portion superseded by DEC-022 for TeachNexis and EventNexis.

---

## Open decisions (not yet made — need your input)

- Whether Investors and Careers pages are public or gated at launch
- Legal entity/registration details for Corporate Identity section
- Real team/founder content for About page — pending consent to publish
- Whether AdNexis is a NexisHub core product, a SiteNexis-adjacent product, or outside the NexisHub ecosystem
- Analytics, form-delivery, and monitoring providers for the NexisHub website

## DEC-026 — Commit and deployment cadence

**Status:** Accepted

Completed repository implementation slices will update this decisions log and the root README, then be verified, committed, pushed to the `kellyxy110` GitHub account, and deployed to the NexisHub Vercel project. Deployment does not change truthful research, legal, reviewer, pilot, consent, or portfolio statuses.

## DEC-027 — Administration foundation boundary

**Status:** Accepted

NRI and Studio workflow primitives may be implemented before database and authentication infrastructure exists. They remain scaffolding until server-side identity, persistence, authorization, audit storage, and operational safeguards are connected. No fake administrative records or approvals may be presented.

## DEC-028 — Editorial monitoring is report-only by default

**Status:** Accepted

Editorial link monitoring reads the sitemap source, records link-health classifications, and writes a reviewable report. It does not remove, rewrite, or silently replace references. Network checks require an explicit `--check` invocation; the default mode makes no network requests.

## DEC-029 — Provider-neutral administration boundary

**Status:** Accepted

NRI and Studio administration will remain disabled until a real database, authentication provider, audit store, migration plan, backup strategy, and privacy/security review are selected and configured. The repository now exposes a provider-neutral configuration boundary and does not claim that any provider or admin backend exists.

## DEC-030 — Fail-closed administration store

**Status:** Accepted

The provider-neutral `AdminStore` contract is implemented with a `DisabledAdminStore` until a real persistence, identity, and audit implementation is configured. Every administrative read or write currently fails closed. No in-memory substitute is used for production administration.

## DEC-031 — Provider selection remains explicit

**Status:** Pending Founder Decision

The repository now contains a provider-selection checklist and non-secret environment contract. No database, authentication, audit, file-storage, or email provider is selected by code. Administration remains disabled until the founder approves the provider architecture and the required legal, privacy, security, migration, backup, and rollback evidence exists.

## DEC-032 — Reuse discovered production architecture; gate administration by feature

**Status:** Accepted

Repository inspection confirmed Vercel deployment, GitHub source control, and an encrypted Vercel form webhook configuration. No authentication provider, database/ORM, storage provider, email provider, monitoring provider, or backup/restore system was found in the NexisHub repository or Vercel production environment variable listing.

The implementation now uses modular feature flags rather than treating the entire administration surface as one switch. All flags default to false. Founder-only administration can become eligible only when real server-side authentication, infrastructure configuration, and security evidence exist. Pilot, consent, reviewer, Studio operations, and email modules remain independently gated.

## DEC-033 — Staged founder-safe administration

**Status:** Accepted

Administration will not wait for every governance process before safe capabilities become eligible. The repository now supports staged activation. `founderSafeAdminEnabled` requires explicit production evidence for authentication readiness, migrations, security checks, founder verification, infrastructure configuration, and the top-level admin flag. Higher-risk modules retain independent flags and remain gated until their specific legal, privacy, research, or operational requirements are complete.

## DEC-034 — Founder-admin activation requires real evidence

**Status:** Accepted

The staged configuration now includes `ADMIN_ENABLED`, `FOUNDER_ADMIN_ENABLED`, `NRI_PUBLICATION_ADMIN_ENABLED`, `NRI_REVIEW_ADMIN_ENABLED`, `NRI_CONSENT_ADMIN_ENABLED`, `NRI_PILOT_ADMIN_ENABLED`, `STUDIO_OPERATIONS_ENABLED`, `EMAIL_INVITATIONS_ENABLED`, and `PUBLICATION_V1_ENABLED`. Founder-safe activation requires infrastructure configuration, authentication readiness, migration readiness, security checks, founder verification, and both top-level admin flags. Sensitive modules remain independently gated.

A provider-neutral server-side authorization primitive now denies access when the staged admin state is off, the principal is unverified, or the principal lacks the requested permission.

## DEC-035 — Approved production administration stack implemented

**Status:** Implemented in code; production configuration pending

Use Auth.js with passwordless email verification, Supabase PostgreSQL through Prisma 7 and the PostgreSQL adapter, Supabase Storage, Vercel encrypted environment variables, Sentry, Resend with sending disabled, and PostgreSQL audit persistence. Do not introduce a second authentication or database system.

The supplied `db.prisma.io` credential is Prisma Postgres, not Supabase, and was deliberately not stored or used under the Supabase `DATABASE_URL` contract. A Supabase project connection string remains required.
