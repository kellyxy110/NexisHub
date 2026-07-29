# Administration Store Contract

`website/src/lib/admin-store.ts` defines the provider-neutral contract for future NRI and Studio administration persistence.

## Contract rules

- `getPublication` must never expose private or draft records without an authorized server-side caller.
- `savePublicationDraft` must run inside a transaction with status validation and an audit event.
- `appendAuditEvent` must be durable and append-only.
- Implementations must validate identity and permissions before invoking mutations.
- Implementations must not accept client-supplied `createdBy`, `approvedBy`, `publishedBy`, or reviewer identity fields as trusted values.

## Current implementation

`DisabledAdminStore` fails closed for every operation. `createAdminStore()` currently returns this disabled implementation because no database, authentication provider, or audit store has been selected or configured.

This is intentional. A temporary in-memory store would create false confidence and would not be suitable for research, consent, legal, or commercial records.

## Provider adapter requirements

A future adapter must provide:

1. schema migrations and rollback notes;
2. transaction semantics;
3. server-side identity integration;
4. role and permission checks;
5. audit persistence;
6. private-record filtering;
7. backup and restore evidence;
8. test fixtures that are clearly synthetic and isolated from production;
9. error handling that does not leak sensitive records;
10. observability without recording secrets or consent contents unnecessarily.

The public file-backed registries remain authoritative until a parity migration is reviewed and accepted.
