import type { BlogPost } from "@/lib/posts";
import type { VisibilityGuide } from "@/lib/visibility-content";

// Original NexisHub editorial field notes. Reviewed 2026-10-16.
export const releaseEditorialPosts: readonly BlogPost[] = [
  {
    "slug": "vercel-nextjs-deployment-debugging",
    "title": "When a Next.js Build Passes but Deployment Fails: A Field Guide",
    "description": "Learn how to separate compilation, output tracing, packaging, deployment, and runtime failures with a repeatable incident checklist.",
    "targetKeyword": "Next.js deployment troubleshooting",
    "category": "Modern Web Engineering",
    "cluster": "G",
    "difficulty": "Intermediate",
    "intent": "Informational",
    "readingTime": "10 min read",
    "author": "NexisHub Editorial",
    "publishedDate": "2026-10-16",
    "updatedDate": "2026-10-16",
    "tags": [
      "Next.js",
      "Vercel",
      "Webpack",
      "file tracing",
      "deployment"
    ],
    "featuredImage": "/blog/vercel-nextjs-deployment-debugging/opengraph-image",
    "featuredImageAlt": "Editorial illustration for When a Next.js Build Passes but Deployment Fails: A Field Guide",
    "seoTitle": "When a Next.js Build Passes but Deployment Fails: A Field Guide",
    "seoDescription": "Learn how to separate compilation, output tracing, packaging, deployment, and runtime failures with a repeatable incident checklist.",
    "canonicalPath": "/blog/vercel-nextjs-deployment-debugging",
    "series": "NexisHub Engineering Field Notes",
    "readingLevel": "Technical practitioner",
    "status": "Published",
    "relatedSlugs": [
      "consent-first-analytics-and-ads",
      "ai-agent-memory-records-versus-inference",
      "website-launch-readiness-evidence"
    ]
  },
  {
    "slug": "consent-first-analytics-and-ads",
    "title": "Consent Before Analytics: Designing Privacy Controls That Actually Work",
    "description": "A practical guide to consent-aware scripts, durable choices, testable rejections, and advertising integrations without dark patterns.",
    "targetKeyword": "consent-first analytics",
    "category": "Privacy Engineering",
    "cluster": "G",
    "difficulty": "Intermediate",
    "intent": "Informational",
    "readingTime": "10 min read",
    "author": "NexisHub Editorial",
    "publishedDate": "2026-10-16",
    "updatedDate": "2026-10-16",
    "tags": [
      "privacy",
      "consent",
      "analytics",
      "advertising",
      "frontend"
    ],
    "featuredImage": "/blog/consent-first-analytics-and-ads/opengraph-image",
    "featuredImageAlt": "Editorial illustration for Consent Before Analytics: Designing Privacy Controls That Actually Work",
    "seoTitle": "Consent Before Analytics: Designing Privacy Controls That Actually Work",
    "seoDescription": "A practical guide to consent-aware scripts, durable choices, testable rejections, and advertising integrations without dark patterns.",
    "canonicalPath": "/blog/consent-first-analytics-and-ads",
    "series": "NexisHub Engineering Field Notes",
    "readingLevel": "Technical practitioner",
    "status": "Published",
    "relatedSlugs": [
      "vercel-nextjs-deployment-debugging",
      "ai-agent-memory-records-versus-inference",
      "website-launch-readiness-evidence"
    ]
  },
  {
    "slug": "ai-agent-memory-records-versus-inference",
    "title": "AI Agent Memory: Keep Business Records Separate From Model Inferences",
    "description": "How to design long-term AI memory with authoritative records, consent, tenant isolation, retention, and correction paths.",
    "targetKeyword": "AI agent memory architecture",
    "category": "AI Infrastructure",
    "cluster": "H",
    "difficulty": "Intermediate",
    "intent": "Informational",
    "readingTime": "10 min read",
    "author": "NexisHub Editorial",
    "publishedDate": "2026-10-16",
    "updatedDate": "2026-10-16",
    "tags": [
      "AI memory",
      "agents",
      "retrieval",
      "privacy",
      "architecture"
    ],
    "featuredImage": "/blog/ai-agent-memory-records-versus-inference/opengraph-image",
    "featuredImageAlt": "Editorial illustration for AI Agent Memory: Keep Business Records Separate From Model Inferences",
    "seoTitle": "AI Agent Memory: Keep Business Records Separate From Model Inferences",
    "seoDescription": "How to design long-term AI memory with authoritative records, consent, tenant isolation, retention, and correction paths.",
    "canonicalPath": "/blog/ai-agent-memory-records-versus-inference",
    "series": "NexisHub Engineering Field Notes",
    "readingLevel": "Technical practitioner",
    "status": "Published",
    "relatedSlugs": [
      "vercel-nextjs-deployment-debugging",
      "consent-first-analytics-and-ads",
      "website-launch-readiness-evidence"
    ]
  },
  {
    "slug": "website-launch-readiness-evidence",
    "title": "A Website Is Not Launch-Ready Because It Looks Finished",
    "description": "Use a practical launch evidence matrix for accessibility, indexing, security, editorial trust, deployment, and business workflows.",
    "targetKeyword": "website launch readiness checklist",
    "category": "Modern Web Engineering",
    "cluster": "G",
    "difficulty": "Intermediate",
    "intent": "Informational",
    "readingTime": "10 min read",
    "author": "NexisHub Editorial",
    "publishedDate": "2026-10-16",
    "updatedDate": "2026-10-16",
    "tags": [
      "launch checklist",
      "SEO",
      "accessibility",
      "security",
      "operations"
    ],
    "featuredImage": "/blog/website-launch-readiness-evidence/opengraph-image",
    "featuredImageAlt": "Editorial illustration for A Website Is Not Launch-Ready Because It Looks Finished",
    "seoTitle": "A Website Is Not Launch-Ready Because It Looks Finished",
    "seoDescription": "Use a practical launch evidence matrix for accessibility, indexing, security, editorial trust, deployment, and business workflows.",
    "canonicalPath": "/blog/website-launch-readiness-evidence",
    "series": "NexisHub Engineering Field Notes",
    "readingLevel": "Technical practitioner",
    "status": "Published",
    "relatedSlugs": [
      "vercel-nextjs-deployment-debugging",
      "consent-first-analytics-and-ads",
      "ai-agent-memory-records-versus-inference"
    ]
  }
];

