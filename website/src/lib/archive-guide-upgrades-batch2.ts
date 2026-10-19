import type { VisibilityGuide } from "@/lib/visibility-content";

// Reviewed, topic-specific replacements for two template-derived archive pages.
// Illustrative scenarios are not customer case studies or measured product outcomes.
export const archiveGuideUpgradesBatch2: readonly VisibilityGuide[] = [
  {
    "slug": "modern-web-performance-core-metrics",
    "lead": "A fast website gives a visitor useful content promptly, responds to actions without hesitation, and keeps the page steady while it loads. Those are distinct engineering problems, so one speed score cannot describe all three.",
    "overview": [
      "Imagine a product catalogue on a mid-range mobile phone. The heading appears quickly but a large unoptimized image arrives later and moves the first product card. A visitor taps the category filter just as a heavy client-side script is parsing. The initial load may look acceptable in a desktop screenshot while the actual journey feels unstable.",
      "Core Web Vitals describe different parts of that journey. Largest Contentful Paint (LCP) measures when the main visible content is rendered, Interaction to Next Paint (INP) measures responsiveness to user interactions, and Cumulative Layout Shift (CLS) captures unexpected movement. These metrics need field context, not unsupported promises about rank or conversions."
    ],
    "deepDive": [
      {
        "title": "Trace the critical content path",
        "paragraphs": [
          "Start at the first document request. Verify whether the response already contains the page title, meaningful text, and links, then inspect the network waterfall for fonts, images, scripts, and data requests. A server-rendered document can still be slow if the server waits on unnecessary upstream requests before streaming its first useful content.",
          "For an illustrative catalogue, first render the category links and the first page of product cards on the server. Reserve client-side JavaScript for stateful filtering and optional interactions. Record server response time and the loading priority of the largest content element before changing caches or splitting bundles."
        ]
      },
      {
        "title": "Investigate LCP without hiding CLS",
        "paragraphs": [
          "A hero image is a frequent LCP candidate, but not every page has one. Inspect the actual candidate in the browser performance trace. Supply width, height, responsive sizes, and a suitable source file for images. Prioritize the single resource that matters for the current page rather than preloading the entire image gallery.",
          "An image that paints earlier can still create a bad experience if it shifts surrounding text. Reserve space before the resource downloads. Also inspect web-font swaps, injected advertisements, consent overlays, and expandable cards. Use a stable placeholder for future ad placements to reduce avoidable movement."
        ]
      },
      {
        "title": "Treat slow taps as a scheduling problem",
        "paragraphs": [
          "INP problems can arise when a click triggers expensive rendering, large JavaScript tasks, or slow synchronous computations. Capture the specific tap, the processing delay, and the next visual update. Move unrelated work out of the critical interaction and avoid rerendering an entire page when one control changes.",
          "Do not equate an event handler returning quickly with a responsive interface. For example, a filter button may update internal state but leave the results unchanged while asynchronous work continues. Give users visible feedback, keep the input responsive, and test under a realistic CPU throttle."
        ]
      },
      {
        "title": "NexisHub release evidence and its limits",
        "paragraphs": [
          "In October 2026 NexisHub verified a production deployment and checked public routes, but those HTTP 200 responses did not measure the browser's LCP, INP, or CLS. This distinction matters: build success, request reachability, and user-perceived performance should appear as separate verification columns.",
          "NexisHub's consent control and Google advertising loader are also relevant to layout stability and the network waterfall. Their existence is evident in the repository, but their actual effect on field performance and regional consent flows requires browser measurements before claiming an improvement."
        ]
      }
    ],
    "principles": [
      {
        "title": "Use field and lab data for different questions",
        "detail": "Field distributions show real user experience; reproducible lab traces help diagnose a specific failure."
      },
      {
        "title": "Optimize the route a user follows",
        "detail": "Measure initial content, actual interaction, navigation, and layout stability, not a disconnected screenshot."
      },
      {
        "title": "Prioritize the bottleneck",
        "detail": "If LCP is slow because of a render-blocking asset, reworking button CSS is unlikely to fix it."
      },
      {
        "title": "Keep evidence tied to versions",
        "detail": "Record the route, device profile, timestamp, deployed commit and test method for every result."
      }
    ],
    "workflow": [
      {
        "title": "Choose representative routes",
        "detail": "Include a homepage, long blog article, product listing, mobile page and dynamic route if available."
      },
      {
        "title": "Capture a baseline",
        "detail": "Save browser traces, key resource timings, Core Web Vitals where available, and screenshots of layout shifts."
      },
      {
        "title": "Classify the problem",
        "detail": "Determine whether waiting, network transfer, long tasks or late element insertion dominates."
      },
      {
        "title": "Change one cause",
        "detail": "Optimize the relevant image, data path, JavaScript work or layout reservation; avoid unreviewed bundle-wide rewrites."
      },
      {
        "title": "Compare under equivalent conditions",
        "detail": "Use the same device profile, network assumptions and routes, then follow actual users over a meaningful observation window."
      }
    ],
    "pitfalls": [
      {
        "title": "Using one synthetic score as proof",
        "detail": "A lab run does not represent every user, country, network, or device."
      },
      {
        "title": "Shrinking images without reserving space",
        "detail": "Faster downloads do not automatically eliminate layout shifts."
      },
      {
        "title": "Overusing preload",
        "detail": "Aggressive priority hints can crowd out critical resources and harm the route."
      }
    ],
    "measurement": [
      "Record LCP, INP and CLS from the appropriate measurement source, and segment by route and device where data is sufficiently representative. Do not invent figures when field data is missing.",
      "Use a before-and-after comparison with a stable deployment identifier and document changed assets. A result on a local laptop is diagnostic evidence, not proof of an improvement for all visitors.",
      "Check functional regressions after performance changes: keyboard navigation, search, text visibility without scripts, consent interactions and external navigation must continue to work."
    ],
    "future": "Fast web engineering will continue to depend on clear loading boundaries, interaction scheduling, observable resource priorities and careful integration of third-party services. A framework upgrade is not a substitute for measuring real pages.",
    "takeaways": [
      "LCP, INP and CLS identify different failure modes.",
      "Optimize the first useful content and the actual tap.",
      "Reserve space for media and late content.",
      "Keep measurements tied to route, device and release."
    ],
    "faq": [
      {
        "question": "Can a website score well in a lab but still feel slow?",
        "answer": "Yes. Lab settings may not reflect real phones, networks, interactions or visitor mix. Investigate field evidence when available."
      },
      {
        "question": "Does server rendering automatically improve every Core Web Vital?",
        "answer": "No. It can make initial content available earlier, while blocking data requests, hydration work, images and layout shifts can still cause problems."
      },
      {
        "question": "Should I optimize for a Google score instead of users?",
        "answer": "Measure the user journey first. Use metrics to find causes, then validate that navigation and interaction actually improved."
      },
      {
        "question": "Can a Vercel READY status prove good INP?",
        "answer": "No. Deployment readiness and browser responsiveness are distinct test layers."
      }
    ],
    "references": [
      {
        "label": "web.dev: Core Web Vitals",
        "url": "https://web.dev/articles/vitals"
      },
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
      }
    ]
  },
  {
    "slug": "ai-observability-tracing",
    "lead": "An AI trace is useful when it explains what happened between a user's request and the result they saw. A stack of model tokens and latency numbers is not enough when retrieval, tool permissions and downstream actions are involved.",
    "overview": [
      "Consider an assistant answering a question about a company's published policy. It may retrieve four passages, choose two, call a model, and return a confident summary. If the answer misstates the policy, the team needs to know which document version was retrieved, whether the wrong passage was selected, and what the model was allowed to infer.",
      "Observability should connect a request identifier to retrieval, model execution, tool actions, policy decisions and the final response. It must also minimize exposure of private prompts, credentials and tenant data in log storage."
    ],
    "deepDive": [
      {
        "title": "A trace through retrieval and generation",
        "paragraphs": [
          "Start with a root span holding a request ID, route, environment and approved tenant-safe correlation identifiers. Add spans for input validation, retrieval, reranking or passage selection, context preparation, model invocation and response processing. Each span should capture the operation, outcome, latency and a bounded error category.",
          "For retrieval, record source IDs, versions, collection identifiers and selection reasons where possible. If document text cannot be stored for privacy reasons, keep a safe source reference or hash rather than logging raw sensitive excerpts. The aim is to reconstruct decisions, not duplicate confidential data in telemetry."
        ]
      },
      {
        "title": "Separate quality evidence from runtime health",
        "paragraphs": [
          "A trace can show that a model call returned status 200, used a certain number of tokens, and completed in two seconds. It cannot prove the answer was correct. Quality evaluation needs a labeled test question, expected evidence, acceptance criteria and a review of the output.",
          "Use a small regression dataset containing contradictory documents, absent answers, stale document versions and irrelevant retrieval candidates. Record whether the assistant cites the correct version, declines unsupported assertions and handles retrieval failure cleanly. A latency dashboard and a factuality assessment belong in different panels."
        ]
      },
      {
        "title": "Tool actions need stronger evidence",
        "paragraphs": [
          "An AI tool call that requests a side effect should record the authenticated actor, authorized scope, validated arguments category, idempotency key and final business acknowledgement. A 'tool succeeded' event may only mean a request was queued; it must not be represented as a completed customer outcome without downstream confirmation.",
          "For an illustrative appointment assistant, a tool invocation might return a provisional hold identifier. Only the booking system's confirmed reservation should be shown as a completed booking. Similar boundaries apply to payment, email delivery, publishing and account changes."
        ]
      },
      {
        "title": "A bounded NexisHub engineering example",
        "paragraphs": [
          "NexisHub's documented Vercel incident illustrates a broader observability distinction. Its remote build completed compilation yet failed during output deployment. Later, a READY Preview still returned an admin 500 because a signing secret was absent. These were separate lifecycle events requiring separate logs and acceptance checks, not proof of a problem inside an AI model.",
          "The same principle should apply to NexisHub's future AI features: a generated recommendation, a queued workflow, a deployed service and a verified customer outcome should not share one unqualified success flag. This is an architectural recommendation based on the observed deployment workflow, not a claim that a completed AI tracing system is already deployed."
        ]
      }
    ],
    "principles": [
      {
        "title": "Trace boundaries, not just model calls",
        "detail": "Include retrieval, context assembly, guard decisions, tools and outcome acknowledgement."
      },
      {
        "title": "Protect data by default",
        "detail": "Avoid storing raw private conversations, API keys, third-party tokens or cross-tenant identifiers in shared logs."
      },
      {
        "title": "Keep technical success distinct from answer quality",
        "detail": "A completed request is not proof of a truthful or useful answer."
      },
      {
        "title": "Correlate events with stable identifiers",
        "detail": "Make it possible to follow one request across workers without confusing it with another user's session."
      }
    ],
    "workflow": [
      {
        "title": "Map a single real request",
        "detail": "Document each data, model and tool boundary before choosing a telemetry library."
      },
      {
        "title": "Define safe span fields",
        "detail": "Use operation name, timestamp, duration, outcome and non-sensitive source/version identifiers."
      },
      {
        "title": "Instrument failure paths",
        "detail": "Capture timeouts, unavailable documents, rejected tool permissions and downstream failures as explicit events."
      },
      {
        "title": "Connect evaluation",
        "detail": "Join each representative test case to its trace and human-reviewed outcome."
      },
      {
        "title": "Set retention and access rules",
        "detail": "Specify tenant-safe retrieval, redaction, retention, deletion and incident access controls."
      }
    ],
    "pitfalls": [
      {
        "title": "Logging every prompt verbatim",
        "detail": "Raw prompts can contain personal, financial or proprietary information unrelated to the telemetry purpose."
      },
      {
        "title": "Equating tokens with useful work",
        "detail": "Token counts are cost inputs, not proof of answer accuracy."
      },
      {
        "title": "Calling a queued action complete",
        "detail": "Async workflows need independently verified final-state acknowledgement."
      }
    ],
    "measurement": [
      "Measure latency by stage, error rates by category, model and retrieval cost, source-version coverage, and the proportion of tool actions with verified outcomes.",
      "Add quality measures from reviewed test cases: unsupported-answer rate, stale-source use, incorrect citation rate and boundary violations. State test-sample limits instead of presenting them as universal percentages.",
      "Audit access to traces and use redaction tests to confirm sensitive fields remain unavailable to unauthorized viewers."
    ],
    "future": "As AI products gain more tools and memory, the most valuable traces will identify where authority came from, which state actually changed and what evidence permits the result to be trusted.",
    "takeaways": [
      "Track retrieval and tool boundaries in addition to model calls.",
      "Preserve source versions without leaking private text.",
      "Separate model execution from verified customer outcomes.",
      "Treat trace storage as a security and privacy system."
    ],
    "faq": [
      {
        "question": "Does successful model execution prove a reliable answer?",
        "answer": "No. Runtime success and substantive correctness require different evidence."
      },
      {
        "question": "Should traces include the full user conversation?",
        "answer": "Not by default. Use purpose-limited, redacted fields and carefully reviewed retention controls."
      },
      {
        "question": "How do I debug a wrong citation?",
        "answer": "Follow the source version, retrieval candidates, selection step, context assembly and response generation for that request."
      },
      {
        "question": "Can traces prove that a payment or booking finished?",
        "answer": "Only if they include a trustworthy acknowledgement from the authoritative downstream system."
      }
    ],
    "references": [
      {
        "label": "OpenTelemetry tracing concepts",
        "url": "https://opentelemetry.io/docs/concepts/signals/traces/"
      },
      {
        "label": "OWASP Top 10 for LLM Applications",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      },
      {
        "label": "NIST AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ]
  }
];
