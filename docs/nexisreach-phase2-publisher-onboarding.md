# NexisReach Phase 2: publisher intake and controlled review foundation

Status: **isolated source-level preview, not certified, not a marketplace or public publisher onboarding service**.
Date: 2026-11-20.

## Reconciliation evidence

- NexisReach Phase 1 lives in draft PR #45 on branch `feature/adnexis-read-only-planner-20261120` at commit `a64a8bb2dbf17df34f0271a4355eb35ca8c60708` when Phase 2 was branched.
- Phase 1 CI run 44712496346 passed types, lint, unit tests, production build and discovery verification.
- The public `main` branch's latest inspected commit is `f2f9e7fa2f729836bbd203941d9b05db9f3cd814` (2026-10-30), and the public Telegram page is the earlier basic landing.
- Prior independently managed T-UI-3 test target: `@NexisHubPhase2TestBot`, expected URL `https://nexishub-telegram-miniapp-public-test-5ylkc4s67.vercel.app/telegram`.
- Prior T-UI-3 navigation target: **Home, Explore, Navigator, Insights, More**; Activity sits under More. Preserve Telegram BackButton, browser fallback, focus restoration, internal shell and safe areas.
- Prior newer test work referenced `fix/telegram-navigation-recovery-20261107` and commit `f42b678220ad88e0b37f16dea9264866c263ebfb`; this commit and branch were **not accessible** in the connected public NexisHub repository on 2026-11-20.
- The connected Vercel project `nexis-hub` contains auto-generated previews of NexisReach, but the exact T-UI-3 test URL could not be resolved through the available account and public website lookup.
- **Reconciliation conclusion:** the source of the newer T-UI-3 preview has not been established. Do NOT integrate Phase 2 into the newer shell or update BotFather until its source and actual deployed commit are verified. The Phase 2 route is isolated under the existing Phase 1 preview.

## Included in Phase 2 source

- Local-only public-channel intake at `/telegram/advertising/publisher`.
- Strict public Telegram username handling; rejects private invitation links and non-Telegram URLs.
- Self-reported publisher name, category, audience, region, public contact handle, NGN/USD price and post views.
- Existing Publisher Evidence Passport re-used with source classification, observation date and warnings.
- Consent to prepare a **local review packet**, distinct from optional interest in a future directory listing.
- Review packet available only in the user's browser memory and as a user-triggered, copyable JSON text.
- Pure `rehearsePublisherReview` policy: request evidence, reject, or *recommend* approval only after required attestations and consent. It never authenticates a reviewer, verifies a publisher, publishes a listing or modifies a database.
- Zero additional database tables, migrations, secrets, paid inference, bot privileges, persistence, hosted publisher records, payment services or automated outreach.
- Newly added route remains `noindex`; no changes to the public `/telegram` five-tab candidate or production aliases.

## What is deliberately not built

Real onboarding submissions, publisher directory, live channel discovery, Telegram API scraping, ownership challenge execution, authenticated reviewers, durable audit trail, formal verification, ad placements, advertising payments, escrow, refunds, campaign scheduling, publishing, lead capture or CRM writes.

The presence of fields and consent **does not** create a legally effective submission or a persistent account. No reviewer is authorized by a client-side label. Showing a source reference does not establish that the source is genuine or independently inspected.

## Conditions for real verified publisher onboarding

1. **T-UI-3 acceptance:** identify test deployment source and SHA; certify the Home/Explore/Navigator/Insights/More shell with Android, iOS, WebK and Desktop, Back navigation, focus, safe-area, reduced-motion and offline recovery.
2. **Policy and privacy:** approve publisher terms, jurisdictional obligations, advertising policies, documented record retention, data-subject requests and moderation boundaries.
3. **Server-side identity:** use a dedicated authenticated publisher account and a separately privileged reviewer role; no self-review or user-supplied reviewer role.
4. **Ownership challenge:** issue an expiring nonce and verify channel control via a minimal, documented, non-admin mechanism with the owner's consent. Never request channel-admin permissions unless explicitly necessary and reviewed.
5. **Durable backend and audit:** tenant-scoped application records, evidence hashes, versioned decisions, idempotency, rate limits, abuse detection and append-only event history.
6. **Evidence and approval:** source inspection and independent human decision; track rejected, clarification-required, under-review and approved states without treating recency as authenticity.
7. **Release:** require actual CI plus integration test evidence and separate authorization for migrations, environment changes, test-bot deployment or production integration.

## Verification matrix

- Pure intake validation: unit tests, CI required.
- Evidence Passport integration: existing deterministic tests, CI required.
- Offline review recommendation policy: unit tests, CI required.
- Build, typecheck, lint and discovery checks: CI required.
- Newer T-UI-3 test preview compatibility: **BLOCKED pending source reconciliation**.
- Authenticated reviewer, verified ownership and persistence: **NOT IMPLEMENTED**.
- Commercial marketplace and official Telegram bot: **OUT OF SCOPE**.

## Safe next step

Use this stacked branch as a source-only candidate for offline publisher review. Do not merge it into `main` or the official test-bot code without review of the five-tab preview source and certification. All future real submissions require a separately approved authenticated backend.
