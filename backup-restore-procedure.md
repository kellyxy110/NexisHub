# Backup and Restore Procedure

**Status:** Procedure draft. No backup provider or restore evidence is currently configured.

1. Record the provider, region, encryption mode, schedule, and retention period.
2. Create an encrypted backup before each schema migration.
3. Store backup metadata and checksum separately from the backup payload.
4. Restrict restore access to approved infrastructure personnel.
5. Restore into an isolated environment.
6. Run migration parity, authorization, and integrity checks.
7. Record restore duration, result, gaps, and evidence location.
8. Do not restore sensitive records into development without sanitisation.

The production system must not claim recoverability until a real restore test is recorded.
