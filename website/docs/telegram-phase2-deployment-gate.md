# Telegram Mini App Phase 2 deployment gate

Scope: `feature/telegram-phase2-secure-identity-20261030`, PR #43. **Do not enable production authentication by merging this branch alone.**

## Preconditions
1. GitHub website checks, TypeScript, lint, tests and Vercel preview build must pass at the exact release SHA.
2. Apply the new Prisma migration **only** to a disposable PostgreSQL database first. Generate Prisma client and execute a real login/replay/session/logout integration suite. Verify two concurrent requests for identical signed initData produce at most one session.
3. Confirm database schema, cleanup/retention job for expired `TelegramLaunchReplay` and `TelegramAuthSession` records, DB access controls, backups, and operational monitoring.
4. Configure server-only `TELEGRAM_MINIAPP_BOT_TOKEN` with a valid non-exposed credential, and a random independent `TELEGRAM_MINIAPP_SESSION_SECRET` (at least 32 characters). Never put either in `NEXT_PUBLIC_*`, client bundles, or repository.
5. Verify Telegram WebApp `initData` against the configured bot; exercise login in a genuine Telegram launch, cookie persistence, session status, logout, replay rejection, expiration, cross-origin rejection, and DB outage fail-closed behavior.
6. Audit request-rate limiting, origin/proxy host handling, cookie compatibility on Android Telegram, CSRF defenses, and account-linking authorization before enabling the gate.
7. Confirm source-backed AI answers are separately reviewed and that no model provider is mandatory for the fallback assistant.

## Release procedure
- Keep `TELEGRAM_MINIAPP_AUTH_ENABLED=false` in production throughout preview and migration verification.
- Review and merge only after all gates pass and explicit production authorization is given.
- Migrate the target database through the normal approved deployment pipeline; never run ad hoc migrations against production.
- Enable auth for a controlled test cohort only after the real Telegram bot token is secured and all checks pass.
- Monitor 401/403/409/503 rates without logging raw `initData`, tokens, cookies, or Telegram identifiers.
- Roll back by setting `TELEGRAM_MINIAPP_AUTH_ENABLED=false`; do not drop tables to roll back.

## Current limitations
- No live Telegram login journey or disposable PostgreSQL migration execution has been verified.
- The Telegram client bridge is not yet wired to invoke the login endpoint.
- There is no production-enabled account linking or AI model answer endpoint.
- The database retention cleanup and rate limiter are not implemented.
- A successful Vercel preview build is not proof of working authentication.

## Database-independent interface work

The Mini App shell can be exercised without Telegram authentication or PostgreSQL. The
Telegram bridge calls the official SDK's `ready()` and `expand()` methods when available,
tracks `themeChanged` and `viewportChanged`, and applies Telegram's light/dark scheme and
safe-area viewport values to the page. Outside Telegram, the page remains a read-only public
preview and reports that account tools are unavailable; it does not treat browser state as
authenticated identity. Header/background color calls are guarded with Telegram's documented
6.1 capability check so older SDK clients do not receive unsupported-method warnings.

The public assistant is local keyword retrieval over the approved public answer set. It has
an honest loading state, an empty conversation state, keyboard-visible controls, reduced-motion
support and session-only messages. No assistant conversation, feedback, or personal data is
stored. This interface work does not establish real Android, iOS, or desktop Telegram-client
compatibility; those remain manual acceptance checks.

## Database contingency

Do not point this branch at production. The preferred temporary route remains repair and
verification of the existing isolated Prisma Postgres integration because it preserves the
repository's migration and adapter path. A local or disposable Docker PostgreSQL instance can
be used for migration rehearsal only after explicit approval, with a separately generated
connection string and an unmistakable test-only environment variable. It must not replace the
isolated hosted verification or be allowed to flow into Vercel configuration. No alternative
database was provisioned by this interface pass.
