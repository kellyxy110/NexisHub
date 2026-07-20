# CLAUDE.md

Project context for Claude (or any AI assistant) working on the NexisHub codebase/documentation. Read this before making changes.

---

## What NexisHub is

An **AI Infrastructure Company**, not "the company that owns SiteNexis." Constitution statement:

> NexisHub builds intelligent software that helps people work, learn, create, organize, and make better decisions through AI.

Every product shares common platform infrastructure (auth, billing, AI layer, analytics, design system) rather than reinventing it — see "Shared infrastructure" below.

Core products, each with a defined purpose:

- **SiteNexis** (flagship, only live product at launch) — AI Visibility Intelligence Platform; helps businesses become discoverable across search engines and AI assistants. Accent: Blue `#2D7FF9`
- **TeachNexis** — AI-powered education platform for teachers and schools. Accent: Emerald `#00C896`
- **LogicLand** — interactive learning platform for coding, math, logic, problem solving. Accent: Orange `#FF8A00`
- **EventNexis** — event management (invitations, registration, QR check-in, reporting). Accent: Purple `#6C5CE7`
- **CareBridge** — healthcare provider–patient communication and workflows. Accent: Rose `#FF4D6D`

**Shared infrastructure suite** (build for internal use first, expose later): NexisAI (shared intelligence engine), NexisCloud, NexisDeploy, NexisDocs, NexisForms, NexisCRM, NexisMail, NexisAuth, NexisPay.

Company philosophy: *Intelligence. Connection. Creation.* Products read as one connected ecosystem, not a portfolio of unrelated tools — this is architectural (shared platform), not just visual.

**Core values (don't violate these in generated content or code):** Build What Matters · Intelligence with Integrity (AI informs, never manipulates) · Simplicity Wins · Learn Relentlessly · Excellence Over Hype · Human First (technology amplifies people, doesn't replace them).

---

## Where things live

| File | What it's for |
|---|---|
| `documentation.md` | Master index — the 15-volume documentation structure, what's done vs. still needs input |
| `PRD.md` | Product requirements for the company website + SiteNexis |
| `master-architecture.md` | Shared platform spec — identity, billing, AI core, analytics, design system, deployment shape every product inherits |
| `designuiux.md` | Design system: colors, type, grid, components, motion, per-page patterns |
| `decisions.md` | Decision log — check here before re-litigating something already decided |

**Rule:** don't duplicate content across these files. If you need the color palette, it lives in `designuiux.md` — link to it, don't copy it.

---

## Things that are NOT decided yet

Don't assume or invent answers for these — flag them back to the user instead of guessing:

- Tech stack (frontend framework, backend, hosting, CMS)
- Go-to-market motion (self-serve vs. sales-led vs. waitlist)
- Whether Investors/Careers pages are public or gated
- Real team members, founder bio, company legal/registration details
- Actual pricing, feature list, and screenshots for SiteNexis

If a task requires one of these and it isn't specified, stop and ask rather than filling in a plausible-sounding placeholder that could get treated as real.

---

## Things that ARE decided (see `decisions.md` for full reasoning)

- NexisHub is an AI Infrastructure Company; products extend a shared platform (auth, billing, AI layer, analytics, design system) rather than each reinventing it.
- Every core product has a defined purpose (see table above) — don't redefine these without logging why in `decisions.md`.
- Future products (NexisAuth, NexisPay, etc.) are internal infrastructure to build for NexisHub's own products first, not standalone verticals to sell independently from day one.
- SiteNexis is the only fully-built product page at launch; others are "in development" with waitlist capture.
- Homepage ecosystem visualization is a connected network/galaxy, not a card grid.
- The animated hero (network background, scroll-pinned device mockup) ships with a static/reduced-motion fallback first; full animation is progressive enhancement.
- The "AI prompt bar" concept on the homepage is v2 — don't build the frontend for it before the backend recommendation logic exists.

## Before starting a second product (TeachNexis, LogicLand, etc.)

Follow the onboarding checklist in `master-architecture.md` §6 (identity, billing, AI, analytics, design system, then log the launch decision). The doc is drafted but not yet reviewed/accepted, and several of its open questions (§7 — billing unification timing, AI human-review checkpoints per product) still need your input. Building a second product against ad-hoc infrastructure instead of the defined shared platform will directly contradict the "build once, reuse everywhere" engineering principle and create rework later.

---

## Working conventions

- **Content integrity:** never invent testimonials, team bios, financials, or metrics. Use `[NEEDS INPUT]` placeholders and say so explicitly, the way `PRD.md` and `documentation.md` already do.
- **Accessibility:** every animated section needs a `prefers-reduced-motion` fallback that keeps content fully usable, not just slower.
- **Performance:** target <2.5s LCP on 4G for the homepage — the animated hero is the main risk to this budget.
- **Legal content** (Terms, Privacy, Cookie Policy): draft only, always flag for actual legal review before publishing.

---

## When adding a new product (e.g. TeachNexis moves from stub to real)

1. Write its PRD following the `PRD.md` SiteNexis structure.
2. Add its page to the sitemap in `PRD.md` §3.
3. Use its assigned accent color from the table above — don't invent a new one.
4. Update the ecosystem node in `designuiux.md` §7 from "in development" to "live."
5. Log the launch decision in `decisions.md`.
