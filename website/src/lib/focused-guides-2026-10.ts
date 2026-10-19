import type { VisibilityGuide } from "@/lib/visibility-content";

// Topic-specific revisions for previously template-generated guides.
// Worked examples are illustrative unless clearly described as source-verified.
export const focusedGuides: readonly VisibilityGuide[] =  [
  {
    "slug": "healthcare-data-governance-ai",
    "lead": "Before adding AI to a healthcare workflow, determine who is permitted to use each record, what it was collected for, and whether the proposed reuse is lawful and safe.",
    "overview": [
      "A clinic's registration record, appointment list, laboratory result and consultation note are not interchangeable datasets. Each may have different owners, retention rules, clinical sensitivity and access permissions.",
      "The concrete task is to produce a data-flow inventory before choosing a model. For a hypothetical appointment reminder, record precisely which fields move from scheduling software to messaging software, the lawful purpose, and when the copy is removed."
    ],
    "deepDive": [
      {
        "title": "Worked example: appointment reminders without exposing clinical notes",
        "paragraphs": [
          "In this illustrative clinic, the scheduling system records a patient's appointment time, a contact method and a preference for reminders. A reminder worker should receive only the information necessary to send the notice, not the patient's consultation history. A delivery log should confirm message dispatch without duplicating the complete clinical record.",
          "Create a field-by-field table: field name, source system, purpose, access role, external processor, storage location, retention trigger and deletion owner. A phone number may be needed for delivery but not for an AI classification model. If a field has no defensible purpose, exclude it from the AI workflow.",
          "Test withdrawal and correction. If a patient changes a contact preference, the downstream reminder queue must be updated or canceled. If a processor fails or receives duplicate events, retries must not send confidential content to a previous address. These are hypothetical test cases, not evidence of a deployed NexisHub healthcare system."
        ]
      },
      {
        "title": "Governance gates for actual clinical data",
        "paragraphs": [
          "Assign accountable clinical, privacy, security and engineering owners before access is granted. Establish permissible processing purposes, encryption, role scopes, audit logs, breach response, retention and cross-border transfer rules under the laws relevant to the organization.",
          "Evaluate de-identification carefully. Removing names does not guarantee anonymity when dates, rare conditions and other indirect identifiers remain. Use synthetic or legally approved datasets for early development; a generated dataset should be labelled synthetic, not presented as real patient evidence.",
          "Do not connect AI outputs to clinical decisions without the required expert validation, oversight and clinical safety process. An infrastructure diagram is not clinical approval."
        ]
      }
    ],
    "principles": [
      {
        "title": "Minimize by purpose",
        "detail": "Every included field needs a documented and justified use."
      },
      {
        "title": "Preserve clinical accountability",
        "detail": "Qualified humans control clinical decisions and safety escalation."
      },
      {
        "title": "Isolate each role",
        "detail": "Restrict what administrators, clinicians, processors and developers can retrieve."
      },
      {
        "title": "Plan deletion",
        "detail": "Map retention and correction across logs, queues, backups and vendors."
      }
    ],
    "workflow": [
      {
        "title": "Inventory actual fields",
        "detail": "Map records, classification, source owners, vendors and retention."
      },
      {
        "title": "Document legal and clinical review",
        "detail": "Identify governing requirements and accountable professionals."
      },
      {
        "title": "Prototype using permitted data",
        "detail": "Prefer synthetic or approved minimum necessary datasets."
      },
      {
        "title": "Test controls and exceptions",
        "detail": "Probe wrong-recipient delivery, stale records, authorization and duplicate events."
      }
    ],
    "pitfalls": [
      {
        "title": "Treating de-identified as anonymous",
        "detail": "Combined attributes may still enable re-identification."
      },
      {
        "title": "Copying complete patient files to AI tools",
        "detail": "The task may only justify a small subset of data."
      },
      {
        "title": "Skipping operational ownership",
        "detail": "Correction and deletion fail when downstream processors are forgotten."
      }
    ],
    "measurement": [
      "Audit proportion of fields with documented purpose, number of unauthorized access attempts rejected and end-to-end correction/deletion test results.",
      "Any clinical performance result needs suitable clinical study design and expert review; do not infer safety from technical uptime."
    ],
    "future": "A sustainable health-data architecture puts traceable permissions and patient rights ahead of model selection.",
    "takeaways": [
      "Inventory data before introducing AI.",
      "Use minimal task-specific access.",
      "Keep clinical judgment with qualified professionals.",
      "Test correction and deletion throughout the workflow."
    ],
    "faq": [
      {
        "question": "Can a clinic upload all its records to a model?",
        "answer": "Not without validating lawful purpose, applicable consent or other basis, safeguards, contracts and clinical oversight."
      },
      {
        "question": "Are pseudonymized records automatically safe to share?",
        "answer": "No. Linkability and re-identification risks must be assessed."
      },
      {
        "question": "Is this medical advice?",
        "answer": "No. This is a hypothetical software governance example, not clinical guidance."
      }
    ],
    "references": [
      {
        "label": "WHO ethics and governance of AI for health",
        "url": "https://www.who.int/publications/i/item/9789240029200"
      },
      {
        "label": "NIST AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ]
  },
  {
    "slug": "event-qr-attendance-data",
    "lead": "A QR code is merely a credential pointer. The difficult parts of event check-in are identity, duplicate handling, offline operation, correction and trustworthy attendance reporting.",
    "overview": [
      "Imagine a conference with one thousand booked guests, three entrance scanners and inconsistent mobile connectivity. An event QR token can be replayed, copied or scanned twice. Counting scans as attendees will overstate physical attendance.",
      "The engineering goal is an authoritative check-in transition keyed to a specific registration and event. A scanner should not invent a second visit record each time it retries a network request."
    ],
    "deepDive": [
      {
        "title": "Worked example: duplicate and offline scans",
        "paragraphs": [
          "Define registration states as invited, registered, checked in and revoked, along with legitimate transitions. A signed or random opaque token resolves to the registration server-side. On scan, the service validates the token and authorized event, checks revocation and atomically records the transition. A repeated request returns the already-recorded result rather than adding another attendee.",
          "For connectivity loss, define an explicit offline policy before distributing scanners. One approach queues timestamped scan attempts on a trusted device and shows a tentative status; reconciliation at the server determines the authoritative result when service resumes. Because two gates may scan the same code, the user interface must communicate that offline acceptance is provisional.",
          "Maintain a minimal audit record of event ID, token identifier, device, scan time, validation result and correction reason. Do not store full guest biographies in every QR payload or scanner cache. This scenario is illustrative and does not claim a tested real-world deployment."
        ]
      },
      {
        "title": "What event organizers should measure",
        "paragraphs": [
          "Separate unique checked-in registrations, raw scan attempts, manual overrides, rejected/revoked credentials and unresolved offline scans. A single percentage labelled attendance obscures those differences.",
          "Provide a reconciliation view at closing time. Compare paid or confirmed registrations with unique check-ins and with gate exceptions. Identify missing data and late-arriving scan batches before publishing final totals. Consent and retention obligations apply to attendee records and device logs."
        ]
      }
    ],
    "principles": [
      {
        "title": "Use an authoritative state change",
        "detail": "Count each registration once unless re-entry is explicitly part of the design."
      },
      {
        "title": "Build idempotent scans",
        "detail": "Duplicate requests must not create duplicate attendees."
      },
      {
        "title": "State offline uncertainty",
        "detail": "A scanner cache does not replace server reconciliation."
      },
      {
        "title": "Protect attendee privacy",
        "detail": "Keep tokens opaque and device storage minimal."
      }
    ],
    "workflow": [
      {
        "title": "Specify valid states",
        "detail": "Define issued, active, revoked and checked-in conditions."
      },
      {
        "title": "Design token verification",
        "detail": "Keep identity resolution and authorization on the server."
      },
      {
        "title": "Handle duplicates and conflict",
        "detail": "Test repeated scans and simultaneous gate requests."
      },
      {
        "title": "Reconcile offline batches",
        "detail": "Define provisional UI, secure queues and final reconciliation."
      },
      {
        "title": "Publish auditable totals",
        "detail": "Separate attempts from unique attendance and manual changes."
      }
    ],
    "pitfalls": [
      {
        "title": "Counting scans as people",
        "detail": "Retries and repeated scans inflate attendance."
      },
      {
        "title": "Embedding personal details in the QR",
        "detail": "A screenshot could disclose information beyond the event need."
      },
      {
        "title": "Treating offline accepted as final",
        "detail": "Concurrent gates may have conflicting state until synchronization."
      }
    ],
    "measurement": [
      "Track duplicate rejection, reconciliation latency, unresolved offline rate, manual correction rate and unique checked-in registrations.",
      "Report totals with time ranges and data-coverage limitations."
    ],
    "future": "Event platforms benefit from trustworthy attendance states and recovery mechanisms more than decorative scanning animations.",
    "takeaways": [
      "Tokens represent registrations, not proof of physical attendance.",
      "Idempotency prevents duplicated check-ins.",
      "Offline events need clear provisional states.",
      "Reconcile before publishing attendance numbers."
    ],
    "faq": [
      {
        "question": "Is a QR code alone secure?",
        "answer": "No. Its token must be validated and scoped with revocation and replay handling."
      },
      {
        "question": "Can two gates operate offline safely?",
        "answer": "They can operate provisionally, but conflicts need an explicit synchronization and correction process."
      },
      {
        "question": "Should attendance equal total scans?",
        "answer": "No. Count unique valid registrations and report scanning exceptions separately."
      }
    ],
    "references": [
      {
        "label": "OWASP API Security Top 10",
        "url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
      },
      {
        "label": "W3C Web Content Accessibility Guidelines",
        "url": "https://www.w3.org/TR/WCAG22/"
      }
    ]
  },
  {
    "slug": "technical-content-maintenance-guide",
    "lead": "A technical article begins aging on publication day. Keeping it useful requires source checks, code execution where safe, owner accountability and visible correction records.",
    "overview": [
      "A release note may become stale after a platform changes a command, an API is deprecated or a configuration default shifts. Readers should know what was tested, when and against which version.",
      "The goal is not to refresh the date while leaving the substance untouched. Use an editorial maintenance register tied to every article's evidence and change risk."
    ],
    "deepDive": [
      {
        "title": "Worked example: revisiting a deployment tutorial",
        "paragraphs": [
          "Suppose a guide published in July shows a Next.js deployment command. A new Vercel CLI release changes the default behavior. First check current official documentation and reproduce the tutorial in an isolated test project. Preserve a link to the older version, then explain what changed in the command, expected output and affected environments.",
          "NexisHub's October deployment investigation illustrates why this matters. A compiled build failed at output packaging, and subsequent trials distinguished missing generated Prisma artifacts from a tracing-root issue. A responsible guide would preserve the exact error, which stages passed, the conditions under which the change helped, and the runtime checks that were still unverified.",
          "When updating, change `updatedDate` only for material reviewed changes. Keep a revision note with commit, reviewer, evidence and a concise explanation. Ensure linked screenshots and third-party references still describe the current interface."
        ]
      },
      {
        "title": "A lightweight evidence register",
        "paragraphs": [
          "Give each article a stable ID, audience, technical owner, last verified version, source URLs, confidence boundary, link-check date and next review trigger. Flag time-sensitive claims such as prices, feature availability, legal requirements and API versions for more frequent review.",
          "Use a queue with categories: retain, targeted revise, merge with stronger canonical, hold from index pending review, or retire with a suitable redirect. An automated word count cannot decide which category an article belongs in: the decision depends on unique utility and relevance to real user queries.",
          "Avoid changing dozens of pages in a single invisible rewrite. Track small batches and compare links, metadata, reading quality and actual examples after each batch."
        ]
      }
    ],
    "principles": [
      {
        "title": "Verify before changing dates",
        "detail": "A fresh timestamp must correspond to a meaningful review."
      },
      {
        "title": "Retain reproducible evidence",
        "detail": "Preserve test versions, links and failure outputs."
      },
      {
        "title": "Prefer an accountable owner",
        "detail": "Each page needs a person who can approve corrections."
      },
      {
        "title": "Preserve navigation history",
        "detail": "Consolidations require redirect and internal-link checks."
      }
    ],
    "workflow": [
      {
        "title": "List articles and ownership",
        "detail": "Record topic, author, date and references."
      },
      {
        "title": "Identify volatility",
        "detail": "Mark release commands, pricing, policies and versions as time-sensitive."
      },
      {
        "title": "Recheck evidence",
        "detail": "Execute safe examples and inspect official sources."
      },
      {
        "title": "Choose retain, revise or consolidate",
        "detail": "Base editorial action on usefulness, not length."
      },
      {
        "title": "Publish transparent updates",
        "detail": "Record what changed and validate redirects, canonicals and sitemap."
      }
    ],
    "pitfalls": [
      {
        "title": "Changing only the update date",
        "detail": "It suggests freshness without validating technical accuracy."
      },
      {
        "title": "Replacing examples with generic prose",
        "detail": "More words can produce less practical usefulness."
      },
      {
        "title": "Deleting URLs indiscriminately",
        "detail": "Unmanaged consolidation can break useful incoming links."
      }
    ],
    "measurement": [
      "Track pages with verified source dates, broken authoritative links, unresolved corrections and repeated boilerplate across article clusters.",
      "Sample live pages to confirm substantive examples and correct navigation after updates."
    ],
    "future": "Maintained technical publishing requires a versioned content workflow, not a continuous stream of unreviewed generated copy.",
    "takeaways": [
      "Every technical claim has a review trigger.",
      "Updating dates is not remediation.",
      "Preserve redirects and provenance when consolidating.",
      "Useful examples matter more than publication volume."
    ],
    "faq": [
      {
        "question": "How often should an article be reviewed?",
        "answer": "Set cadence based on volatility; command tutorials need review when dependencies change, while stable concepts can be reviewed less often."
      },
      {
        "question": "Should weak articles always be deleted?",
        "answer": "No. Revise, consolidate or remove only after examining their unique purpose, demand and incoming links."
      },
      {
        "question": "Does refreshing the published date improve AdSense approval?",
        "answer": "No. Genuine usefulness and policy compliance cannot be established by changing dates."
      }
    ],
    "references": [
      {
        "label": "Google Search creating helpful content",
        "url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
      },
      {
        "label": "Google Search redirects",
        "url": "https://developers.google.com/search/docs/crawling-indexing/301-redirects"
      }
    ]
  },
  {
    "slug": "nextjs-typescript-structured-blog",
    "lead": "A structured blog in Next.js is a content pipeline: an article registry, type-safe metadata, a route renderer, canonical URLs and one shared source for sitemap and feeds.",
    "overview": [
      "NexisHub itself uses a TypeScript post registry with slug, title, summary, author, publication and review dates, tags, canonical path, status and related articles. Dynamic routes generate pages from records and share a guide body renderer. That architecture reduces duplicate route logic but does not guarantee unique editorial substance.",
      "The implementation lesson is to keep reliable content plumbing separate from what makes each article worth reading. A route can be type-safe, indexed and still repetitive."
    ],
    "deepDive": [
      {
        "title": "Design a record with explicit publication state",
        "paragraphs": [
          "Define an article interface with unique slug, descriptive title, source-of-truth body, author, publishedAt, materially reviewedAt, summary, canonical path, references and published/draft status. Derive feed and sitemap entries from the same published-only collection. Reject duplicate slugs in tests.",
          "NexisHub's registry also stores difficulty, search intent, featured-image alt text and related slugs. These fields support navigation and metadata, but they should not become a reason to generate the same paragraphs for distinct subjects. A field guide on QR attendance needs validation and idempotency examples; a guide on AI memory needs provenance and deletion examples.",
          "Use a single route template with topic-specific content bodies. At `/blog/[slug]`, return notFound for an unknown or unpublished slug, generate static params from published records and emit the same visible title used in metadata. This example describes source architecture rather than reproducing a fully runnable new application."
        ]
      },
      {
        "title": "Test the publication contract",
        "paragraphs": [
          "Create build-time checks for unique slugs, matching guide bodies, valid internal relatedSlugs, safe publication states and canonical URL structure. Confirm that draft content does not enter the sitemap or RSS. Use automated link checks for declared official references when feasible.",
          "After deploying, fetch the actual canonical host, not only a temporary Preview alias. During NexisHub's October release, the AdSense-submitted hostname was still pinned to an older deployment after the new Production build was ready; the newest article URL returned 404 on that host. Updating the Vercel alias and rechecking the sitemap corrected the mismatch.",
          "Test for meaningful differences between articles, not merely unique metadata. Repeated generic intros and shared FAQs are evidence that a content generator may be publishing page shells rather than genuine field guides."
        ]
      }
    ],
    "principles": [
      {
        "title": "Use a typed publication model",
        "detail": "Prevent missing metadata and duplicate slugs with type checks and tests."
      },
      {
        "title": "Keep content independent of template",
        "detail": "Shared layouts are helpful; identical advice on unrelated topics is not."
      },
      {
        "title": "Generate discovery files from one registry",
        "detail": "Sitemap and feeds should not drift from the content collection."
      },
      {
        "title": "Verify the canonical domain",
        "detail": "A READY deployment does not prove the public alias serves the same release."
      }
    ],
    "workflow": [
      {
        "title": "Define article types",
        "detail": "Include metadata, status and relationships."
      },
      {
        "title": "Implement route lookup",
        "detail": "Use published-only params and notFound for unknown slugs."
      },
      {
        "title": "Derive schema, sitemap and feed",
        "detail": "Keep URL, dates and author data consistent."
      },
      {
        "title": "Add editorial validation",
        "detail": "Test duplicate routes, stale references and generic-copy repetition."
      },
      {
        "title": "Smoke test the live hostname",
        "detail": "Verify actual article, canonical, image and sitemap URLs."
      }
    ],
    "pitfalls": [
      {
        "title": "Publishing empty templates",
        "detail": "Metadata can be complete while the page lacks useful examples."
      },
      {
        "title": "Claiming dynamic success from compilation",
        "detail": "Production hostname mapping and routes must be verified."
      },
      {
        "title": "Inconsistent canonical paths",
        "detail": "Feeds, maps and pages can point to different hosts."
      }
    ],
    "measurement": [
      "Count valid published records and matching guide bodies, broken related links, canonical mismatches and stale sources.",
      "Use page-level editorial review for uniqueness and meaningful examples; code linting cannot prove helpfulness."
    ],
    "future": "The best content architecture keeps delivery reliable while maintaining human editorial accountability for the actual article.",
    "takeaways": [
      "A type-safe content system is not an editorial-quality guarantee.",
      "Derive all publication surfaces from one registry.",
      "Keep article bodies genuinely topic-specific.",
      "Verify the actual canonical domain after release."
    ],
    "faq": [
      {
        "question": "Should every blog article have a separate page component?",
        "answer": "Not necessarily. One shared renderer can serve unique, reviewed bodies from a structured registry."
      },
      {
        "question": "Can a sitemap certify content quality?",
        "answer": "No. It lists discoverable URLs, not whether each page is useful."
      },
      {
        "question": "What is the most important release test?",
        "answer": "Fetch the published URL and verify content, canonical and metadata on the hostname users actually visit."
      }
    ],
    "references": [
      {
        "label": "Next.js dynamic routes",
        "url": "https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes"
      },
      {
        "label": "Google Search sitemap guidance",
        "url": "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview"
      }
    ]
  }
];