export const releaseEditorialGuides: readonly VisibilityGuide[] = [
  {
    "slug": "vercel-nextjs-deployment-debugging",
    "lead": "A successful compilation is not a successful deployment. The final mile includes tracing the files a server needs, assembling deployable functions, publishing those functions, and proving that requests work.",
    "overview": [
      "A build pipeline has several independently failing stages: dependency installation, code generation, compilation, prerendering, output tracing, artifact packaging, publication, and runtime invocation. A green compile line proves only one stage.",
      "Before changing frameworks or build engines, record the first failing stage, full error text, commit SHA, operating system, framework version, CLI version, and whether the deploy was triggered by Git or uploaded as prebuilt output."
    ],
    "deepDive": [
      {
        "title": "A practical missing-file incident",
        "paragraphs": [
          "Consider an application that successfully compiles its pages, writes deployment output, then fails while publishing with an ENOENT error for a file under .next. That is a different class of failure from a missing source module during compilation. A fix directed at application imports will not necessarily address the packaging step.",
          "A useful comparison is to build the same commit through two paths: a Git-triggered remote build and a locally generated prebuilt deployment. If one succeeds and the other fails, compare the adapter, tracing root, ignore rules, versions, generated assets, and runtime environment before assigning blame. This is a diagnostic pattern, not a guarantee that the same configuration will repair another project."
        ]
      },
      {
        "title": "Why tracing roots matter",
        "paragraphs": [
          "Output-file tracing determines which runtime dependencies are carried into server functions. In a monorepo, an override may be needed to include files outside the web application root. An unnecessary or incorrect override may also change paths relative to the packaging tool. Remove overrides only in an isolated test, then check whether any legitimate parent-directory dependencies remain available.",
          "When a route reads files with process.cwd() and parent-directory joins, compile success will not show whether those files exist in the deployed function. Validate that route separately, or redesign the dependency as bundled, explicit content with a defined source of truth."
        ]
      },
      {
        "title": "Field report: NexisHub's October 2026 deployment failure",
        "paragraphs": [
          "In an October 2026 NexisHub release investigation, a Next.js 16.2.10 Git-triggered build successfully compiled and generated its routes, yet failed at the later deployment-output step. The error was: ENOENT: no such file or directory, lstat '/vercel/path0/.next/package.json'. This is a case from the NexisHub repository and Vercel deployment logs, not a benchmark for all Next.js applications.",
          "The investigation retained the failing commit and created an isolated Preview branch. A Linux-generated prebuilt Preview deployed successfully, indicating that the source could produce an operable artifact in at least one path. Changing the remote build to Webpack alone produced a different error because the Prisma client had not been generated first. After adding `npm run prisma:generate`, the Webpack build compiled successfully but still failed with the original missing-file error during output deployment.",
          "Next, the team removed `outputFileTracingRoot: process.cwd()` from next.config.ts only on the isolated branch while retaining the Prisma generation and Webpack command. A Git-triggered Preview reached READY. That result implicated the tracing override in this specific configuration; it did not prove that Webpack was necessary or that every application should remove its tracing root."
        ]
      },
      {
        "title": "What we actually verified after the deploy",
        "paragraphs": [
          "An HTTP HEAD request to the protected Preview homepage returned 200 and `x-robots-tag: noindex`. Thirteen other public routes returned 200, including a blog article, Store, Research, Privacy, robots.txt, and sitemap.xml. The dynamically rendered `/llms.txt` endpoint also returned 200. Those checks proved endpoint responses and indexing safeguards, not every user interaction.",
          "The administration route initially returned HTTP 500. Runtime logs identified `[next-auth][error][NO_SECRET]`; the Preview environment lacked AUTH_SECRET. An independently generated secret scoped to the diagnostic branch fixed initialization without reusing Production credentials or enabling email login. After redeployment `/admin` returned 307 with location `/admin/sign-in`, and `/admin/sign-in` returned 200. Database-backed admin operations remained outside the validation scope.",
          "The release branch then passed CI with Prisma generation, TypeScript, linting, tests, and a Webpack build. The application reached READY on the production Git commit. This sequence shows why build, deployment, HTTP, authentication, and privileged workflows require separate evidence. An unresolved operations-copilot file dependency remained a distinct follow-up risk."
        ]
      },
      {
        "title": "Reproduce the diagnostic without repeating our changes blindly",
        "paragraphs": [
          "Start by recording the first failing stage and the last successful stage. Next, check whether generated Prisma artifacts exist before invoking a build, inspect relevant ignore rules, and compare the repository root against runtime process.cwd() assumptions. Use a Preview-only branch and a fixed commit when testing file-tracing changes.",
          "Do not automatically put credentials, database URLs, or production-only flags into a Preview just to make routes respond. A 307 to a sign-in page is often the correct outcome for an unauthenticated admin request. A read-only HTTP check cannot replace actual authorization tests. Document what was verified and what was deliberately not exercised."
        ]
      }
    ],
    "principles": [
      {
        "title": "Preserve a known-good baseline",
        "detail": "Record a reproducible commit and retain successful deploy artifacts before experiments."
      },
      {
        "title": "Change one variable at a time",
        "detail": "Keep framework, generated client, tracing and environment changes separate whenever practical."
      },
      {
        "title": "Treat readiness as layered",
        "detail": "Compilation, publishing, HTTP response and business functionality need different acceptance checks."
      },
      {
        "title": "Keep production isolated",
        "detail": "Use protected Preview branches and avoid applying fixes without verifying runtime behavior."
      }
    ],
    "workflow": [
      {
        "title": "Capture the failing stage",
        "detail": "Preserve logs from the first failing message through the final error, not only the last line."
      },
      {
        "title": "Reproduce under comparable conditions",
        "detail": "Pin the commit, Node, framework and deployment command and compare local with remote."
      },
      {
        "title": "Inspect tracing and ignore configuration",
        "detail": "Review next.config, build scripts, .vercelignore, monorepo root and deployment adapter."
      },
      {
        "title": "Run a controlled Preview experiment",
        "detail": "Make one reversible change on a nonproduction branch and note the exact outcome."
      },
      {
        "title": "Smoke test runtime routes",
        "detail": "Check static pages, uncached dynamic endpoints, authentication redirects, noindex headers and file-dependent functions."
      }
    ],
    "pitfalls": [
      {
        "title": "Treating a build as a release",
        "detail": "A completed compilation does not prove deploy output can be assembled or served."
      },
      {
        "title": "Removing configuration blindly",
        "detail": "A tracing override can be essential when runtime files truly live outside an application root."
      },
      {
        "title": "Testing only the homepage",
        "detail": "Pre-rendered pages can work while server-side authentication or database queries fail."
      }
    ],
    "measurement": [
      "Maintain a stage-by-stage incident record with pass/fail evidence, commit identity, first failing log, target environment and tested route response codes.",
      "Define success as both a READY deployment and passing runtime checks. Count unresolved protected routes separately and distinguish an intentional redirect from a server failure."
    ],
    "future": "As deploy platforms add more build adapters and execution targets, version pinning and reproducible output inspection will become more important than repeatedly switching build flags.",
    "takeaways": [
      "A compile pass does not equal successful packaging.",
      "Compare the same commit through different deployment paths.",
      "Treat tracing-root overrides as testable hypotheses, not universal fixes.",
      "Verify dynamic routes and security boundaries before promoting changes."
    ],
    "faq": [
      {
        "question": "Does a Vercel READY status prove every route works?",
        "answer": "No. It confirms the deployment is published. Dynamic authentication, data and file-dependent routes still need runtime tests."
      },
      {
        "question": "Should I always remove outputFileTracingRoot?",
        "answer": "No. Monorepos may legitimately need it to include files outside an application directory. Check actual runtime dependencies first."
      },
      {
        "question": "Is switching to Webpack a standard cure for missing .next files?",
        "answer": "No. It can help isolate a build-engine effect but should not be treated as a general solution."
      }
    ],
    "references": [
      {
        "label": "Next.js output-file tracing documentation",
        "url": "https://nextjs.org/docs/app/api-reference/config/next-config-js/output"
      },
      {
        "label": "Vercel deployment documentation",
        "url": "https://vercel.com/docs/deployments/overview"
      }
    ]
  },
  {
    "slug": "consent-first-analytics-and-ads",
    "lead": "A cookie banner is not a consent system. A consent system controls whether optional processing starts, remembers the user's decision, and allows it to be changed.",
    "overview": [
      "A banner can say 'Essential only' while the browser has already loaded an analytics tag. The important test is network behavior before interaction and after every choice, not the banner's appearance.",
      "Legal requirements vary by jurisdiction, audience and processing purpose. Engineering teams should implement a clear category model and obtain qualified legal review for the actual regions they serve. This is an implementation guide, not legal advice."
    ],
    "deepDive": [
      {
        "title": "Design the choice before the script",
        "paragraphs": [
          "Define necessary functions separately from optional analytics, personalization and advertising. Document which vendor or endpoint belongs to each category, what data it collects, whether storage occurs, and why the processing is needed. Scripts should be gated by the resulting state, not merely annotated with labels.",
          "A safe first-visit default for optional processing in consent-required regions is disabled until a valid choice is made. An opt-out must stop future optional calls; where vendors set cookies before withdrawal, deletion and vendor-specific revocation may require additional handling."
        ]
      },
      {
        "title": "Test the state transitions",
        "paragraphs": [
          "Create a test matrix for first visit, accept, reject, customize, navigate, refresh, reopen settings, withdraw consent and change device or browser. Capture requests to vendor endpoints, cookie/storage entries, event dispatches and persistence at each transition.",
          "Separate deployment environments. Preview analytics and ad tags should not silently generate production traffic, and consent controls must not create a backdoor to external tracking during automated tests."
        ]
      },
      {
        "title": "NexisHub code inspection: where consent currently lives",
        "paragraphs": [
          "In the reviewed NexisHub frontend, the first-party choice is stored under `nexishub-analytics-consent`. The `PrivacyControls` component offers Essential only and Allow analytics; the `AnalyticsTracker` checks for an `allow` value before sending page-view, CTA click, product interaction, or scroll-depth events to `/api/events`. The footer exposes a Cookie choices control that opens the banner again.",
          "The `AdSenseLoader` checks the same first-party analytics preference before injecting Google's ads script into the document. The website's Cookie Policy separately explains that Google Privacy & Messaging is intended to handle advertising decisions where applicable. This means the code-level trigger and the advertising-consent workflow are not identical. Treat the design as an implementation requiring real-world verification, not as proof of regulatory compliance.",
          "These statements are based on an inspection of the repository's `privacy-controls.tsx` and `adsense-loader.tsx`. They do not establish the state of third-party cookies, the actual Google CMP message in every region, or whether every vendor request obeys consent after withdrawal."
        ]
      },
      {
        "title": "Acceptance test matrix for a consent implementation",
        "paragraphs": [
          "Test with a clean browser profile and preserve network evidence. Before any choice, record calls to `/api/events`, the Google advertising loader, and third-party domains. Choose Essential only, move between a blog article and a research page, refresh, and confirm that optional analytics and advertising requests remain gated according to the intended policy. Reopen Cookie choices and repeat with Allow analytics; check precisely which requests start and which category granted permission.",
          "Next, revisit Cookie choices and withdraw optional analytics. Confirm that no new first-party analytics events are sent after the change. Check whether the Google script was already loaded: a client-side check that prevents adding a new script does not necessarily remove an existing script or revoke a vendor's prior consent state. Advertising consent must also be tested within the actual Google CMP flow, independently of the first-party setting.",
          "Repeat the test on mobile, with keyboard-only navigation, and in each geographic region covered by your policy obligations. Screenshots of a banner are insufficient: attach timestamps, request logs, cookie/storage records, and the exact policy version. Where the browser behavior contradicts the published privacy language, correct the implementation or disclosure before requesting an advertising review."
        ]
      }
    ],
    "principles": [
      {
        "title": "Make the essential choice real",
        "detail": "An essential-only option should prevent optional script execution, not simply dismiss the interface."
      },
      {
        "title": "Use accurate categories",
        "detail": "Group technologies by genuine purpose and do not hide advertising under necessary storage."
      },
      {
        "title": "Make withdrawal accessible",
        "detail": "A persistent cookie-choices entry should allow users to revisit the original decision."
      },
      {
        "title": "Test by observing requests",
        "detail": "Review browser network behavior and storage, not only component state."
      }
    ],
    "workflow": [
      {
        "title": "Inventory vendors and tags",
        "detail": "Record analytics, ads, embeds, fonts and third-party scripts alongside their data flows."
      },
      {
        "title": "Design state and persistence",
        "detail": "Define unchosen, rejected, accepted and customized states with versioned policy records."
      },
      {
        "title": "Gate optional loaders",
        "detail": "Ensure loaders cannot run before the applicable choice and handle delayed hydration correctly."
      },
      {
        "title": "Exercise every choice path",
        "detail": "Test keyboard and screen-reader use, mobile widths, navigation, refresh and withdrawal."
      },
      {
        "title": "Review legal and platform obligations",
        "detail": "Check relevant consent requirements and any mandated Google-certified CMP or regional framework."
      }
    ],
    "pitfalls": [
      {
        "title": "Consent only in the UI",
        "detail": "Visual controls have no effect if third-party tags load beforehand."
      },
      {
        "title": "Making rejection harder",
        "detail": "Dark patterns undermine trust and can invalidate a user's choice."
      },
      {
        "title": "Assuming one rule fits every region",
        "detail": "Purpose, jurisdiction, vendor contracts and platform rules change what is required."
      }
    ],
    "measurement": [
      "Record whether any optional requests occur before consent, whether essential-only persists across navigation, and whether a withdrawn category stops future network calls.",
      "Track accessibility and completeness separately from legal approval. An automated audit can pass while a real keyboard journey remains unusable."
    ],
    "future": "As browsers and advertising systems evolve, consent implementations should be auditable modules with vendor inventories, explicit tests and review ownership, not forgotten snippets.",
    "takeaways": [
      "Treat consent as execution control, not a decorative banner.",
      "Test actual network activity for every state.",
      "Persist and expose user choices responsibly.",
      "Seek region-specific legal review before calling a CMP compliant."
    ],
    "faq": [
      {
        "question": "Does an existing cookie banner guarantee compliance?",
        "answer": "No. The banner, script gating, storage behavior, disclosures, vendor configuration and jurisdictional requirements must agree."
      },
      {
        "question": "Can analytics load before the user chooses?",
        "answer": "That depends on applicable law and the specific processing. Do not assume optional tracking is exempt; get appropriate review."
      },
      {
        "question": "Does AdSense approval certify privacy compliance?",
        "answer": "No. Advertising approval and privacy obligations are distinct checks."
      }
    ],
    "references": [
      {
        "label": "Google consent management requirements",
        "url": "https://support.google.com/adsense/answer/13554116"
      },
      {
        "label": "W3C WCAG accessibility standard",
        "url": "https://www.w3.org/TR/WCAG22/"
      }
    ]
  },
  {
    "slug": "ai-agent-memory-records-versus-inference",
    "lead": "A useful AI assistant should remember what matters. A trustworthy system must also know which memories are guesses and which records are authoritative.",
    "overview": [
      "A customer support decision, invoice, application state and signed policy are business records. A model's summary of user preferences is an inference. Combining them into a single editable memory store makes it difficult to correct mistakes or explain decisions.",
      "Long-term memory should improve continuity while preserving provenance. The architecture must state how facts enter, who can retrieve them, how conflicting versions are resolved, and when information must be deleted."
    ],
    "deepDive": [
      {
        "title": "Three different stores",
        "paragraphs": [
          "Keep transactional truth in an authoritative database with permissions and audit history. Keep source knowledge in a document or retrieval index where every passage links back to an owner and version. Keep inferred preferences or summarized conversations in a separate memory service with confidence, timestamps, purpose and a correction mechanism.",
          "Retrieval should rank relevant context but must not silently promote model-generated text into an authoritative record. If an assistant proposes a change to a payment status, enrollment record or permission, that change belongs in the source system's validated workflow, not a memory write."
        ]
      },
      {
        "title": "Time and conflicting evidence",
        "paragraphs": [
          "Facts change. A customer may prefer email this month and telephone next month. A product may move from prototype to released. Preserve effective dates and source timestamps, then label older statements as superseded rather than presenting both as current.",
          "A memory response should be explainable: which source supplied it, whether it came from a user, observation or model inference, and what access checks were applied. When evidence is incomplete, the system should say so."
        ]
      },
      {
        "title": "Worked example: a user preference collides with a business record",
        "paragraphs": [
          "Imagine a learning platform stores an authoritative enrollment record in PostgreSQL. A conversation summary says that the learner prefers to study on weekends. The enrollment record determines course access; the preference helps propose a study schedule. The preference must never silently change payment status, enrollments, marks, permissions, or other authoritative states. This is an illustrative design example, not a claim about an existing NexisHub customer.",
          "A safe retrieval result includes the memory text, source type (user statement or model inference), capture time, scope, optional confidence, and a link to the authoritative record when one exists. If the learner later says that Saturday classes no longer work, the update should supersede the old preference while preserving the original record's audit history where justified.",
          "An acceptance test asks the same question twice across two unrelated user accounts. The second account must receive no fragments, embeddings-derived summaries, or source links from the first account. This test should also cover caches, background jobs, exported reports, and vector search filters, not only the primary database query."
        ]
      },
      {
        "title": "A minimal permission-aware memory contract",
        "paragraphs": [
          "Define a memory envelope with subject ID, tenant ID, purpose, source reference, created and last-confirmed timestamps, expiration policy, data category, and whether the item is verified or inferred. Before retrieval, bind the request to the authenticated tenant. Before presentation, check that the user is permitted to see both the memory and its underlying source.",
          "Use a write gate for high-consequence operations. A memory can suggest that a student is ready for the next mathematics topic, but only an approved assessment or teacher decision should update a formal mastery record. Similarly, a support summary can recommend an invoice follow-up but cannot mark an invoice paid. These controls reduce the chance that fluent text becomes an unearned source of truth.",
          "Measure accuracy with contradiction tests, forgotten-data retrieval tests, and source-attribution coverage. A useful target is not simply more remembered facts: it is fewer repeated questions without an increase in stale, unauthorized, or fabricated context."
        ]
      }
    ],
    "principles": [
      {
        "title": "Respect sources of truth",
        "detail": "Do not let inferred AI memory overwrite database records or verified documents."
      },
      {
        "title": "Isolate tenants and users",
        "detail": "Enforce authorization before retrieval and again before any write or tool execution."
      },
      {
        "title": "Make forgetting practical",
        "detail": "Design deletion, retention and downstream index removal before storing user history."
      },
      {
        "title": "Track time and provenance",
        "detail": "Attach source, capture time, confidence and revision identifiers to each memory."
      }
    ],
    "workflow": [
      {
        "title": "Map continuity use cases",
        "detail": "Identify which tasks truly improve when past decisions or preferences are available."
      },
      {
        "title": "Classify data before storage",
        "detail": "Separate authoritative records, knowledge documents, session state and inferred memories."
      },
      {
        "title": "Define access and consent",
        "detail": "Specify users, tenant boundaries, purpose limits and what can be remembered."
      },
      {
        "title": "Choose retrieval and write paths",
        "detail": "Prefer existing databases where feasible; introduce specialized memory only for proven gaps."
      },
      {
        "title": "Test correction and deletion",
        "detail": "Verify contradictory facts, outdated decisions, cross-tenant requests and erasure propagation."
      }
    ],
    "pitfalls": [
      {
        "title": "Memory as unreviewed truth",
        "detail": "A summarized conversation can omit qualifiers or invent certainty."
      },
      {
        "title": "Cross-tenant retrieval leakage",
        "detail": "A relevant memory must still be forbidden when the requester lacks access."
      },
      {
        "title": "Infinite retention",
        "detail": "Long storage periods multiply privacy, cost and accuracy risks."
      }
    ],
    "measurement": [
      "Measure task continuity improvements alongside false-memory rate, provenance coverage, unauthorized retrieval attempts, deletion latency and cost per useful retrieval.",
      "Use adversarial test cases: a changed preference, a revoked permission, conflicting timestamps, a deleted document and two tenants using similar terminology."
    ],
    "future": "Memory infrastructure will increasingly be judged by governed correction and source accountability rather than by the volume of text it can retain.",
    "takeaways": [
      "Business truth and inferred memory require separate controls.",
      "Provenance and effective dates prevent stale memories becoming new facts.",
      "Tenant isolation applies to retrieval as well as storage.",
      "Deletion and correction are core product features."
    ],
    "faq": [
      {
        "question": "Is a vector database a complete memory system?",
        "answer": "No. It can support retrieval but does not inherently provide consent, access control, provenance, correction or retention."
      },
      {
        "question": "Should every conversation be remembered?",
        "answer": "No. Store only purpose-appropriate information with user controls and retention boundaries."
      },
      {
        "question": "Can an inferred preference control a business transaction?",
        "answer": "It should not bypass authoritative permissions or validated transaction rules."
      }
    ],
    "references": [
      {
        "label": "NIST AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "label": "OWASP Top 10 for LLM Applications",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      }
    ]
  },
  {
    "slug": "website-launch-readiness-evidence",
    "lead": "A homepage can look finished while its contact workflow is broken, its private Preview is indexable, or its server routes fail. Launch readiness is a set of verified outcomes, not an aesthetic verdict.",
    "overview": [
      "Split launch readiness into content, discoverability, interaction, privacy, security, operations and business behavior. Name the tests that demonstrate each dimension, including manual checks where automated scanners are insufficient.",
      "A launch gate should be proportional to risk. A static brochure page and a payment platform do not require the same controls, but both need clear ownership, working navigation and truthful claims."
    ],
    "deepDive": [
      {
        "title": "Build an evidence matrix",
        "paragraphs": [
          "For each route, write down expected behavior, responsible owner, test method and current outcome. A public article should return a valid page, have an intentional canonical, be linked from a discoverable archive and contain content that answers a real question. A private administrative page should reject unauthenticated users and not appear in public sitemaps.",
          "For dynamic systems, check the full workflow rather than the initial screen. A contact form is not successful merely because its button works; the request must validate safely, reach the intended destination, handle retries and provide an accurate confirmation. Never run production submissions in a diagnostic test without permission."
        ]
      },
      {
        "title": "Publishing is an ongoing obligation",
        "paragraphs": [
          "Before requesting an advertising review, verify substantive original content, accurate About and Contact information, understandable navigation and reachable legal disclosures. Check the exact review reason shown by the advertising provider; technical fixes do not automatically remove a content-quality decision.",
          "Keep maintenance evidence: accessibility findings, privacy-control journeys, uptime incidents, index coverage, editorial updates and owner decisions. This is a more defensible record than a green dashboard with no attached test cases."
        ]
      },
      {
        "title": "NexisHub acceptance evidence: ready is not a single status",
        "paragraphs": [
          "During NexisHub's October 2026 release, the Git-triggered Preview compiled successfully but initially could not publish its output. A later deployment reached READY and its static routes returned HTTP 200. Yet `/admin` still returned 500 until a Preview-only NextAuth signing secret was configured. After that change, the same unauthenticated route returned a safe 307 redirect. Each result belongs to a different acceptance layer.",
          "A practical release record therefore contains at least four columns: the scope of the claim, test method, observed result, and remaining limitation. In the NexisHub example, 'homepage responds 200' was verified by an authenticated HEAD request. It did not verify mobile navigation, client-side interactions, database-backed administration, or a consent-withdrawal flow.",
          "A fifth column records release identity. Use the commit SHA, hostname, environment, and time in every test report. NexisHub found that its AdSense-submitted hostname initially still pointed to an older Vercel deployment while another production alias showed new articles. The alias was later reassigned, and the submitted hostname's sitemap and new article routes were checked. This illustrates why a successful deploy and the correct public domain are separate concerns."
        ]
      },
      {
        "title": "An honest AdSense review gate",
        "paragraphs": [
          "In the NexisHub AdSense account, the stated reason for rejection was 'Low value content'. The response did not provide a numbered article count or a single technical error to fix. Publishing additional routes, passing CI, and serving ads.txt were necessary infrastructure facts but were not evidence that Google had accepted the site's editorial value.",
          "A content reviewer should sample articles across topics and ask: does each page teach something specific from original work, provide a reproducible method, identify an intended reader, and link claims to appropriate evidence? Where dozens of articles repeat the same generic sections, reduce the repetition, improve the original analysis, or consider holding weaker pages out of the index pending editorial review.",
          "Legal and privacy completeness remain independent blockers. NexisHub's reviewed legal pages were still explicitly labeled draft and disclosed pending entity, jurisdiction, retention, and legal-contact details. Those details require actual owner confirmation or qualified review rather than fabricated addresses or silently removed warnings. Only mark the internal review complete when these gates have been verified; AdSense approval remains Google's decision."
        ]
      }
    ],
    "principles": [
      {
        "title": "Verify real outcomes",
        "detail": "A page loading is not proof that its forms, sign-in or external integrations work."
      },
      {
        "title": "Separate public and private routes",
        "detail": "Preview environments, admin screens and APIs need appropriate access and indexing controls."
      },
      {
        "title": "Prefer original usefulness",
        "detail": "Publishing volume is a poor substitute for accurate, differentiated content."
      },
      {
        "title": "Treat review as external",
        "detail": "Internal readiness cannot promise a third party's approval."
      }
    ],
    "workflow": [
      {
        "title": "Inventory the surface area",
        "detail": "List public pages, private routes, integrations, content models and external dependencies."
      },
      {
        "title": "Test navigation and rendering",
        "detail": "Check mobile, desktop, keyboard, images, headings and core task journeys."
      },
      {
        "title": "Audit discoverability",
        "detail": "Review robots, sitemap, canonicals, index directives, links and page metadata."
      },
      {
        "title": "Exercise security and privacy controls",
        "detail": "Verify consent withdrawal, authentication, authorization, headers and safe error behavior."
      },
      {
        "title": "Resolve blockers before release",
        "detail": "Keep failed and unverified tests visible until evidence or an explicit risk acceptance closes them."
      }
    ],
    "pitfalls": [
      {
        "title": "Counting route 200s as end-to-end success",
        "detail": "HTTP checks prove reachability, not complete workflows or content quality."
      },
      {
        "title": "Publishing superficial articles for approval",
        "detail": "An arbitrary number of posts cannot guarantee a favorable advertising review."
      },
      {
        "title": "Releasing from an experimental branch",
        "detail": "Combine only evidence-backed changes and rerun the actual production build workflow."
      }
    ],
    "measurement": [
      "Use a pass, fail, blocked or unverified matrix with links to commits, requests and manual test evidence. Never turn a blocked test into a passing one by omission.",
      "Follow production outcomes after release: error rates, search indexing, user feedback and completion of important workflows. Record time and environment so old results are not mistaken for current status."
    ],
    "future": "Teams that ship frequently need continuous release evidence. A compact, trustworthy acceptance record is more useful than a long checklist filled with untested ticks.",
    "takeaways": [
      "A READY deployment is only the start of runtime validation.",
      "Technical SEO and editorial substance are different checks.",
      "User consent, accessibility and error handling need manual journeys.",
      "No internal audit can guarantee AdSense acceptance."
    ],
    "faq": [
      {
        "question": "How many blog posts are required for AdSense?",
        "answer": "Google does not prescribe a universal number of posts. The site needs valuable original content, usable navigation and policy compliance."
      },
      {
        "question": "Does a sitemap guarantee indexing?",
        "answer": "No. It helps discovery, while indexing depends on crawler access, quality, canonical handling and search-engine decisions."
      },
      {
        "question": "Should a Preview build be promoted directly?",
        "answer": "Only after source parity, environment boundaries and relevant runtime acceptance checks are demonstrated."
      }
    ],
    "references": [
      {
        "label": "Google AdSense site readiness guidance",
        "url": "https://support.google.com/adsense/answer/12176698"
      },
      {
        "label": "Google Search indexing fundamentals",
        "url": "https://developers.google.com/search/docs/fundamentals/how-search-works"
      }
    ]
  }
];
