# Staged Administration Activation

## Stage 0 — Public operation

The public NexisHub, Studio, and NRI surfaces operate from the existing file-backed content. All administrative flags are false.

## Stage 1 — Founder-safe administration

The safe stage becomes eligible only when all of these production gates are explicitly verified:

- real authentication works;
- server-side RBAC is active;
- the founder identity is verified;
- database migrations pass;
- security checks pass;
- database, authentication, and audit infrastructure are configured;
- `ADMIN_ENABLED=true` is approved.

The repository represents these gates through:

```text
ADMIN_ENABLED
NEXIS_ADMIN_AUTH_READY
NEXIS_ADMIN_MIGRATIONS_READY
NEXIS_ADMIN_SECURITY_CHECKS_PASSED
NEXIS_ADMIN_FOUNDER_VERIFIED
```

The effective flag is `founderSafeAdminEnabled`. It is false unless every gate passes.

## Stage 2 — Independent module activation

After Stage 1, the founder may enable low-risk modules independently, such as publication draft metadata or Studio operational preparation, subject to the real store and authorization adapter.

The following remain separately gated:

- reviewer confidential records;
- pilot participants and datasets;
- consent records;
- production email invitations;
- legal documents;
- public Version 1.0 publication.

## Current status

The current repository is still in Stage 0 because authentication, database, storage, monitoring, email, and backup providers were not found during inspection. The activation path is implemented, but no flag is falsely enabled.
