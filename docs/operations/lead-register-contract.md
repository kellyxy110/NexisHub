# Lead Register Contract

## Repository responsibility

NexisHub defines and validates the provider-neutral `Lead` contract in
`website/src/lib/lead-contract.ts`. The contract is advisory to future
orchestration and does not change Contact, Studio, or Newsletter delivery.

Required operational fields include an opaque `lead_id`, timestamps, source,
form type, name, email, message, `status`, and `ai_status`. Contact-like
submissions do not need to provide optional fields such as phone, company, or
Studio context.

`submission_id` and a human-facing lead reference are different concepts.
The future submission identifier should use a stable opaque value such as
`crypto.randomUUID()`. A sequential reference such as `NH-L-2026-000001`
requires transactional counter and retry design and is not implemented here.

## External responsibility

The operational Lead Register exists externally in Google Sheets. Make owns
receipt, routing, and downstream orchestration. This repository does not add a
database table, persistence route, counter, or idempotency mutation.

Agent 001 and Groq run externally through Make and have passed isolated
synthetic QA. Their failure must never prevent form receipt, delivery,
preservation, or acknowledgement. AI outcomes map conceptually to
`PENDING`, `AI_READY`, `AI_DEFERRED`, or `AI_INVALID`; AI does not transition
business `LeadStatus` silently.

## Privacy and cost

Lead data is private operational data. It must not automatically enter public
content, newsletters, social posts, research, or training data. New recurring
automation cost remains ₦0. No OpenAI API, LLM SDK, runtime AI call, or new
external service is introduced.

## Freeze boundary

This contract package is repository-internal. It does not alter public HTML,
forms, Make, Groq, AdSense, CMP, indexing, or production configuration.
