# NexisHub Master Documentation

**Status:** Living document — scaffold v0.1
**Purpose:** Single source of truth for NexisHub's company, products, brand, engineering, and operations.

> This file is the table of contents and summary for the full documentation set. Each Volume below should eventually become its own file (e.g. `docs/volume-01-foundation.md`) as content is filled in. Sections marked **[NEEDS INPUT]** require facts only you or your team can provide — legal details, financials, real team names, actual metrics. Nothing in those sections has been invented.

---

## How to use this document

1. Treat each Volume as a folder in your knowledge base, not a single file to fill in one sitting.
2. Fill Volume I (Foundation) and Volume II (Product Ecosystem) first — everything else references them.
3. Anything you don't have yet, leave as `[NEEDS INPUT]` rather than guessing — a half-true company doc is worse than an honest gap.
4. Realistically, "400–600 pages" is an end-state, not a launch deliverable. Build the skeleton now, add real depth volume by volume as the company actually reaches each stage (e.g., you don't need a Sales volume before you have a sales process).

---

## Volume I — Company Foundation

**Status:** Core content now defined by the NexisHub Constitution (v1.0). Treated as the source document this whole Volume derives from — see also `CLAUDE.md` for the condensed working version.

### Positioning
NexisHub is an **AI Infrastructure Company**, not "the company that owns SiteNexis."

> NexisHub builds intelligent software that helps people work, learn, create, organize, and make better decisions through AI.

### Vision
To become Africa's most trusted builder of intelligent software and one of the world's leading AI-first technology companies.

### Mission
To empower individuals, educators, businesses, and organizations with intelligent software that transforms complex work into simple, accessible experiences.

### Philosophy
Technology should never exist merely because it can. Every product must satisfy three principles: solve a genuine human problem, reduce complexity rather than add it, and become more valuable the more it's used.

### Core Values
1. **Build What Matters** — solve real problems.
2. **Intelligence with Integrity** — AI should inform decisions, not manipulate them.
3. **Simplicity Wins** — complex engineering, simple experiences.
4. **Learn Relentlessly** — every product teaches the company something.
5. **Excellence Over Hype** — build enduring systems rather than chasing trends.
6. **Human First** — technology should amplify people, not replace them.

### Company Structure
```
NexisHub
├── AI Infrastructure
├── Product Engineering
├── Research
├── Design
├── Education
├── Developer Relations
├── Growth
├── Customer Success
└── Operations
```
This is an org chart of *functions*, not yet a real headcount/reporting structure — that mapping is [NEEDS INPUT] once there's an actual team.

| Section | Status |
|---|---|
| Executive Summary, Vision, Mission, Philosophy, Core Values | **Defined** (above) |
| Company Structure (functional) | **Defined** (above) — real org chart with names is [NEEDS INPUT] |
| Founder Story, Leadership, real headcount | [NEEDS INPUT] |
| Brand Guidelines | → drafted in `designuiux.md`, Section 1 |
| Corporate Identity (registration, legal, domains, contact) | [NEEDS INPUT] |

**Recommendation:** Legal/identity content is still the one place invented content is actively harmful. Everything else in this Volume is now real and can be treated as settled — reference it, don't re-derive it.

---

## Volume II — Product Ecosystem

Each product now has a defined one-line purpose. **SiteNexis**, **TeachNexis**, and **EventNexis** are live product surfaces. Only **SiteNexis** has a concrete NexisHub-side PRD drafted so far (`PRD.md`, this repo). The rest are scoped in purpose but stubs in this documentation until each gets its own PRD.

| Product | Purpose | Public surface | PRD status |
|---|---|---|---|
| SiteNexis | AI Visibility Intelligence Platform — helps businesses become discoverable across search engines and AI assistants | `https://sitenexis.vercel.app` | Drafted (`PRD.md`) |
| TeachNexis | AI-powered education platform — empowers teachers and schools with intelligent teaching tools | `https://teachnexis.vercel.app` | Live surface; PRD stub in this documentation |
| LogicLand | Interactive learning platform — teaches coding, math, logic, and problem solving through immersive experiences | `https://logicland.vercel.app` | Purpose defined, PRD stub |
| EventNexis | Modern event management — invitations, registration, QR check-in, reporting, event operations | `https://eventnexis.vercel.app` | Live surface; PRD stub in this documentation |
| CareBridge | Healthcare platform — improves communication and workflows between providers and patients | `https://carebridge-io.vercel.app` | Purpose defined, PRD stub |

TeachNexis and EventNexis are marked live under DEC-022. LogicLand and CareBridge remain in development until a separate launch decision is logged.

### Future infrastructure suite (reserved names, not yet scoped)
Unlike the earlier reserved list, the Constitution reframes future products as **shared infrastructure NexisHub builds for itself and eventually exposes**, not standalone verticals:

- **NexisAI** — shared intelligence engine powering every NexisHub product (this is closer to core platform than a "product")
- **NexisCloud** — infrastructure platform
- **NexisDeploy** — deployment platform
- **NexisDocs** — documentation platform
- **NexisForms** — form builder
- **NexisCRM** — customer relationship management
- **NexisMail** — email infrastructure
- **NexisAuth** — authentication platform
- **NexisPay** — payment infrastructure

**Recommendation:** Don't write parallel PRDs for all of these before SiteNexis has real users. Finish SiteNexis's PRD to the point it's buildable, ship it, then use it as the template for TeachNexis/LogicLand/EventNexis/CareBridge in turn. The infrastructure suite (NexisAuth, NexisPay, etc.) should only get built when an actual product needs it — see Volume III, Master Architecture.

---

## Volume III — Engineering Handbook

### Technology philosophy (defined)
Every product shares the same engineering foundation rather than reinventing it. Common infrastructure every product extends: Authentication, Organizations, Billing, AI Layer, Analytics, Notifications, Search, APIs, Design System, Security, Monitoring.

### Engineering principles (defined)
Build once. Reuse everywhere. Automate repetitive work. Measure everything. Document continuously. Ship thoughtfully. Maintain backwards compatibility where practical.

### NexisHub Master Architecture (v1.0)
→ Accepted in `master-architecture.md`. Defines the shared platform contracts and onboarding checklist. The website implementation is Next.js on Vercel, code/MDX managed, and a single repository (DEC-014, DEC-015, DEC-017); backend platform providers remain selected only when required.

| Section | Status |
|---|---|
| Technology philosophy, engineering principles | **Defined** (above) |
| Master Architecture doc (auth, billing, AI core, etc.) | **Drafted v0.1** — see `master-architecture.md`; awaiting review |
| Website stack/hosting | Next.js on Vercel (DEC-014) |
| Website content/repository | Code/MDX, single repository (DEC-015, DEC-017) |
| Shared backend providers | Selected per capability when a product requires them |
| Git workflow, versioning, disaster recovery | Still needs an operational runbook |

**Recommendation:** Philosophy, platform contracts, billing timing, AI-review policy, and website stack are settled. Use `master-architecture.md` as the reference point for every new product and select concrete backend providers only when implementation requires them.

---

## Volume IV — Design System (UI)
## Volume V — Product Design Language

→ Both covered in `designuiux.md`, which turns your existing design notes into a working system: palette, type, spacing, components, motion, states.

---

## Volume VI — Marketing

### Content strategy (defined)
Publish consistently, educate generously, build authority through expertise. Content types: technical articles, case studies, research reports, engineering blog, videos, newsletters, tutorials.

### Community (defined)
Developer forums, Discord, events, hackathons, ambassador programs, research collaborations.

Everything else in this Volume (positioning execution, buyer personas, GTM strategy, SEO/AI-visibility strategy, advertising, partnerships) is [NEEDS INPUT] — content *principles* are set, but the actual calendar/campaigns don't exist until there's something to market.

## Volume VII — Sales
[NEEDS INPUT]. No sales process exists yet — draft once SiteNexis has its GTM motion decided (see `PRD.md` §8 open questions).

## Volume VIII — Customer Success
[NEEDS INPUT]. Draft once there are real support tickets to build SLAs and workflows around.

## Volume IX — Operations
[NEEDS INPUT] for hiring, performance reviews, OKRs, finance, legal. Two sub-initiatives are already conceptually defined and worth tracking here even though not yet built:

- **NexisHub Academy** — teaches builders how to create intelligent software. Subjects: AI Engineering, Prompt Engineering, SaaS Development, System Design, Next.js, Product Management, Software Architecture, Automation, Business.
- **NexisHub Labs** — experimental products, internal tooling, open-source projects, research prototypes, innovation initiatives.
- **Digital Marketplace (NexisHub Store)** — AI visibility toolkits, prompt libraries, website templates, SaaS boilerplates, educational resources, design assets, developer tools, courses, books, premium documentation.
- **Open Source** — selected internal technologies released as open source where appropriate, on the premise that strong developer communities create stronger products.

**Recommendation:** these four are real strategic commitments, not just brainstorm items — but none should get built before the core product ecosystem (Volume II) has traction. Sequence them after, not alongside, SiteNexis's launch.

---

## Volume X — AI Strategy

### Defined
AI is treated as infrastructure, not a feature. Every product should eventually include: natural language interaction, workflow automation, intelligent recommendations, predictive insights, personalized experiences, agent-assisted workflows. This is delivered through **NexisAI**, the shared intelligence engine referenced in Volume II, rather than each product building its own AI layer.

### Research Division (defined scope, no output yet)
Research areas: Artificial Intelligence, Education Technology, Search Intelligence, Developer Experience, Automation, Human-Computer Interaction, Large Language Models, Knowledge Systems.

### Still needed
- Which models/providers you actually rely on and why
- Data handling and privacy commitments
- Human review checkpoints for AI-generated output
- What NexisHub will and won't automate

[NEEDS INPUT] for the operational specifics above — the strategic stance (AI as infrastructure, shared engine) is settled.

---

## Volume XI — Company Website PRD

→ See `PRD.md`. Scoped realistically as a working document, not a 150–250 page spec — most of that length in the original proposal would be repetition across similar page types (About, Careers, Contact, Legal all follow the same lightweight pattern).

---

## Volume XII — Product Launch Playbook

Reusable checklist, drafted once and reused per product:

1. Research & validation
2. MVP scope lock
3. Private beta (invite list, feedback loop)
4. Public beta (metrics to watch)
5. Launch (comms, support readiness)
6. Post-launch iteration cadence

---

## Volume XIII — Investment Deck

[NEEDS INPUT] — financials, traction, and funding ask must come from you. Claude can help structure and write the narrative once you supply real numbers; presenting placeholder figures as if real would misrepresent the company to investors.

---

## Volume XIV — Future Roadmap

[NEEDS INPUT] — depends on actual hiring, revenue, and market decisions you haven't made yet. A dated roadmap (2026–2030) written now would be fiction; better to keep a living 12-month roadmap and extend it as decisions are made.

---

## Volume XV — Knowledge Base

Running log — start this now as a simple append-only file: research notes, competitor intel, architecture decisions (see `decisions.md`), lessons learned. Low effort, high compounding value.

---

## What's real vs. scaffold right now

- **Real, usable today:** `designuiux.md` (design system), `PRD.md` (SiteNexis + website), `decisions.md` (decisions already made in your two source docs), `CLAUDE.md` (project context for AI-assisted dev)
- **Scaffold only, needs your input:** Volumes I, III, VI–IX, XIII, XIV
- **Templates ready to fill once product is scoped:** Volumes II (remaining products), XII
