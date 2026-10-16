# NexisHub founder-operated legal and AdSense remediation review

Review date: 2026-10-16  
Status: **Draft, unresolved items remain. Do not declare AdSense-ready or legally approved.**

## Founder-operated status confirmed

The owner confirms that NexisHub is still operated under a personal name, not a CAC-registered NexisHub company. Public About wording now describes NexisHub as a founder-operated technology brand. Privacy, Terms and Cookies avoid representing the brand as a separately registered Nigerian company.

**Legal-name caveat:** The live About page already displayed the founder name as "Ekeleme David Kelechi"; the exact legal spelling and order has not yet been independently reconfirmed as the name for formal notices. Existing public profile presentation is not a substitute for a verified legal identity. Do not invent CAC registration, address, governing law or a legal contact.

## Source-reviewed consent state

- `website/src/components/privacy-controls.tsx` persists `nexishub-analytics-consent` as `allow` or `reject`. The banner can be reopened from the footer. Events to `/api/events` require `allow` at send time.
- `website/src/components/adsense-loader.tsx` injects an AdSense script when that same local preference is `allow`. The loader does **not** remove a previously injected script when preference changes to `reject`; this does not establish that the Google CMP has withdrawn advertising consent.
- Google Privacy & Messaging has been reported configured, but independent regional runtime verification has not yet been completed.
- This remediation batch corrects cookie disclosure to describe observed source behavior and its limitations; it deliberately does not introduce unreviewed CMP integration, track visitors, or activate ads.

## Manual acceptance tests still required

1. Clean profile: open the submitted hostname and record first-party storage, optional requests, vendor cookie state and visible consent prompts before choosing.
2. Choose Essential only, navigate multiple public articles, refresh and verify optional analytics/AdSense requests remain blocked.
3. Reopen Cookie choices, allow analytics and verify exactly which requests begin. Check separate Google CMP presentation and region-specific requirements.
4. Return to Essential only. Verify no further first-party analytics events are sent. Check whether already-loaded Google advertising scripts/cookies remain active; do not represent the current implementation as complete revocation without proof.
5. Test keyboard-only navigation, mobile controls, screen reader labels, contrast and focus.
6. Verify a working privacy-contact destination and confirm business operator's formal name, retention periods, processors, operating jurisdiction, governing law and dispute provisions with legal review.

## Content-quality mechanism

The older blog archive's `editorial-catalog.ts` generates multiple distinct URLs from shared boilerplate, such as "[Title] begins with a practical problem rather than a technology label." Live examples found in the modern-web-engineering and AI-infrastructure clusters. This is a documented originality risk relevant to Google's **Low value content** policy reason.

**Next editorial batch**: inventory each generated article and examine its useful examples, direct experience, sources and overlap before changing its indexing status. Preserve existing links and avoid bulk deleting/noindex without individual evaluation. The four new October 2026 articles already include first-hand release evidence but do not alone remediate the older archive.

## Release restrictions

No credentials, company registration assertions, production form or analytics endpoints, database migrations, or AdSense re-review action were changed in this phase. Legal pages remain visibly labeled draft for counsel review. Passing CI and deploying text revisions does not prove legal compliance or external advertising approval.
