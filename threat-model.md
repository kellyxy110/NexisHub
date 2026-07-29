# Administration Threat Model

**Status:** Internal draft. Security review pending.

| Threat | Impact | Required control |
|---|---|---|
| Stolen session | Unauthorized administration | Secure, short-lived sessions, rotation, revocation, MFA where supported |
| Privilege escalation | Unapproved publication or data access | Server-side RBAC, deny-by-default routes, audit events |
| Forged invitation or consent link | Invalid research record | Expiring, single-use, signed tokens and verification |
| Webhook abuse | Spam or data leakage | Authentication, rate limiting, validation, replay protection |
| Malicious file upload | Code execution or data exposure | Allowlist, size limits, malware scanning, private storage |
| Cross-site request forgery | Unauthorized mutation | SameSite cookies, origin checks, CSRF tokens where applicable |
| Database compromise | Bulk disclosure | Encryption, least privilege, backups, retention, monitoring |
| Audit tampering | Loss of accountability | Append-only storage and restricted access |
| Accidental publication | False research claim | Approval gates, immutable status events, preview and rollback |

No claim of completed security testing or compliance is made.
