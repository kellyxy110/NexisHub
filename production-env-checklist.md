# Vercel Production Environment Checklist

Add these as encrypted Vercel Production variables. Do not commit values.

## Required for Auth.js and Prisma

- `DATABASE_URL` — Supabase PostgreSQL runtime connection string
- `AUTH_SECRET` — generated random Auth.js secret
- `NEXTAUTH_URL` — `https://nexishub.vercel.app`
- `AUTH_EMAIL_FROM` — verified sender address
- `RESEND_API_KEY` — Resend API key
- `FOUNDER_EMAIL` — founder email to permit one-time bootstrap

## Readiness gates

- `ADMIN_ENABLED=false` until verified
- `FOUNDER_ADMIN_ENABLED=false` until verified
- `NEXIS_ADMIN_AUTH_READY=false` until Auth.js works
- `NEXIS_ADMIN_MIGRATIONS_READY=false` until production migration is applied
- `NEXIS_ADMIN_SECURITY_CHECKS_PASSED=false` until critical security tests pass
- `NEXIS_ADMIN_FOUNDER_VERIFIED=false` until the verified founder session is confirmed

## Keep disabled

- `AUTH_EMAIL_ENABLED=false`
- `NRI_REVIEW_ADMIN_ENABLED=false`
- `NRI_PILOT_ADMIN_ENABLED=false`
- `NRI_CONSENT_ADMIN_ENABLED=false`
- `EMAIL_INVITATIONS_ENABLED=false`
- `PUBLICATION_V1_ENABLED=false`

## Sentry and Supabase Storage

- `NEXT_PUBLIC_SENTRY_DSN` — Sentry browser DSN, if browser monitoring is enabled
- `SENTRY_DSN` — Sentry server DSN
- `SENTRY_AUTH_TOKEN` — deployment source-map upload token
- `SENTRY_ORG` — Sentry organisation
- `SENTRY_PROJECT` — Sentry project
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — server-only storage key; never expose to the browser
- `SUPABASE_STORAGE_BUCKET` — private bucket name

The existing encrypted `FORM_WEBHOOK_URL` and `NEXT_PUBLIC_FORMS_ENABLED` variables remain unchanged.

## Supavisor pooler separation

- `DATABASE_URL` uses the validated Transaction Pooler on port `6543` for runtime traffic.
- `MIGRATION_DATABASE_URL` uses the validated Session Pooler on port `5432` for Prisma migrations.
- Both use `sslmode=require` and the explicit `uselibpqcompat=true` parameter required by the current PostgreSQL adapter in this environment.
- Do not revert to the direct `db.<project-ref>.supabase.co:5432` hostname from the unreachable IPv6 path.
- Rotate the database password after connection setup, then update both encrypted Vercel variables and rerun connectivity checks.
