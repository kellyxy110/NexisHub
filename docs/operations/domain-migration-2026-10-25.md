# NexisHub domain migration: 25 October 2026

Canonical production origin: https://www.thenexishub.org
Branch: `fix/nexishub-domain-migration-20261025`
Base commit: `41cf48fecaecf08daedd126512aee43642e0add8`

## Verified baseline

The custom domain served the site over valid HTTPS and the apex redirected to www with HTTP 308. The apex redirect preserved the tested path and query. The old production hostname still returned HTTP 200, and homepage/blog canonicals, all 87 sitemap entries, robots.txt's sitemap reference, Organization schema, and social image URLs still used the old origin. ads.txt was already accessible with the existing publisher record.

Vercel confirms `www.thenexishub.org` is verified on project `nexis-hub` (`prj_QvBi1SzEgQyTd5gUE9t1Sv1Ks0JS`), team `team_NuC1Fkg65uNAiysfEHuvF4rc`.

## Changes

- Fixed public origin in `src/lib/site-url.ts`, shared by metadataBase, sitemap, robots, feed and article metadata. Public SEO identity intentionally does not depend on a potentially stale site URL environment value.
- Updated current first-party absolute links, schemas, citation exports, llms.txt, and article sharing-image text. Preserved article bodies, dates, slugs, and bare historical hostnames in incident descriptions.
- Added a permanent Next.js redirect only for the exact `nexishub.vercel.app` host. Paths and query values survive; localhost, preview hosts, www, and lookalike hosts are excluded.
- Updated SiteNexis navigation links to sitenexis.com after verifying its home, login, signup, pricing, contact, methodology and documentation URLs. Existing article-specific SiteNexis backlinks are outside this migration and remain unchanged.
- Updated URL examples and production environment checklist.
- Set production `NEXTAUTH_URL` in the verified Vercel project to `https://www.thenexishub.org`, retaining its existing production-only scope and storage type. No secrets were decrypted. This setting applies on a subsequent deployment; no login completion was tested.
- Disabled automatic Git deployment for this exact fix branch in `website/vercel.json`. The guard does not disable main or manual deployments.

## Validation

- `npm ci --ignore-scripts --no-audit --no-fund`: passed; lockfile unchanged.
- `npm run prisma:generate`: passed. Generated the client locally; no database migration or database connection was performed.
- `npm test`: 36/36 passed, including eight Next.js route-matcher tests.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build:webpack`: passed; 221 static pages generated. An initial build before Prisma generation failed for the missing generated client, then passed after generation.
- Local production HTTP checks: homepage, blog, pillar and supporting-guide canonicals/social images; Organization URL; all 87 sitemap URLs; robots sitemap; RSS; llms.txt; citation page; APA/BibTeX exports; and unchanged ads.txt passed.
- Local production legacy-host requests for root, a deep article with query parameters, and sitemap returned HTTP 308 to the new origin. Preview hostname returned HTTP 200 without a migration redirect.
- `git diff --check`: passed.

The first runtime redirect assertion required root paths to be textually identical. Next emits the root destination without a trailing slash; the corrected check compares equivalent root URLs and decoded query values. The observed redirect itself was correct.

## Remaining release work

No merge, deployment, domain reassignment, or database change was performed.

1. Review this branch against current main, preserving any intervening editorial changes.
2. Confirm production `NEXTAUTH_URL` remains the www origin. Any external OAuth provider allowlist must also permit the new callback address if such a provider is enabled. Confirm the application before adding callbacks; do not invent providers.
3. Deploy the reviewed commit using the existing Vercel project and team. The branch's automatic Git deployment is disabled, so use an explicitly authorized release or merge after review.
4. Recheck the live apex/www URLs, legacy deep-page redirect, rendered canonicals, robots, all sitemap URLs, sharing images, feeds, citations, contact/subscribe flows, consent and enabled sign-in flow.
5. In Search Console, verify the new domain, submit its sitemap and use Change of Address if eligible. Account status and indexing were not verified here.
6. In AdSense, add/verify the new domain, check the existing publisher record, consent-message domain settings and review status. ads.txt availability alone is not approval.
7. Verify GA4 stream/domain settings, reporting and any cross-domain configuration in the account. Public links and domain email remain separate follow-up work.

Do not claim that these code corrections are live until the production deployment and live checks pass.
