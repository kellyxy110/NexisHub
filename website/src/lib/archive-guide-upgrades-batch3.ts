import type { VisibilityGuide } from "@/lib/visibility-content";

// Topic-specific editorial replacements for previously seed-generated pages.
// All hypothetical cases are explicitly labelled; deployment incidents are documented NexisHub observations.
export const archiveGuideUpgradesBatch3: readonly VisibilityGuide[] = [
  {
    "slug": "maintainable-frontend-systems",
    "lead": "A maintainable frontend is one that another engineer can change without first reverse-engineering its assumptions. The test is not whether the component tree looks elegant. It is whether a new requirement can be implemented, tested, observed and reversed safely.",
    "overview": [
      "Consider a product website that begins with a handful of pages and grows into editorial guides, dashboards, authentication and multiple product surfaces. If all page-specific behavior is hidden in shared components, a small change to a navigation item can break unrelated experiences. If every page invents a separate design system, defects become expensive to fix consistently.",
      "Architecture should make ownership and behavior visible. Separate content data from presentation, keep server and client responsibilities intentional, and make exceptions explicit. Reuse should reduce duplicated rules without forcing unlike experiences into one abstraction."
    ],
    "deepDive": [
      {
        "title": "Worked example: an editorial catalog whose pages share too much",
        "paragraphs": [
          "NexisHub's editorial source contains a useful cautionary case. The repository uses a seed-based archive in which a single generator supplies structure for many topics. That made publication and sitemap integration straightforward, but it also caused distinct articles to repeat opening language, generic workflows and nearly identical FAQs. The mechanism was efficient for code maintenance yet weak for editorial differentiation.",
          "The corrective approach separates the data registry from authored guide bodies. Slugs, categories, canonical paths and metadata can remain in the shared catalog, while articles that deserve publication receive distinct, reviewed content objects. The existing site demonstrates this direction through explicit guide-upgrade modules which take precedence over the template-derived fallback. The important boundary is that shared rendering does not require shared reasoning.",
          "A regression test for this design should verify that each upgraded slug resolves to its authored guide, that the sitemap retains its intended URL, and that unrelated slugs still render. An editorial review should separately check whether each page offers meaningful subject-specific material. TypeScript compilation cannot tell whether two articles say the same thing."
        ]
      },
      {
        "title": "Component boundaries in a practical Next.js application",
        "paragraphs": [
          "Let the server page own metadata, data access and the route contract. Keep interactive browser state in a small client component with explicit inputs and callbacks. For example, a consent control owns the visitor's local choice; an analytics sender checks that choice before each event; an advertising integration must independently respect the vendor's applicable consent requirements. Combining all three responsibilities into one opaque module makes testing harder.",
          "Use shared components for stable invariants such as typography, link behavior and navigation semantics. Keep domain-specific workflows close to their domain. An administrator session check is not a general-purpose UI hook, and a blog renderer should not be allowed to silently change authorization or data retention policy.",
          "When a shared component changes, identify its consumers before editing. Use typechecks and component tests for repeatable rules, then test keyboard behavior and real navigation on a protected Preview. A deploy marked READY only proves the artifact reached the host. It does not establish that every client-side interaction works."
        ]
      },
      {
        "title": "A change-impact worksheet",
        "paragraphs": [
          "Suppose a request arrives to add a new published guide. Record the paths and contracts involved: article record, guide body, generated metadata, feed, sitemap, Open Graph image, blog archive, related links and indexing. Write the expected output for each, including the difference between a published and a draft record.",
          "Now consider a change to a global footer. The affected surface is much broader: legal pages, article pages, mobile layouts, cookie choices and keyboard focus. It needs an explicit accessibility pass and a rollback plan. A small diff can still have a large behavioral radius.",
          "Review maintainability with change lead time, escaped regressions, module ownership clarity, test execution cost and the number of consumers unexpectedly affected by ordinary changes. These measures are more diagnostic than an arbitrary count of files or components."
        ]
      }
    ],
    "principles": [
      {
        "title": "Share rules, not vague prose",
        "detail": "Centralize stable interface contracts and metadata conventions while giving distinct article and workflow content distinct ownership."
      },
      {
        "title": "Keep dependencies directional",
        "detail": "Route modules depend on domain and shared libraries; lower-level utilities should not import whole pages or privileged UI modules."
      },
      {
        "title": "Make failure states visible",
        "detail": "Empty data, unauthorized requests, network failures and missing configuration need intentional behavior and tests."
      },
      {
        "title": "Preserve evidence through change",
        "detail": "Tie source modifications to a commit, Preview output, relevant tests and an explicit rollback point."
      }
    ],
    "workflow": [
      {
        "title": "Map modules and consumers",
        "detail": "Identify route, component, content and infrastructure boundaries before editing a shared abstraction."
      },
      {
        "title": "Select one real change scenario",
        "detail": "Write the smallest modification a future maintainer should be able to make safely."
      },
      {
        "title": "Define observable behavior",
        "detail": "Record screen outputs, metadata, network calls, authorization checks and relevant failure paths."
      },
      {
        "title": "Refactor without rewriting unrelated domains",
        "detail": "Introduce a narrow interface or source-of-truth module, preserving existing contracts."
      },
      {
        "title": "Test and review",
        "detail": "Run static checks and automated tests, then verify affected pages and keyboard interactions in Preview."
      }
    ],
    "pitfalls": [
      {
        "title": "The mega-component",
        "detail": "A component that renders, fetches, authorizes, tracks and controls policy hides the behavior that needs independent verification."
      },
      {
        "title": "A template mistaken for unique content",
        "detail": "A consistent article renderer is helpful; automatically filling dozens of articles with interchangeable prose is not an editorial strategy."
      },
      {
        "title": "Green tests with the wrong runtime",
        "detail": "CI can succeed under different Node versions or with generated files that a deployment never creates. Align and test the actual release path."
      }
    ],
    "measurement": [
      "Record the changed module, dependent routes, intended behavior and independent checks for each release. Pay particular attention to changes spanning consent, authentication, the content index and deployment configuration.",
      "Conduct occasional maintenance drills: change a shared footer link, add an editorial entry, roll back a problematic component. Observe which parts require context not captured in code or documentation."
    ],
    "future": "Frontend frameworks and component libraries will change. Clear ownership, explicit interfaces, reproducible builds, accessibility and truthful content models remain useful even when the rendering technology changes.",
    "takeaways": [
      "Maintainability is the ability to make a safe change, not a component-count target.",
      "Shared rendering can coexist with original, differentiated content.",
      "Test the blast radius of shared changes.",
      "Record the actual release environment and verification evidence."
    ],
    "faq": [
      {
        "question": "Should every page use the same template?",
        "answer": "Reuse stable layout and accessibility conventions, but do not replace page-specific explanation or workflows with interchangeable content."
      },
      {
        "question": "How do I choose a component boundary?",
        "answer": "Start with responsibilities that can change independently and need separate tests or permissions."
      },
      {
        "question": "Does TypeScript prove the architecture is maintainable?",
        "answer": "No. It can detect important contract errors, but change safety also depends on module boundaries, tests, documentation and real workflow review."
      }
    ],
    "references": [
      {
        "label": "React: Choosing the State Structure",
        "url": "https://react.dev/learn/choosing-the-state-structure"
      },
      {
        "label": "Next.js: Server and Client Components",
        "url": "https://nextjs.org/docs/app/getting-started/server-and-client-components"
      },
      {
        "label": "W3C WCAG 2.2",
        "url": "https://www.w3.org/TR/WCAG22/"
      }
    ]
  },
  {
    "slug": "secure-ai-application-deployment",
    "lead": "An AI application can respond correctly to a prompt and still be unsafe to deploy. The security boundary covers identities, secrets, retrieved documents, tool permissions, webhook verification, model output and recovery after failure.",
    "overview": [
      "Security starts by distinguishing what a model may suggest from what the application is authorized to do. A model-generated instruction is not an authenticated user request, a retrieved document is not a trusted command, and a plausible explanation is not evidence that a financial or administrative operation succeeded.",
      "Design the deployment around explicit capabilities. Read-only analysis, publishing, customer-data access and transactions need separate permissions and audit trails. The model should receive the minimum context and tools needed for the task."
    ],
    "deepDive": [
      {
        "title": "Threat walkthrough: retrieved text asks the assistant to act",
        "paragraphs": [
          "Imagine an assistant retrieves a web page that contains a legitimate product description alongside an instruction to email a private customer list to an unrelated address. That instruction belongs to the untrusted document. It must not change the assistant's authority or become a tool command. This is an illustrative adversarial scenario, not a report of an attack on NexisHub.",
          "The correct boundary is enforced outside model text: retrieval returns source-labelled content; tools enforce authenticated user identity, allowed actions and resource ownership; high-risk operations require explicit user confirmation and server-side validation. A refusal by the model may be helpful, but the system must remain safe when the model makes a mistake.",
          "Test with malicious instructions embedded in documents, search snippets and filenames. The expected result is that the content can be summarized as data if appropriate, but no unauthorized external calls, secret disclosure, permission changes or privileged writes occur."
        ]
      },
      {
        "title": "Threat walkthrough: a delayed or duplicated webhook",
        "paragraphs": [
          "An AI-assisted workflow may include payment or subscription status, but a model should never decide that a payment succeeded from conversational text. The authoritative state comes from a verified provider event or server-side confirmation. Webhook signatures must be checked against the raw request, and an event identifier should be processed idempotently.",
          "Run the same valid event twice, deliver an older event after a newer one, and simulate failure between persistence and acknowledgement. The database must not double-credit an account or regress to a stale state. NexisHub's company website currently presents a catalog rather than a verified checkout flow, so this is a future-system design pattern rather than a claim that an existing payment feature was tested.",
          "Keep an immutable operational record and a reconciliation procedure. Separating the official transaction state from AI memory prevents a persuasive but inaccurate model response from becoming a financial record."
        ]
      },
      {
        "title": "Deployment controls learned from NexisHub's release investigation",
        "paragraphs": [
          "During NexisHub's 2026 Preview validation, an administrative endpoint returned a server error because its authentication signing secret was absent. An isolated Preview-only secret fixed the session initialization while preserving the separate Production secret. The endpoint then redirected an unauthenticated visitor to the sign-in page instead of granting access.",
          "This established only a narrow authentication behavior, not that every privileged workflow was safe. The admin feature flags also required explicit readiness conditions. A responsible release should test authorization and deny-by-default behavior, inspect relevant runtime logs and document which database or privileged operations were intentionally not executed.",
          "Similarly, a successful production compile does not establish a successful deploy. Review the output packaging stage and smoke-test representative static, dynamic and protected routes. Do not disable Preview protection or copy Production credentials into an experiment simply to force a test to pass."
        ]
      },
      {
        "title": "A deployable security acceptance matrix",
        "paragraphs": [
          "Define a role/resource/action table before deployment. Include anonymous visitors, normal users, support operators and administrators, with explicit deny cases for cross-tenant content. For each write-capable tool, record authentication, authorization, input validation, rate limits, audit events and idempotency where relevant.",
          "Verify that prompt-injection text cannot expand privileges; that secrets are not present in browser bundles, logs or model prompts; that file uploads and retrieval respect tenant boundaries; and that failure recovery is safe when the model, network or database times out.",
          "Evidence should include test names, environment, commit SHA, observed requests and authorization decisions. A list of installed guardrail packages is not a substitute for an adversarial test record."
        ]
      }
    ],
    "principles": [
      {
        "title": "Authorization outside the prompt",
        "detail": "Enforce permissions in trusted server code for every tool and data source."
      },
      {
        "title": "Treat retrieved content as untrusted",
        "detail": "A passage may provide information but cannot grant authority or override the user's task."
      },
      {
        "title": "Transactions require authoritative records",
        "detail": "Verify provider state and idempotency rather than trusting generated explanations."
      },
      {
        "title": "Environment isolation by default",
        "detail": "Use separate Preview and Production secrets, access gates and data permissions."
      }
    ],
    "workflow": [
      {
        "title": "Inventory sensitive assets",
        "detail": "Map secrets, customer records, tool credentials, transactions and audit logs."
      },
      {
        "title": "Define capability scopes",
        "detail": "Classify tools as read-only, privileged write or externally consequential."
      },
      {
        "title": "Review trust boundaries",
        "detail": "Separate user input, retrieved documents, model output and server-authorized actions."
      },
      {
        "title": "Implement trusted checks",
        "detail": "Add authentication, resource authorization, validation, webhook verification and rate limits."
      },
      {
        "title": "Exercise adversarial cases",
        "detail": "Test injection, cross-tenant retrieval, retries, duplicate events, forged requests and partial failures."
      },
      {
        "title": "Validate the release",
        "detail": "Inspect secrets handling, runtime logs, protected-route behavior and rollback."
      }
    ],
    "pitfalls": [
      {
        "title": "Prompt-only security",
        "detail": "A model instruction is not a replacement for server-side access control."
      },
      {
        "title": "Reusing Production secrets in Preview",
        "detail": "An experiment then inherits privileges and incidents can cross environment boundaries."
      },
      {
        "title": "Assuming guardrail libraries settle the problem",
        "detail": "Guardrails can help, but only tested security boundaries demonstrate control."
      }
    ],
    "measurement": [
      "Record the number and severity of successfully blocked unauthorized requests, known bypasses, secret-handling findings and unverified privileged paths. Treat each remediation as a retestable control.",
      "Report attack-test coverage by trust boundary and allowed action. A denial that exists only in a text response does not prove that the underlying API rejected the request."
    ],
    "future": "Agent systems will use more external tools, increasing the importance of fine-grained server permissions, source provenance and deterministic recovery. Clear authority boundaries should remain stable as models change.",
    "takeaways": [
      "The model does not own permissions.",
      "Untrusted retrieval must never become a privileged command.",
      "Webhooks and financial state demand verified, idempotent processing.",
      "Test environment isolation and unauthorized paths before release."
    ],
    "faq": [
      {
        "question": "Will a prompt-injection filter make an AI agent secure?",
        "answer": "No. It may catch some suspicious content, but access and action restrictions must be enforced by trusted code."
      },
      {
        "question": "Can an AI agent mark a payment complete?",
        "answer": "It can report verified state, but transaction state must originate from authoritative, validated business systems."
      },
      {
        "question": "How should Preview handle authentication?",
        "answer": "Use isolated secrets and deny-by-default permissions. Test the intended redirects and avoid exposing Production credentials."
      }
    ],
    "references": [
      {
        "label": "OWASP Top 10 for LLM Applications",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      },
      {
        "label": "OWASP API Security Top 10",
        "url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
      },
      {
        "label": "Next.js security guidance",
        "url": "https://nextjs.org/docs/app/guides/data-security"
      }
    ]
  }
];
