# NexisHub — Master Architecture v1.0

**Status:** Accepted v1.1 — billing, AI-review, website stack, hosting, CMS, and repository-shape decisions resolved (DEC-012 through DEC-017)
**Scope:** The shared platform every NexisHub product (SiteNexis today; TeachNexis, LogicLand, EventNexis, CareBridge next) builds on top of, instead of reinventing.
**Platform contracts remain stack-agnostic:** the marketing website is now Next.js on Vercel, uses code/MDX content, and remains a single repository (DEC-014, DEC-015, DEC-017). Backend/shared-service implementations remain intentionally unselected until a real product requirement forces each choice.

---

## 1. Why this document exists

Per `CLAUDE.md` and `decisions.md` DEC-010: building a second product against ad-hoc, product-specific infrastructure instead of a defined shared platform directly contradicts the "build once, reuse everywhere" engineering principle (`documentation.md` Volume III) and creates rework the moment a second product exists. This doc is the thing every future product PRD should point back to instead of re-deciding auth, billing, AI, and analytics from scratch.

**Read this before:** starting TeachNexis, LogicLand, EventNexis, or CareBridge past "purpose defined."
**Don't read this as:** a finished spec. Every layer below needs a stack decision and an actual implementation pass before a product can depend on it.

---

## 2. Architecture principles

Carried from `documentation.md` Volume III, made concrete for this doc:

1. **Build once, reuse everywhere** — a capability (auth, billing, AI call, analytics event) is implemented in the shared platform exactly once. A product never re-implements a capability the platform already provides; it configures or extends it.
2. **Products are tenants of the platform, not siblings of it** — SiteNexis, TeachNexis, etc. are consumers of shared services, not peers that each own their own copy of auth/billing/AI.
3. **One identity across the ecosystem** — a user who has a NexisHub account can move between products without re-registering. This is the architectural payoff of "connected ecosystem," not just a visual one (`designuiux.md` §1).
4. **The AI layer is infrastructure, not a per-product feature** — per `documentation.md` Volume X, every product's AI features are built on **NexisAI**, a shared intelligence engine, not a product-specific integration with an LLM provider.
5. **New infrastructure gets built when a real product needs it, not speculatively** — per `documentation.md` Volume II recommendation: NexisAuth, NexisPay, etc. are built out only when an actual product requires that capability, not all five in parallel before any product ships.
6. **Everything below the design system is invisible to the visitor** — none of this changes what the website/PRD describes; it's the machinery behind "Products are connected — shared intelligence, shared design language, shared quality bar" (`PRD.md` §1).

---

## 3. Shared platform layers

Each layer below corresponds to an entry in the Volume III "common infrastructure" list (Authentication, Organizations, Billing, AI Layer, Analytics, Notifications, Search, APIs, Design System, Security, Monitoring) plus the infrastructure-suite product names from `documentation.md` Volume II, where one exists.

### 3.1 Identity & Access (→ NexisAuth)

**Responsibility:** one account per human across the entire ecosystem; one place that knows who someone is, what organization(s) they belong to, and what they're allowed to do in each product.

- **Identity model:** a NexisHub-level user account is the root identity. Each product a user touches (SiteNexis, TeachNexis, …) is a *scope* on that identity, not a separate account. A user can have different roles per product (e.g., admin in SiteNexis, viewer in TeachNexis) without different logins.
- **Organizations:** businesses/teams are modeled once at the platform level (an "Organization" object with members, roles, billing owner) and referenced by every product, rather than each product having its own notion of a team.
- **Auth methods:** [NEEDS INPUT once stack is chosen] — e.g. email/password + OAuth providers + SSO for enterprise orgs. The decision belongs here once a provider/stack is picked (build vs. buy: Auth0/Clerk/WorkOS-style vs. custom).
- **Session/token strategy:** a session established in one product should be recognized across others when the user is logged into the NexisHub ecosystem — this is what makes "one connected ecosystem" real rather than five separate logins that happen to share a logo.
- **What a new product needs from this layer:** nothing to build. It calls NexisAuth for session validation, gets back identity + org + role, and enforces its own product-specific permissions on top of that role.

### 3.2 Billing (→ NexisPay)

