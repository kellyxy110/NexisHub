# NexisHub — Design System (UI/UX)

**Status:** v0.1 — structured from your design notes, ready for a designer/engineer to implement
**Covers:** Documentation Volumes III (Brand Guidelines) and IV/V (Design System, Product Design Language)

---

## 1. Design direction

**Reference points:** Apple (elegance), Stripe (storytelling), Linear (precision), Vercel (simplicity), Notion (whitespace), Framer (animation).

**Mood:** premium, intelligent, calm, luxurious, futuristic, minimal.

**One-line philosophy:** *Intelligence. Connection. Creation.* — this should be visible in the product ecosystem visualization (a connected network, not a card grid), not just written as a tagline.

---

## 2. Color system

| Role | Color | Hex |
|---|---|---|
| Primary | Graphite Black | `#111111` |
| Secondary | Pure White | `#FFFFFF` |
| Accent (default) | Electric Blue | `#2D7FF9` |
| Supporting | Purple | `#6C5CE7` |
| Supporting | Emerald | `#00C896` |
| Supporting | Orange | `#FF8A00` |
| Supporting | Rose | `#FF4D6D` |

**Per-product accent:**

| Product | Accent |
|---|---|
| SiteNexis | Blue `#2D7FF9` |
| TeachNexis | Emerald `#00C896` |
| EventNexis | Purple `#6C5CE7` |
| LogicLand | Orange `#FF8A00` |
| CareBridge | Rose `#FF4D6D` |

**Note:** no dark-mode-specific palette defined yet — since "Dark mode" is listed as a required section, recommend deriving a dark variant (e.g., graphite → near-black background, white text at reduced opacity for hierarchy) before implementation rather than treating light mode as the only pass.

---

## 3. Typography

| Use | Typeface | Size |
|---|---|---|
| Primary | Geist | — |
| Secondary | Inter | — |
| Large headings | Geist | 72px |
| Section titles | Geist | 48px |
| Body | Inter | 18px |
| Tiny labels | Inter | 14px |

**Gap to fill before implementation:** no line-height, font-weight, or letter-spacing values specified. Recommend: 1.1–1.2 line-height for large headings, 1.5–1.6 for body; weight scale of 400/500/600/700 rather than more.

---

## 4. Grid & spacing

- 12-column grid
- 1440px max container width
- 96px section spacing (vertical rhythm between major sections)
- 24px gutters

For mobile, the 96px section spacing should compress (recommend ~48–64px) — carrying desktop spacing straight to mobile makes pages feel empty rather than premium.

---

## 5. Navigation

- Logo | Products, Solutions, Research, Blog, Company, Careers, Contact | Sign In, Get Started
- Sticky
- Transparent on load, becomes glassmorphic (blurred, translucent) on scroll

---

## 6. Homepage hero

- **Background:** animated node network. NexisHub is the center node, connected live to SiteNexis, TeachNexis, EventNexis, LogicLand, CareBridge. Connections pulse slowly; the network subtly reacts to mouse movement.
- **Headline:** "Building Intelligent Software For The Next Generation"
- **Subtitle:** "AI-powered products helping businesses, educators, healthcare providers, event organizers, and future innovators thrive."
- **CTA:** "Explore Products" (primary) / "See SiteNexis" (secondary)
- **Right side:** a floating laptop/device mockup that cycles through each product's screen as you scroll.

**Implementation flag:** this is the highest-risk section for performance (animated canvas/WebGL network + pinned scroll-morph laptop). Build a static/reduced-motion fallback first, animated version as progressive enhancement. See `PRD.md` Section 5 for the performance budget this needs to hit.

---

## 7. Product ecosystem section

Rendered as a **network/galaxy**, not a card grid:

```
                    TeachNexis
                        ○
  LogicLand ○      NexisHub      ○ SiteNexis
                        ○
                   EventNexis
                        ○
                   CareBridge
```

Hovering a node expands it to show: description, launch status, screenshot, CTA button.

---

## 8. Section-by-section patterns

- **About:** oversized typography ("Technology should solve real problems. Not create more."), then narrative.
- **Principles:** 5 large animated cards — Observe → Understand → Build → Improve → Scale.
- **Featured product (SiteNexis):** near-full-screen showcase — animated dashboard, audit visuals, charts, "AI Visibility Score," heatmaps, scrolling timeline.
- **Product cards:** glass surface, 32px corner radius, soft shadow, subtle animated gradient, slight float/parallax on scroll.
- **Timeline:** simple vertical roadmap — 2026 launch of SiteNexis → subsequent products → future products.
- **Founder:** large portrait, minimal text, signature — **[NEEDS INPUT: real content, real consent to publish]**.
- **Research:** OpenAI-style — white background, oversized type, minimal chrome.
- **Testimonials:** floating cards, auto-scroll — **[NEEDS INPUT: real testimonials only; do not fabricate placeholder quotes attributed to customers]**.
- **Footer:** large, minimal — Products / Resources / Company / Legal / Newsletter.

---

## 9. Motion principles

- Nothing appears abruptly — everything grows, slides, morphs, fades, or rotates in.
- Network connections draw themselves on load/scroll.
- Numbers count up; charts animate in; cards have a subtle "breathing" idle state.
- **Accessibility requirement (not in original notes, added here):** every motion effect needs a `prefers-reduced-motion` fallback that keeps content fully usable with motion stripped, not just slowed down.

---

## 10. Interaction details

- **Cursor:** small dot by default, expands on hover; buttons have magnetic pull.
- **Buttons:** Primary = black bg / white text, rounded. Secondary = white bg / black border. Ghost = transparent.
- **Cards:** 32px radius, glass surface, soft blur, minimal shadow.
- **Icons:** Lucide, thin weight, consistent stroke throughout.

---

## 11. Mobile

Not a shrunk desktop layout — a transformation:
- Network becomes a vertical constellation.
- Floating laptop becomes swipeable product preview cards.
- Navigation becomes a full-screen overlay.
- Motion stays smooth and purposeful, not decorative-only (drop anything that's animation for its own sake at small screen sizes/lower-power devices).

---

## 12. AI prompt bar ("What would you like to build today?")

Concept: a persistent prompt input that routes visitors to the right product, article, or solution based on what they type — reinforcing "intelligent company" positioning.

**Flagged in `PRD.md` as a v2 feature**, not v1: this only works if there's a real recommendation engine behind it. A prompt bar that gives generic or wrong answers undercuts the exact impression it's meant to build. Scope the backend logic before designing the frontend for this.

---

## 13. The 10-second test

Whatever gets built, it should pass this test: a visitor who leaves after 10 seconds should walk away knowing (1) this is premium software, (2) the products are one connected ecosystem, (3) SiteNexis is the flagship and NexisHub is the company. Every section above should be evaluated against whether it serves that test or is decoration.
