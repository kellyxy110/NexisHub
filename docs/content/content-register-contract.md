# Cross-Channel Content Register Contract

The repository defines a provider-neutral record for externally recorded
publication metadata in `website/src/lib/content-contract.ts`. It does not
duplicate the existing NexisHub editorial catalog, publication registry, or
repository-backed blog content.

## Record

`ContentRegisterRecord` contains:

`content_id`, `published_at`, `brand`, `channel`, `title`, `canonical_url`,
`topic`, `summary`, `status`, `newsletter_eligible`, and
`last_newsletter_date`.

Brands are `NEXISHUB` and `SITENEXIS`. Channels are `BLOG`, `YOUTUBE`,
`LINKEDIN`, `MEDIUM`, and `FACEBOOK`. Statuses are `DRAFT`, `APPROVED`,
`PUBLISHED`, and `ARCHIVED`.

## Ownership

Existing NexisHub blog and publication records remain their own source of
truth. External ingestion is responsible for recording a real published URL
and assigning `PUBLISHED`; this contract does not perform network verification.
No external channel API or database is added.

## Privacy and freeze

Content records are public publication metadata, but lead/customer data must
remain private operational data. This package changes no public page, feed,
sitemap, canonical, AdSense, or CMP behavior.
