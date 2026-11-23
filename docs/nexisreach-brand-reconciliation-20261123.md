# NexisReach brand reconciliation and source-only handoff

Date: 2026-11-23
Status: ISOLATED SOURCE-ONLY RENAME. NOT MERGED, NOT RELEASED, NOT INTEGRATED WITH THE FINISHED MINI APP.

## Canonical identity
- Parent ecosystem: NexisHub.
- Advertising marketplace and marketing services: **NexisReach**.
- User-facing copy, module namespaces, exported TypeScript integration types/functions, menu identifiers, styles and focused tests use NexisReach.
- The generic preview route `/telegram/advertising` and its publisher sub-route are retained as stable navigation destinations, not as a competing brand. Any eventual canonical URL migration requires a separate reviewed compatibility plan.
- Existing draft PRs #45, #46 and #47, their historical titles and commit SHAs remain untouched. Their legacy `adnexis` branch names are real historical Git identifiers and must not be rewritten in documentation links.

## Changed source namespace
- `website/src/lib/nexisreach-planner.ts`
- `website/src/lib/nexisreach-evidence.ts`
- `website/src/lib/nexisreach-publisher.ts`
- `website/src/lib/nexisreach-telegram-integration.ts`
- `website/tests/nexisreach-*.test.mjs`
- `docs/nexisreach-*.md`
- UI labels and CSS classes updated to the NexisReach namespace.

## Unchanged security and release properties
- Preview planning remains browser-memory-only, nontransactional and noindex.
- Publisher intake is a local draft, not real registration, independent verification or public listing.
- No database migrations, login change, bot-admin grant, payment integration, scheduled posting, scraping, CRM or outbound marketing.
- Menu integration remains disabled until three explicit gates are satisfied: approved test-preview integration; verified full host Mini App source; certified Telegram client behavior.
- The old `website/src/app/telegram/page.tsx` remains unchanged, preserving source-safe separation from the missing completed five-tab Mini App snapshot.

## Source provenance blocker
The reported finished test Mini App was associated with a local worktree that included modified and untracked files unavailable from this GitHub repository. **Do not merge this brand branch into public main or a test/production Mini App to compensate for that missing source.** Locate the actual complete final candidate; capture all local changes and untracked files; verify source SHA, deployment, route shell, history and BackButton; then selectively port NexisReach modules and test in a separate isolated reviewed worktree.

## Next certification
Run the existing website test suite, typecheck, lint, production build and discovery checks in a safe local checkout; review automated status checks for this exact commit; manually test Telegram WebK/Desktop/Android/iOS after authorized host integration. A successful Vercel branch preview is not a certified Mini App or permission to launch.

## Commercial rollout
Start with manual publisher and advertiser pilot research only. Require authenticated roles, verifiable publisher permission, enduring booking records, independent ad delivery evidence, moderation, privacy controls and applicable Telegram Stars compliance before processing paid digital bookings inside the Mini App.
