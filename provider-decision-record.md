# NexisHub Provider Decision Record

**Date:** 2026-07-29

## Discovered production architecture

| Capability | Current provider/configuration | Readiness | Decision |
|---|---|---|---|
| Source control | GitHub `kellyxy110/NexisHub` | Production-capable | Reuse |
| Deployment | Vercel project `kellyxys-projects/nexis-hub` | Production-capable | Reuse |
| Form delivery | Encrypted Vercel `FORM_WEBHOOK_URL`; endpoint is provider-agnostic | Configured for existing form flow | Reuse; review webhook security and retention |
| Authentication | No provider, session layer, or auth routes found | Not ready | Do not invent a second system; select and configure one |
| Database/ORM | No database, ORM, schema, or migration directory found | Not ready | Select before enabling persistence |
| Storage | No storage adapter or bucket configuration found | Not ready | Select before private uploads or consent evidence |
| Email | No email SDK/provider configuration found | Not ready | Keep invitations disabled |
| Monitoring | No monitoring SDK/provider configuration found | Not ready | Add before admin production enablement |
| Backups | No backup provider, schedule, or restore evidence found | Not ready | Keep administration gated |

## Environment evidence

The Vercel production environment listing contained encrypted `NEXT_PUBLIC_FORMS_ENABLED` and `FORM_WEBHOOK_URL`. Local environment inspection exposed only the variable name `VERCEL_OIDC_TOKEN`; no secret value was read or recorded.

## Recommended decision

Reuse Vercel, GitHub, and the existing webhook flow. Do not add authentication, database, storage, email, monitoring, or backup dependencies until the founder selects providers and configures them in Vercel. The repository now contains provider-neutral contracts, feature flags, authorization primitives, and evidence documents so the selected providers can be integrated without a second admin system.

## Security implications

Founder-safe administration cannot be enabled until authentication, server-side RBAC, database migrations, security checks, founder verification, audit persistence, backup evidence, and secret configuration exist. Legal review and privacy policy review remain pending.
