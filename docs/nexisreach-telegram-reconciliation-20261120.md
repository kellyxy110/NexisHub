# NexisHub Telegram + NexisReach: source-safe integration handoff

Date: 2026-11-20
Status: **PREPARED, NOT INTEGRATED WITH THE FINISHED TELEGRAM SHELL**.
Purpose: preserve the working Telegram test Mini App while preparing NexisReach for a later, source-verified integration.

## Confirmed source evidence

From the user's November 10 T-UI-3 audit, the most specific locally recorded candidate is:

- Worktree: `C:\Users\user\Desktop\NexisHub-telegram-internal-reader-20261107`
- Local branch: `fix/telegram-internal-reader-20261107`
- Recorded HEAD: `f42b678220ad88e0b37f16dea9264866c263ebfb`
- Candidate fingerprint: `FE5423EA0398A6BB02635C9D042DD0713DA6F525F19788849113BC3EF9508BEC`
- There were 7 locally modified and 6 untracked files; the HEAD commit **alone does not contain the complete candidate**.
- Related source files absent from accessible public GitHub branches include `website/src/app/telegram/telegram-mini-app.tsx` and `website/src/app/telegram/telegram-navigation.ts`.
- Candidate preview project: `nexishub-telegram-miniapp-public-test` (`prj_NURirxYB3MuIxi8XAYQZ2cVsiL77`).
- Recorded immutable preview deployment: `dpl_4vJcBD6sEFj1ggNapHUU63Rpak6h`.
- Preview URL: `https://nexishub-telegram-miniapp-public-test-5ylkc4s67.vercel.app/telegram`.
- The Vercel connection used for this investigation could not resolve that project/deployment even when scoped to the known team.
- The latest candidate's exact source and current Telegram bot launch target **cannot be certified from these public sources alone**.

**Do not presume the November 10 candidate is the final five-tab Mini App.** Its contemporaneous report marked Home/Explore/Navigator/Insights/More migration incomplete; more recent local work may have completed it.

## Source-protection and snapshot gate (P0)

Before porting UI:
1. In the actual finished Mini App worktree, record current HEAD, branch, `git status --short`, `git diff --stat`, inventory of untracked files and the precise build output/deployment mapping. Do not reset, clean, stash, discard, force-push or switch that protected worktree.
2. Create a **separate disposable integration worktree or reviewed copy** based on an owner-approved immutable full candidate snapshot. Capture the changed **and untracked** source files; HEAD alone is insufficient.
3. Audit shell features: Home, Explore, Navigator, Insights, More, onboarding, internal About/Research readers, canonical registry, deterministic matcher, Action Gateway, client navigation/back/focus/safe area, framed/noindex routes, consent and authentication gates.
4. If the completed candidate is not safely available, stop. Do not use `main` as a substitute for the finished test Mini App.

## What is available now

Draft PR #45: campaign planner + publisher Evidence Passport.
Draft PR #46: publisher intake + offline review packet, stacked on PR #45.

This integration-preparation branch starts from PR #46 and performs only:
- Restores `website/src/app/telegram/page.tsx` exactly to the public `main` version (SHA of file blob: `e319dce7a0af455bcc88fd9e3bbfe72a98c418dc`). **This is not a copy of the finished Telegram shell.** It simply removes the older NexisReach landing-page insertion to avoid carrying a known overwrite hazard.
- Adds `website/src/lib/nexisreach-telegram-integration.ts`, a pure opt-in menu descriptor with fixed internal NexisReach routes. No default navigation exposure.
- Adds `website/tests/nexisreach-telegram-integration.test.mjs`, enforcing opt-in gates and no direct legacy landing-page insertion.
- Does not update the bot, Vercel aliases, authentication, production, canonical registry, matcher, gateway, package lock or database.

**The new branch is not an integration release**, and its restored old landing page must not be copied over the finished Mini App.

## Selective path transfer to the verified Mini App

Once the full host snapshot is available, start from that snapshot and review only:
- `website/src/lib/nexisreach-planner.ts`
- `website/src/lib/nexisreach-evidence.ts`
- `website/src/lib/nexisreach-publisher.ts`
- `website/src/lib/nexisreach-telegram-integration.ts`
- `website/src/app/telegram/advertising/**`
- `website/tests/nexisreach-*.test.mjs`

Do **not** cherry-pick whole PRs #45/#46 or blindly merge their changed `website/src/app/telegram/page.tsx`. Preserve the finished Mini App's shell/router instead.

The NexisReach routes currently use the older `TelegramWebAppBridge` and styling. Inspect their integration with the real host's CSS, client navigation/BackButton/history/safe-area before enabling a More entry. A link from the completed five-tab More tab is a **separate, future reviewed change**.

`getNexisReachMoreEntries` returns no entries until three explicit conditions are true:
- owner-approved *test-preview* integration;
- actual host source verified against the preview;
- Telegram-client acceptance tests completed.

These flags are code-level gating examples; they do not themselves establish the real-world conditions or change deployment configurations.

## Release checklist

- [ ] Approved immutable snapshot of final Mini App source including local untracked files
- [ ] Source-commit-and-artifact provenance for the exact test-bot URL
- [ ] Existing five-tab shell and UI reviewed as-is
- [ ] Isolated branch based on **verified completed** source
- [ ] Selective NexisReach paths imported, with no overwritten app-shell/auth/registry/gateway files
- [ ] Internal More-tab integration and native BackButton/browser-fallback tested
- [ ] Full existing tests, typecheck, lint, build and discovery verification pass
- [ ] Test Android, iOS, Telegram WebK/Desktop, safe area, keyboard, navigation and lost network
- [ ] Confirm that no data is sent/stored, no listing is published and no payments/posting occur
- [ ] Review privacy/AdSense/noindex/CSP/framing and dependency vulnerabilities
- [ ] Explicit separate approval for test-bot change, then distinct approval for any production release

## No-go conditions

Missing host snapshot, unverifiable bot/deployment mapping, lost or overwritten UI components, new runtime permissions or bot-admin access, unreviewed network calls, unauthorised sign-in/CRM writes, unexpected CSP or indexing changes, failing parity tests, and any proposed payment or publishing action.

## Recovery principle

The simplest rollback for an approved host integration is to disable its explicit NexisReach More-tab entry and redeploy the previously certified host artifact, subject to normal release approval. **Do not change BotFather, push to production, or alter aliases as part of preparing this handoff.**
