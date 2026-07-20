# NexisHub — Product Requirements Document
## Scope: Company Website + SiteNexis (flagship product)

**Status:** Draft v0.1 — ready to build against, not yet reviewed by you
**Owner:** [NEEDS INPUT — assign a DRI]

---

## 1. Overview

NexisHub positions itself as an **AI Infrastructure Company** — not "the company that owns SiteNexis." Per the Company Constitution (`documentation.md`, Volume I):

> NexisHub builds intelligent software that helps people work, learn, create, organize, and make better decisions through AI.

Products (SiteNexis, TeachNexis, EventNexis, LogicLand, CareBridge, and future Nexis-suite infrastructure products) each solve an independent problem but share common platform infrastructure — auth, billing, AI layer, analytics, design system. The website's job is to make three things obvious within 10 seconds of landing:

1. This is an AI infrastructure company building an ecosystem, not a single product with a corporate wrapper.
2. The products are connected — shared intelligence, shared design language, shared quality bar.
3. SiteNexis is the current flagship and proof point; more products are coming from the same foundation.

**Non-goal for v1:** fully building out every future product page. TeachNexis, EventNexis, CareBridge, and LogicLand get placeholder/"coming soon" treatment until each has a real PRD and working product.

---

## 2. Target users

- **Prospective SiteNexis customers** — arrive via search/referral, need to understand the product fast and trust the company behind it.
- **Prospective hires** — evaluating whether this is a real, well-run company.
- **Investors** — evaluating credibility, vision, and execution quality.
- **Partners/press** — need a fast, accurate picture of what NexisHub is.

---

## 3. Information architecture / sitemap

```
/                    Home
/products            Overview of ecosystem (SiteNexis live, others "coming soon")
/products/sitenexis  Full product page
/about               Company story, principles, team
/research            Articles / thought leadership
/blog                Company + product updates
/careers             Open roles (or "not hiring yet" honest state)
/partners            Partnership info
/contact             Contact form + info
/investors           [gated or minimal — see Section 8]
/press               Press kit, logos, boilerplate
/legal               Terms, privacy, cookie policy
```

---

## 4. Page specs

### 4.1 Home
- **Hero:** headline + subhead + primary CTA ("Explore Products") + secondary CTA to SiteNexis directly.
- **Visual system:** see `designuiux.md` for the network/galaxy motif, animated hero, and scroll-driven product showcase. Full spec lives there — don't duplicate it here.
- **Product ecosystem section:** visual map of all 5 products; only SiteNexis is clickable/live at launch, others show "In development."
- **About/principles teaser:** 2–3 sentences + link to `/about`.
- **Featured product:** SiteNexis gets a full-width, high-fidelity showcase block.
- **Footer:** standard (Products, Resources, Company, Legal, Newsletter signup).

**Explicit v1 cut:** the "AI prompt bar" easter egg (type what you want to build, get routed) is a v2 feature — it needs a working backend recommendation engine, not just UI. Don't ship the UI without the logic behind it; a prompt bar that doesn't actually respond intelligently will damage the "intelligent company" impression it's meant to create.

### 4.2 Products (`/products`)
- Grid or galaxy view of all 5 products with status badges (Live / Beta / In Development).
- Each card links out — live products to their full page, in-development ones to a simple "notify me" capture.
- Each card should carry its one-line purpose statement, now defined:

| Product | Purpose | Status |
|---|---|---|
| SiteNexis | AI Visibility Intelligence Platform — discoverability across search engines and AI assistants | Live |
| TeachNexis | AI-powered education platform for teachers and schools | In development |
| LogicLand | Interactive learning platform for coding, math, logic, problem solving | In development |
| EventNexis | Modern event management — invitations, registration, QR check-in, reporting | In development |
| CareBridge | Healthcare platform improving provider–patient communication and workflows | In development |

### 4.3 SiteNexis (`/products/sitenexis`)
**Purpose (defined, DEC-018):** AI Retrieval & Machine Trust Intelligence — models how AI systems retrieve, interpret, trust, cite, and recommend a website. The live deployment at `https://sitenexis.vercel.app` is the public source of truth.

The product page must cover:
- The machine-first retrieval problem: AI systems extract and rank chunks rather than simply “reading pages”
- 16 intelligence agents across four dependency layers
- 12 explainable intelligence scores
- Six-stage retrieval simulation, entity intelligence, citation probability, machine trust, temporal authority, and recommendation-surface mapping
- Full-site crawl → parallel Layer 1–2 analysis → AI visibility scoring → Layer 4 machine trust → information gain/Scout → P0/P1/P2 global fix plan
- Published pricing: Free $0, Starter $29/month, Pro $79/month, Agency $249/month; synchronize with the live pricing page before each release
- Primary CTA: “Run Free Audit,” linking to the live application; no account is required for the initial audit
- Dashboard/report visuals may reproduce only the public live-product interface or clearly labeled conceptual views; do not invent customer results

### 4.4 About
- Founder story, mission, principles (Observe → Understand → Build → Improve → Scale, per your design notes)
- Team section — **[NEEDS INPUT]**, only include real people who've consented to being listed
- Company timeline

### 4.5 Careers
- If not actively hiring: an honest "not hiring right now, but here's what we look for" page beats an empty job board.

### 4.6 Investors
- **[NEEDS INPUT]** — decide whether this is public (teaser + contact) or gated (real deck behind a request form). Do not publish real financials or projections publicly without legal/founder sign-off.

### 4.7 Legal
- Terms of Service, Privacy Policy, Cookie Policy — **[NEEDS INPUT]**. These are legal documents; a template can be drafted but should be reviewed by an actual lawyer before publishing, especially if you'll collect user data or payments.

---

## 5. Technical requirements

- **Performance budget:** target <2.5s LCP on 4G, since a heavy animated hero (network graph, floating laptop) is a real performance risk. Every animated section needs a lightweight/reduced-motion fallback.
- **Accessibility:** WCAG 2.1 AA minimum. Reduced-motion media query must disable/simplify the network animation and scroll-morphing sections.
- **SEO / AI discoverability:** structured data (Organization, Product schema), clean semantic HTML under the animation layer, sitemap.xml, llms.txt if you want to lean into "AI visibility" as a stated positioning.
- **CMS:** code and MDX in the repository, managed through pull requests (DEC-015). Revisit a headless CMS only if content ownership moves to non-engineering users.
- **Analytics:** event tracking on CTA clicks, product-card hovers/opens, scroll depth on home.
- **Stack:** Next.js on Vercel (DEC-014), single website repository (DEC-017).

---

## 6. Success metrics

- **[NEEDS INPUT]** — depends on your actual growth stage. Suggested starter set until you have real baselines:
  - Home → Products click-through rate
  - Products → SiteNexis click-through rate
  - SiteNexis page → signup/demo conversion rate
  - Time to first meaningful paint on mobile

---

## 7. Phasing

**Phase 1 (launch-ready):** Home, Products overview, SiteNexis page, About, Contact, Legal.
**Phase 2:** Careers, Research/Blog, Press kit.
**Phase 3:** Investors page (once financials are real), AI prompt-bar recommendation feature, remaining product pages as each ships.

---

## 8. Open questions for you

- Is there a real team to list on `/about`, or is this pre-team?
- Do you want the Investors page public or gated?
- What's the target launch date, and does that change what's realistic for Phase 1?
- Which providers should receive analytics events and contact/newsletter submissions?
- How does AdNexis relate to the accepted NexisHub product ecosystem?
