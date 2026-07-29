# Administration Provider Selection Checklist

## Current status

**Provider:** Not selected

**Administration:** Disabled

**Decision owner:** Founder

No provider is assumed by the repository. The checklist below must be completed before enabling NRI or Studio administrative mutations.

## Decisions required

| Decision | Required evidence |
|---|---|
| Database and query layer | Provider, region, schema ownership, migration strategy |
| Authentication | Identity provider, session model, recovery process, MFA plan |
| Authorization | Role source, permission enforcement, break-glass policy |
| Audit storage | Append-only destination, retention, export, review access |
| File storage | Consent and publication asset storage, access control, malware scanning |
| Email delivery | Sender identity, delivery provider, bounce handling, test mode |
| Backups | Schedule, encryption, restore test, recovery owner |
| Privacy | Data categories, retention, deletion, access, transfer review |
| Operations | Monitoring, alerts, incident response, support ownership |

## Environment contract

The application recognizes these markers:

```text
NEXIS_ADMIN_DATABASE_URL=
NEXIS_ADMIN_AUTH_SECRET=
NEXIS_ADMIN_AUDIT_STORE=
```

These values must be stored only in the deployment secret manager. Their presence alone does not approve a provider or enable administrative writes; the adapter, migrations, authorization checks, and operational evidence must also be reviewed.

## Enablement gates

Administration may move from `DISABLED` to an enabled state only after:

1. The founder approves the provider decision.
2. Legal counsel reviews privacy, confidentiality, consent, retention, and client data terms.
3. Migrations are tested against a disposable environment.
4. Backups and restore are demonstrated.
5. Server-side authorization tests pass.
6. Audit records are durable and access-controlled.
7. No real participant, reviewer, client, or legal records are seeded without evidence.

Until then, the public application remains file-backed and administrative writes remain fail-closed.
