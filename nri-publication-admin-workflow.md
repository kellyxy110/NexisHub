# NRI Publication Registry and Admin Workflow

## Current repository model

The publication registry is represented by `nri-publication-registry.ts`. It contains DOI-ready fields for title, subtitle, type, status, version, date, authors, abstract, keywords, canonical path, DOI, review level, licence, and data availability.

## Lifecycle

Draft → Planning → Pre-Review → Peer Review → Revision → Published → Archived.

No status transition should be made without a dated decision record. Peer Review and Published require real evidence of those actions.

## Future authenticated admin model

An authenticated admin surface should support draft creation, version snapshots, reviewer assignment, conflict declarations, review comments, adjudication, author responses, publication gates, correction notices, retraction notices, and audit events.

Until that surface exists, repository changes and dated governance records are the source of truth.

## Required permissions

Admin access must be role-based. Publication editing, review adjudication, legal approval, and release approval must be separate permissions where staffing allows. No participant, reviewer, or private data belongs in public route modules.

## Current publication

AI Visibility Index, Version 0.1, status Pre-Review. DOI: none. Pilot data: none. Reviewers: Vacant / To Be Appointed.
