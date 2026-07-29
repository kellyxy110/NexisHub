# NexisHub and Nexis Research Institute Task Register
## Current verified implementation status

Updated: 2026-07-29

### Completed repository work

- [x] NexisHub corporate site, blog, legal draft surfaces, product directory, and corrected production alias
- [x] Nexis Studio landing page, enquiry flow, service routes, commercial templates, and founder-led operating record
- [x] Pnyx flagship product profile, verified public URL, product registry entry, and sitemap entry
- [x] Founder-Led NRI governance and appointment status
- [x] 30 NRI programme pages and research roadmap
- [x] AI Visibility Index Version 0.1 Pre-Review Working Paper
- [x] Research collections, search, FAQ, ethics, print stylesheet, and discovery metadata
- [x] Publication registry scaffold and citation exports for JSON, BibTeX, and APA
- [x] Review, adjudication, pilot, consent, legal, Studio, portfolio, and editorial maintenance templates
- [x] Editorial maintenance source-integrity script

### Truthful current status

- NRI maturity: Founder-Led Stage
- Founding Research Lead and Executive Director: Ekeleme Kelechi David
- Technical reviewer: Vacant / To Be Appointed
- Methodology reviewer: Vacant / To Be Appointed
- Ethics/privacy reviewer: Vacant / To Be Appointed
- Legal review: Pending External Legal Review
- AI Visibility Index: Version 0.1, Pre-Review Working Paper
- Pilot participants, consent, data, scores, and findings: none
- Portfolio permissions: Pending Client Approval

### Remaining external actions

- [ ] Qualified legal counsel review
- [ ] NRI technical reviewer appointment
- [ ] NRI methodology reviewer appointment
- [ ] NRI ethics/privacy reviewer appointment where required
- [ ] Pilot contact confirmation, invitations, and consent
- [ ] AI Visibility Index pilot execution and analysis
- [ ] Reviewer adjudication after real reviewers are appointed
- [ ] Version 1.0 approval and publication
- [ ] Client portfolio permissions
- [ ] Studio legal IP, confidentiality, SOW, and commercial approval

### Remaining repository work

- [ ] Authenticated publication administration and database persistence
- [ ] Server-side RBAC, audit log, reviewer dashboard, and adjudication UI
- [ ] Pilot management, consent records, invitation drafts, and analysis workspace
- [ ] Studio proposal, SOW, onboarding, change-control, invoicing, support, incident, and closure UI
- [ ] Case-study permission administration
- [ ] Citation export UI and IEEE/MLA formats where metadata supports them
- [ ] Link-health and source-freshness monitoring with editorial task records
- [ ] Editorial calendar and maintenance dashboard
- [ ] Automated accessibility, route, metadata, structured-data, print, and secret checks
- [ ] Manual mobile, keyboard, screen-reader, reduced-motion, print, and production performance QA

### Next execution order

1. Build authenticated data models and server-side authorization boundaries.
2. Add publication, review, adjudication, pilot, consent, and Studio workflow persistence.
3. Add public citation controls and admin empty/error/loading states.
4. Add automated link, source-freshness, metadata, accessibility, and security checks.
5. Run manual QA and record evidence without inventing pass results.
6. Complete the real legal, reviewer, consent, permission, and publication gates.


## Current status

The NexisHub website, Studio, research platform, and long-form blog are deployed at `https://nexishub.vercel.app`. The legal pages remain drafts. NRI is implemented as a Founder-Led research platform with 30 programme routes, a Version 0.1 Pre-Review Working Paper, publication infrastructure, and operational templates. External legal review, reviewer appointments, pilot consent and findings, portfolio permissions, and manual QA remain pending.

## Phase 1: establish NRI foundations

- [ ] Review and approve `decison.md` with the founder.
- [ ] Confirm the public name: Nexis Research Institute, Nexis Research, or another approved name.
- [ ] Decide whether NRI is a division, institute, lab network, or separate legal entity.
- [ ] Confirm the research lead and publication owner.
- [ ] Define the review levels used for each publication category.
- [ ] Create an NRI content model for authors, reviewers, versions, dates, citations, datasets, and status.
- [ ] Create a publication checklist based on methodology, evidence, limitations, reproducibility, and disclosure.
- [ ] Create a research programme template covering motivation, questions, outcomes, methodology, data, collaborators, impact, and products enabled.
- [ ] Select the first three programmes for active work.
- [ ] Define the first research note, technical report, or benchmark to publish.

## Phase 2: design and implement the NRI surface

