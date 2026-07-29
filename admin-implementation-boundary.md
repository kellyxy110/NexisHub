# Administration Implementation Boundary

## Current architecture

NexisHub currently has a Next.js public application with file-backed public content. It does not currently contain a database provider, ORM, authentication provider, session layer, or authenticated admin route.

## Implemented foundation

`website/src/lib/workflows.ts` defines typed roles, permissions, publication statuses, pilot statuses, Studio proposal and change-request statuses, transition validation, audit-event shape, and public-publication visibility rules.

## Safety boundary

The workflow module is a domain foundation, not an authenticated admin system. It must not be used as the sole authorization boundary for privileged production mutations. Server-side identity, session validation, database transactions, rate limiting, and audit persistence are required before enabling administrative writes.

## Next persistence decision

Before implementing migrations, select and document the database, ORM, authentication provider, deployment environment, encryption approach, retention policy, and backup strategy. Do not add a production database dependency based on an invented provider choice.
