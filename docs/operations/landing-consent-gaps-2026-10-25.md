# Landing and consent corrections, 2026-10-25

## Scope

Keep the visual identity while making current public capability, services and published work easier to understand. No application-wide readiness, SSO, ranking or AdSense approval claim is introduced.

## Changes

- Concrete hero copy and higher-contrast secondary headline; explicit SiteNexis sign-in label.
- Platform-direction wording on Home, Products and About; live-product scope explained in directory and FAQ.
- Five Studio service links and an enquiry anchor with an existing public-email fallback.
- Three existing published guides and the pre-review AI Visibility Index working paper, with limitations stated.
- Independent default-off advertising preference. Analytics opt-in cannot load ads. Root lifecycle controller permits only explicit editorial paths and canonical hostname, deduplicates scripts, and reloads to unload vendor code on withdrawal or departure from the allowlist. Preview, unknown and private routes are excluded.
- Google CMP choices remain separate. No personalized-ad consent is inferred from the local advertising loading choice.
- Sixteen replacement SiteNexis destinations returned HTTP 200 at their exact new-domain paths. Updated their source links; removed an optional related-reading link whose replacement returned 404.
- Preserve form DOM references before asynchronous submission, avoiding a false error after successful delivery.
- Reconcile roadmap and AdSense register. Legal policies remain drafts with unresolved operational and review items.

## Checks

- TypeScript and ESLint passed.
- 50 tests passed, including independent advertising permission, withdrawal/unload, route/hostname scope, storage failure and duplicate prevention.
- Clean production build passed (223 static pages). All 94 sitemap destinations, genuine 404s, utility noindex controls and discovery endpoints passed local production HTTP checks. The first build left an empty generated manifest; cleaning generated output and rebuilding resolved it.
- CI and deployed browser acceptance remain release gates; record their final outcome in the pull request.

## Remaining evidence gates

- Actual contact/Studio/newsletter delivery and recipient acceptance. No messages or test subscriptions were sent as part of this batch.
- Covered-region Google CMP/TCF runtime acceptance, provider rejection and withdrawal behavior.
- Qualified legal review and confirmed retention/deletion/contact procedures.
- Product-specific production readiness, universal SSO and shared billing remain unverified.
- Mobile, screen-reader and comprehensive keyboard acceptance need dedicated checks.
