import type { BlogPost } from "@/lib/posts";
import type { VisibilityGuide } from "@/lib/visibility-content";

type EditorialSeed = {
  slug: string;
  title: string;
  category: string;
  cluster: string;
  keyword: string;
  description: string;
  audience: string;
  focus: string;
  related: string[];
  reference: { label: string; url: string };
  siteNexisSource?: string;
};

const seeds = [
  ["modern-web-engineering", "Modern Web Engineering", "G", [
    ["designing-fast-websites", "Designing Fast Websites with Server Rendering and Progressive Enhancement", "server rendering and progressive enhancement", "Designing fast websites requires more than reducing bundle size. The delivery path, rendering strategy, content priority, and interaction model must work together.", "frontend engineers and technical website owners", "server rendering, caching, images, fonts, and progressive enhancement"],
    ["accessible-interfaces-without-javascript", "Building Accessible Interfaces That Remain Useful Without JavaScript", "accessible interfaces without JavaScript", "A resilient interface keeps its essential meaning and tasks available when scripts fail, assistive technology interprets the page differently, or a device has limited capability.", "frontend engineers, designers, and accessibility leads", "semantic HTML, form behaviour, keyboard access, and resilient interaction"],
    ["modern-web-performance-core-metrics", "Modern Web Performance: LCP, INP, CLS, Caching, and Image Strategy", "modern web performance", "Web performance is a user experience property created by the whole delivery system, from the first response to the final interaction.", "engineering teams responsible for public websites", "loading, interaction, layout stability, caching, images, and measurement"],
    ["maintainable-frontend-systems", "Designing Maintainable Frontend Systems for Long-Lived Products", "maintainable frontend architecture", "A frontend remains maintainable when its boundaries, conventions, content model, and testing strategy are clear enough for future engineers to extend.", "product engineers and technical leads", "component boundaries, state, styling, content, testing, and change management"],
  ], "https://www.w3.org/TR/WCAG22/"],
  ["ai-infrastructure", "AI Infrastructure", "H", [
    ["production-ai-infrastructure-components", "The Core Components of Production AI Infrastructure", "production AI infrastructure", "Production AI is a system of models, data, retrieval, orchestration, evaluation, security, observability, and operations.", "technical leaders building AI products", "model access, data, retrieval, orchestration, evaluation, and operations"],
    ["reliable-rag-systems", "Designing Reliable Retrieval-Augmented Generation Systems", "reliable RAG systems", "A retrieval-augmented system is only as reliable as its source selection, context construction, answer constraints, and evaluation process.", "AI engineers and platform teams", "retrieval, chunking, ranking, context, citations, and failure handling"],
    ["ai-observability-tracing", "AI Observability: Tracing Prompts, Retrieval, Latency, and Cost", "AI observability", "AI systems need traces that connect user intent, model calls, retrieved material, tool actions, latency, cost, and the final result.", "AI platform engineers and product operators", "traces, evaluation signals, cost attribution, privacy, and incident review"],
    ["secure-ai-application-deployment", "Secure Deployment Patterns for AI Applications", "secure AI application deployment", "AI security starts with ordinary application controls and extends into prompt handling, retrieval boundaries, tool permissions, and output review.", "security engineers and AI product teams", "identity, secrets, data boundaries, tool permissions, abuse, and response handling"],
  ], "https://owasp.org/www-project-top-10-for-large-language-model-applications/"],
  ["healthcare-ai", "Healthcare AI", "I", [
    ["responsible-ai-primary-healthcare", "Designing Responsible AI Workflows for Primary Healthcare", "responsible AI in primary healthcare", "Healthcare AI should support defined workflows while keeping clinical responsibility, privacy, and uncertainty visible.", "healthcare leaders, informatics teams, and product engineers", "workflow design, human review, data minimisation, safety, and evaluation"],
    ["healthcare-data-governance-ai", "Healthcare Data Governance Before AI Deployment", "healthcare data governance for AI", "Data governance is a prerequisite for trustworthy healthcare AI because the system cannot be separated from how data is collected, accessed, retained, and corrected.", "healthcare organisations and data governance teams", "purpose, access, provenance, retention, privacy, and accountability"],
    ["human-review-clinical-decision-support", "Human Review in Clinical Decision Support Systems", "human review clinical decision support", "A review checkpoint is meaningful only when the reviewer has context, authority, time, and a clear way to disagree with the system.", "clinical informatics and safety teams", "review design, escalation, uncertainty, auditability, and failure response"],
    ["digital-health-readiness-framework", "Digital Health Readiness: A Framework for Organisations", "digital health readiness framework", "Digital health readiness includes infrastructure, workflow fit, governance, workforce capability, privacy, and evidence, not only software availability.", "healthcare executives and transformation teams", "readiness dimensions, dependencies, risks, and staged implementation"],
  ], "https://www.who.int/publications/i/item/9789240029200"],
  ["event-technology", "Event Technology", "J", [
    ["reliable-event-registration-checkin", "Designing Reliable Event Registration and Check-In Systems", "event registration and check-in systems", "Event registration succeeds when invitations, identity, attendance, payments, check-in, and reporting form one dependable operational workflow.", "event organisers and product engineers", "registration states, QR check-in, offline conditions, identity, and reporting"],
    ["event-qr-attendance-data", "QR Codes, Attendance Data, and Event Operations", "QR code event attendance", "A QR code is only one part of an attendance system. The real design problem is identity, state transitions, duplicate handling, and useful reporting.", "event operations teams and platform builders", "code generation, scanning, validation, exceptions, privacy, and reconciliation"],
    ["event-invitation-rsvp-workflows", "Building Better Event Invitation and RSVP Workflows", "event invitation and RSVP workflow", "An RSVP workflow should make the event proposition clear, capture the right response, and support changes without creating contradictory records.", "event organisers, community teams, and developers", "invitation states, response design, reminders, accessibility, and consent"],
    ["event-analytics-organisers", "Post-Event Analytics: What Organisers Should Actually Measure", "event analytics metrics", "Useful event analytics explain participation and operational performance without mistaking attendance volume for event quality.", "event organisers and growth teams", "measurement questions, data quality, segmentation, privacy, and learning loops"],
  ], "https://www.w3.org/WAI/fundamentals/accessibility-intro/"],
  ["research", "Research", "K", [
    ["reproducible-ai-research-study", "How to Design a Reproducible AI Research Study", "reproducible AI research", "Reproducibility begins before data collection. The question, protocol, sampling, software, assumptions, and analysis must be recorded so another person can inspect the work.", "engineers, researchers, and founders beginning applied research", "protocols, sampling, variables, software, analysis, and reproduction"],
    ["research-question-to-evidence", "From Research Question to Evidence: A Practical Methodology", "research question to evidence", "A good research question narrows what must be observed and prevents a conclusion from becoming larger than its evidence.", "applied research teams and technical writers", "questions, constructs, measures, data sources, analysis, and interpretation"],
    ["limitations-threats-validity", "How to Report Limitations and Threats to Validity", "research limitations and threats to validity", "Limitations are part of a result because they define where a conclusion can and cannot be used.", "researchers, reviewers, and engineering leaders", "internal validity, external validity, measurement, sampling, and uncertainty"],
    ["engineering-framework-publishable", "What Makes an Engineering Framework Publishable?", "publishable engineering framework", "An engineering framework becomes publishable when its terms, assumptions, method, use cases, boundaries, and revision path are explicit.", "engineering researchers and technical practitioners", "novelty, evidence, reproducibility, practical value, and criticism"],
  ], "https://www.nationalacademies.org/hmd/Reports/2019/fostering-integrity-in-research.aspx"],
  ["guides", "Guides", "L", [
    ["planning-an-ai-product", "A Practical Guide to Planning an AI Product", "planning an AI product", "Planning an AI product means defining a valuable decision or workflow before choosing a model or interface.", "founders, product managers, and engineering leads", "problem definition, users, data, evaluation, risk, architecture, and launch"],
    ["website-launch-checklist-growing-organisations", "A Website Launch Checklist for Growing Organisations", "website launch checklist", "A launch checklist protects a growing organisation from avoidable failures in content, accessibility, security, performance, and ownership.", "founders, marketing teams, and web engineers", "content, routes, forms, legal pages, accessibility, performance, and operations"],
    ["technical-content-maintenance-guide", "A Technical Content Maintenance Guide", "technical content maintenance", "Technical content remains useful when sources, examples, links, product details, and assumptions are reviewed deliberately.", "editorial, research, and product teams", "source freshness, broken links, corrections, ownership, and version history"],
    ["choosing-product-engineering-partner", "A Founder’s Guide to Choosing a Product Engineering Partner", "choosing a product engineering partner", "The right product engineering partner helps clarify the problem, reduce delivery risk, and leave the organisation with a maintainable asset.", "founders and organisational buyers", "discovery, architecture, delivery evidence, ownership, support, and commercial terms"],
  ], "https://www.w3.org/TR/WCAG22/"],
  ["case-studies", "Case Studies", "M", [
    ["methodology-case-study-ai-discovery", "A Methodology Case Study: Preparing a Digital Platform for AI Discovery", "AI discovery case study methodology", "This methodology case study shows how to document a digital platform improvement without inventing client outcomes, permissions, or performance claims.", "teams writing evidence-based technology case studies", "challenge framing, diagnosis, intervention, evidence, limitations, and permission"],
    ["methodology-case-study-idea-to-roadmap", "A Methodology Case Study: From Business Idea to Product Roadmap", "product roadmap case study methodology", "A credible product case study explains decisions, constraints, tradeoffs, and evidence instead of presenting a polished launch story without context.", "founders, product teams, and Studio practitioners", "discovery, prioritisation, decisions, delivery, acceptance, and lessons"],
    ["methodology-case-study-education-workflow", "A Methodology Case Study: Designing an Education Technology Workflow", "education technology case study methodology", "Education technology work should be documented around users, learning context, teacher review, accessibility, privacy, and evidence.", "education technology teams and researchers", "stakeholders, workflow, safeguards, evaluation, and permission"],
    ["methodology-case-study-web-foundation", "A Methodology Case Study: Improving a Website’s Technical Foundation", "website improvement case study methodology", "A technical case study can show how work was approached without claiming results that were not measured or approved for publication.", "web teams, clients, and engineering studios", "baseline, technical changes, validation, residual risk, and approval"],
  ], "https://www.w3.org/TR/WCAG22/"],
  ["product-engineering", "Product Engineering", "N", [
    ["idea-to-production-software", "From Product Idea to Production Software", "idea to production software", "A product idea becomes a dependable product through discovery, design, architecture, delivery, quality assurance, and operations.", "founders and product engineering teams", "problem framing, users, scope, design, engineering, launch, and maintenance"],
    ["saas-architecture-selection", "How to Choose an Architecture for a New SaaS Product", "SaaS architecture selection", "Architecture should reflect product risk, team capability, data boundaries, operational needs, and the next decision the product must support.", "technical founders and software architects", "monoliths, services, data, tenancy, deployment, and evolution"],
    ["long-term-product-maintainability", "Building Products That Remain Maintainable After Launch", "long-term product maintainability", "Maintainability is created through clear ownership, simple boundaries, tests, observability, documentation, and deliberate change control.", "engineering leaders and product owners", "code health, architecture, documentation, testing, incidents, and succession"],
    ["product-engineering-vs-feature-development", "Product Engineering Versus Feature-Driven Development", "product engineering versus feature development", "Product engineering connects features to user problems, system quality, evidence, and long-term business value.", "founders, product managers, and delivery teams", "outcomes, discovery, tradeoffs, quality, measurement, and iteration"],
  ], "https://www.swebench.com/"],
  ["developer-tutorials", "Developer Tutorials", "O", [
    ["nextjs-typescript-structured-blog", "Building a Structured Blog with Next.js and TypeScript", "Next.js TypeScript blog tutorial", "A structured blog should make routes, metadata, content, related links, and publication status explicit in code.", "developers familiar with React and TypeScript", "content models, routes, metadata, rendering, validation, and deployment"],
    ["jsonld-metadata-nextjs", "Adding JSON-LD Metadata to a Next.js Website", "JSON-LD metadata Next.js tutorial", "JSON-LD can help machines interpret a page when its types and values accurately reflect visible content.", "Next.js developers and SEO engineers", "schemas, canonical URLs, visible-content parity, validation, and testing"],
    ["secure-nextjs-contact-form", "Creating a Secure Contact Form with Server-Side Validation", "secure Next.js contact form", "A contact form needs validation, abuse controls, safe error handling, privacy boundaries, and dependable delivery.", "full-stack JavaScript developers", "schemas, server actions, rate limits, webhooks, secrets, and feedback"],
    ["research-citation-export-endpoint", "Building a Citation Export Endpoint for Research Publications", "research citation export API", "A citation endpoint should produce accurate metadata for a specific publication version without inventing DOI, authorship, or review status.", "developers building research platforms", "metadata models, formats, versioning, content disposition, and tests"],
  ], "https://nextjs.org/docs"],
] as const;