**Responsibility:** one place that knows what an organization is subscribed to, across however many NexisHub products it uses.

- **Decided (DEC-012):** SiteNexis launches with its own standalone billing integration. NexisPay / unified org-level billing gets built when a second paying product actually needs it, not before. This matches the "build when needed" principle already in `decisions.md` and avoids building shared billing infrastructure against a single data point.
- **Model:** even though billing is standalone for now, it's still attached to the Organization (§3.1) rather than the individual user — so when unification happens, it's a backend consolidation, not a data-model migration. Do not model SiteNexis billing as user-level.
- **Plans/pricing:** product-specific. SiteNexis currently publishes Free ($0), Starter ($29/month), Pro ($79/month), and Agency ($249/month); the live pricing page is authoritative (DEC-018).
- **What a new product needs from this layer:** for now, its own standalone billing integration, org-scoped. Re-evaluate unification into shared NexisPay at the point a second product actually needs billing.

### 3.3 AI Core (→ NexisAI)

**Responsibility:** the single place every product's AI features route through — model calls, prompt/context management, and (later) the "intelligent recommendations" and "agent-assisted workflows" described in `documentation.md` Volume X.

- **Abstraction:** products call NexisAI with an intent (e.g., "score this site's AI visibility," "suggest a lesson plan"), not a specific model/provider API directly. This keeps model/provider choice ([NEEDS INPUT] — Volume X "still needed") swappable without touching every product.
- **Context isolation:** one product's AI usage/context must not leak into another's — a SiteNexis audit shouldn't inform a TeachNexis lesson suggestion. Shared engine, isolated per-product context.
- **Human review checkpoints — decided (DEC-013):** NexisAI exposes a shared review/confidence-checkpoint mechanism (e.g., confidence scoring, flagging for human sign-off, user-override hooks); each product sets its own bar on top of it. SiteNexis (visibility scores) can auto-publish; a higher-risk product like CareBridge (patient-facing suggestions) would configure mandatory human sign-off before output reaches a user. This is product-specific *policy* on a shared *mechanism* — the platform doesn't hardcode one review bar for every product, but every product must configure one, not skip it.
- **What a new product needs from this layer:** define what it wants AI to do (its own prompts/use-cases), not how to call a model provider, manage rate limits, or handle provider fallback — that's NexisAI's job.
- **The homepage AI prompt bar** (`designuiux.md` §12, `decisions.md` DEC-005) is the clearest example of why this layer has to exist before its UI does: the prompt bar is explicitly blocked on "a real recommendation engine," which is a NexisAI capability, not a frontend feature.

### 3.4 Analytics

**Responsibility:** one event pipeline and one definition of "what happened," so cross-product metrics (e.g., "how many SiteNexis users also touch TeachNexis") are possible instead of five incompatible analytics setups.

- **Event model:** every product emits events (page views, CTA clicks, feature usage) in one shared schema, tagged with product + org + user, into one pipeline — not a separate analytics tool per product.
- **Website-level needs already specified:** `PRD.md` §5 calls for CTA-click tracking, product-card hover/open tracking, and scroll depth on Home — these should emit through this shared layer from day one, even before other products exist, so the pipeline isn't retrofitted later.
- **What a new product needs from this layer:** instrument its own product-specific events against the shared schema; not build its own analytics ingestion.

### 3.5 Notifications, Search, APIs (shared services, lower priority)

Named in Volume III but not yet load-bearing for SiteNexis or the website:

- **Notifications:** one transactional/email-sending layer (candidate: **NexisMail**) products call rather than each integrating an email provider separately.
- **Search:** deferred until a product actually needs in-product search; not a launch requirement for the website or SiteNexis v1.
- **APIs:** if/when NexisHub exposes any product capability externally (API access as a SiteNexis feature, for instance), it should sit behind one API gateway pattern, not per-product ad-hoc endpoints. No current requirement forces this yet — noted so it isn't designed twice.

### 3.6 Design System

**Responsibility:** already specified in `designuiux.md` — palette, type, grid, components, motion. This section exists only to state the architectural implication: the design system should ship as a **shared, versioned component library** every product imports, not copy-pasted per product. Per-product accent colors (`designuiux.md` §2) are the intended axis of variation — base palette, type, spacing, motion, and component shapes are not supposed to drift between products.

