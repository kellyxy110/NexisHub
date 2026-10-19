# NexisHub consent choice: live acceptance evidence

Date: 19 October 2026
Hostname: https://nexishub.vercel.app
Tested page: /blog/consent-first-analytics-and-ads
Method: controlled, unauthenticated browser walkthrough of public site; no form submissions and no acceptance of optional analytics or advertising consent.
Status: **Partial UX pass. Regulatory/CMP and network-layer acceptance remain unverified.**

## What the browser actually demonstrated

| Test | Result | Observation |
| --- | --- | --- |
| Initial privacy choices | Pass in this run | The banner displayed “Your privacy, clearly handled.”, “Essential only” and “Allow analytics”. |
| Essential-only selection | Pass | Selecting Essential only dismissed the banner. |
| Persistence between articles | Pass | After navigating to /blog/vercel-nextjs-deployment-debugging, the banner did not reappear. |
| Reopen choices | Pass | The footer Cookie choices button reopened the banner with the same two selections. |
| Reconfirm essential-only | Pass | Selecting Essential only again dismissed the reopened banner. |
| Optional analytics acceptance | Not tested | The test deliberately did not grant the optional preference. |
| Google advertising consent | Not tested | No separate Google advertising dialog was observed in this session. Regional conditions can differ. |
| Network, cookies, vendor storage | Not verified | This run did not capture DevTools request traces or cookie/storage inventories. |
| Keyboard and assistive-tech journey | Not verified | No full focus order, focus restoration, screen-reader, or keyboard-only acceptance run. |

This report captures **one fresh-browser observation**, not a universal guarantee of first-visit behavior. An earlier browser walkthrough reported no first-visit banner; investigate this discrepancy with device, storage, location and deployment recorded before declaring a deterministic outcome.

## Source-code correspondence

- `src/components/privacy-controls.tsx` uses localStorage key `nexishub-analytics-consent`. The first-party event tracker checks `allow` before sending to `/api/events`.
- `src/components/adsense-loader.tsx` gates AdSense script injection behind the same local preference. Rejecting later does **not** establish that an already-loaded third-party script, cookies or consent state are withdrawn.
- `src/app/legal/cookies/page.tsx` distinguishes first-party analytics from Google Privacy & Messaging. A clean-browser run did not independently validate Google's regional CMP behavior.

## Accessibility finding

The visible controls were operable by click. The banner wrapper has an accessible label but no explicit `role="dialog"`. It may function as a nonmodal notice; choose semantics after assessing actual keyboard focus and whether the banner blocks background interaction. Do **not** simply add a dialog role without implementing appropriate focus behavior if the design is modal.

## Remaining acceptance procedure

1. Use browser DevTools to capture network and storage **before any decision** on a fresh profile and record region, consent state, browser, and deployment.
2. Choose Essential only and verify first-party analytics, Google ads loader, vendor storage and other optional requests behave as disclosed on every navigation.
3. In a controlled Preview or otherwise consent-safe environment, test Allow analytics, then withdrawal; verify which vendor requests and storage states remain and whether separate advertising-consent decisions work.
4. Test Google Privacy & Messaging in applicable regions with the correct CMP configuration and legal review. Do not infer TCF/certification from a banner.
5. Run keyboard-only and screen-reader acceptance, including reopening Cookie choices and focus restoration.
6. Confirm the operator's published email receives a non-sensitive test message and establish a privacy-request handling workflow; this has not been tested.
7. Obtain counsel-reviewed retention, processor, legal notice and jurisdiction details before marking legal review complete.

## AdSense decision

Google previously flagged the submitted site for **Low value content**. This cookie-choice walkthrough does not address all editorial quality issues and does not certify AdSense readiness. Keep the current Google review request on hold until the original-value archive audit, legal facts and applicable consent review are completed.