- [ ] Decide whether NRI lives under `/research`, `/institute`, or a separate domain.
- [ ] Design the NRI visual language as a research identity related to, but distinct from, NexisHub marketing.
- [ ] Build the NRI landing page with mission, active programmes, latest publications, and research standards.
- [ ] Build the publications index with category, status, version, author, date, reading time, and review level.
- [ ] Build the publication detail template with the standard research sections.
- [ ] Build programme pages for motivation, questions, methodology, outputs, and status.
- [ ] Add references, glossary, appendices, figure captions, and table explanations to the publication renderer.
- [ ] Add machine discovery for NRI publications through sitemap, RSS or Atom, and `llms.txt` where appropriate.
- [ ] Add structured data for scholarly articles, technical reports, organisations, and breadcrumbs where accurate.
- [ ] Add accessibility, reduced-motion, keyboard, and print styles for research documents.
- [ ] Add tests for publication status, canonical URLs, citations, version fields, and required sections.

## Phase 3: first research programmes

- [x] AI Visibility Index: define the construct, dimensions, sampling frame, scoring limits, and validation plan.
- [ ] Citation Intelligence Framework: define citation, source selection, representation accuracy, and observation protocol.
- [ ] Machine Trust Score: define measurable signals, assumptions, validation boundaries, and misuse risks.
- [ ] Future of AI Search: prepare a literature and platform documentation review before making forecasts.
- [ ] Evaluation Frameworks for AI Agents: define task success, reliability, safety, cost, latency, and human review metrics.
- [ ] Responsible AI in African Education: define context, participating stakeholders, privacy boundaries, and evidence requirements.
- [ ] Digital Health Readiness Index: confirm clinical, regulatory, privacy, and data governance expertise before research begins.
- [x] Create the AI Visibility Index research question document and pilot dataset protocol.
- [x] Create the AI Visibility Index annotation guide and reviewer disagreement process.
- [ ] For every active programme, create a decision log, research question document, dataset plan, and publication target.

## Phase 4: published NexisHub content and launch readiness

- [ ] Review every published blog article for factual accuracy, source quality, and founder approval.
- [ ] Confirm that SiteNexis source links and product descriptions remain accurate.
- [ ] Remove or revise any claim that cannot be supported by a primary source, approved internal data, or a clearly labelled conceptual example.
- [ ] Obtain legal review of Terms, Privacy Policy, and Cookie Policy.
- [ ] Confirm the legal entity, jurisdiction, contact address, retention periods, and privacy request route.
- [ ] Configure the production contact form webhook and secret token.
- [ ] Configure newsletter delivery and unsubscribe handling.
- [ ] Configure analytics only after consent, provider review, and privacy documentation.
- [ ] Perform mobile QA across the homepage, Products, About, Blog, article pages, Contact, and Legal pages.
- [ ] Perform keyboard navigation and screen-reader checks.
- [ ] Check reduced-motion behavior and print readability for long articles.
- [ ] Add the final custom domain when DNS ownership and the preferred hostname are confirmed.
- [ ] Configure branded email addresses for contact, research, privacy, and publication correspondence.
- [ ] Establish an editorial maintenance calendar for source review, product updates, broken links, and content performance.

## Phase 5: operating cadence

- [ ] Hold a weekly editorial and research triage meeting.
- [ ] Hold a monthly technical and source review for published work.
- [ ] Record every material correction with date, reason, reviewer, and affected publication.
- [ ] Review programme status quarterly.
- [ ] Publish an annual research report only after the evidence, methodology, and limitations are independently reviewed.
- [ ] Maintain a public corrections policy.
- [ ] Maintain a public research ethics and conflicts disclosure page.
- [ ] Maintain an archive of retired, superseded, and corrected publications.

## Definition of done for an NRI publication

A publication is ready only when:

- [ ] the research question is explicit
- [ ] the intended audience is defined
- [ ] the author and reviewer are named or the anonymity decision is recorded
- [ ] the version and publication date are present
- [ ] the method and data sources are described
- [ ] observations and interpretations are separated
- [ ] limitations and threats to validity are included
- [ ] references are checked
- [ ] reproduction material is included where applicable
- [ ] conflicts and funding are disclosed where applicable
- [ ] factual and technical review is complete
- [ ] the canonical URL and machine metadata are correct
- [ ] accessibility and print presentation are checked

## Immediate next actions

1. Founder review of `decison.md`.
2. Choose the first three NRI programmes.
3. Complete the published blog fact and source review.
4. Send the legal pages for professional review.
5. Configure production form and analytics providers.
6. Define the NRI route and content model before implementation begins.

## Provider discovery update — 2026-07-29

