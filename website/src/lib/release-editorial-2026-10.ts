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
