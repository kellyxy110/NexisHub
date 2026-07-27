# NRI AI Visibility Index Dataset Protocol

## Version

Version 0.1. Working protocol for pilot data collection.

## Objective

Collect a small, transparent, reviewable dataset that can test whether the proposed AI Visibility Index dimensions are understandable, observable, and useful for further research.

The pilot is for framework development. It is not intended to rank organisations publicly.

## Unit of analysis

The dataset contains four related units:

1. Organisation record
2. Page record
3. Discovery observation
4. Reviewer annotation

These units must remain linkable through stable identifiers.

## Proposed pilot sample

The initial pilot should contain 30 organisations across at least six sectors, with no fewer than three organisations per sector where recruitment allows.

Suggested sectors:

- software and technology
- education
- healthcare
- professional services
- nonprofit or community organisations
- public or civic information

The pilot should include a range of organisation sizes and website architectures. The sample must not be described as representative of Africa, a country, or an industry until a sampling design supports that claim.

## Inclusion criteria

An organisation may be included when:

- it has a public website in the study language
- the main website is reachable in the collection environment
- the study can record the URL and collection date
- the organisation or public source permits the planned use of the material
- the sample can describe the organisation without collecting unnecessary personal data

## Exclusion criteria

Exclude or defer a record when:

- the website requires credentials for the core material
- collection would require sensitive personal data
- the organisation has requested exclusion
- the site is primarily user-generated personal information
- the collection environment cannot produce a reliable snapshot
- the study team cannot explain the legal, ethical, or contractual basis for use

## Sampling record

For every organisation, record:

- `organisation_id`
- public name
- sector label
- country or region if relevant and publicly available
- website URL
- inclusion source
- inclusion date
- consent or public-interest basis
- size category if used
- language
- platform notes where observable

Avoid recording individual names unless required for a public authorship or source field.

## Page selection

Select up to five pages per organisation:

1. Homepage
2. About or organisation page
3. Primary product or service page
4. One documentation, article, or research page
5. Contact, pricing, or another decision-relevant page

Record the selection rule and any missing page type. Do not replace missing pages with a more favourable page without recording the change.

## Collection procedure

For each page:

1. Request the production URL.
2. Record status, final URL, timestamp, and content type.
3. Save a permitted HTML or text snapshot.
4. Record title, description, headings, canonical, robots controls, visible author, dates, structured data, and internal links.
5. Extract the main content without silently rewriting it.
6. Assign a source hash and tool version.
7. Record collection failures and retries.

Collection must respect robots policies, rate limits, terms, privacy requirements, and applicable law.

## Discovery observation set

Create 12 questions per organisation:

- two identity questions
- two definition questions
- two product or service questions
- two comparison questions
- two implementation questions
- two evidence or trust questions

Questions must be written before viewing the organisation's results where practical. Record the exact wording and the reason for each question.

Each observation must include:

- system name and mode
- model or product version when exposed
- query or prompt
- collection timestamp
- location or language setting where relevant
- response
- visible citations or links
- target source presence
- representation label
- reviewer confidence

The same observation set should be repeated at least twice on different dates during the pilot to estimate stability.

## Privacy and security

- Minimise collected data.
- Do not collect credentials, private content, or unnecessary personal information.
- Store raw snapshots separately from public research outputs.
- Restrict access to raw data and logs.
- Record retention and deletion dates.
- Remove personal contact details from published examples unless permission exists.
- Review external provider terms before sending prompts or URLs to third-party systems.

## Quality controls

- Two reviewers independently label at least 20 percent of page records.
- Two reviewers independently assess at least 20 percent of discovery observations.
- Use a calibration set before the main annotation period.
- Preserve the original label and the adjudicated label.
- Calculate agreement by dimension rather than one overall agreement number.
- Record missingness and collection failure rates.
- Freeze the pilot dataset before analysis.

## Analysis plan

The pilot should report:

- sample composition
- missing data
- collection failures
- label distributions
- reviewer agreement
- discovery observation stability
- representation error categories
- examples of disagreement
- sensitivity to alternative aggregation rules

Do not publish a composite index score unless the pilot demonstrates that the dimensions are sufficiently defined, reproducible, and useful for the intended question.

## Data release plan

The first public release should prefer:

- annotation guide
- codebook
- aggregated results
- de-identified examples
- collection and analysis scripts where safe
- versioned methodology

Raw website snapshots, prompts, provider outputs, and organisation-level records require a separate release review.

## Change control

Every protocol change must record:

- version
- date
- author
- changed section
- reason
- expected effect on comparability

Changes that affect sampling, labels, or outcomes must not be applied silently to already collected records.