**What a new product needs from this layer:** import the shared library, apply its assigned accent color (`CLAUDE.md` product table), don't invent new component patterns unless the shared system genuinely can't express something — and if that happens, that's a design-system change, not a one-off.

### 3.7 Security & Monitoring

- **Security:** cross-product data isolation is the concrete requirement — an org's data in one product must not be reachable from another product's context without an explicit, intentional integration. Secrets/credentials management is [NEEDS INPUT] once hosting is chosen.
- **Monitoring/Observability:** one place to see uptime/error rates across all products, so a second product doesn't mean a second monitoring setup from scratch. Specific tooling is [NEEDS INPUT], gated on hosting choice.

---

## 4. What's decided vs. what's still open

| Layer | Shape (this doc) | Still needs |
|---|---|---|
| Identity & Access | One identity, org-scoped roles per product | Auth provider/build-vs-buy decision |
| Billing | Standalone for SiteNexis, org-scoped data model; unify into NexisPay when product #2 needs billing (DEC-012) | Verify the existing SiteNexis implementation is org-scoped; live pricing is defined in DEC-018 |
| AI Core | One engine, per-product intent + isolated context; shared review/confidence mechanism, per-product review bar (DEC-013) | Model/provider choice; each product's specific review-bar configuration as it's built |
| Analytics | One event schema/pipeline, product-tagged | Tooling choice, gated on hosting |
| Notifications/Search/APIs | Deferred, named for later | Not needed pre-launch |
| Design System | Shared versioned library, accent = only per-product axis | Implementation, gated on frontend stack |
| Security/Monitoring | Cross-product isolation is the hard requirement | Tooling, gated on hosting |

The website stack no longer blocks implementation. Remaining rows are provider-level decisions that should be made only when the corresponding shared capability is implemented.

---

## 5. Deployment strategy

The NexisHub website deploys as a single Next.js repository on Vercel (DEC-014, DEC-017), with Vercel preview deployments for pull requests and a production deployment for the canonical domain.

- **Environments:** each product needs at minimum a production and a staging/preview environment; the shared platform layers (§3) need the same, and staging for a product should be able to point at staging versions of the shared services rather than production auth/billing/AI.
- **Repository shape:** the website remains a single repository. Revisit a monorepo only when a second deployable product needs shared code (DEC-017).
- **Feature flags:** recommended as a day-one capability (not deferred) given `decisions.md` DEC-002's requirement for progressive enhancement (animated hero) and DEC-005's requirement to ship without the AI prompt bar until it's ready — flags are the natural mechanism for both, and for gating each new product's move from "in development" to "live" (`CLAUDE.md` §"When adding a new product," step 4).

---

## 6. Onboarding checklist for a new product

Once TeachNexis (or another product) is ready to move past "purpose defined":

1. Write its PRD using `PRD.md`'s SiteNexis structure (`CLAUDE.md` §"When adding a new product," step 1).
2. Identity: register it as a scope under the existing org/identity model (§3.1) — do not stand up separate accounts/login.
3. Billing: define its plans/tiers against the shared billing mechanism (§3.2), or explicitly flag if it needs an interim standalone integration.
4. AI: define its NexisAI intents/use-cases (§3.3); do not integrate a model provider directly.
5. Analytics: instrument its events against the shared schema (§3.4).
6. Design: import the shared component library, apply its assigned accent color — never invent one (`CLAUDE.md` product table).
7. Log the launch decision in `decisions.md`, same as SiteNexis's DEC-001.

---

## 7. Open questions this doc surfaces (add to `tasks_gaps.md` if not already tracked)

- ~~Is billing unified at the org level across products at launch, or does SiteNexis launch with standalone billing and unification happens when product #2 needs it?~~ **Resolved — DEC-012: standalone for SiteNexis now, unify when a second paying product needs it.**
- ~~AI human-review checkpoints per product-type~~ **Resolved — DEC-013: shared mechanism in NexisAI, per-product review bar. CareBridge will need its specific bar configured when it moves past "purpose defined."**
- ~~Monorepo vs. multi-repo structure~~ **Resolved — DEC-017: single website repository now; revisit when a second deployable product needs shared code.**
