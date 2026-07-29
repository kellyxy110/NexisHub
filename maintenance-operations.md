# Maintenance Operations

## Link monitoring

Use `LinkCheckRecord` from `website/src/lib/maintenance.ts`. Checks must be rate-limited, record redirects and failures, and create editorial tasks rather than silently removing references.

## Source freshness

Use `SourceRecord` and `classifyFreshness`. Historical sources are not stale solely because they are old. Review interval must reflect the source purpose.

## Maintenance calendar

Calendar categories include source review, link check, policy review, accessibility, legal review, roadmap, DOI, and publication maintenance. Owners remain `Unassigned` until assigned by a real person.

## Current state

The repository has source-integrity maintenance automation. A durable calendar, background scheduler, link database, and notifications require a chosen persistence and notification provider before production implementation.
