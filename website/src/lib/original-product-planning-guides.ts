import type { VisibilityGuide } from "@/lib/visibility-content";

// Distinct, original editorial guides replacing generic seed-generated bodies.
// Examples explicitly distinguish observed NexisHub incidents from illustrative designs.
export const originalProductPlanningGuides: readonly VisibilityGuide[] = [
  {
    "slug": "planning-an-ai-product",
    "lead": "An AI feature is worth building only when a specific user decision improves enough to justify the cost, uncertainty, and operating obligations. Product planning begins with that decision, not a model catalogue.",
    "overview": [
      "Start with the job a person cannot complete reliably today. For a website intelligence product, that job might be deciding which three technical fixes should happen next, rather than receiving yet another score. The planned experience must connect a finding to inspectable evidence, a proposed action, and the owner's decision.",
      "In NexisHub's SiteNexis work, an Intelligence Report and an operational Fix Plan are different promises: the report gathers and explains evidence, while a plan must prioritize tasks and mark what is inferred, verified, or awaiting recheck. This illustrates a real architecture boundary, not a claim that every module or recommendation has been independently validated."
    ],
    "deepDive": [
      {
        "title": "Write the decision contract",
        "paragraphs": [
          "A useful problem brief names the user, trigger, input, decision, output and failure consequence. Example: a site operator initiates an audit; the software records evidence from reachable pages; the operator wants to know which issues most likely affect discoverability. The system may suggest fixes but should not claim it observed an AI citation when it computed only a readiness estimate.",
          "For each field, state its authority. A crawler's HTTP status is an observation at a particular time. A model's interpretation of page quality is an inference. A customer's payment status belongs to an authoritative transaction system. Mixing these evidence classes is both a product-design mistake and a measurement error."
        ]
      },
      {
        "title": "The cheapest useful prototype",
        "paragraphs": [
          "Before integrating several model providers, demonstrate the workflow with a static or manually reviewed sample. Give five realistic inputs to the intended user. Ask them to decide what to do next, identify which evidence they trust, and point out the ambiguous advice. Record confusion rather than coaching them to the correct answer.",
          "A prototype that makes a task understandable without AI can reveal that the core need is better data organization, explanation or navigation. Introduce a model where variable language, synthesis or classification genuinely improves the outcome. Define a deterministic fallback for timeouts and unavailable models."
        ]
      },
      {
        "title": "An acceptance ledger, not a launch slogan",
        "paragraphs": [
          "For an AI-audit tool, acceptance evidence can include preserved crawl responses, stable report identifiers, consistent outputs across a dashboard and export, clearly flagged unsupported claims, and safe handling of missing data. A 200 response from the report endpoint does not prove recommendations are accurate.",
          "Record unresolved security boundaries, latency, token spending and error modes alongside the feature list. An AI feature with no evaluation set, no ownership or no correction route remains a controlled experiment regardless of how polished the interface looks."
        ]
      }
    ],
    "principles": [
      {
        "title": "Separate evidence from advice",
        "detail": "Never elevate a generated hypothesis into a verified fact."
      },
      {
        "title": "Name the human decision",
        "detail": "Document what action the user must be able to take after receiving the result."
      },
      {
        "title": "Budget for failure",
        "detail": "Model timeouts, missing sources and conflicting records need explicit user-visible behavior."
      },
      {
        "title": "Keep authorization upstream",
        "detail": "Retrieval or model context must not bypass tenant permissions or business records."
      }
    ],
    "workflow": [
      {
        "title": "Interview the workflow owner",
        "detail": "Capture the real trigger, decisions, repeated work and cost of error."
      },
      {
        "title": "Document input provenance",
        "detail": "Classify each field as observed, user-supplied, authoritative or inferred."
      },
      {
        "title": "Create a non-AI baseline",
        "detail": "Test a sample workflow before committing to model orchestration."
      },
      {
        "title": "Introduce bounded AI",
        "detail": "Define context, tool permissions, evaluation questions, costs and failure fallbacks."
      },
      {
        "title": "Pilot and verify",
        "detail": "Preserve feedback and evaluate accuracy, usability and operating reliability separately."
      }
    ],
    "pitfalls": [
      {
        "title": "Choosing a model before the user problem",
        "detail": "A list of capabilities says little about whether a decision improved."
      },
      {
        "title": "Confusing a score with an outcome",
        "detail": "A readiness score is not proof of ranking, revenue or customer value."
      },
      {
        "title": "No traceable evidence",
        "detail": "Unattributed summaries are difficult to review, reproduce or correct."
      }
    ],
    "measurement": [
      "Measure how frequently users complete the intended decision with correct evidence and without unsupported certainty. Keep first-response performance, cost and error rates as separate operating measures.",
      "When claims involve third-party search engines or advertising, use an explicit observation method and avoid presenting a modelled estimate as a real-world result."
    ],
    "future": "More capable models will not eliminate the need to choose the right user decision, preserve sources and make reversals possible. Product advantage comes from trustworthy integration with real workflows.",
    "takeaways": [
      "The product brief starts with an accountable decision.",
      "Observed data and model inference are different objects.",
      "A manual baseline often uncovers the simplest useful product.",
      "Launch readiness demands evaluation, privacy and an owner."
    ],
    "faq": [
      {
        "question": "Should every workflow use an AI agent?",
        "answer": "No. Prefer deterministic business logic for rules, permissions and financial records. Use AI only where it adds measurable value."
      },
      {
        "question": "What is a useful first AI evaluation?",
        "answer": "Select realistic inputs, define expected safe behavior and have a domain reviewer inspect the outputs and evidence links."
      },
      {
        "question": "Can an AI visibility score guarantee citations?",
        "answer": "No. It may describe internal diagnostic signals but does not establish third-party selection."
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
        "label": "NexisHub AI software development guide",
        "url": "https://nexishub.vercel.app/blog/complete-guide-ai-software-development"
      }
    ]
  },
  {
    "slug": "idea-to-production-software",
    "lead": "The work between a promising idea and reliable software is mostly invisible on the sales page. It consists of design decisions, source control, safe releases, incident response and proofs that the right outcome happened.",
    "overview": [
      "A finished interface is only the visible layer of a product. SiteNexis, for example, involves an application interface alongside authentication, data storage, audit processing, external integrations and operational monitoring. The release decision must evaluate those dependencies rather than judging a screenshot.",
      "During NexisHub's October 2026 deployment incident, Next.js compiled successfully while Vercel initially failed when deploying the generated output. That distinction taught a useful lesson: the build, release, routing, user session and business workflow are separate parts of the system."
    ],
    "deepDive": [
      {
        "title": "A real delivery sequence from the NexisHub release",
        "paragraphs": [
          "A Git-triggered build produced its pages and later failed with ENOENT for `/vercel/path0/.next/package.json`. A Linux-built prebuilt Preview had succeeded. Switching to Webpack alone exposed a missing Prisma generation step; adding that generation produced a successful compile but did not fix the original packaging failure. A controlled removal of an explicit tracing-root override finally yielded a READY Git-based Preview.",
          "The team then checked homepage and public routes, a dynamic text route, and a protected administrative route. The admin route returned 500 until an independent Preview-only authentication signing secret was configured; afterward it redirected unauthenticated visitors to the sign-in page. These observed stages are more informative than the assertion that the website was deployed. They do not imply that every database-backed admin function was tested."
        ]
      },
      {
        "title": "A release evidence matrix",
        "paragraphs": [
          "Record the code revision, tested environment, specific URL or action, expected result, actual result and limitation. For a brochure page, this includes navigation, mobile rendering and contact instructions. For a SaaS platform, add authorization, idempotency, data recovery, background processing, integrations and support flows.",
          "Protect Production throughout diagnosis. Preview credentials should be independent of Production. Reproducing a failure must not require writing live records, running migrations or switching on sensitive integrations. Release branches should be small enough to reverse when their assumptions are disproved."
        ]
      },
      {
        "title": "The operational product begins after launch",
        "paragraphs": [
          "An audit report is dependable only when its owner can explain provenance, detect partial failures, replay safe work, and distinguish a stale cached response from a fresh observation. Monitoring matters because an intermittent failure can damage user trust without affecting the homepage.",
          "Document how the team will respond to a bad release. Keep known-good deployment identifiers, database restoration procedures and an escalation owner. Do not advertise production readiness simply because CI passed once or a route returned 200."
        ]
      }
    ],
    "principles": [
      {
        "title": "Ship verified boundaries",
        "detail": "Compilation, packaging, deployment and runtime each need their own test."
      },
      {
        "title": "Protect source truth",
        "detail": "Database migrations and credentials require deliberate authorization and rollback planning."
      },
      {
        "title": "Distinguish functionality from availability",
        "detail": "A working page does not prove that downstream tasks complete."
      },
      {
        "title": "Keep a rollback path",
        "detail": "Record version identifiers and the conditions for reversing a release."
      }
    ],
    "workflow": [
      {
        "title": "Frame the user outcome",
        "detail": "Define the task the deployed product must complete."
      },
      {
        "title": "Design data and trust boundaries",
        "detail": "Specify storage, identity, permissions, integrations and retention."
      },
      {
        "title": "Implement with safe defaults",
        "detail": "Validate inputs, use explicit errors and prevent cross-user access."
      },
      {
        "title": "Exercise build and Preview",
        "detail": "Check generated code, packaging and protected runtime paths."
      },
      {
        "title": "Release, monitor and learn",
        "detail": "Observe live behavior and preserve a way to correct or roll back."
      }
    ],
    "pitfalls": [
      {
        "title": "Equating rapid code generation with engineering completion",
        "detail": "Scaffolding accelerates construction but does not supply domain truth, safeguards or operational evidence."
      },
      {
        "title": "Testing only successful paths",
        "detail": "Timeouts, missing dependencies and unauthorized requests expose different failures."
      },
      {
        "title": "Releasing every Preview experiment",
        "detail": "Keep diagnostic flags isolated until the exact fix and its side effects are proven."
      }
    ],
    "measurement": [
      "Use failure rates, recovery time, task completion, accessibility findings, versioned acceptance results and actual support incidents to describe operational quality.",
      "Never infer customer adoption or financial value from an incident postmortem or build success. Those outcomes need their own records."
    ],
    "future": "Product teams will generate interfaces faster, but maintainable systems will still depend on reliable data boundaries, explainable releases and long-term responsibility.",
    "takeaways": [
      "A deployment is a sequence of verified stages.",
      "Use real incidents as engineering evidence, not marketing theatre.",
      "A secure admin redirect is better than an unexplained 500.",
      "Operational ownership starts before the first release."
    ],
    "faq": [
      {
        "question": "When is an app ready for Production?",
        "answer": "When its scope-specific security, functional, deployment and operating acceptance tests pass and remaining risks are explicitly accepted."
      },
      {
        "question": "Why can a successful build fail in Production?",
        "answer": "Packaging, environment configuration, network dependencies and runtime paths can fail after compilation."
      },
      {
        "question": "Does AI-assisted coding remove the need for tests?",
        "answer": "No. Generated code requires the same validation, review and operating controls as manually written code."
      }
    ],
    "references": [
      {
        "label": "Next.js deployment reference",
        "url": "https://nextjs.org/docs/app/getting-started/deploying"
      },
      {
        "label": "Vercel deployments documentation",
        "url": "https://vercel.com/docs/deployments/overview"
      },
      {
        "label": "NexisHub deployment field report",
        "url": "https://nexishub.vercel.app/blog/vercel-nextjs-deployment-debugging"
      }
    ]
  },
  {
    "slug": "choosing-product-engineering-partner",
    "lead": "A software partner should be evaluated by the quality of its decisions and operating evidence, not only by design samples, model names or a persuasive pitch.",
    "overview": [
      "The buyer's first question is not 'Which stack do you use?' It is 'How will you identify the real problem, prove the solution works, explain the trade-offs and leave us able to maintain it?' A good vendor will narrow ambiguous goals before estimating deliverables.",
      "When examining an AI-enabled product proposal, ask whether the supplier distinguishes verified data from generated inference and whether it can show failure handling and authorization tests. A screenshot, code repository or project dashboard may support an evaluation but cannot independently prove a claim about outcomes."
    ],
    "deepDive": [
      {
        "title": "Ask for a decision trail",
        "paragraphs": [
          "Request one anonymized example of a design decision: the original requirement, considered options, reason for selection, risk, and acceptance test. The useful artifact is the explanation and its evidence. A vendor that refuses to discuss constraints but promises every requested feature without trade-offs creates a diligence concern.",
          "Ask what happens when an integration fails halfway through a workflow. The answer should cover idempotency, retries, user-facing status, incident ownership and recovery, with depth proportional to the project's risk."
        ]
      },
      {
        "title": "A practical acceptance contract",
        "paragraphs": [
          "Describe deliverables as capabilities and observable outcomes. 'Develop a contact page' is incomplete without a reliable destination, spam protection, consent rules, error behavior, accessibility and an owner for enquiries. 'Build AI search' is incomplete without defining the source set, retrieval boundaries, evaluation sample and what happens when the system has no supported answer.",
          "Separate the discovery stage, build milestones, acceptance tests and operating support. Specify ownership of source code, design assets, hosting accounts and data. Avoid granting indefinite access to credentials as a convenience. Confirm which security updates, incidents and backups the engagement includes."
        ]
      },
      {
        "title": "How NexisHub's own deployment experience informs the checklist",
        "paragraphs": [
          "In a documented NexisHub release, code compiled but remote deployment failed at output publication; later, the Preview admin route returned HTTP 500 due to a missing signing secret. Those are concrete illustrations of why vendor acceptance cannot stop at a demo video or a green CI badge. They are not evidence about the work quality of third-party vendors.",
          "A prospective partner should be able to show separate checks for delivery pipelines, static routes, dynamic behavior and privileged access. If an important function remains unverified, the status should say unverified rather than quietly count it as complete."
        ]
      }
    ],
    "principles": [
      {
        "title": "Verify capability against work",
        "detail": "Ask for a relevant artifact and acceptance result, not general claims of expertise."
      },
      {
        "title": "Understand ownership",
        "detail": "Clarify source, cloud accounts, access, domain, data and continuing maintenance."
      },
      {
        "title": "Demand truthful status",
        "detail": "Distinguish working, partial, unverified and explicitly out of scope."
      },
      {
        "title": "Plan the exit",
        "detail": "A handover should preserve the customer's ability to operate and change the product."
      }
    ],
    "workflow": [
      {
        "title": "Write a decision brief",
        "detail": "Define primary users, workflow, constraints and the cost of failure."
      },
      {
        "title": "Review comparable evidence",
        "detail": "Examine relevant code, product artifacts and explanations with appropriate confidentiality."
      },
      {
        "title": "Run a bounded discovery engagement",
        "detail": "Agree on scope, deliverables, owners and exit conditions."
      },
      {
        "title": "Make acceptance tests contractual",
        "detail": "Specify what must be demonstrated and under which environment."
      },
      {
        "title": "Verify handover and support",
        "detail": "Test credentials transfer, documentation, monitoring, backups and escalation contacts."
      }
    ],
    "pitfalls": [
      {
        "title": "Buying by feature count",
        "detail": "A longer list does not prove safer data handling or better usability."
      },
      {
        "title": "Vendor-owned critical accounts",
        "detail": "Ownership ambiguity can block recovery, upgrades or a future partner."
      },
      {
        "title": "Unspecified operating costs",
        "detail": "Hosting, API consumption, maintenance and incident response must be considered."
      }
    ],
    "measurement": [
      "Evaluate delivery against dated evidence, requirement traceability, security findings, defects and owner acceptance rather than informal impressions.",
      "Track recurring maintenance expense and incident recovery after launch; avoid assuming a lower initial quote means a lower lifetime cost."
    ],
    "future": "As AI makes rapid prototyping common, the differentiator will increasingly be source-of-truth discipline, proven operations and clear contractual accountability.",
    "takeaways": [
      "Judge engineering partners by relevant proof and decision quality.",
      "Require acceptance criteria beyond a working demo.",
      "Secure ownership and handover before work begins.",
      "Budget for maintenance and failure recovery."
    ],
    "faq": [
      {
        "question": "Should a vendor promise a fixed outcome from an AI model?",
        "answer": "Treat claims about third-party selection, rankings or probabilistic outputs cautiously and require an observation method."
      },
      {
        "question": "Who should own the deployment accounts?",
        "answer": "The customer should retain the access and ownership arrangements agreed in the contract, with least-privilege vendor access."
      },
      {
        "question": "Is a successful demo sufficient for acceptance?",
        "answer": "No. Test the real environment, error handling, data permissions and ongoing operations."
      }
    ],
    "references": [
      {
        "label": "OWASP Application Security Verification Standard",
        "url": "https://owasp.org/www-project-application-security-verification-standard/"
      },
      {
        "label": "NIST Secure Software Development Framework",
        "url": "https://csrc.nist.gov/Projects/ssdf"
      },
      {
        "label": "NexisHub evidence-based launch guide",
        "url": "https://nexishub.vercel.app/blog/website-launch-readiness-evidence"
      }
    ]
  }
];