const seedRecords: EditorialSeed[] = seeds.flatMap(([, categoryTitle, cluster, entries, reference]) => entries.map(([slug, title, keyword, description, audience, focus]) => ({ slug, title, category: categoryTitle, cluster, keyword, description, audience, focus, related: [], reference: { label: categoryTitle + " official reference", url: reference } })));

const relatedByCategory = (seed: EditorialSeed) => seedRecords.filter((item) => item.category === seed.category && item.slug !== seed.slug).slice(0, 3).map((item) => item.slug);

export const editorialPosts: readonly BlogPost[] = seedRecords.map((seed) => ({
  slug: seed.slug, title: seed.title, description: seed.description, targetKeyword: seed.keyword, category: seed.category,
  cluster: seed.cluster, difficulty: seed.category === "Research" || seed.category === "AI Infrastructure" ? "Advanced" : "Intermediate",
  intent: "Informational", readingTime: "19 min read", author: "NexisHub Editorial", publishedDate: "2026-08-11", updatedDate: "2026-08-11",
  tags: [seed.category, seed.keyword, "NexisHub Editorial"], featuredImage: `/blog/${seed.slug}/opengraph-image`, featuredImageAlt: `${seed.title}, a NexisHub editorial guide.`,
  seoTitle: seed.title, seoDescription: seed.description, canonicalPath: `/blog/${seed.slug}`, series: `${seed.category} desk`, readingLevel: "Technical practitioner", status: "Published",
  relatedSlugs: relatedByCategory(seed), siteNexisSource: seed.category === "AI Infrastructure" || seed.category === "Modern Web Engineering" ? "https://sitenexis.vercel.app/blog/complete-guide-to-ai-visibility" : undefined,
}));

