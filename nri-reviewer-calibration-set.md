# NRI AI Visibility Index Reviewer Calibration Set

## Purpose

This calibration set trains reviewers to apply the annotation guide consistently before pilot data collection begins.

These are synthetic cases. They are not real organisations, research findings, or benchmark results.

## Instructions

For each case, label access, canonical identity, entity clarity, section clarity, evidence and provenance, structured data alignment, relationship structure, and confidence. Write the evidence that supports each label. Do not use the answer key until independent review is complete.

## Cases

### Case A: clear first-party product page

The page returns a successful response. The canonical URL matches the page. The heading names the product and audience. The page defines the product, lists current capabilities, links to documentation, identifies the organisation, and shows an update date. JSON-LD describes the visible product and organisation accurately.

Expected discussion: strong access, canonical identity, entity clarity, relationships, and structured-data alignment. Reviewers should still inspect whether capability claims have evidence.

### Case B: reachable page with vague identity

The page loads successfully and has a self-referencing canonical. The heading says “A better way to work” and the first screen never names the product. Later copy uses “we” and “the platform” without defining the audience or function. The footer names the organisation.

Expected discussion: access may be strong while entity clarity is partial or ambiguous. Do not reduce the whole page to a blocked or failed label.

### Case C: clear page with unsupported performance claim

The page identifies the service, target users, and workflow. It states that users “save 80 percent of operating time” but provides no method, sample, date, or source. The rest of the page contains accurate feature documentation.

Expected discussion: entity and section clarity may be strong, while the selected performance claim is unsupported. The unsupported claim should not invalidate unrelated evidence.

### Case D: client-rendered navigation and missing canonical

The page returns successful HTML, but the main navigation and related links appear only after a browser event. The page has no canonical link. The visible text exists after rendering in a normal browser.

Expected discussion: access is partial in a text-only collection, canonical identity is unavailable, and relationship structure is weak in the initial response. Record the collection method.

### Case E: accurate schema with stale visible content

JSON-LD names the organisation and a product correctly, but the visible page shows an older product name and a discontinued capability. The canonical is correct.

Expected discussion: structured data is misaligned with visible content. Canonical correctness does not repair the contradiction.

### Case F: source selected but representation inaccurate

In a declared discovery test, the system links to the organisation's article. The answer claims that the organisation offers a capability the article explicitly says it does not offer. The source is visibly cited.

Expected discussion: source selection is present, but representation accuracy is inaccurate. Citation presence must not be treated as evidence of truthful representation.

## Calibration procedure

1. Two reviewers label all six cases independently.
2. Compare labels by dimension.
3. Record disagreements and the evidence each reviewer used.
4. Revise definitions that produce repeated ambiguity.
5. Repeat the cases after revision.
6. Approve the guide only when disagreements are understood and documented.

