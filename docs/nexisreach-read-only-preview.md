# NexisReach: isolated read-only campaign planner (preview)

Status: **implementation candidate for review only**. It is not a marketplace, payment service, live advertising product or certified Telegram release.

## Why this scope

Adstail publicly describes a channel catalogue, AI categorisation, campaign scheduling, payment reserve, creative checks and channel statistics. These are **not** confirmed Adstail gaps. NexisReach should differentiate through clear evidence provenance, transparent budget planning, practical risk questions and carefully scoped assistance for smaller businesses, including naira budgeting.

Sources reviewed 2026-11-20:
- https://adstail.com/
- https://adstail.com/faq
- https://core.telegram.org/bots/webapps

## Included in this branch

- Browser-memory-only advertising goal, audience, geography and budget entry.
- NGN and USD budgeting **without exchange conversion**.
- Up to three user-supplied channel offers with cost-per-1,000-entered-views arithmetic.
- Transparent caveats: no publisher verification, guaranteed reach, lead claims or financial return.
- Publisher due-diligence questions, goal-specific metrics and campaign brief suitable for manual copy.
- Isolated `/telegram/advertising` route, `noindex`, linked as **preview** from the existing `/telegram` route.
- Pure deterministic planner with tests.
- Publisher Evidence Passport for each manually entered offer, distinguishing publisher claims, incomplete references, outdated evidence and external material.
- Evidence origin, manually entered reference and observation date. References are displayed as plain text and are never fetched or checked.
- Every passport explicitly states that NexisHub has NOT verified it. No fabricated trust scores, subscribers or conversions.
- Evidence older than 30 days prompts a review question; age is NOT a measure of truth.

## Explicit exclusions

No database changes, data retention, channel scraping, Telegram account linking, bot permissions, AI inference, marketplace listings, payouts, escrow, bookings, creative publishing, CRM writes, automatic outreach, affiliate/referral tracking, false conversion attribution, or marketing emails.

The page is not the public launch. Do not merge, deploy or switch the official Telegram bot until the previous Mini App certification and branch/release gates are reconciled.

## Release gates

1. Reconcile deployed test-bot target and its exact commit. The public default branch may not match the current separate Mini App test preview.
2. Complete Order 2 certification and the relevant Order 3/4 adapter checks from the November Telegram work; preserve existing five-tab shell where applicable.
3. Run `npm run check` within `website/` and inspect build, lint, types and discovery checks.
4. Perform Telegram WebK, Desktop, Android and iOS testing, including Back navigation, safe areas, keyboard, reduced-motion and interrupted connectivity.
5. Confirm privacy/consent expectations, terms and content moderation for any future commercial launch.
6. Obtain explicit separate approval before introducing marketplace offers, bookings, CRM persistence, payments or external automation.

## Next research questions

- Which real publishers would consent to listings and independent evidence checking, and which reviewer would have authority to mark evidence verified?
- How will independently verified delivery and attribution differ from self-reported statistics?
- What publisher authenticity checks can be implemented without invasive permissions?
- What are the actual operating costs, fraud exposure, dispute-management requirements and jurisdictional obligations for a marketplace?

Do not treat these questions as implemented capabilities.
