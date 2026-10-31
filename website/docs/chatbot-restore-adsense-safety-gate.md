# NexisHub chatbot restoration: AdSense safety gate

Status: investigation and preview only. No production authorization.

## Verified baseline (2026-10-31)
- Production project: `nexis-hub`, production branch `main`.
- Telegram authentication project is separate: `nexishub-telegram-auth-test`.
- Production `website/src/app/layout.tsx` mounts AdSenseLoader, AnalyticsTracker, GoogleAnalytics and PrivacyControls; it does not mount a chatbot.
- Production `website/src/app/page.tsx` does not mount a chatbot.
- `website/src/lib/advertising-consent.ts` restricts vendor loading to www.thenexishub.org, explicit editorial allowlist, and advertising opt-in.
- Live `/ads.txt` contains Google publisher pub-3694194350196538; `/robots.txt` allows public paths and declares the sitemap.
- Assistant implementation previously existed in a protected preview, but its current source, feature gates, and tests must be recovered and verified before any restoration. Do not invent or replace with an unverified chatbot.

## Non-negotiable constraints
1. Do not modify `website/src/components/adsense-loader.tsx`, `website/src/lib/advertising-consent.ts`, `website/src/app/layout.tsx` advertising behavior, `ads.txt`, robots, sitemap, canonical metadata, or privacy/consent controls for chatbot convenience.
2. Do not alter production Vercel environment variables, deployment aliases, domain mappings, AdSense account settings, or submit an AdSense review.
3. Assistant API routes must be non-indexable, protect against prompt injection and disclosure, and use only vetted public source material. No claims that a preview feature is live.
4. No new paid dependencies or mandatory API services. Groq answers must remain optional and server-only; retrieval-only fallback must work.
5. Preserve existing site content, editorial pages, navigation, and accessibility. Test 375/390px mobile and desktop.
6. Before implementation, locate the earlier assistant implementation from repository history or verified preview, inventory its components/routes/configuration, and produce a gap analysis.
7. Before deployment, run relevant tests, TypeScript, lint, build, accessibility and smoke checks. Compare changed files against the protected AdSense list and reject any advertising or indexing regressions.
8. Deploy only to a protected preview and verify `X-Robots-Tag: noindex` on preview, assistant API endpoints and any private session content.
9. No merge, production deployment or enabling chatbot on production without separate explicit authorization.

## Current certification
- Branch isolation: established.
- AdSense baseline: inspected, not changed.
- Original assistant source recovery: pending.
- Implementation: pending.
- Tests: pending.
- Protected preview: pending.
- Production: untouched.

## Recovered source evidence (2026-10-31)
- The current `main` branch already contains `website/src/app/telegram/telegram-assistant.tsx`, `telegram-retrieval.ts`, and `telegram.css`. The Telegram landing route mounts `TelegramAssistant` with `siteAnswers` mapped to published source links.
- The Telegram assistant is **not** the earlier site-wide knowledge assistant. It uses deterministic browser-only keyword retrieval, has no Groq dependency, retains chat state only in React memory, and links to sources. Do not misrepresent it as the full earlier chatbot.
- The Telegram assistant is embedded in `/telegram` only. The production homepage and root layout do not mount it, explaining why a visitor to `/` cannot see it.
- The current `main` branch AdSense controller is present and explicitly checks production hostname, editorial-path allowlist, and advertising consent.
- **Decision gate:** first determine whether the intended restoration is the earlier site-wide assistant or a shared presentation of the Telegram retrieval assistant. Do not mount the Telegram component globally without reviewing CSS isolation, accessibility, source freshness and editorial/AdSense interactions.
- No production modifications and no code restoration have occurred in this branch.

## Original assistant recovery evidence (2026-10-31)
- Historical Vercel deployment `dpl_9v4zmbCXc3vxdGUqLJsNSszRhhBE` is READY and has a CLI-uploaded source tree, including original `public-knowledge-assistant.tsx`, `lib/knowledge-assistant.ts`, `lib/public-knowledge.ts`, `lib/groq-answer.ts`, and `app/api/knowledge/route.ts`.
- File-content retrieval through the connected deployment interface returns truncated base64 (literal `...[truncated]` suffix), preventing lossless reconstruction. **Do not commit partial decoded files or claim the original assistant is restored.**
- The temporary Telegram-derived site widget has been unmounted in this branch. Its prior preview deployment is now superseded. Restore the historical source through an untruncated archive or local Vercel CLI source, then reconcile imports and tests before another preview.
- AdSense-related source files and production configuration remain outside the change scope.
