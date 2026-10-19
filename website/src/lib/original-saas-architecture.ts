import type { VisibilityGuide } from "@/lib/visibility-content";
export const saasOriginalGuide: VisibilityGuide = {
  "slug": "saas-architecture-selection",
  "lead": "The right SaaS architecture is the smallest system that preserves tenant boundaries, reliable business records, recoverable deployments and a credible path to scale.",
  "overview": [
    "NexisHub's reviewed web repository uses Next.js App Router, domain modules under src/lib, Prisma generation and feature-gated administration. This is evidence for how the company website is structured, not proof that every NexisHub product shares one deployed database or identity service.",
    "An architecture decision begins with workload, team size, data sensitivity and failure consequences. A founder-led product may benefit from a modular application first, with queues and separate services added for measured reasons rather than prestige."
  ],
  "deepDive": [
    {
      "title": "What the NexisHub implementation actually shows",
      "paragraphs": [
        "The website separates public content, server routes, Prisma data access and administrative authorization in named modules. An administrator requires an authenticated session and verified authorization; a signed session alone does not grant every operation.",
        "During its October 2026 Vercel investigation, NexisHub proved that a successful compilation could still fail during output packaging. The protected Preview later returned 200 for public routes while admin requests failed until a branch-specific NextAuth signing secret was configured. These incidents show why environment configuration, deploy outputs and safe denial behavior belong in an architecture review."
      ]
    },
    {
      "title": "A decision table for a new SaaS",
      "paragraphs": [
        "Choose a modular monolith when one small team owns the product, transactions cross related modules and the operational cost of service communication would exceed its benefits. Separate services may be justified by independently scaling compute, distinct trust boundaries, different teams or external integration isolation. These are tradeoffs, not maturity rankings.",
        "For tenants, decide between a shared relational database with enforced tenant scoping and stronger physical separation. A tenant ID carried from a browser is not an authorization check. For long-running jobs, require idempotency keys, retry limits and recovery tests before selecting a queue. Search indexes and AI agent memories must not overwrite authoritative account or financial records."
      ]
    },
    {
      "title": "Tests that decide whether the architecture is ready",
      "paragraphs": [
        "Run fixture-based attempts to access another tenant's data, simultaneous writes, repeated webhook delivery and interrupted background work. Check that a previous failure can be explained using request IDs and that a rollback restores service without corrupting business state.",
        "Write an architecture decision record containing the current team, expected workload as an assumption, data owners, security boundaries, deployment procedure, selected options, rejected alternatives and a review date. A microservice should be extracted after the specific pressure becomes demonstrable."
      ]
    }
  ],
  "principles": [
    {
      "title": "Preserve invariants",
      "detail": "Tenant access, billing states and authorizations must remain correct through retries and failures."
    },
    {
      "title": "Separate business truth from AI inference",
      "detail": "Use authoritative records for financial and permission decisions."
    },
    {
      "title": "Measure before extracting services",
      "detail": "New service boundaries need an operational justification."
    }
  ],
  "workflow": [
    {
      "title": "Inventory roles and data",
      "detail": "Define tenant ownership, sensitive records and access tests."
    },
    {
      "title": "Choose deployable boundaries",
      "detail": "Use a modular service where shared transaction integrity is needed."
    },
    {
      "title": "Test the dangerous paths",
      "detail": "Exercise cross-tenant requests, duplicated events, retries and outages."
    },
    {
      "title": "Document evolution triggers",
      "detail": "Record evidence that would require more independent services."
    }
  ],
  "pitfalls": [
    {
      "title": "Premature distribution",
      "detail": "More independently deployed components mean more failure and authentication boundaries."
    },
    {
      "title": "Unverified tenant checks",
      "detail": "A client-supplied tenant ID does not prove permission."
    },
    {
      "title": "Build-only verification",
      "detail": "The deployed runtime may still fail because of secrets or packaging."
    }
  ],
  "measurement": [
    "Record critical workflow errors, rollback time, cross-tenant denial tests and independently justified operating costs.",
    "Avoid made-up scale benchmarks; measure actual load before re-architecting."
  ],
  "future": "Keep interfaces and event contracts clear so proven scaling pressures can be addressed without rewriting every business operation.",
  "takeaways": [
    "Start from tested security and reliability needs.",
    "Prefer modular simplicity until separation is justified.",
    "Include runtime and release checks in the architecture.",
    "Keep AI and search layers subordinate to business truth."
  ],
  "faq": [
    {
      "question": "Must an AI SaaS use microservices?",
      "answer": "No. A modular app can be appropriate if permissions, queues and operating procedures are properly designed."
    },
    {
      "question": "Is a shared database safe for tenants?",
      "answer": "Only when server-side tenant isolation is enforced and tested. Regulatory needs may justify a different design."
    }
  ],
  "references": [
    {
      "label": "Next.js App Router",
      "url": "https://nextjs.org/docs/app"
    },
    {
      "label": "OWASP API Security",
      "url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
    },
    {
      "label": "NexisHub deployment report",
      "url": "https://nexishub.vercel.app/blog/vercel-nextjs-deployment-debugging"
    }
  ]
};
