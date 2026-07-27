# NRI AI Visibility Index Annotation Guide

## Purpose

This guide defines how reviewers label website and AI-assisted discovery evidence for the first AI Visibility Index study.

The guide is designed to produce consistent observations. It must not be used to manufacture a score, guarantee citations, or infer a cause from one observation.

## Review principles

- Label what is observable.
- Record the URL, date, tool, and evidence for every label.
- Do not infer ownership, quality, authority, or intent without evidence.
- Use `unknown` when the available material is insufficient.
- Separate page-level evidence from organisation-level interpretation.
- Do not reward marketing language unless a claim is supported.
- Do not penalise a site for information that is deliberately private or outside the study scope.

## Required annotation fields

- `sample_id`
- `url`
- `organisation_id`
- `page_type`
- `reviewer_id`
- `review_date`
- `source_snapshot`
- `label`
- `evidence_quote`
- `evidence_location`
- `confidence`
- `notes`

## Confidence labels

### High

The evidence is directly visible, unambiguous, and reproducible by another reviewer using the same snapshot.

### Medium

The evidence is visible but requires limited interpretation or depends on a page relationship that another reviewer should verify.

### Low

The evidence is incomplete, indirect, unstable, or dependent on an external system that cannot be fully inspected.

### Unknown

The available evidence does not support a responsible label.

## Page type labels

- `homepage`
- `about`
- `product`
- `service`
- `documentation`
- `research`
- `article`
- `pricing`
- `contact`
- `other`

## Dimension A: access and crawlability

### `accessible`

Use when the declared URL returns the intended page without an access barrier in the study environment.

### `blocked`

Use when the page is denied by authentication, robots policy, network failure, server error, or another explicit control.

### `partial_access`

Use when the URL responds but important content, links, or controls are unavailable in the study environment.

### `unknown_access`

Use when access cannot be tested reliably.

Evidence should include response status, final URL, and a short description of the visible or extracted content.

## Dimension B: canonical identity

### `canonical_clear`

The page has one clear canonical identity that matches the intended page and is consistent with the site structure.

### `canonical_conflict`

The canonical is missing, contradictory, points to an unrelated page, or conflicts with the visible page purpose.

### `canonical_unavailable`

The canonical cannot be inspected from the available source.

Do not assume that a readable URL is canonical proof.

## Dimension C: subject and entity clarity

Review whether a reader can identify the main subject, organisation, product, audience, and relevant relationships.

### `clear_entity`

The page names and defines the primary entity in visible content and provides enough context to distinguish it from similar entities.

### `partial_entity`

The entity is identifiable but important facts, relationships, audience, or scope are incomplete.

### `ambiguous_entity`

The page uses vague names, conflicting descriptions, unexplained pronouns, or insufficient context to identify the subject reliably.

### `not_applicable`

Use only when the page genuinely has no entity claim within the study scope.

## Dimension D: section and passage clarity

Review the smallest meaningful sections of the page, including headings, paragraphs, lists, tables, and nearby links.

### `self_contained_section`

The section states its subject, claim, scope, and relevant context clearly enough to remain useful when extracted.

### `dependent_section`

The section is understandable only by referring to distant or unstated context.

### `fragmented_section`

The content is too vague, incomplete, decorative, or structurally unclear to support reliable interpretation.

Annotators must quote the section or identify its heading. Do not label an entire page from one weak paragraph unless the weakness is representative and documented.

## Dimension E: evidence and provenance

### `supported_claim`

The important claim has visible evidence, source attribution, method, date, author, or another appropriate basis.

### `partially_supported_claim`

Some basis exists, but the method, scope, date, source, or limitation is incomplete.

### `unsupported_claim`

The claim is presented as fact without evidence that a careful reader can inspect.

### `claim_not_found`

No material claim was selected for the review sample.

Do not classify a claim as unsupported merely because it has no external citation. Some product facts may be supported by a visible specification or direct first-party documentation.

## Dimension F: structured data alignment

### `aligned`

Structured data describes visible page content and uses consistent entity, URL, author, publisher, and date fields.

### `misaligned`

Structured data contains claims that are absent, contradictory, outdated, or not appropriate for the visible page.

### `not_observed`

No structured data was found or it could not be inspected.

Syntax validity and factual alignment are separate labels.

## Dimension G: relationship structure

Review internal links, navigation, breadcrumbs, and visible relationships between pages.

### `clear_relationships`

Links and surrounding text make the relationship between the source and destination understandable.

### `partial_relationships`

Some useful relationships exist, but important pages are weakly connected, orphaned, or labelled ambiguously.

### `unclear_relationships`

The site provides little contextual evidence about how important pages and entities relate.

Link count alone is not evidence of relationship quality.

## Dimension H: discovery observation

For each declared query or prompt, record:

- exact query or prompt
- system and product mode
- date and time
- location if relevant
- response text
- cited or linked sources
- source position or presentation
- whether the target organisation appears
- whether the target page appears
- representation accuracy
- reviewer confidence

### `source_selected`

The target source is visibly selected or cited in the response.

### `source_not_selected`

The target source is not visibly selected in the response.

### `source_presence_unclear`

The interface or response does not provide enough evidence to determine source use.

### `representation_accurate`

The response describes the organisation, product, or claim consistently with the available source.

### `representation_partial`

The response contains a materially incomplete description but no clear contradiction.

### `representation_inaccurate`

The response contains a material falsehood, conflation, unsupported capability, wrong relationship, or wrong identity.

### `representation_not_testable`

The available evidence does not allow a fair accuracy judgement.

## Reviewer workflow

1. Read the study scope and sample record.
2. Open the recorded source snapshot or production URL.
3. Label access and canonical identity first.
4. Identify the page subject and page type.
5. Select the required evidence sections and claims.
6. Review relationships and structured data.
7. Run the declared discovery observation if assigned.
8. Record exact evidence before writing interpretation.
9. Mark confidence and uncertainty.
10. Submit disagreements without editing the other reviewer's label.

## Disagreement process

Two reviewers should independently label an initial calibration set. Disagreements should be grouped by dimension and discussed using the evidence, not the desired result.

If reviewers cannot reach a consistent interpretation, revise the label definition or retain both labels with an adjudication note. Do not silently resolve disagreements by averaging incompatible categories.

## Prohibited annotations

Do not label:

- overall trustworthiness of an organisation from one page
- human quality or intelligence from writing style
- business success from visibility alone
- causal influence from correlation
- private or sensitive traits of people
- legal compliance without appropriate expertise and evidence
- future ranking or citation likelihood as a fact

