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
