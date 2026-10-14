# NexisHub AdSense remediation release candidate

Source base: `d22f8d9f9baeeef0e5094528d0125de3e2d1a949`
Candidate branch: `release/adsense-remediation-preview`

This manifest records the file boundary for the isolated local candidate.
The original dirty worktree remains the source of the uncommitted changes.

## Required files

| Path | Purpose | Dependency | Risk |
|---|---|---|---|
| `website/src/app/page.tsx` | Founder, organization, and website identity graph | `website/src/lib/structured-data.ts` | Public structured data |
| `website/src/app/blog/[slug]/page.tsx` | Editorial author/publisher identity and safe JSON-LD | `structured-data.ts` | Public article metadata |
| `website/src/app/blog/complete-guide-ai-software-development/page.tsx` | Same identity correction for the standalone guide | `structured-data.ts` | Public article metadata |
| `website/src/app/products/pnyx/page.tsx` | Product creator identity and safe JSON-LD | `structured-data.ts` | Public product metadata |
| `website/src/app/products/sitenexis/page.tsx` | Product creator identity and safe JSON-LD | `structured-data.ts` | Public product metadata |
| `website/src/app/research/[section]/page.tsx` | Research entity identity | `structured-data.ts` | Public research metadata |
| `website/src/app/research/programmes/[slug]/page.tsx` | Research organization identity | `structured-data.ts` | Public research metadata |
| `website/src/lib/structured-data.ts` | Canonical publisher, founder, website, editorial, and research IDs | Imported by required routes | Shared structured data |
| `website/src/components/adsense-loader.tsx` | Bootstrap Google advertising tag independently of first-party analytics | Existing layout scope | Consent bootstrap |
| `website/src/components/privacy-controls.tsx` | Separate analytics consent and Google revocation control | `consent-policy.ts` | Consent behavior |
| `website/src/components/site-chrome.tsx` | Expose the Google privacy-choice control in the footer | `privacy-controls.tsx` | User revocation access |
| `website/src/lib/consent-policy.ts` | First-party analytics consent predicate | `privacy-controls.tsx` | Analytics gating |
| `website/src/app/legal/privacy/page.tsx` | Accurate consent-domain disclosure | None | Public legal copy |
| `website/src/app/legal/cookies/page.tsx` | Accurate advertising/analytics disclosure | None | Public legal copy |
| `website/tests/site.test.mjs` | Static consent and legal-boundary regression tests | Required source files | Test coverage |
| `website/tests/consent-policy.test.ts` | Analytics consent state tests | `consent-policy.ts` | Test coverage |
| `docs/adsense/release-candidate-manifest.md` | Boundary and evidence record | None | Operational documentation |

## Already present in the base

The hero containment/decorative-image correction, meaningful sitemap dates,
research-search exclusion, and existing AdSense scope are already present at
the base commit and require no transfer from the dirty worktree.

## Deferred or excluded

The following are intentionally excluded: form/webhook transport changes,
newsletter/contact component changes, package and lockfile changes, Pa11y and
CI changes, broad content/research/accessibility documentation, product or
homepage changes unrelated to structured data, and miscellaneous untracked
files. They are not required by the approved remediation boundary.

Preview webhook credentials are not included. Preview environment setup is an
owner action and must use dedicated non-production values if form testing is
later authorized.
