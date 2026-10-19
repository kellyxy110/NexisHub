import type { VisibilityGuide } from "@/lib/visibility-content";

// Distinct reviewed replacements for previously template-generated archive guides.
// Illustrative examples are identified as such; no simulated figures are product claims.
export const archiveGuideUpgrades: readonly VisibilityGuide[] = [
  {
    "slug": "designing-fast-websites",
    "lead": "Fast websites begin with the first useful response, not the first benchmark screenshot. A rendering decision changes what visitors see before JavaScript loads, how quickly content becomes usable, and how failures behave.",
    "overview": [
      "Consider a product directory with a hero, category links, product cards, and a filter panel. Its title and product links are useful before anyone clicks a control. The basic content should therefore arrive in the document instead of waiting for an entire client application to initialize.",
      "Speed is not one number. Largest Contentful Paint describes major content presentation, Interaction to Next Paint reports responsiveness across interactions, and Cumulative Layout Shift captures unexpected movement. Each answers a different question, and field data can differ from a developer laptop."
    ],
    "deepDive": [
      {
        "title": "Start with the route and its loading boundary",
        "paragraphs": [
          "For the directory example, serve the heading, introductory text, links, and first page of results as server-rendered markup. Fetch only the data required for that initial view. Move a complex filter widget behind a narrow client boundary; do not make the entire page a client component because one control needs state.",
          "Use ordinary links for product details and pagination so navigation works without JavaScript. A filter that genuinely requires client-side interactivity needs a meaningful fallback, such as a GET query-string form processed by the server. That form also gives people a shareable, inspectable URL."
        ]
      },
      {
        "title": "Budget the largest content element",
        "paragraphs": [
          "Inspect which element is actually the largest visible content: it might be a hero image, heading block, or product illustration. If the hero image is critical, provide its dimensions, the right source sizes, and appropriate image priority. Do not preload every image or make all assets eager; that competes for bandwidth and delays the important one.",
          "Reserve image and embedded-media space so content below does not jump. Font loading and late-injected banners are common layout-shift sources. A layout-shift fix should be verified by observing actual shifts on a small mobile viewport, not simply by adding width attributes."
        ]
      },
      {
        "title": "Choose caching by content, not convenience",
        "paragraphs": [
          "A public product catalogue can cache stable metadata while account-specific details must never leak through a shared cache. Decide the freshness requirement per dataset: editorial navigation might tolerate hours of staleness, while live inventory or user billing status may not. Document invalidation paths before enabling long cache lifetimes.",
          "A fast cached response can conceal a broken origin. Test both cache-hit and cache-miss routes and inspect the first uncached response after deployment. In Next.js, verify which pages are static, which run on demand, and whether data requests trigger unexpected dynamic rendering."
        ]
      },
      {
        "title": "A small and reproducible performance test",
        "paragraphs": [
          "On an emulated mobile device, record the initial page URL, viewport, network conditions, Lighthouse run, and whether the cache was warm. Repeat several runs and review the distribution rather than selecting the best result. Identify one likely bottleneck, make one change, then repeat the same protocol.",
          "Complement laboratory measurements with field observations where consent and sampling permit them. Watch for slow interactions after load; an impressive initial screenshot does not excuse a blocked menu, search field, or form. No example numbers in this guide are presented as measurements of a NexisHub or client site."
        ]
      }
    ],
    "principles": [
      {
        "title": "Useful HTML before enhancements",
        "detail": "Deliver navigation, headings, and essential content without requiring a full client-side boot."
      },
      {
        "title": "Optimize the actual largest element",
        "detail": "Use trace evidence and sensible asset priorities instead of blanket preloading."
      },
      {
        "title": "Respect cache boundaries",
        "detail": "Separate shared public content from personal and time-sensitive data."
      },
      {
        "title": "Measure comparable runs",
        "detail": "Record device, network, cache state, version, and the precise page tested."
      }
    ],
    "workflow": [
      {
        "title": "Capture a baseline",
        "detail": "Run several lab tests with recorded conditions and inspect an actual mobile browser."
      },
      {
        "title": "Identify the loading critical path",
        "detail": "Find the HTML, font, stylesheet, image, and JavaScript resources blocking useful content."
      },
      {
        "title": "Reduce unnecessary client work",
        "detail": "Keep static layout server-rendered and isolate interactive components."
      },
      {
        "title": "Stabilize layout",
        "detail": "Reserve image/media dimensions and review font and banner behavior."
      },
      {
        "title": "Recheck real interactions",
        "detail": "Verify search, links, forms, filters, and keyboard operation on mobile."
      },
      {
        "title": "Monitor after release",
        "detail": "Watch field performance, errors, and cache behavior after deploying changes."
      }
    ],
    "pitfalls": [
      {
        "title": "Treating every page as a dashboard",
        "detail": "Shipping an oversized client bundle for predominantly informational content delays usability."
      },
      {
        "title": "Preloading everything",
        "detail": "Competing high-priority requests can make the most important resource slower."
      },
      {
        "title": "Publishing only the best Lighthouse run",
        "detail": "Cherry-picked lab values misrepresent consistency and user conditions."
      }
    ],
    "measurement": [
      "Report LCP, INP, and CLS independently and identify the source of each value, including whether it comes from lab or field data. The Core Web Vitals thresholds are useful references, not proof of a particular site's performance.",
      "Compare the same route and conditions before and after a change. Include basic task completion and keyboard checks, because a faster page that becomes less usable is not a successful optimization."
    ],
    "future": "More rendering tools will appear, but the enduring design remains small useful responses, narrow enhancement boundaries, deliberate caching, and honest measurements.",
    "takeaways": [
      "Treat content as useful before JavaScript where possible.",
      "Optimize the real critical path, not a list of fashionable tweaks.",
      "Validate cold and warm cache behavior separately.",
      "Record repeatable measurements and confirm accessibility."
    ],
    "faq": [
      {
        "question": "Should every page use server-side rendering?",
        "answer": "No. Choose static generation, server rendering, or client enhancement based on freshness, personalization, and interaction needs."
      },
      {
        "question": "Does a 100 Lighthouse score mean a page is fast for everyone?",
        "answer": "No. Laboratory checks sample particular conditions; field performance and interaction reliability must be evaluated separately."
      },
      {
        "question": "Can caching harm correctness?",
        "answer": "Yes, if personal information or fast-changing content is exposed through a shared or stale cache."
      }
    ],
    "references": [
      {
        "label": "web.dev: Largest Contentful Paint",
        "url": "https://web.dev/articles/lcp"
      },
      {
        "label": "web.dev: Interaction to Next Paint",
        "url": "https://web.dev/articles/inp"
      },
      {
        "label": "web.dev: Cumulative Layout Shift",
        "url": "https://web.dev/articles/cls"
      },
      {
        "label": "Next.js documentation",
        "url": "https://nextjs.org/docs"
      }
    ]
  },
  {
    "slug": "accessible-interfaces-without-javascript",
    "lead": "An accessible interface should retain its meaning, navigation, and essential tasks even when a browser blocks scripts, a connection degrades, or assistive technology interprets the page differently from the designer's expectations.",
    "overview": [
      "Begin with a mundane task: find a publication, read its description, then follow a reference. A real anchor element handles navigation, focus, browser history, and link semantics. Replacing it with a clickable div discards those capabilities and forces the developer to rebuild them imperfectly.",
      "Progressive enhancement does not prohibit JavaScript. It assigns responsibility carefully. HTML carries structure and the core task; CSS improves visual expression; scripts enhance interaction without becoming the only path to essential information."
    ],
    "deepDive": [
      {
        "title": "A publication search that degrades gracefully",
        "paragraphs": [
          "Use an HTML form with method GET, an explicit search label, and a submit button. Let the server read the query parameter and return filtered results on a normal page URL. When JavaScript is available, you may enhance the form with live suggestions or a loading state; submitting the form must still work if those enhancements fail.",
          "A visually hidden label remains accessible to screen readers when implemented correctly. Placeholder text alone is not a label because it disappears during typing and can have low contrast. Mark validation messages near the related control and describe the required correction in ordinary language."
        ]
      },
      {
        "title": "Interactive controls need the right element",
        "paragraphs": [
          "Navigation uses anchors with href. An action that changes local state uses a button. Native form controls already provide keyboard behavior and recognizable semantics. A disclosure may use details and summary if that matches its interaction, but should still be tested with the actual target devices and assistive technology.",
          "When building a mobile menu, manage focus intentionally and report expanded state with aria-expanded. Do not add a collection of ARIA attributes to custom widgets without testing whether native controls would do the job more reliably. JavaScript-only keyboard shortcuts are not a substitute for visible operable buttons."
        ]
      },
      {
        "title": "Test failure modes as ordinary usage",
        "paragraphs": [
          "Disable JavaScript and load the core routes. Can a visitor identify the page, read its main content, navigate back to the homepage, and reach contact and legal information? Next, test at 200% zoom, narrow viewports, and keyboard-only operation. Confirm that focus remains visible and follows a logical order.",
          "Use a screen reader to check link names, heading hierarchy, form instructions, validation and announced state changes. Automated audits catch some issues but cannot certify that a full workflow is understandable. Record the device, browser, screen reader and task, and note any obstacle rather than hiding it behind a passing score."
        ]
      },
      {
        "title": "Where exceptions are justified",
        "paragraphs": [
          "Some rich experiences genuinely need JavaScript, such as live canvas editors or complex data exploration. Provide a meaningful accessible description, an alternative output or route where feasible, and an honest statement of which operations require scripting. A static fallback must not falsely imply that an interactive workflow completed.",
          "For a research graph, a tabular node-and-edge description can offer a useful alternative to pan-and-zoom visual interaction. For a simulated lesson, a text lesson and ordinary practice questions may preserve the learning objective when the rich widget cannot run."
        ]
      }
    ],
    "principles": [
      {
        "title": "Semantics before ARIA",
        "detail": "Use the elements designed for links, buttons, forms, and headings."
      },
      {
        "title": "Make the main path resilient",
        "detail": "Keep reading, navigation and essential submission available without fragile script chains."
      },
      {
        "title": "Test by completing tasks",
        "detail": "Evaluate real keyboard and assistive technology journeys, not only checker scores."
      },
      {
        "title": "Describe limitations",
        "detail": "Provide useful alternatives where essential script-driven features cannot be replicated."
      }
    ],
    "workflow": [
      {
        "title": "Map essential journeys",
        "detail": "List reading, navigation, search, help, and submission tasks."
      },
      {
        "title": "Implement semantic HTML",
        "detail": "Choose native controls and correct heading/label relationships."
      },
      {
        "title": "Establish the no-script path",
        "detail": "Try core journeys with JavaScript unavailable."
      },
      {
        "title": "Add measured enhancements",
        "detail": "Layer live feedback, animation or suggestions without changing the fundamental task."
      },
      {
        "title": "Test diverse inputs",
        "detail": "Use keyboard, zoom, mobile touch, and at least one relevant screen reader."
      },
      {
        "title": "Record defects and retest",
        "detail": "Track each obstacle to a corrected build and repeat the original task."
      }
    ],
    "pitfalls": [
      {
        "title": "Click handlers on non-interactive elements",
        "detail": "They commonly omit keyboard support and meaningful state."
      },
      {
        "title": "Placeholder-as-label forms",
        "detail": "They lose context during editing and can make errors confusing."
      },
      {
        "title": "Accessibility by automated score alone",
        "detail": "A checker cannot decide whether a multi-step journey makes sense."
      }
    ],
    "measurement": [
      "Define a task matrix with expected path, keyboard outcome, screen-reader outcome, zoom behavior, and JavaScript-disabled outcome. Use pass, fail, or not applicable with a reason rather than an unsupported 'fully accessible' badge.",
      "Document the version and assisted technologies used. The WCAG standard provides testable criteria, but compliance claims require a suitable evaluation process beyond these illustrative steps."
    ],
    "future": "As interfaces grow richer, the strongest accessibility strategy is to keep semantics and alternatives near the product requirement, not bolt them on after launch.",
    "takeaways": [
      "Use links for navigation and buttons for actions.",
      "Keep basic content useful without scripting.",
      "Test keyboard, zoom and screen readers against named tasks.",
      "State the boundary where a rich feature requires JavaScript."
    ],
    "faq": [
      {
        "question": "Does progressive enhancement mean no JavaScript?",
        "answer": "No. It means essential tasks have a useful baseline and scripting improves the experience when available."
      },
      {
        "question": "Is adding aria-label enough to make a widget accessible?",
        "answer": "No. Focus handling, role, interaction behavior and meaningful task completion also matter."
      },
      {
        "question": "Can a complex graph be accessible?",
        "answer": "It may need alternate data representations and tested keyboard controls; a static list or table can preserve important information."
      }
    ],
    "references": [
      {
        "label": "W3C: WCAG 2.2",
        "url": "https://www.w3.org/TR/WCAG22/"
      },
      {
        "label": "W3C: ARIA Authoring Practices Guide",
        "url": "https://www.w3.org/WAI/ARIA/apg/"
      },
      {
        "label": "MDN: Progressive enhancement",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement"
      }
    ]
  },
  {
    "slug": "production-ai-infrastructure-components",
    "lead": "A production AI product is not a model wrapped in a chat box. It is an operating system for requests, knowledge, permissions, evaluation, recovery, and cost. Each part needs an owner and a failure boundary.",
    "overview": [
      "Consider an AI assistant answering questions about a product's documentation. The model may sound fluent even when a retrieval index is stale, the request is outside the user's permissions, or a source was never consulted. The surrounding infrastructure must prevent these failures from being mistaken for trustworthy answers.",
      "The architecture should be based on the task. A question-answering tool may need permission-aware retrieval and citations; a tool-using agent needs separate execution authorization and audit logs. Neither should silently mutate authoritative billing, enrollment, or customer records."
    ],
    "deepDive": [
      {
        "title": "Seven components with different responsibilities",
        "paragraphs": [
          "First comes the user-facing API and authentication layer. Second is request validation, abuse limiting, and user or tenant context. Third is the model gateway with timeout, retries, budgets and provider failover policies. Fourth is source retrieval, including indexing, freshness, authorization and provenance. Fifth is controlled orchestration for tools and multi-step work. Sixth is evaluation with representative cases and regression tests. Seventh is operations: traces, incident response, cost measurement, secrets and retention.",
          "These components need not be seven independently deployed services. A modest product can begin as one application with well-defined modules and database tables. Splitting everything into microservices before measuring the need introduces more failure paths and operational cost."
        ]
      },
      {
        "title": "An example request from entry to answer",
        "paragraphs": [
          "A signed-in user asks about the status of an owned project. The server derives the account and authorized project IDs from the session, not from an editable prompt string. It searches the permitted records, chooses the latest valid source, attaches source identifiers to model context, and instructs the model to say when evidence is missing. The output should identify what was observed and which part is an inference.",
          "If a request needs a state-changing tool, a separate authorization step checks the requested action, target resource, and any required user confirmation. A confident model answer must not bypass that check. For high-impact changes, store an idempotency key and an auditable outcome so retries do not silently duplicate the operation."
        ]
      },
      {
        "title": "Build an evaluation set before expanding capability",
        "paragraphs": [
          "Create cases for ordinary queries, nonexistent documents, conflicting versions, malicious embedded instructions, forbidden cross-tenant sources, unusually large context, and tool timeouts. Record expected behavior at the level of citations, refusal to make unsupported claims, and protection of permissions. A single fluent example is not meaningful coverage.",
          "Version prompts, retrieval configuration, data snapshots, and model choices. Measure answer quality separately from tool correctness and latency. When a provider changes behavior, rerun the same set and classify regressions instead of assuming that a newer model improves every task."
        ]
      },
      {
        "title": "Operational reality: costs and failure recovery",
        "paragraphs": [
          "Track token and retrieval costs per meaningful completed task, not just provider invoices. Bound maximum context size and retry counts; an unbounded loop can turn one failed request into many paid calls. Log enough metadata for diagnosis but avoid raw sensitive content unless the storage purpose, authorization and retention plan justify it.",
          "A failed model call should produce a clear user-facing error or safe partial result, not an invented success. A failed database mutation must preserve transactional integrity. Workers should support idempotent resume or compensation when a timeout happens between the external tool call and the local state update."
        ]
      }
    ],
    "principles": [
      {
        "title": "Derive permissions server-side",
        "detail": "Never trust user-supplied prompt text as an authorization decision."
      },
      {
        "title": "Keep evidence connected",
        "detail": "Make retrieved material versioned, permission-aware and attributable."
      },
      {
        "title": "Test adversarial cases",
        "detail": "Include stale, conflicting, missing and malicious data in evaluation."
      },
      {
        "title": "Bound costs and retries",
        "detail": "Create budgets and explicit timeout/recovery policies."
      }
    ],
    "workflow": [
      {
        "title": "Write the task contract",
        "detail": "Define user intent, permitted data and exact success conditions."
      },
      {
        "title": "Map the trust boundary",
        "detail": "Identify each account, model, tool, index and record authority."
      },
      {
        "title": "Implement constrained retrieval",
        "detail": "Bind tenant and owner filters before ranking candidate context."
      },
      {
        "title": "Add tools only when needed",
        "detail": "Authorize every action independent of the model's stated confidence."
      },
      {
        "title": "Run a versioned evaluation",
        "detail": "Score correctness, evidence, authorization, latency and failure responses."
      },
      {
        "title": "Operate with evidence",
        "detail": "Review traces, error rates, privacy controls, costs and recovery procedures."
      }
    ],
    "pitfalls": [
      {
        "title": "Treating the model response as a record",
        "detail": "Generated text is not a substitute for verified business state."
      },
      {
        "title": "Vector similarity as authorization",
        "detail": "A relevant search hit is still forbidden when outside the user's scope."
      },
      {
        "title": "Unlimited autonomous retries",
        "detail": "Repeated failures can duplicate operations and inflate spending."
      }
    ],
    "measurement": [
      "Report success against defined tasks: evidence coverage, unauthorized source retrieval rate, stale-content errors, controlled tool action success, latency distribution and cost per resolved request.",
      "Preserve a red-team regression suite and an explicit incident review process. Numbers should reflect actual samples with dates and versions, not invented platform marketing metrics."
    ],
    "future": "Agent protocols and model providers will change. Clear permission boundaries, versioned sources, bounded actions and accountable operations are more durable than a single framework.",
    "takeaways": [
      "Start with a task contract and trust model.",
      "Do not confuse retrieval relevance with access permission.",
      "Evaluate tool operations separately from response fluency.",
      "Keep recovery, monitoring and cost in the initial design."
    ],
    "faq": [
      {
        "question": "Does an AI product need microservices?",
        "answer": "Not automatically. Module boundaries and tested operations matter more than the number of deployed services."
      },
      {
        "question": "Can an LLM decide whether a user is authorized?",
        "answer": "No. Application code and authoritative identity systems must enforce permissions."
      },
      {
        "question": "What should a first evaluation include?",
        "answer": "Ordinary cases plus missing evidence, outdated sources, cross-tenant requests, prompt injection, tool failure and cost limits."
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
      },
      {
        "label": "OpenTelemetry documentation",
        "url": "https://opentelemetry.io/docs/"
      }
    ]
  },
  {
    "slug": "reliable-rag-systems",
    "lead": "Retrieval-augmented generation succeeds when the assistant selects the right permitted source, extracts the correct passage, and knows when the evidence is too weak to answer. A vector search result alone does none of those things.",
    "overview": [
      "Imagine an internal knowledge base containing two pricing policies, one obsolete and one current. A semantic retriever may return both because their language is similar. Without effective dates and document authority, the model can confidently quote the wrong policy.",
      "The design problem is not simply which embedding model performs best. It is how documents enter the index, how access permissions and versions travel with each passage, how search results are ranked and filtered, and how answers are checked against the retrieved sources."
    ],
    "deepDive": [
      {
        "title": "Design the document record before splitting it",
        "paragraphs": [
          "A useful source record includes a stable document ID, owner, version or effective date, access scope, canonical location, source type, and the most recent review status. Each searchable passage inherits those fields. This allows a query for a user's workspace to filter forbidden passages before they reach a ranking or generation stage.",
          "Splitting by a fixed character count alone can detach a numerical value from its heading, qualification, or effective date. Prefer coherent sections with headings and controlled overlap where necessary. Preserve a reference back to the original document so people can inspect the whole statement."
        ]
      },
      {
        "title": "A worked two-version retrieval test",
        "paragraphs": [
          "Suppose a draft policy says a plan costs 20 units, while a later approved policy says 25 units. Both are synthetic examples. The retrieval layer should prefer the approved, currently effective policy when answering a current-price question, and it should explicitly cite the version consulted. If asked what changed, it may retrieve both, label their dates, and present the difference.",
          "Write three expected outcomes for this fixture: a current pricing question cites only the effective source; a historical comparison distinguishes both sources; an unauthorised user's query returns neither restricted document. If the retriever cannot enforce those distinctions, improving prompt wording alone does not solve the data problem."
        ]
      },
      {
        "title": "Use ranking as one stage, not the only judge",
        "paragraphs": [
          "Keyword matching can recover exact identifiers; semantic matching can find paraphrases. A hybrid retrieval pipeline can combine their strengths and rerank with the question, passage and metadata. That choice should be evaluated on the organisation's own questions rather than selected from a benchmark claim alone.",
          "Return a small evidence package with document identifiers, titles, excerpts, date and scope. Do not let the model silently create citations that were not supplied by retrieval. If passages conflict, surface the conflict or apply documented source precedence instead of guessing which fact is true."
        ]
      },
      {
        "title": "Measure the whole answer chain",
        "paragraphs": [
          "Create a fixture set containing exact-match queries, paraphrases, negations, absent facts, revoked access, stale documents, duplicated content and adversarial instructions inside retrieved text. Evaluate retrieval recall and relevance separately from grounded answer quality. A model may answer well despite retrieving poorly by relying on memorized general knowledge, which masks the problem.",
          "A grounded-answer test asks whether each important statement is supported by a cited passage. Another check examines whether the system appropriately abstains when no permitted support exists. Track the failing stage so fixes target indexing, filters, ranking, context assembly or generation rather than rewriting everything."
        ]
      }
    ],
    "principles": [
      {
        "title": "Source authority comes first",
        "detail": "Store access, version and provenance metadata with each passage."
      },
      {
        "title": "Retrieve only permitted evidence",
        "detail": "Filter by tenant, ownership and publication status before showing context."
      },
      {
        "title": "Prefer documented source precedence",
        "detail": "Resolve stale conflicts with explicit version rules or surface uncertainty."
      },
      {
        "title": "Evaluate retrieval and answers separately",
        "detail": "A fluent answer is not proof of correct evidence selection."
      }
    ],
    "workflow": [
      {
        "title": "Build a versioned document registry",
        "detail": "Define identifiers, owners, effective dates, source scope and correction paths."
      },
      {
        "title": "Chunk meaningfully",
        "detail": "Preserve headings, qualifiers, units and original document links."
      },
      {
        "title": "Implement hybrid candidate selection",
        "detail": "Evaluate lexical and semantic coverage for real question types."
      },
      {
        "title": "Apply ranking with authority checks",
        "detail": "Prefer appropriate effective records and enforce permission filters."
      },
      {
        "title": "Generate with bounded evidence",
        "detail": "Pass attributable passages and require honest handling of missing support."
      },
      {
        "title": "Run regression fixtures",
        "detail": "Test old versus new versions, unauthorised access, hallucinated citations and abstention."
      }
    ],
    "pitfalls": [
      {
        "title": "Indexing unpublished drafts with live policy",
        "detail": "Similar text can obscure which version has authority."
      },
      {
        "title": "Treating embedding similarity as truth",
        "detail": "Similarity does not establish freshness, correctness or rights to access."
      },
      {
        "title": "Evaluating only final prose",
        "detail": "A persuasive answer can conceal wrong retrieval and unsupported claims."
      }
    ],
    "measurement": [
      "Use separate retrieval metrics for known relevant documents, citation faithfulness checks for generated claims, and abstention tests when sources are missing. Document test-set selection and source snapshot dates.",
      "Inspect security and privacy cases: the desired unauthorized retrieval count is zero, but a passing limited test does not prove tenant isolation is complete across all execution paths."
    ],
    "future": "As model context windows grow, disciplined source versioning and authorization will still be needed. More context is not inherently more reliable context.",
    "takeaways": [
      "Record document provenance, version and access before indexing.",
      "Preserve the context needed to interpret a passage.",
      "Test historical conflicts and absent evidence explicitly.",
      "A citation must lead to the source actually used."
    ],
    "faq": [
      {
        "question": "Should I use only vector search for RAG?",
        "answer": "Not necessarily. Exact identifiers and domain terminology often benefit from lexical search or hybrid ranking."
      },
      {
        "question": "Can the model choose the newest policy without metadata?",
        "answer": "It may guess. Provide effective dates and an explicit authority rule instead."
      },
      {
        "question": "What should happen when no permitted source answers a question?",
        "answer": "Say that reliable support was not found, and offer an appropriate next step rather than inventing a citation."
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
      },
      {
        "label": "PostgreSQL: full-text search",
        "url": "https://www.postgresql.org/docs/current/textsearch.html"
      }
    ]
  }
];