- [x] Inspect existing repository providers and Vercel production variable names.
- [x] Confirm Vercel deployment and GitHub remote for `kellyxy110`.
- [x] Add provider decision evidence and production safeguards documentation.
- [x] Add modular administration feature flags with safe false defaults.
- [ ] Configure and verify a real authentication provider.
- [ ] Configure and verify a real database, storage, monitoring, email, and backup strategy.
- [ ] Enable founder-only administration after identity, migrations, security tests, and backup evidence pass.
- [ ] Keep pilot, consent, reviewer, legal, email, and Version 1.0 publication modules gated until their external requirements are satisfied.

## Staged activation update — 2026-07-29

- [x] Add explicit migration, security, and founder-verification gates.
- [x] Add `founderSafeAdminEnabled` effective flag.
- [x] Keep sensitive research, consent, reviewer, email, and Version 1.0 modules independently gated.
- [ ] Verify real authentication and founder identity.
- [ ] Verify database migrations and security checks in production.
- [ ] Enable founder-safe modules after evidence is recorded.

## Founder-safe administration implementation update — 2026-07-29

- [x] Add requested staged flag names and fail-closed evaluation.
- [x] Add server-side authorization primitive requiring verified principal and permission.
- [x] Add provider decision record based on inspected repository and Vercel configuration.
- [ ] Connect the selected real authentication provider.
- [ ] Connect the selected real database and migrations.
- [ ] Enable founder-safe dashboard after evidence gates pass.

## Approved provider stack implementation — 2026-07-29

- [x] Add Auth.js App Router route and passwordless email provider boundary.
- [x] Add Prisma 7 schema, PostgreSQL adapter, generated client, and initial migration SQL.
- [x] Add founder bootstrap transaction keyed by `FOUNDER_EMAIL`.
- [x] Add persisted role/audit/feature-flag schema.
- [x] Add protected admin and founder-bootstrap routes.
- [x] Add Sentry and Supabase Storage boundaries.
- [x] Configure Vercel `FOUNDER_EMAIL`, encrypted `RESEND_API_KEY`, generated `AUTH_SECRET`, `NEXTAUTH_URL`, and disabled auth email sending.
- [ ] Add Supabase `DATABASE_URL` and apply production migration.
- [ ] Configure `AUTH_EMAIL_FROM` with a verified Resend sender.
- [ ] Verify Auth.js sign-in and founder bootstrap in production.
- [ ] Configure Sentry and Supabase Storage secrets.
- [ ] Keep reviewer, participant, consent, pilot, legal, invitation, and Version 1.0 modules disabled.

## Supabase credential update — 2026-07-29

- [x] Store supplied Supabase `DATABASE_URL` as encrypted Vercel Production configuration.
- [x] Keep admin readiness flags explicitly false.
- [ ] Retry Prisma migration from a network that can reach the Supabase database.
- [ ] Verify schema, indexes, foreign keys, and Prisma migration history.
- [ ] Only then set `NEXIS_ADMIN_MIGRATIONS_READY=true`.

## Supavisor migration completion — 2026-07-29

- [x] Validate Session Pooler connectivity on port 5432.
- [x] Apply `20260729120000_init_admin` through Supavisor.
- [x] Confirm Prisma migration status is up to date.
- [x] Verify administration tables and indexes through the Prisma smoke test.
- [x] Seed only default SUPER_ADMIN role metadata, minimal permissions, disabled flags, and an audit marker.
- [x] Configure Transaction Pooler runtime and Session Pooler migration URLs in Vercel.
- [x] Set `NEXIS_ADMIN_MIGRATIONS_READY=true`.
- [ ] Rotate the shared Supabase password and update both pooler variables.
- [ ] Verify Auth.js with a configured Resend sender and founder bootstrap.
## Founder-safe administration verification — 2026-07-29

- [x] TypeScript verification passed with `npm run typecheck`.
- [x] ESLint verification passed with `npm run lint`.
- [x] Vercel production deployment for `c353030` reached READY.
- [x] Confirm no database password or Resend secret is tracked in the repository.
- [ ] Configure a verified `AUTH_EMAIL_FROM` sender and explicitly enable Auth.js email delivery.
- [ ] Request and click the real founder sign-in link for `FOUNDER_EMAIL`.
- [ ] Run `/admin/bootstrap` from the verified founder session.
- [ ] Record security-check evidence, then enable `NEXIS_ADMIN_AUTH_READY`, `NEXIS_ADMIN_SECURITY_CHECKS_PASSED`, `NEXIS_ADMIN_FOUNDER_VERIFIED`, `ADMIN_ENABLED`, and `FOUNDER_ADMIN_ENABLED`.
- [ ] Re-run the production build locally if the environment permits completion within the available execution window.