const guidePoint = (title: string, detail: string) => ({ title, detail });

export const editorialGuides: readonly VisibilityGuide[] = seedRecords.map((seed) => ({
  slug: seed.slug,
  lead: seed.description,
  overview: [
    `${seed.title} begins with a practical problem rather than a technology label. The subject matters because ${seed.focus} affect how people use, trust, maintain, and improve a system over time. A good implementation makes the decision visible and gives the team a way to test whether the work helped.`,
    `This guide is written for ${seed.audience}. It treats the work as a connected system of decisions. Architecture, content, data, quality, security, accessibility, and operations should be considered together where they affect the same outcome, while their evidence and ownership remain distinct.`,
  ],
  deepDive: [
    { title: "Define the problem before choosing the solution", paragraphs: [`Begin by naming the user, the situation, the current failure, and the decision the system must support. Avoid replacing this step with a feature list. Features describe what software can do. A problem statement explains why the work should exist and what evidence would show that the result is useful.`, `Write down constraints early. Include data availability, time, budget, existing systems, legal or privacy boundaries, accessibility needs, operating capability, and the consequences of failure. Constraints are not paperwork added after design. They shape the solution that can be delivered responsibly.`] },
    { title: "Model the workflow and its boundaries", paragraphs: [`Map the steps a real person or system follows. Identify inputs, transformations, decisions, outputs, exceptions, and handoffs. A workflow map often reveals that the highest-risk part is not the visible interface but a missing approval, an unclear record, or a failure path that nobody owns.`, `Define what the system will not do. Boundaries prevent users and future engineers from treating a prototype, recommendation, draft, or diagnostic signal as a final decision. Clear boundaries also make testing more specific because the team can distinguish a supported use from an out-of-scope request.`] },
    { title: "Choose evidence that matches the claim", paragraphs: [`A technical claim needs technical evidence. A usability claim needs observation with representative users. A healthcare claim needs an appropriate clinical and governance basis. A research claim needs a method and limitations. A case study needs permission and an evidence record. Do not use a convenient metric merely because it is easy to collect.`, `Record the date, sample, environment, version, method, and uncertainty. When the work has not been evaluated, label it as a proposal or implementation guide. When a result is based on internal observation, distinguish it from an independently validated outcome.`] },
    { title: "Build quality into delivery", paragraphs: [`Quality is not a final visual pass. It includes correctness, accessibility, security, performance, resilience, maintainability, and the ability to recover when something fails. Turn these concerns into acceptance criteria that can be checked during delivery rather than promises made after launch.`, `Use automated checks for repeatable properties and manual review for experiences that tools cannot prove. Keyboard navigation, screen-reader behaviour, clinical workflow fit, event-day exceptions, and editorial accuracy need human inspection. Record what was tested, by whom, when, and what remains open.`] },
    { title: "Operate the result after launch", paragraphs: [`Launch changes the responsibility rather than ending it. Define monitoring, ownership, incident response, source or data freshness, support, backups, corrections, and maintenance windows. A product without an operating model accumulates hidden risk even when the initial release works.`, `Create a small change record for important updates. Record the reason, affected surface, expected effect, validation, and rollback path. This makes future decisions easier and prevents a later team from having to reconstruct why a system was designed a particular way.`] },
    { title: "Review tradeoffs honestly", paragraphs: [`Every practical system trades speed against completeness, flexibility against simplicity, automation against control, and short-term delivery against long-term maintenance. State the tradeoff directly. Readers can then decide whether the recommendation applies to their context rather than treating it as a universal rule.`, `The right conclusion may be to delay a feature, narrow the scope, collect better evidence, or appoint a specialist reviewer. That is useful engineering judgement. A guide should help teams make better decisions, not make every project appear ready for immediate implementation.`] },
    { title: "What would change the recommendation?", paragraphs: [`A durable article states what could change its recommendation. New platform constraints, a different risk profile, a validated evaluation, a regulatory requirement, an accessibility finding, a production incident, or a meaningful change in user behaviour may all justify revision.`, `This is especially important for evolving technical systems. Cite current documentation where appropriate, preserve the publication date, review references periodically, and distinguish a stable principle from a time-sensitive implementation detail. The guide remains useful because it shows readers how to update it.`] },
  ],
  principles: [
    guidePoint("Purpose before features", "Define the user problem, desired outcome, and boundary before selecting tools."),
    guidePoint("Evidence before certainty", "Match each claim to an appropriate source, observation, test, or explicit limitation."),
    guidePoint("Human responsibility", "Keep accountable people visible wherever the system affects decisions, safety, privacy, or publication."),
    guidePoint("Accessible by default", "Design for different abilities, devices, input methods, connectivity conditions, and levels of expertise."),
    guidePoint("Maintainable after launch", "Document ownership, tests, monitoring, corrections, recovery, and the next decision."),
  ],
  workflow: [
    guidePoint("Write the decision brief", "Record the problem, users, constraints, desired outcome, non-goals, risks, and evidence required."),
    guidePoint("Map the current workflow", "Show what happens today, where work is repeated, where errors occur, and who owns each handoff."),
    guidePoint("Design the smallest useful system", "Choose a scope that can be tested with real users, real content, or clearly labelled synthetic inputs."),
    guidePoint("Implement with safeguards", "Add validation, permissions, accessibility, observability, rate limits, and clear failure states."),
    guidePoint("Test the experience", "Combine automated checks with manual review of the real workflow and its exception paths."),
    guidePoint("Launch with an operating record", "Define support, maintenance, monitoring, ownership, change control, and review dates."),
  ],
  pitfalls: [
    guidePoint("Tool-first planning", "Choosing a model, framework, or dashboard before defining the problem creates activity without a useful outcome."),
    guidePoint("Happy-path delivery", "A system that works only when inputs are clean and users behave as expected is not operationally complete."),
    guidePoint("Unmeasured claims", "Words such as reliable, scalable, secure, accessible, and effective require a method or should be qualified."),
    guidePoint("No owner after launch", "A product, article, dataset, or workflow without a responsible owner will become stale or unsafe."),
  ],
  measurement: [
    "Choose measures that correspond to the stated objective. Depending on the topic, this may include task completion, review time, error rate, response time, accessibility findings, source freshness, cost, adoption, or a research outcome.",
    "Separate implementation evidence from outcome evidence. A deployed feature proves that software was delivered. It does not by itself prove that users benefited, risk decreased, or a business result was caused by the feature.",
    "Keep a baseline and document the observation method. Where the work involves healthcare, education, research, or client work, obtain the required human, legal, privacy, and ethics approvals before collecting or publishing sensitive evidence.",
  ],
  future: `The durable lesson from ${seed.category.toLowerCase()} is that quality comes from connected decisions rather than a single tool. Teams will adopt new frameworks and interfaces, but they will still need clear purpose, accountable ownership, accessible delivery, evidence, and maintenance.`,
  takeaways: ["Start with a defined problem and a bounded outcome.", "Map the workflow before automating a step.", "Use evidence that matches the claim.", "Design failure, accessibility, security, and ownership into the system.", "Measure implementation separately from impact.", "State what would change the recommendation."],
  faq: [
    { question: `Who should use this ${seed.category.toLowerCase()} guide?`, answer: `It is intended for ${seed.audience}. Teams should adapt the workflow to their context rather than treating the article as a substitute for professional, legal, clinical, or research review.` },
    { question: "What should be done first?", answer: "Write the decision brief, identify the user and current failure, record constraints, and define the evidence that will support the next decision." },
    { question: "How much of the process can be automated?", answer: "Automate repeatable work only after the workflow and failure boundaries are clear. Keep accountable human review where errors could affect safety, privacy, learning, research integrity, or client obligations." },
    { question: "When should the guide be updated?", answer: "Review it when relevant documentation, product assumptions, legal requirements, user evidence, or operational conditions change. Record material revisions rather than silently replacing the original position." },
  ],
  references: [seed.reference, { label: "NexisHub research and editorial standards", url: "https://nexishub.vercel.app/research/ethics" }],
}));
