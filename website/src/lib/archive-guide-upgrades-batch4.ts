import type { VisibilityGuide } from "@/lib/visibility-content";

// Independently reviewed developer guides based on the NexisHub source implementation.
export const archiveGuideUpgradesBatch4: readonly VisibilityGuide[] = [
  {
    "slug": "jsonld-metadata-nextjs",
    "lead": "Structured data is a description of a page, not a substitute for the page. An article can have valid JSON-LD and still be inaccurate, unhelpful, or ineligible for an enhanced search appearance.",
    "overview": [
      "In a Next.js App Router site, use the same reviewed content record to generate visible article details, HTML metadata and JSON-LD. This prevents a headline changing in the page while a copied schema block silently keeps the old title.",
      "NexisHub's article renderer already constructs TechArticle, BreadcrumbList and FAQPage objects from its post registry and guide record. The approach is maintainable, but the markup must still be checked against what a visitor can read and what Google's current feature documentation permits."
    ],
    "deepDive": [
      {
        "title": "Worked example: one article record, three descriptions",
        "paragraphs": [
          "Suppose a field guide is published under `/blog/website-launch-readiness-evidence`. Its canonicalPath, title, description, publishedDate and updatedDate are recorded in the editorial registry. The route's `generateMetadata` supplies an HTML title, description, canonical URL and Open Graph article values. The rendered article also publishes a TechArticle object that uses those same fields. Changing the date in only one layer would create inconsistent evidence.",
          "The breadcrumb object contains Home, Blog and the current article, with increasing positions and absolute URLs. This is only truthful when the visible navigation and route exist. The FAQ object is generated from the guide's questions, but correct syntax alone does not ensure that a search provider will show an FAQ result. Google's eligibility and display policies are separate from Schema.org vocabulary support."
        ]
      },
      {
        "title": "Implementation pattern and encoding boundary",
        "paragraphs": [
          "In the reviewed NexisHub source, the article route creates JSON strings with `JSON.stringify(value).replace(/</g, '\\\\u003c')` before embedding them in `application/ld+json` script elements. This escapes HTML-opening characters that could otherwise disrupt a script element. Verify the exact escaping semantics in tests and avoid passing unreviewed HTML as a schema value.",
          "A reusable schema function should accept a typed article record rather than scrape text from rendered markup. It should enforce absolute production-domain URLs, reasonable publication dates, and author attribution that matches the public byline. Preview domains should not accidentally be written as the canonical identity."
        ]
      },
      {
        "title": "Validate meaning and feature claims separately",
        "paragraphs": [
          "First parse the rendered HTML and locate every `application/ld+json` block. Require valid JSON, plausible `@context` and `@type`, a stable `mainEntityOfPage`, and article URLs that match the actual canonical. Then review the visible title, author, dates and FAQ questions against the data in those blocks.",
          "Use Google's rich-results testing tools only to investigate supported feature eligibility, not as an overall content-quality score. A field may be valid Schema.org yet not produce a rich result; a valid rich-results test cannot prove a page deserves search visibility or AdSense approval."
        ]
      }
    ],
    "principles": [
      {
        "title": "One content source",
        "detail": "Derive semantic markup and metadata from reviewed article records rather than maintaining parallel copies."
      },
      {
        "title": "Visible parity",
        "detail": "Ensure author, dates, title, questions and claims agree with what visitors can inspect."
      },
      {
        "title": "Safe output",
        "detail": "Serialize JSON-LD carefully when injecting it into HTML."
      },
      {
        "title": "No feature guarantees",
        "detail": "Separate syntactic validity from search-provider eligibility and editorial usefulness."
      }
    ],
    "workflow": [
      {
        "title": "Inspect the page record",
        "detail": "Identify its intended canonical, author, publication and modification times, primary subject and any visible FAQ."
      },
      {
        "title": "Generate typed objects",
        "detail": "Create Article or TechArticle and BreadcrumbList properties from a single typed record."
      },
      {
        "title": "Serialize safely",
        "detail": "Escape characters that could interfere with HTML script parsing and emit application/ld+json."
      },
      {
        "title": "Compare rendered and structured values",
        "detail": "Parse the production HTML, validate URLs, and reconcile every claim with visible content."
      },
      {
        "title": "Review maintenance risks",
        "detail": "Add regression checks for canonical changes, missing fields, duplicated schemas and invalid dates."
      }
    ],
    "pitfalls": [
      {
        "title": "Schema as a ranking trick",
        "detail": "Markup documents an entity or claim; it cannot manufacture trust or guarantee selection."
      },
      {
        "title": "Unmatched FAQ",
        "detail": "Questions in schema need a meaningful visible equivalent and should comply with current provider policies."
      },
      {
        "title": "Wrong hostname",
        "detail": "An old deployment alias or preview base URL can create conflicting canonical identities."
      }
    ],
    "measurement": [
      "Count validated JSON-LD objects and visible/structured parity errors by URL, storing the exact deployment and test date.",
      "Track Search Console enhancement reports where applicable, but do not confuse those reports with proof of search placement or business outcomes."
    ],
    "future": "As search formats change, maintain a small typed schema layer with clear ownership instead of coupling publishing success to any particular enhanced display.",
    "takeaways": [
      "Use one authoritative article record.",
      "Keep schemas aligned with visible copy.",
      "Use production canonical URLs.",
      "Test HTML parsing and escaping.",
      "Treat external search eligibility as an independent outcome."
    ],
    "faq": [
      {
        "question": "Will valid JSON-LD make Google rank an article?",
        "answer": "No. Structured data may help interpretation and eligibility for particular presentations, but it does not guarantee indexing, rankings or rich results."
      },
      {
        "question": "Should every page have FAQPage schema?",
        "answer": "No. Markup should fit actual visible content and current search-provider guidelines."
      },
      {
        "question": "How should a Next.js team avoid schema drift?",
        "answer": "Derive metadata, bylines, canonical URLs and JSON-LD from one reviewed source with consistency tests."
      }
    ],
    "references": [
      {
        "label": "Google Search structured data introduction",
        "url": "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
      },
      {
        "label": "Schema.org TechArticle vocabulary",
        "url": "https://schema.org/TechArticle"
      },
      {
        "label": "Next.js metadata and OG images",
        "url": "https://nextjs.org/docs/app/getting-started/metadata-and-og-images"
      }
    ]
  },
  {
    "slug": "secure-nextjs-contact-form",
    "lead": "A contact form is not reliable because its submit button responds. Its input handling, delivery configuration, abuse controls and user-facing success state must agree about whether a message was received.",
    "overview": [
      "NexisHub's public Contact form deliberately disables submission unless `NEXT_PUBLIC_FORMS_ENABLED` is true. The server route separately returns a 503 when `FORM_WEBHOOK_URL` is absent. These are distinct safeguards: the browser flag shapes the user experience; the server configuration controls whether the message can actually be forwarded.",
      "A visitor should never see a success message for an undelivered message. The operator also needs a real response channel when the form is disabled. NexisHub currently publishes a direct owner-supplied email, while operational delivery and the legal-notice process remain independently unverified."
    ],
    "deepDive": [
      {
        "title": "Source inspection: what the handler really does",
        "paragraphs": [
          "The reviewed `/api/contact` route parses a JSON payload and checks input lengths. It requires a trimmed name of at most 100 characters, a plausible email of at most 200 characters, and a message between 10 and 3000 characters. Ordinary enquiries must use an allowed topic. Studio enquiries have additional required company, service and timeline fields, with bounded optional URLs and risk-context values.",
          "The handler checks an unused `companyWebsite` honeypot field and returns a successful-looking response for that field. This may reduce basic bot noise, but a honeypot cannot replace request-rate limiting, abuse monitoring, server authorization where needed or evidence that delivery happened. The current source does not by itself establish those protections.",
          "If the configured webhook is unavailable, the route returns 503. An upstream non-OK response becomes 502; successful forwarding returns `{ ok: true }`. That response proves the downstream endpoint accepted the HTTP request, not that a human received, read or acted on the message. The UI distinguishes sending, sent and error states and provides a disabled-form notice."
        ]
      },
      {
        "title": "Threat-model a contact form before turning it on",
        "paragraphs": [
          "An attacker may send oversized payloads, repeated requests, invalid enum values or content designed to attack the receiving webhook or its downstream consumers. The server must validate every field regardless of browser controls. Rate limiting, abuse detection, downstream sanitization and stable error handling should be reviewed against realistic traffic and cost constraints.",
          "Never expose `FORM_WEBHOOK_TOKEN` to the client. The handler reads its token from the server environment and sends it only in the outbound request to the configured endpoint. The service also needs a controlled provider allowlist, delivery retry policy and privacy review so webhook failures do not silently lose messages.",
          "In testing, use a local mock endpoint or designated test inbox. Do not submit personal information to an unknown live endpoint, and do not enable Production delivery as a side effect of inspecting UI behaviour."
        ]
      },
      {
        "title": "A finite acceptance matrix",
        "paragraphs": [
          "Check an empty payload, malformed email, message shorter than 10 characters, invalid topic, oversized message, valid ordinary enquiry, valid Studio enquiry, missing webhook configuration, upstream 4xx/5xx, network timeout and repeated submission. Assertions must include both HTTP status and the UI message, not only one side.",
          "When delivery is enabled, verify with a designated test payload that the destination receives the correct fields exactly once, that duplicate retries are handled safely, and that failures produce a comprehensible response. Add a privacy notice that correctly describes the configured processors, retention and support channel. If those operational facts are missing, keep the form disabled and provide a working alternative contact path."
        ]
      }
    ],
    "principles": [
      {
        "title": "Server validates independently",
        "detail": "Browser required fields and disabled states are not a security boundary."
      },
      {
        "title": "Keep secrets on the server",
        "detail": "Webhook tokens belong in server-only environment configuration."
      },
      {
        "title": "Never invent successful delivery",
        "detail": "Distinguish HTTP acceptance by a provider from confirmed delivery and human response."
      },
      {
        "title": "Fail clearly",
        "detail": "A disabled or misconfigured channel should surface an understandable alternative."
      }
    ],
    "workflow": [
      {
        "title": "Inventory submitted data",
        "detail": "Name each accepted field, allowed value, length, purpose and downstream processor."
      },
      {
        "title": "Test validation",
        "detail": "Cover invalid JSON, missing required values, long strings and unexpected enum values."
      },
      {
        "title": "Simulate provider failure",
        "detail": "Test missing configuration, provider rejection and timeout without contacting Production."
      },
      {
        "title": "Check abuse and privacy controls",
        "detail": "Review rate limits, secret scope, logging redaction, retention and user notice."
      },
      {
        "title": "Enable only with acceptance evidence",
        "detail": "Confirm a controlled end-to-end test reaches the intended inbox and can be answered."
      }
    ],
    "pitfalls": [
      {
        "title": "Trusting disabled browser UI",
        "detail": "An attacker can call API routes without using the site's form."
      },
      {
        "title": "Success on webhook acceptance",
        "detail": "A 2xx provider response is not proof that a real operator can receive or handle messages."
      },
      {
        "title": "Calling a honeypot complete security",
        "detail": "It may catch simple bots but does not address sustained abuse or downstream injection."
      }
    ],
    "measurement": [
      "Measure request rejection by cause, successful forwards, downstream delivery failures and human response times only after permitted collection is established.",
      "Record the exact test endpoint, payload classification, expected HTTP status and observed outcome. Avoid storing actual visitor messages in debug logs."
    ],
    "future": "A mature contact channel needs operational ownership, failure recovery and tested escalation paths as much as it needs validation.",
    "takeaways": [
      "Treat public forms as server API surfaces.",
      "Keep delivery secrets off the client.",
      "Separate validation, forwarding and confirmed reception.",
      "Test negative paths with fixtures.",
      "Do not enable a channel whose owner cannot reliably receive it."
    ],
    "faq": [
      {
        "question": "Is client-side validation enough?",
        "answer": "No. Every input must be validated at the server boundary because API calls can bypass the browser."
      },
      {
        "question": "Does a honeypot prevent all spam?",
        "answer": "No. It is one friction mechanism and requires complementary abuse controls."
      },
      {
        "question": "Should an unconfigured form still accept messages?",
        "answer": "No. It should fail clearly and provide a verified alternative contact method until delivery is ready."
      }
    ],
    "references": [
      {
        "label": "OWASP Input Validation Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
      },
      {
        "label": "OWASP API Security Top 10",
        "url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
      },
      {
        "label": "Next.js Route Handlers",
        "url": "https://nextjs.org/docs/app/getting-started/route-handlers"
      }
    ]
  }
];
