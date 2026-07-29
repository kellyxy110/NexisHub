# Audit Log Specification

Every privileged event should record:

- event ID;
- actor ID and role from the verified server-side session;
- action and resource type;
- resource ID;
- previous and next status where applicable;
- timestamp in UTC;
- request correlation ID;
- result;
- reason for overrides or gate bypasses;
- security-relevant metadata without secrets or consent contents.

Audit events must be append-only, access-controlled, retained according to the approved policy, and unavailable to public routes. Failed authorization attempts should be recorded without leaking the protected resource.
