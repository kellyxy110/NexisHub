# Selected Provider Operations

## Selected stack

- Auth.js through the existing Next.js App Router
- Supabase PostgreSQL through Prisma 7 and `@prisma/adapter-pg`
- Supabase Storage through a server-only client boundary
- Vercel deployment and encrypted environment variables
- Sentry server/edge initialization, enabled only when a DSN is configured
- Resend authentication email delivery, disabled by default
- PostgreSQL audit persistence through Prisma

## Credential boundary

The supplied `db.prisma.io` URL is a Prisma Postgres credential, not a Supabase credential. It was not added to Vercel or committed. A Supabase project URL and PostgreSQL connection string are required for the selected production stack.

## Current readiness

Code boundaries are implemented. Auth.js can only verify users after `DATABASE_URL`, `AUTH_EMAIL_FROM`, and an explicitly enabled Resend sender are configured. Supabase Storage and Sentry remain inactive until their server-only values are configured. Production email invitations and research-sensitive modules remain disabled.
