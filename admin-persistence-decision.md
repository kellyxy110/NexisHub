# NRI and Studio Administration Persistence Decision Package

## Decision status

**Status:** Architecture boundary prepared; provider selection pending founder approval.

The public application currently has file-backed content and no authenticated administration backend. The repository may define interfaces and safeguards now, but it must not enable privileged mutations until persistence, identity, authorization, audit storage, backups, and retention controls are configured and tested.

## Required capabilities

The selected implementation must provide:

- durable relational records for publications, versions, reviews, pilots, consent, Studio operations, source health, maintenance tasks, and audit events;
- server-side authentication and session validation;
- role and permission enforcement on every administrative mutation;
- transaction support for status changes and audit events;
- protected handling of consent and client information;
- migrations, backups, restore testing, and rollback notes;
- environment-specific credentials without secrets in Git;
- predictable local, CI, preview, and production behaviour.

## Provider-neutral boundary

The application exposes a small configuration boundary through `website/src/lib/admin-infrastructure.ts`. It reports `DISABLED` unless all three categories are configured:

- `NEXIS_ADMIN_DATABASE_URL`
- `NEXIS_ADMIN_AUTH_SECRET`
- `NEXIS_ADMIN_AUDIT_STORE`

These variables are configuration markers, not a claim that a provider or service has been selected. The current public deployment must continue to operate with administration disabled.

## Approval gates before implementation

1. Founder selects the database, ORM or query layer, authentication provider, audit storage, and hosting region.
2. Legal counsel reviews privacy, retention, consent, client confidentiality, and international data-transfer implications.
3. A migration plan is reviewed against the existing file-backed registries.
4. Role assignments are approved without inventing reviewer or Studio personnel.
5. Security testing covers session handling, privilege escalation, invitation tokens, uploads, and private records.
6. Backup and restore evidence is recorded.

## Safe rollout sequence

1. Add additive schema migrations and a development-only database adapter.
2. Import only verified registry records.
3. Run read-only parity checks against file-backed content.
4. Enable authenticated draft editing for approved roles.
5. Enable review and adjudication workflows.
6. Enable pilot and consent records with restricted access.
7. Enable Studio commercial records.
8. Make approved public publication records readable from the database.

No migration may delete the existing registries until parity, backup, and rollback evidence exists.

## Explicit non-claims

This package does not claim that a database, authentication provider, legal review, privacy review, reviewer appointment, pilot, consent process, or administrative deployment exists.
