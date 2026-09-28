# Newsletter Eligibility

`isNewsletterEligible(record)` is a pure deterministic check. It performs no
LLM call and no network request.

A record is eligible only when:

- the record validates against `ContentRegisterRecordSchema`;
- `status` is `PUBLISHED`;
- `newsletter_eligible` is `true`;
- `canonical_url` is a syntactically valid `http` or `https` URL.

Draft, approved-but-unpublished, archived, explicitly ineligible, missing,
or malformed URLs are rejected. URL syntax is not proof of external
publication; the ingestion or operational owner must verify the publication
before recording it as `PUBLISHED`.

The current Newsletter delivery contract remains unchanged. Eligibility is a
future curation input, not a prerequisite for receiving subscriptions.
