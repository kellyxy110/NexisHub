# NRI Research Architecture

## Layers

1. Programme registry: questions, status, owners, deliverables, and related products.
2. Publication registry: title, authors, version, status, type, dates, references, review, and permissions.
3. Review workflow: comments, conflicts, adjudication, response, and release gates.
4. Pilot records: proposal, information sheet, consent, collection, analysis, lessons, and completion.
5. Discovery surfaces: research home, programme pages, publication collections, search, structured data, sitemap, RSS, and print output.

## Current implementation

Programme records live in `website/src/lib/nri-programmes.ts`. Programme pages are generated at `/research/programmes/[slug]`. Collection pages are generated at `/research/[section]`. The search surface is `/research/search`. The first working paper is `/research/ai-visibility-index`.

## Future publication management

A production admin system should store publication drafts, immutable versions, authors, review records, permissions, correction notices, citation metadata, downloadable assets, and audit events. Until a database and authenticated admin surface are approved, the repository remains the source of truth for public records and templates.

## DOI-ready fields

Title, subtitle, abstract, authors, affiliations, ORCID where supplied, publication type, version, status, date, keywords, language, licence, rights holder, citation string, related work, dataset, software, funder, conflict statement, review level, canonical URL, and future DOI.
