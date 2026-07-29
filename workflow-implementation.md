# Workflow Implementation Record

## Included domain workflows

- Publication lifecycle with review, approval, correction, retraction, and archive states
- Pilot lifecycle with approval, invitations, consent, data collection, analysis, review, and completion states
- Studio proposal lifecycle
- Studio change-request lifecycle
- Role and permission map
- Audit-event shape
- Public publication visibility rule

## Required future persistence

Publication, publication version, author, review assignment, review comment, adjudication decision, pilot, contact, consent, proposal, SOW, change request, invoice, incident, case-study permission, source health, maintenance task, and audit event records require durable storage before production administration is enabled.

## Empty-state requirement

Until real records exist, public and admin views must show empty states such as `No pilot dataset has been uploaded or validated.` and `No reviewers are appointed.` They must not display synthetic participants, findings, scores, approvals, or completed reviews.
