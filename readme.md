# NexisHub Documentation

Working documentation set for NexisHub — an AI Infrastructure Company. Start here.

> NexisHub builds intelligent software that helps people work, learn, create, organize, and make better decisions through AI.

---

## Files in this set

| File | What it is | Read when |
|---|---|---|
| `documentation.md` | Master index — the full 15-volume documentation structure, what's real vs. still needed | You need the big picture, or you're deciding what to write next |
| `PRD.md` | Product requirements for the company website + SiteNexis (the flagship product) | You're building or reviewing the website/SiteNexis |
| `master-architecture.md` | Shared platform spec — identity, billing, AI core, analytics, design system, deployment shape every product inherits | You're starting a second product, or deciding what's shared vs. product-specific |
| `designuiux.md` | Design system — colors, type, grid, components, motion, per-page patterns | You're designing or implementing any UI |
| `decisions.md` | Decision log (ADR-style) — what's been decided and why | Before proposing something that might already be settled |
| `CLAUDE.md` | Condensed project context for AI-assisted development | An AI assistant (or a new engineer) is about to start work |
| `tasks_gaps.md` | Every open gap and next-step task, prioritized | You're planning what to do next, or looking for what still needs your input |

---

## Reading order

**If you're new to the project:** `readme.md` (this file) → `documentation.md` Volume I → `PRD.md` → `designuiux.md`.

**If you're about to build something:** `CLAUDE.md` → `decisions.md` → `tasks_gaps.md` (check nothing you're about to do is already blocked or already decided differently).

**If you're deciding what to work on next:** `tasks_gaps.md`, sorted by priority.

---

## Current state, one paragraph

NexisHub's Constitution (positioning, vision, mission, values, product purposes, shared-infrastructure philosophy) is defined and treated as settled — it lives in `documentation.md` Volume I and is summarized in `CLAUDE.md`. SiteNexis is the only product with a real PRD and the only one launching first; four more products have defined one-line purposes but no PRD yet. The website's information architecture and design system are specified and buildable. The NexisHub Master Architecture doc (`master-architecture.md`) is now drafted, stack-agnostic — the single highest-priority open task is reviewing it and confirming the actual tech stack, since most of the architecture's "still needs" rows depend on that decision. See `tasks_gaps.md` Priority 1.

---

## Ground rule for anyone (human or AI) editing these files

Don't invent facts to fill gaps — legal details, financials, team bios, testimonials, metrics. Mark them `[NEEDS INPUT]` and log them in `tasks_gaps.md` instead. Everything currently marked as "defined" or "decided" in these files came from an actual source document, not from filling in plausible-sounding content.

## Current production state

NexisHub is a Next.js application deployed to Vercel at `https://nexishub.vercel.app`.

Completed platform areas include:

- NexisHub corporate site, blog, legal draft pages, and product directory
- NexisHub Studio landing page, service routes, enquiry flow, commercial templates, and operational records
- Founder-Led Nexis Research Institute with 30 programme pages, research search, publication collections, the AI Visibility Index Version 0.1 working paper, citation exports, pilot templates, review workflows, and governance documentation
- Pnyx as a verified Live flagship product at `https://pnyx-psi.vercel.app`

NRI status remains Founder-Led Stage. The AI Visibility Index remains a Version 0.1 Pre-Review Working Paper. Legal review, reviewer appointments, pilot consent, research findings, portfolio permissions, and manual accessibility testing remain pending until evidence exists.

See [roadmap-status.md](roadmap-status.md), [founder-led-operating-record.md](founder-led-operating-record.md), and [external-unblocker-pack.md](external-unblocker-pack.md).

## Current execution rule

Repository work should implement complete workflows, schemas, empty states, authorization boundaries, tests, documentation, and operational tooling around real-world actions. It must not fabricate legal approvals, reviewers, participants, findings, permissions, peer review, DOI registration, or manual QA results.
## Delivery cadence

Completed implementation slices are documented, verified, committed, pushed to the `kellyxy110` GitHub repository, and deployed to Vercel. Deployment is operational only and does not imply legal approval, peer review, pilot completion, participant consent, reviewer appointment, or client portfolio permission.

The current NRI and Studio administration work includes truthful workflow scaffolding. Database persistence, authentication, server-side authorization, and audit storage are still required before privileged administration is enabled.

### Editorial maintenance

The repository now includes a report-only editorial link monitor at `website/scripts/editorial-link-monitor.mjs`. It can generate a link-health report from the sitemap source and classify redirects, broken links, blocked responses, timeouts, and unknown results. References remain unchanged until an editorial decision is made.

### Administration infrastructure status

The repository now includes a provider-neutral administration boundary. Administrative writes remain disabled until database, authentication, and audit persistence are configured through the documented environment contract and validated with migration, security, privacy, backup, and rollback evidence.

### Administration store

The repository now defines a provider-neutral `AdminStore` contract with a fail-closed implementation. Until a real provider is selected and configured, administrative reads and writes remain disabled; public file-backed content remains unchanged.

### Provider selection status

The provider-selection checklist is documented in `admin-provider-selection.md`. The example environment file contains only blank, provider-neutral administration markers. No credentials or provider assumptions were added, and administration remains disabled pending approval and evidence.

### Provider discovery and administration gates

The inspected production architecture currently consists of Next.js on Vercel, GitHub source control, and an encrypted Vercel form webhook. No authentication, database, storage, email, monitoring, or backup provider was found in the repository configuration. Administration now uses independent feature flags, all defaulting to disabled, so safe founder-only enablement can be introduced after real authentication and infrastructure evidence exists without opening higher-risk research or commercial modules.

### Staged administration

Administration uses staged activation. Founder-safe administration becomes eligible only after real authentication, server-side RBAC, migrations, security checks, founder verification, and infrastructure configuration are recorded. Reviewer, pilot, consent, legal-document, email, and public Version 1.0 capabilities remain independently gated.

### Founder-safe administration readiness

The repository now has the requested staged feature-flag vocabulary and a fail-closed server-side authorization primitive. Safe activation still requires real authentication, RBAC, migrations, security evidence, and founder verification. No credentials, founder account, reviewer record, participant record, or legal approval was fabricated.
