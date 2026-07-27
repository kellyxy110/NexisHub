# NexisHub Studio Production Configuration Handoff

## Purpose

This document records the production configuration needed to activate the Studio enquiry flow. Values must be entered in the Vercel project environment settings. Secrets must not be committed to the repository.

## Required variables

### `NEXT_PUBLIC_FORMS_ENABLED`

Set to `true` only after the webhook destination has been tested and the legal review confirms the form data flow.

### `FORM_WEBHOOK_URL`

The HTTPS endpoint that receives contact and Studio enquiry payloads.

### `FORM_WEBHOOK_TOKEN`

The secret bearer token accepted by the webhook destination. Store it as a Vercel secret.

## Optional analytics variables

### `ANALYTICS_WEBHOOK_URL`

The HTTPS endpoint that receives consented event payloads.

### `ANALYTICS_WEBHOOK_TOKEN`

The secret bearer token accepted by the analytics destination.

## Activation checklist

- [ ] Confirm provider and data-processing terms
- [ ] Confirm webhook authentication
- [ ] Test contact payload
- [ ] Test Studio enquiry payload
- [ ] Test newsletter payload
- [ ] Confirm invalid payload responses
- [ ] Confirm delivery failure handling
- [ ] Confirm retention and deletion process
- [ ] Update Privacy and Cookie documents
- [ ] Set production environment variables
- [ ] Redeploy production
- [ ] Submit a real low-risk test and remove it from the provider
- [ ] Record activation date and owner

## Studio enquiry payload shape

The Studio form sends `kind: studio_enquiry` with the name, email, organisation, website, requested service, timeline, project description, and risk context. The webhook owner must treat this information as confidential business enquiry data.

