import type { VisibilityGuide } from "@/lib/visibility-content";

// Topic-specific revisions for previously template-generated guides.
// Worked examples are illustrative unless clearly described as source-verified.
export const focusedGuides: readonly VisibilityGuide[] = [
  {
    "slug": "designing-fast-websites",
    "lead": "A fast website is one that lets a visitor complete a useful task quickly. A small JavaScript bundle cannot compensate for slow server responses, missing content, or controls that never work.",
    "overview": [
      "Begin by identifying the task: read an article, choose a product, find a privacy notice, or contact the operator. Define the moment the visitor can meaningfully use the page, then measure how long that takes on a modest phone over a constrained connection.",
      "For a NexisHub-style Next.js content site, compare a prerendered article, a dynamically rendered endpoint, and a protected administrative page separately. Their rendering and caching requirements differ. A 200 status proves a route responds, not that its interface is fast or accessible."
    ],
    "deepDive": [
      {
        "title": "A concrete route-level test plan",
        "paragraphs": [
          "Choose `/blog`, one `/blog/[slug]` article, `/research`, and `/admin`. Confirm the intended rendering mode and capture the first response headers. For article pages, test when headings and the core text become readable with JavaScript disabled. For `/admin`, expect authorization behavior rather than optimizing its cached HTML as if it were a public page.",
          "Use Lighthouse or browser performance tooling with recorded device and connection settings, and repeat multiple runs instead of reporting the best score. Measure LCP for visible principal content, INP after an actual tap or keyboard action, and CLS during fonts and images loading. Then examine the network waterfall to determine whether slow work is on the server, in CSS and fonts, image delivery, or JavaScript hydration.",
          "Include an intentionally slow connection test and one blocked optional third-party request. The navigation, privacy disclosure, and essential page content should remain usable. Record a screenshot and a completion outcome, not just a numeric score."
        ]
      },
      {
        "title": "A practical progression from HTML to interaction",
        "paragraphs": [
          "First make the core page useful as server-rendered HTML: semantic headings, readable body copy, real links and accurate form labels. Add client-side code only for behavior that requires it, such as reopening consent choices or submitting a validated form. Keep the action's failure state visible and understandable.",
          "Fonts and visuals should support the experience without dictating whether content can be understood. Use reserved image dimensions to avoid layout shifts; compare self-hosting or caching fonts where appropriate; review large hero images on smaller viewports. Avoid changing every asset at once because it becomes impossible to attribute the result.",
          "Do not treat a private Preview's cached `200` as a substitute for production RUM or lab testing. A performance report needs route, date, sample count, device, region, consent state, and build revision."
        ]
      }
    ],
    "principles": [
      {
        "title": "Define usefulness first",
        "detail": "Start from task completion and readable content, not a dashboard score."
      },
      {
        "title": "Choose rendering per route",
        "detail": "Public content, on-demand endpoints and admin screens have different caching needs."
      },
      {
        "title": "Preserve progressive enhancement",
        "detail": "Links and reading remain available when optional scripts fail."
      },
      {
        "title": "Measure repeatedly",
        "detail": "Record device, connection, consent state and multiple samples."
      }
    ],
    "workflow": [
      {
        "title": "Select representative routes",
        "detail": "Test home, article, index and one protected/dynamic route with their actual expected behavior."
      },
      {
        "title": "Create a repeatable baseline",
        "detail": "Save build SHA, testing environment, device settings and request waterfall."
      },
      {
        "title": "Identify the dominant delay",
        "detail": "Inspect server, CSS, fonts, image assets and hydration separately."
      },
      {
        "title": "Apply one bounded change",
        "detail": "Reduce an oversized image or unnecessary client module and compare with the baseline."
      },
      {
        "title": "Validate user interactions",
        "detail": "Test scrolling, keyboard navigation, privacy controls and failed network responses."
      }
    ],
    "pitfalls": [
      {
        "title": "Optimizing the score rather than the task",
        "detail": "A high Lighthouse result cannot prove a reader found the information."
      },
      {
        "title": "Benchmarking one cached request",
        "detail": "Cached HTML hides cold and dynamic latency."
      },
      {
        "title": "Breaking consent to accelerate loading",
        "detail": "Never load optional tracking merely to manipulate performance measurements."
      }
    ],
    "measurement": [
      "Report median and variability for LCP, INP and CLS over representative sessions, and task completion across a small but documented device matrix.",
      "Attach a before-and-after trace and describe what was deliberately not tested, including analytics-disabled scenarios."
    ],
    "future": "As Next.js routing and streaming change, preserve route-specific acceptance criteria instead of treating one build option as the universal performance strategy.",
    "takeaways": [
      "Core information should remain useful before hydration.",
      "Match caching to page purpose and privacy.",
      "Use traces to locate actual bottlenecks.",
      "Check interactions and content alongside Core Web Vitals."
    ],
    "faq": [
      {
        "question": "Does server-side rendering always improve performance?",
        "answer": "No. It may improve initial content availability while increasing server work. Measure the particular route."
      },
      {
        "question": "What should be tested first on NexisHub?",
        "answer": "The blog index, an article, Research, and a protected route provide a useful mix of static and dynamic behavior."
      },
      {
        "question": "Does a fast website automatically satisfy AdSense?",
        "answer": "No. Original content, policies and visitor value are assessed separately."
      }
    ],
    "references": [
      {
        "label": "web.dev Core Web Vitals",
        "url": "https://web.dev/articles/vitals"
      },
      {
        "label": "Next.js rendering and caching documentation",
        "url": "https://nextjs.org/docs/app/getting-started/caching-and-revalidating"
      }
    ]
  },
  {
    "slug": "accessible-interfaces-without-javascript",
    "lead": "Accessibility is an operating condition: the visitor must be able to understand the page, reach controls and complete essential tasks even when optional code is absent or an assistive technology presents the interface differently.",
    "overview": [
      "A site may render perfect cards while leaving its navigation inaccessible to keyboard users. Start with semantic HTML and visible focus states before adding custom interaction logic.",
      "NexisHub offers a useful real interface to inspect: a mobile navigation menu built around a native details element and a first-party privacy banner with two buttons. These source structures suggest test cases, not verified accessibility results."
    ],
    "deepDive": [
      {
        "title": "A manual keyboard route that exposes real defects",
        "paragraphs": [
          "Open the homepage on a clean browser profile. Press Tab from the address bar. Observe the focus sequence through the logo, navigation, primary CTA and footer. Open mobile navigation using keyboard input; confirm that the menu can be reached, opened, and closed, and that focus does not disappear behind an overlay.",
          "On first visit, locate the privacy banner using only keyboard interaction. Confirm that its description can be understood, that Essential only and Allow analytics are both operable, and that choice does not unexpectedly move focus to hidden content. After choosing, navigate to another article, find the footer Cookie choices button and reopen the banner. Repeat with zoom at 200% and a narrow viewport.",
          "At `/contact`, verify programmatic labels, required-field explanations, and the disabled submit state. A form that cannot send should announce the limitation before a visitor invests time filling it. An apparently available form with an inert button is a poor user experience even if the page meets many markup checks."
        ]
      },
      {
        "title": "Testing without JavaScript and with assistive technology",
        "paragraphs": [
          "Disable JavaScript and reload a blog article. Check headings, landmarks, table of contents links, references and the article text. If the privacy choice relies on JavaScript, clearly distinguish the essential content that still works from controls that require scripting; do not advertise full no-JavaScript functionality unless tested.",
          "Use a screen reader on at least one desktop and mobile setup. Confirm headings are ordered, images describe meaningful content, links identify their destinations, and buttons announce actions rather than vague labels. Automated tooling can detect missing labels or contrast failures, but only manual operation can show whether reading order and focus are sensible.",
          "Record each issue with reproduction steps, viewport, browser, assistive technology, expected result and actual result. Do not call a site accessible merely because a linter passed."
        ]
      }
    ],
    "principles": [
      {
        "title": "Use native elements",
        "detail": "Prefer links, buttons, labels and details where they match the action."
      },
      {
        "title": "Make focus predictable",
        "detail": "Keyboard users must reach and exit navigation and privacy controls."
      },
      {
        "title": "Explain unavailable actions",
        "detail": "Do not present a disabled form as a working contact channel."
      },
      {
        "title": "Test actual readers",
        "detail": "Combine automated checks with manual keyboard and screen-reader journeys."
      }
    ],
    "workflow": [
      {
        "title": "Audit the markup",
        "detail": "Inspect page landmarks, headings, labels, alt text and link destinations."
      },
      {
        "title": "Walk the full keyboard path",
        "detail": "Test navigation, article reading, footer and reopened privacy choices."
      },
      {
        "title": "Test at high zoom",
        "detail": "Confirm no essential text or controls are clipped at 200%."
      },
      {
        "title": "Disable scripts",
        "detail": "Identify essential content lost without JavaScript and document necessary enhancements."
      },
      {
        "title": "Capture assistive-technology results",
        "detail": "Record actual announcements, order and interaction failures."
      }
    ],
    "pitfalls": [
      {
        "title": "Confusing valid HTML with accessible UX",
        "detail": "Correct syntax can still create frustrating focus order."
      },
      {
        "title": "Relying only on an accessibility score",
        "detail": "Automated scores cover only part of the experience."
      },
      {
        "title": "Hiding a broken contact workflow",
        "detail": "A visible form that is disabled without a clear alternative may block essential communication."
      }
    ],
    "measurement": [
      "Track completion of a fixed keyboard-only task set, focus-visible failures and assistive-technology findings by route and severity.",
      "Link each fix to a reproducible issue and retest the same scenario rather than asserting generic accessibility improvement."
    ],
    "future": "Accessible design is best maintained as a release gate whenever navigation, forms, editors or consent components change.",
    "takeaways": [
      "Readable content matters even if optional scripts fail.",
      "Native controls reduce but do not eliminate testing obligations.",
      "An accessible privacy choice needs keyboard and screen-reader acceptance.",
      "Usability of the contact pathway matters to trust."
    ],
    "faq": [
      {
        "question": "Can a website be fully functional without JavaScript?",
        "answer": "Not always. The useful baseline should remain available where feasible and enhanced features should degrade honestly."
      },
      {
        "question": "Do native details and button elements guarantee accessibility?",
        "answer": "No. They support semantics but focus order, labels and real-device behavior still require testing."
      },
      {
        "question": "What is the most important first test?",
        "answer": "Complete a visitor journey with only a keyboard, including navigation and cookie preferences."
      }
    ],
    "references": [
      {
        "label": "WCAG 2.2",
        "url": "https://www.w3.org/TR/WCAG22/"
      },
      {
        "label": "WAI keyboard accessibility",
        "url": "https://www.w3.org/WAI/perspective-videos/keyboard/"
      }
    ]
  },
  {
    "slug": "production-ai-infrastructure-components",
    "lead": "An AI product does not become production-ready when one model request returns an answer. It becomes dependable when its data boundaries, retrieval, evaluation, observability and recovery paths are specified and tested together.",
    "overview": [
      "A production diagram should distinguish the user-facing application, identity and authorization, source systems, retrieval, model execution, business tools, logging and operational control. Each boundary needs an owner and a failure policy.",
      "NexisHub's SiteNexis and TeachNexis workflows provide different kinds of operational questions. A website audit needs reproducible evidence tied to a domain and run. An education workflow needs curriculum relevance, teacher review and safeguards around student context. Shared infrastructure should not mean shared permission to cross those boundaries."
    ],
    "deepDive": [
      {
        "title": "Trace one request from source to evidence",
        "paragraphs": [
          "Consider a website audit request. The application first establishes the authorized user and the site they may access. A collection worker fetches bounded source material, records when and how it was observed, and separates immutable observations from later interpretation. Retrieval or model calls may then create a proposed explanation; that explanation must remain distinguishable from a raw HTTP response or a database record.",
          "A report generator should use an idempotent job identifier and stable input snapshot so retries do not produce contradictory authoritative reports. If an external provider times out, record which checks are unavailable instead of fabricating a complete score. This is an architectural example, not a claim that every SiteNexis workflow currently implements each recommendation.",
          "A support operator needs to answer: what source version was checked, which stages ran, what failed, how the result was derived, how many tokens were consumed, and whether the response can be reproduced. Without those fields, model quality becomes a matter of recollection rather than evidence."
        ]
      },
      {
        "title": "Failure drills worth running before launch",
        "paragraphs": [
          "Simulate model-provider throttling and a partial retrieval failure. Verify bounded retries, timeout budgets, clear user messaging and preservation of the prior authoritative record. Repeat the same job request and confirm it cannot publish duplicate final artifacts. Test a request for another tenant's sources and verify it fails before any retrieval or cache lookup returns protected context.",
          "Test a malformed webhook, a worker crash after processing but before acknowledgement, and a slow database query. These are ordinary distributed-system hazards that AI marketing material often ignores. The expected outcome may be an explicit incomplete state, not an impressive but unsupported generated answer.",
          "Separate measurement of technical completion from user value. An inference service may remain available while its advice is misleading. Evaluate representative questions against a versioned reference set, record known limitations, and require a domain expert to review consequential outputs."
        ]
      }
    ],
    "principles": [
      {
        "title": "Business state is authoritative",
        "detail": "Never let generated text overwrite a source record without a validated action."
      },
      {
        "title": "Keep tenant scope throughout",
        "detail": "Authorization applies before collecting, retrieving and rendering data."
      },
      {
        "title": "Expect partial failure",
        "detail": "Timeouts, provider outages and malformed responses must produce bounded recoverable states."
      },
      {
        "title": "Preserve provenance",
        "detail": "Retain source, timestamp, job version and evidence behind conclusions."
      }
    ],
    "workflow": [
      {
        "title": "Map trust boundaries",
        "detail": "Identify user scope, records, retrieval, external tools and publication paths."
      },
      {
        "title": "Define idempotency",
        "detail": "Assign durable request identifiers and safe retry semantics."
      },
      {
        "title": "Design observability",
        "detail": "Capture privacy-aware traces and stage metrics with source provenance."
      },
      {
        "title": "Establish evaluation cases",
        "detail": "Use representative tasks, expected outputs and explicit error categories."
      },
      {
        "title": "Run failure drills",
        "detail": "Test outages, duplicate jobs, cross-tenant access and crash recovery."
      }
    ],
    "pitfalls": [
      {
        "title": "Treating fluent responses as correct",
        "detail": "An answer's confidence does not establish its evidence."
      },
      {
        "title": "Logging protected inputs indiscriminately",
        "detail": "Observability must respect minimization, permissions and retention."
      },
      {
        "title": "Publishing partial output as complete",
        "detail": "Report missing checks rather than implying full coverage."
      }
    ],
    "measurement": [
      "Track reproducibility, stage success, error categories, recovery time, duplicate publication rate and unauthorized-access denial.",
      "Evaluate answer usefulness with reviewed cases, not merely uptime and model latency."
    ],
    "future": "Reliable AI stacks will be distinguished by verifiable provenance and the ability to recover from partial failure.",
    "takeaways": [
      "A successful model call proves little about a complete workflow.",
      "Idempotency and tenant isolation belong in the architecture.",
      "Partial results must be labelled.",
      "Observability and evaluation require privacy protections."
    ],
    "faq": [
      {
        "question": "Is a vector database mandatory?",
        "answer": "No. The right retrieval architecture depends on volume, data ownership and the actual problem."
      },
      {
        "question": "What should happen when a provider fails?",
        "answer": "Return a bounded incomplete result or retry safely; never fabricate missing evidence."
      },
      {
        "question": "How can teams verify production readiness?",
        "answer": "Run authorization, retry, recovery and evaluation tests against representative workflows."
      }
    ],
    "references": [
      {
        "label": "NIST AI RMF",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "label": "OWASP LLM application risks",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      }
    ]
  },
  {
    "slug": "reliable-rag-systems",
    "lead": "Retrieval-augmented generation is a chain of source decisions. A polished answer can be wrong because the correct document was never retrieved, the wrong version was selected, or the model ignored a conflicting passage.",
    "overview": [
      "Before choosing embeddings or a vector database, define the information users ask for and which sources are authoritative. Include source access permissions, revision history and what the system should say when information is missing.",
      "A good test set should include easy questions, ambiguous queries, contradictory documents, withdrawn documents, cross-tenant lookups and genuinely unanswerable requests. These expose failure modes that a cheerful demo often hides."
    ],
    "deepDive": [
      {
        "title": "A reproducible retrieval example",
        "paragraphs": [
          "Suppose a software platform has an older deployment guide stating that a particular command is required, followed by a revised guide that changes the command. Query both with: 'Which command is correct today?' A naive retriever might return the older, higher-scoring chunk. The system must use document version and effective date to avoid representing that stale content as current.",
          "Split documents along semantic boundaries so each chunk carries enough local context: document title, version, section, URL and date. Retrieval should return candidate passages with scores for investigation, but similarity is not authority. Apply authorization and version rules before constructing the model context.",
          "Ask the model to answer only from the allowed passages and include a source link for each material claim. If the passages disagree and no resolution policy exists, report the conflict and suggest the authoritative source owner instead of choosing the more fluent paragraph."
        ]
      },
      {
        "title": "Evaluate every part of the chain",
        "paragraphs": [
          "Retrieval recall asks whether a relevant, permitted passage made it into the selected context. Context precision asks whether irrelevant passages crowded it out. Answer faithfulness asks whether the final claims are supported by those passages. Source attribution asks whether the cited links actually refer to the supporting evidence. These measures are related but not interchangeable.",
          "Create a small, versioned question set with a source-level answer key and negative examples. Run it after changing chunk sizes, index settings, prompts, model versions or reranking. Preserve a sample of the retrieved passages and evaluation decisions so a score can be explained.",
          "Security tests matter here as much as quality. A document may contain instructions such as 'ignore previous requirements' or links to external endpoints. Treat retrieved text as untrusted content; do not let it override tool permissions, system policies or tenant restrictions."
        ]
      }
    ],
    "principles": [
      {
        "title": "Source authority matters",
        "detail": "Rank relevance only after enforcing permissions and effective versions."
      },
      {
        "title": "Include local context",
        "detail": "Attach titles, sections, timestamps and ownership to passage chunks."
      },
      {
        "title": "Support claims explicitly",
        "detail": "Citations should point to evidence, not just to any retrieved page."
      },
      {
        "title": "Decline unsupported answers",
        "detail": "Ambiguity is preferable to invented certainty."
      }
    ],
    "workflow": [
      {
        "title": "Design the evidence corpus",
        "detail": "Identify which documents are trusted, current and permitted for each request."
      },
      {
        "title": "Build a versioned evaluation set",
        "detail": "Include conflicting, missing and revoked documents."
      },
      {
        "title": "Compare retrieval choices",
        "detail": "Test lexical, vector and hybrid techniques without assuming one always wins."
      },
      {
        "title": "Constrain generation",
        "detail": "Make supportable claims with relevant citations and explicit limits."
      },
      {
        "title": "Test security and updates",
        "detail": "Probe prompt injection, tenant leakage and stale-index deletion."
      }
    ],
    "pitfalls": [
      {
        "title": "Treating similarity as truth",
        "detail": "A passage can be topically similar yet outdated or wrong."
      },
      {
        "title": "Citing irrelevant documents",
        "detail": "A link does not verify the sentence it is placed beside."
      },
      {
        "title": "Ignoring deletions",
        "detail": "Revoked records can remain in caches or secondary indexes without coordinated removal."
      }
    ],
    "measurement": [
      "Measure permitted-passage recall, answer faithfulness, citation support and unresolved-conflict handling on a fixed evaluation corpus.",
      "Record the exact corpus snapshot and model/retriever configuration for each test run."
    ],
    "future": "As retrieval systems serve more consequential tasks, provenance, permission enforcement and correction will matter more than index size.",
    "takeaways": [
      "A retriever finds candidates, not truth.",
      "Version and tenant controls are essential.",
      "Evaluate retrieval and answer grounding separately.",
      "Unknown or conflicting sources require explicit handling."
    ],
    "faq": [
      {
        "question": "Do larger chunks always improve answers?",
        "answer": "No. They may retain context but dilute retrieval precision. Test on actual queries."
      },
      {
        "question": "Should a RAG model always respond?",
        "answer": "No. It should express uncertainty or refuse unsupported claims when source coverage is inadequate."
      },
      {
        "question": "Does a citation make an answer reliable?",
        "answer": "Only when the cited source really supports the claim and is authorized and current."
      }
    ],
    "references": [
      {
        "label": "OWASP LLM prompt injection guidance",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      },
      {
        "label": "NIST AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ]
  }
];
