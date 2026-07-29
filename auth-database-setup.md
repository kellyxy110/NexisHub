# Auth.js and Supabase PostgreSQL Setup

## Authentication

Auth.js is implemented through the existing Next.js App Router at `/api/auth/[...nextauth]`. It uses passwordless email verification and the Prisma adapter. Resend delivery is intentionally disabled until `AUTH_EMAIL_ENABLED=true` is explicitly configured.

## Database

Prisma 7 uses `prisma.config.ts`, `prisma/schema.prisma`, and the PostgreSQL driver adapter. `DATABASE_URL` must be a Supabase PostgreSQL connection string suitable for the deployed runtime. Use the Supabase pooler for application traffic and a direct connection where the migration workflow requires it, according to the selected Supabase project configuration.

## Founder bootstrap

Set `FOUNDER_EMAIL` in Vercel without committing its value. After Auth.js verifies that email, visit `/admin/bootstrap`. The transaction creates or finds `SUPER_ADMIN`, refuses a different existing founder, assigns the role once, and records an audit event.

No password or founder identity is hard-coded.

## Local validation

With a non-secret placeholder URL, the schema validates, Prisma Client generates, and the initial migration SQL is generated. No database was available in the repository environment, so `prisma migrate deploy` was not run.

## Rollback

Before applying a production migration, take a Supabase backup, record the migration ID, apply it in a controlled deployment, verify foreign keys and indexes, and use the documented deployment rollback procedure if application verification fails. Do not reverse a database migration without a tested compensating migration.
