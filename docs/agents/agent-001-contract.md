# Agent 001 Contract

Agent 001 — NexisHub Lead & Studio Intelligence — exists as an external Make
runtime using Groq and has passed isolated synthetic QA. This document records
the repository-side contract; it does not create an agent runtime or call
Groq.

## Input

`Agent001InputSchema` accepts source, name, email, and message, with optional
company, website, service, timeline, and risk context. It is designed for
Contact and Studio records without requiring fields ordinary Contact forms do
not collect.

## Result

`Agent001ResultSchema` requires summary, intent, category, string arrays for
requirements, missing information, risk signals, and discovery questions,
plus a suggested next action and confidence between 0 and 1 inclusive.
Malformed objects, missing fields, wrong array members, and out-of-range
confidence values are invalid.

Valid output maps to `AI_READY`; provider unavailability maps to
`AI_DEFERRED`; malformed output maps to `AI_INVALID`. These states do not
change the customer-facing form result or silently change business status.

## Boundaries

Make owns external orchestration and Groq access. NexisHub owns the
provider-neutral shape and validation. Customer messages remain private and
are not inputs to public content generation or training datasets.
