export type GuidePoint = { title: string; detail: string };
export type GuideFaq = { question: string; answer: string };
export type VisibilityGuide = {
  slug: string;
  lead: string;
  overview: readonly string[];
  principles: readonly GuidePoint[];
  workflow: readonly GuidePoint[];
  pitfalls: readonly GuidePoint[];
  measurement: readonly string[];
  future: string;
  takeaways: readonly string[];
  faq: readonly GuideFaq[];
  references: readonly { label: string; url: string }[];
};

const googleAi = { label: "Google Search: optimizing for generative AI features", url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" };
const googleStructured = { label: "Google Search: structured data introduction", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" };
const googleRobots = { label: "Google Search: robots.txt introduction", url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro" };
const schema = { label: "Schema.org vocabulary", url: "https://schema.org/" };

export const visibilityGuides: readonly VisibilityGuide[] = [
  {
    slug: "complete-guide-ai-visibility",
    lead: "AI visibility is the ability of a source to be discovered, understood, retrieved, represented accurately, and cited when an AI-assisted system answers a relevant question.",
    overview: [
      "Visibility is not one ranking. It is a chain of technical and editorial conditions. A page may be crawlable but hard to extract, retrievable but weakly supported, or cited while representing the organization incorrectly.",
      "Traditional search foundations still matter. Google explicitly says its generative search features build on core search systems. The additional work is to make meaning, evidence, and relationships survive retrieval and generation.",
    ],
    principles: [
      { title: "Access", detail: "Important pages return stable responses, allow intended crawlers, render meaningful content, and appear in navigable site structures." },
      { title: "Understanding", detail: "Headings, entities, definitions, links, and structured data agree about the subject and purpose of each page." },
      { title: "Retrieval", detail: "Sections answer recognizable questions and remain useful when extracted from the surrounding page." },
      { title: "Trust", detail: "Claims are specific, sourced, current, attributable, and consistent with related pages." },
      { title: "Measurement", detail: "Teams separate directly observed citations and referrals from modeled readiness scores and assumptions." },
    ],
    workflow: [
      { title: "Establish a baseline", detail: "Inventory indexable pages, important entities, priority questions, observed citations, and current referral outcomes." },
      { title: "Repair access first", detail: "Resolve response, canonical, robots, rendering, sitemap, navigation, and orphan-page problems before rewriting content." },
      { title: "Strengthen meaning", detail: "Give every important page one clear purpose, explicit definitions, useful sections, and links that describe real relationships." },
      { title: "Add evidence", detail: "Attach sources, authorship, dates, methodology, limitations, and supporting examples to claims that deserve citation." },
      { title: "Re-measure consistently", detail: "Repeat the same observation set, retain evidence, and compare changes without treating volatile outputs as permanent rankings." },
    ],
    pitfalls: [
      { title: "Inventing an AI-only checklist", detail: "Special files and speculative markup cannot compensate for inaccessible pages or unhelpful content." },
      { title: "Treating citations as guaranteed", detail: "No publisher controls whether a system retrieves or cites a page for a given response." },
      { title: "Publishing volume without coherence", detail: "More pages can add contradiction and duplication when the cluster has no clear canonical structure." },
    ],
    measurement: ["Use four evidence classes: technical access, content readiness, observed surface presence, and business outcomes. Report each separately.", "A useful review explains what was measured, when it was measured, which prompts or queries were used, and which conclusions remain estimates."],
    future: "Machine discovery will keep changing at the interface level. Durable work will remain familiar: accessible documents, explicit meaning, defensible evidence, coherent relationships, and honest measurement.",
    takeaways: ["AI visibility is a pipeline, not a single score.", "Search fundamentals remain part of generative discovery.", "Retrievability and citation readiness are different conditions.", "Evidence should be separated from estimates.", "Useful, accessible content is the durable strategy."],
    faq: [
      { question: "Is AI visibility the same as SEO?", answer: "No. They overlap in crawlability, indexing, quality, and authority, but AI visibility also examines extraction, retrieval, answer synthesis, citation, and representation." },
      { question: "Does structured data guarantee AI citations?", answer: "No. Structured data can clarify page meaning when accurate, but it does not guarantee retrieval, ranking, or citation." },
      { question: "What should a team fix first?", answer: "Start with access and canonical identity, then improve page meaning, evidence, internal relationships, and measurement." },
    ], references: [googleAi, googleStructured, googleRobots, schema],
  },
  {
    slug: "ai-visibility-vs-traditional-seo",
    lead: "SEO and AI visibility share a foundation, but they observe different outputs: ranked search documents on one side and generated answers assembled from retrieved evidence on the other.",
    overview: ["SEO asks whether a page can be crawled, indexed, understood, and selected for a search result. AI visibility extends the investigation through extraction, passage retrieval, synthesis, source attribution, and brand representation.", "The disciplines should share one technical and content foundation. Splitting them into competing programs creates duplicated audits, conflicting page changes, and unclear ownership."],
    principles: [
      { title: "Shared foundation", detail: "Accessible pages, clear titles, useful content, internal links, and reputable evidence help both search and AI-assisted discovery." },
      { title: "Different unit of selection", detail: "Search often presents a document; a retrieval system may select only one passage from that document." },
      { title: "Different output", detail: "A blue link exposes the source directly. A generated answer can compress, combine, qualify, or omit source material." },
      { title: "Different observation", detail: "Rank tracking is ordered and repeatable. AI responses can vary, so measurement needs samples and retained evidence." },
    ],
    workflow: [
      { title: "Keep one technical backlog", detail: "Combine crawl, canonical, performance, rendering, and navigation work rather than maintaining AI-specific duplicates." },
      { title: "Map queries to answer forms", detail: "Distinguish definitional, procedural, comparative, and evaluative needs before designing sections." },
      { title: "Measure both surfaces", detail: "Track search impressions and referrals alongside observed AI citations, representation, and assisted conversions." },
      { title: "Review conflicts", detail: "Reject tactics that help a narrow metric while making the page less accurate, accessible, or useful." },
    ],
    pitfalls: [
      { title: "Declaring SEO obsolete", detail: "Generative search still depends on web discovery and core search infrastructure." },
      { title: "Renaming old work", detail: "A new label without retrieval or citation analysis adds no operational value." },
      { title: "Comparing incompatible metrics", detail: "A rank position and an estimated visibility score describe different observations." },
    ],
    measurement: ["Maintain a shared dashboard with separate sections for search acquisition, technical health, observed AI presence, and downstream outcomes.", "Use changes in evidence to prioritize work, not to claim that one discipline has replaced the other."],
    future: "Search interfaces will blend links, answers, summaries, and actions. Teams that maintain a strong shared web foundation will adapt more easily than teams chasing surface-specific tricks.",
    takeaways: ["SEO and AI visibility overlap but are not identical.", "One web foundation should serve both programs.", "Passage retrieval changes how content is designed.", "AI observations require sampling.", "User value remains the common objective."],
    faq: [
      { question: "Should GEO replace SEO?", answer: "No. Treat GEO or AI visibility as an extension of discovery work, not a replacement for technical and editorial search fundamentals." },
      { question: "Can the same team own both?", answer: "Yes, if engineering, content, analytics, and governance responsibilities are explicit." },
      { question: "Which metric is shared?", answer: "Useful outcomes such as qualified discovery, engagement, and conversion are shared; surface-specific indicators should remain separate." },
    ], references: [googleAi, googleStructured],
  },
  {
    slug: "ai-readable-website-architecture",
    lead: "An AI-readable website makes its important subjects, canonical pages, and relationships obvious in routes, navigation, headings, links, and visible content.",
    overview: ["Architecture is a promise about where information lives. When several URLs compete for the same subject or important pages sit outside navigation, machines and people must infer a structure the publisher should have declared.", "The goal is not a giant flat site. It is a shallow, purposeful graph with clear hubs, supporting pages, and contextual paths between genuinely related ideas."],
    principles: [
      { title: "One canonical home per subject", detail: "Choose a durable page that defines each primary topic and routes supporting questions toward it." },
      { title: "Routes express hierarchy", detail: "Stable, readable paths help operations and users even though URL shape alone does not establish meaning." },
      { title: "Navigation exposes priorities", detail: "Important hubs should be reachable through normal HTML links rather than search boxes or client-only interactions." },
      { title: "Relationships are typed by context", detail: "The surrounding sentence and anchor should explain why two pages belong together." },
    ],
    workflow: [
      { title: "Inventory subjects and intents", detail: "Group pages by the user question they answer, not only by department or content format." },
      { title: "Choose hubs", detail: "Assign one hub to define scope, introduce supporting material, and receive links back from the cluster." },
      { title: "Resolve duplicates", detail: "Merge, redirect, canonicalize, or clearly differentiate pages that compete for the same purpose." },
      { title: "Test paths", detail: "Verify important pages are reachable, server-render meaningful content, and remain understandable without visual layout." },
    ],
    pitfalls: [
      { title: "Navigation by JavaScript state", detail: "Links hidden behind non-link controls can weaken reliable discovery and keyboard use." },
      { title: "Taxonomy explosion", detail: "Empty tag pages and overlapping categories create more URLs without adding knowledge." },
      { title: "Breadcrumbs without architecture", detail: "Decorative breadcrumbs cannot repair incoherent canonical and internal-link decisions." },
    ],
    measurement: ["Track crawl depth, orphan pages, competing canonicals, hub inbound links, and the percentage of priority pages represented in navigation and sitemaps.", "Review architecture with a text-only crawl and with real user tasks; machine legibility and human findability should reinforce each other."],
    future: "As agents navigate sites to complete tasks, explicit route purposes and reliable link relationships will matter beyond content discovery. Architecture will increasingly describe both knowledge and available actions.",
    takeaways: ["Architecture declares where knowledge lives.", "Every primary subject needs a canonical home.", "Hubs and supporting pages need reciprocal context.", "Important content should not depend on interface state.", "Test the graph, not only individual pages."],
    faq: [
      { question: "How deep should important pages be?", answer: "There is no universal number, but priority pages should be reachable through short, logical paths from durable navigation or hubs." },
      { question: "Do URLs need keywords?", answer: "Readable, stable URLs help users and maintenance. Page meaning should come from the full document and its relationships, not keyword stuffing." },
      { question: "What is an orphan page?", answer: "A page with no discoverable inbound internal link, even if it appears in a sitemap." },
    ], references: [googleAi, googleRobots],
  },
  {
    slug: "internal-linking-ai-discovery",
    lead: "Internal links are navigation for people, discovery paths for crawlers, and explicit statements about how one page relates to another.",
    overview: ["A useful link answers two questions before it is followed: what is at the destination, and why is it relevant here? Descriptive anchors and nearby context carry that explanation.", "The objective is not maximum link count. It is a coherent graph in which hubs consolidate a subject, supporting pages deepen it, and cross-cluster links appear only where the concepts genuinely overlap."],
    principles: [
      { title: "Describe the destination", detail: "Use concise anchors that name the idea or task rather than generic commands." },
      { title: "Link at the moment of need", detail: "Place a link where the reader needs a definition, prerequisite, proof, or next step." },
      { title: "Return authority to hubs", detail: "Supporting articles should link to their pillar, and pillars should expose their supporting material." },
      { title: "Preserve editorial judgment", detail: "Templates can suggest links, but a human should confirm relevance and anchor accuracy." },
    ],
    workflow: [
      { title: "Build a topic graph", detail: "List canonical subjects, supporting questions, prerequisites, comparisons, and application pages." },
      { title: "Set minimum relationships", detail: "Require each published article to link to its pillar and at least two relevant siblings when they exist." },
      { title: "Repair orphans", detail: "Add meaningful inbound links from indexed pages or remove destinations that do not deserve independent existence." },
      { title: "Audit anchors", detail: "Check duplicates, misleading text, broken targets, redirect chains, and excessive sitewide repetition." },
    ],
    pitfalls: [
      { title: "Exact-match repetition", detail: "Using the same optimized phrase everywhere sounds unnatural and hides the specific relationship." },
      { title: "Footer-only discovery", detail: "A sitewide footer link does not provide the contextual meaning of an editorial link." },
      { title: "Automated link flooding", detail: "Unreviewed insertion produces irrelevant paths and damages reading quality." },
    ],
    measurement: ["Measure orphan count, broken targets, redirect hops, hub coverage, anchor diversity, and whether important pages receive contextual inbound links.", "A graph visualization can expose structural problems, but the final review must read the sentences that create each relationship."],
    future: "Internal links will increasingly support agent navigation and entity resolution. Clear anchors will help both discovery systems and people understand what an action or destination represents.",
    takeaways: ["Internal links declare relationships.", "Context matters more than raw count.", "Every support page should return to its hub.", "Repair orphan pages deliberately.", "Automate detection, not editorial relevance."],
    faq: [
      { question: "How many internal links should a page have?", answer: "Use as many as the reader and architecture genuinely require. There is no responsible universal target." },
      { question: "Are reciprocal links bad?", answer: "No. They are useful when each page provides a relevant path to the other for a different reading need." },
      { question: "Should anchors match target keywords?", answer: "Anchors should accurately describe the destination in context. Forced repetition is unnecessary." },
    ], references: [googleAi],
  },
  {
    slug: "structured-data-ai-machine-trust",
    lead: "Structured data is a machine-readable claim about visible page content. Its value depends on accuracy, consistency, and maintenance rather than the amount of markup emitted.",
    overview: ["JSON-LD can identify an article, organization, author, breadcrumb, product, or other supported entity. It should clarify the document, not introduce facts the user cannot verify on the page.", "Google recommends JSON-LD when practical and warns that valid markup does not guarantee a rich result. The same discipline applies to AI visibility: schema can reduce ambiguity, but it cannot manufacture authority."],
    principles: [
      { title: "Match visible truth", detail: "Names, dates, authors, ratings, prices, and relationships must agree with content a user can inspect." },
      { title: "Choose specific supported types", detail: "Use the narrowest accurate vocabulary and include properties that have a real source." },
      { title: "Maintain one entity identity", detail: "Keep organization names, canonical URLs, logos, and identifiers consistent across templates." },
      { title: "Validate rendered output", detail: "Test the final page after deployment, not only the source object in a local component." },
    ],
    workflow: [
      { title: "Model the page first", detail: "Identify the main entity, publisher, author, dates, breadcrumb, and relationships before writing JSON-LD." },
      { title: "Generate from content data", detail: "Use the same trusted fields for visible bylines, metadata, feeds, and schema to prevent drift." },
      { title: "Test syntax and policy", detail: "Run schema and search validation, then inspect whether every important field is truthful." },
      { title: "Monitor change", detail: "Update markup when content, ownership, pricing, or supported vocabulary changes." },
    ],
    pitfalls: [
      { title: "Hidden claims", detail: "Markup that describes content absent from the page is misleading." },
      { title: "Schema as ranking guarantee", detail: "Eligibility and understanding are not promises of placement or citation." },
      { title: "Independent data copies", detail: "Separate hard-coded dates and names inevitably fall out of sync." },
    ],
    measurement: ["Track validation errors, warnings that matter to the chosen feature, parity with visible content, and entity identifier consistency.", "Treat changes in search appearance or AI representation as observations, not proof that one schema field caused the outcome."],
    future: "Structured vocabularies will continue to evolve. Systems built from shared typed content data will adapt more safely than pages assembled from scattered markup fragments.",
    takeaways: ["Schema describes visible truth.", "More markup is not automatically better.", "Generate schema from shared content data.", "Validate the rendered page.", "Never promise rankings or citations."],
    faq: [
      { question: "Does every page need structured data?", answer: "No. Add markup when an accurate vocabulary meaningfully describes the page or its entities." },
      { question: "Is JSON-LD preferred?", answer: "Google recommends JSON-LD when the site can implement and maintain it correctly." },
      { question: "Can schema fix weak content?", answer: "No. It can clarify content, but it cannot replace usefulness, evidence, accessibility, or authority." },
    ], references: [googleStructured, { label: "Google Search: structured data guidelines", url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" }, schema],
  },
  {
    slug: "entity-clarity-ai-systems",
    lead: "Entity clarity is the degree to which a reader or machine can identify a subject, distinguish it from similar subjects, and verify its important relationships.",
    overview: ["A brand becomes ambiguous when names vary, descriptions conflict, product relationships are unstated, or authoritative pages disagree. Repetition alone does not solve this; consistency must be attached to evidence.", "Start with a canonical organization page and explicit product pages. Then align navigation, bylines, contact information, structured data, external profiles, and contextual links around the same facts."],
    principles: [
      { title: "Canonical identity", detail: "Maintain one authoritative page that states the official name, purpose, products, ownership, and contact paths." },
      { title: "Consistent definitions", detail: "Use stable core descriptions while adapting the surrounding explanation to each audience." },
      { title: "Explicit relationships", detail: "State whether a product is owned by, built by, integrated with, or merely discussed by the organization." },
      { title: "External corroboration", detail: "Keep legitimate profiles and references accurate; do not manufacture listings or citations." },
    ],
    workflow: [
      { title: "Create an entity register", detail: "Record approved names, aliases, canonical URLs, descriptions, identifiers, and relationships." },
      { title: "Audit contradictions", detail: "Compare home, about, product, legal, author, and profile pages for inconsistent facts." },
      { title: "Align templates", detail: "Generate repeated identity fields from shared data and preserve meaningful local context." },
      { title: "Review evidence", detail: "Remove unsupported superlatives and make verifiable sources easy to inspect." },
    ],
    pitfalls: [
      { title: "Keyword substitution", detail: "Replacing a real name with changing marketing phrases weakens stable identity." },
      { title: "Invented authority", detail: "Fake profiles, awards, reviews, or citations create risk rather than trust." },
      { title: "Ambiguous product ownership", detail: "Readers should not need to infer how the parent company and product relate." },
    ],
    measurement: ["Count unresolved name variations, conflicting descriptions, missing ownership relationships, broken profile links, and mismatches between visible content and schema.", "Review how major systems describe the entity, but retain screenshots, dates, prompts, and sources before drawing conclusions."],
    future: "As agents act on behalf of users, identity errors can affect transactions and permissions, not only descriptions. Verified, maintained entity relationships will become an operational requirement.",
    takeaways: ["Entities need canonical homes.", "Consistency must be factual, not mechanical.", "Relationships should be explicit.", "External evidence must be legitimate.", "Identity data needs ownership and review."],
    faq: [
      { question: "Is entity SEO just consistent naming?", answer: "No. It also includes disambiguation, relationships, evidence, canonical identity, and contradiction control." },
      { question: "Should descriptions be identical everywhere?", answer: "Core facts should agree, but wording can adapt to context without changing meaning." },
      { question: "What should a startup document first?", answer: "Official name, purpose, canonical URL, products, ownership relationships, contact information, and approved descriptions." },
    ], references: [schema, googleStructured],
  },
  {
    slug: "content-structure-ai-retrieval",
    lead: "Retrieval systems often work with passages rather than complete pages. A useful section therefore needs enough local context to remain accurate after extraction.",
    overview: ["Semantic chunking separates content around changes in subject or purpose. Publishers do not control every downstream chunking method, but they can create stable boundaries with descriptive headings, focused paragraphs, lists, tables, and explicit references.", "Write for the reader first. Good chunk structure is also good information design: one question per section, clear terms, nearby evidence, and minimal dependence on vague references such as ‘this’ or ‘the above’."],
    principles: [
      { title: "One purpose per section", detail: "A section should define, explain, compare, or instruct without mixing unrelated tasks." },
      { title: "Local completeness", detail: "Include the subject and necessary qualifier near important claims so extraction does not change meaning." },
      { title: "Descriptive boundaries", detail: "Headings should name the question or concept rather than serve as decorative slogans." },
      { title: "Evidence proximity", detail: "Place a source or method close to the claim it supports." },
    ],
    workflow: [
      { title: "Map reader questions", detail: "Turn the search or task journey into a hierarchy of distinct questions." },
      { title: "Draft answer-first sections", detail: "Open with a direct answer, then supply mechanism, evidence, example, and limits." },
      { title: "Test extraction", detail: "Copy individual sections without their page context and check whether they remain clear and accurate." },
      { title: "Remove boilerplate", detail: "Keep repeated navigation, promotion, and generic introductions from overwhelming the useful text." },
    ],
    pitfalls: [
      { title: "Clever but vague headings", detail: "A heading such as ‘The big shift’ gives retrieval systems and skimming readers little context." },
      { title: "Claims separated from sources", detail: "Distant footnotes can make extracted passages look unsupported." },
      { title: "Fragmented micro-sections", detail: "Excessive headings can destroy narrative and produce chunks without enough substance." },
    ],
    measurement: ["Review heading specificity, section focus, unsupported pronouns, source proximity, boilerplate ratio, and whether priority questions receive direct answers.", "Use retrieval simulations as diagnostic models, not proof of how every external platform chunks a page."],
    future: "Content will be consumed increasingly as passages, summaries, tool results, and agent context. Documents that preserve meaning at several levels of compression will be more resilient.",
    takeaways: ["Pages are often retrieved as passages.", "Sections need local context.", "Headings should describe meaning.", "Evidence belongs near claims.", "Test extracted sections independently."],
    faq: [
      { question: "What is semantic chunking?", answer: "It is the division of content around changes in meaning or purpose rather than only a fixed character count." },
      { question: "How long should a section be?", answer: "Long enough to answer its question clearly and no longer than needed. There is no universal word count." },
      { question: "Do more headings improve retrieval?", answer: "Only when they represent real, useful boundaries. Decorative fragmentation can make content worse." },
    ], references: [googleAi, { label: "W3C: headings and labels", url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html" }],
  },
  {
    slug: "create-citation-ready-content",
    lead: "Citation-ready content gives another system enough reason to attribute a specific claim to a source without hiding uncertainty or provenance.",
    overview: ["Retrieval answers whether content can be found for a question. Citation readiness asks whether the retrieved material is specific, supportable, attributable, current, and preferable to alternatives.", "Not every paragraph needs to become a citation target. Prioritize original definitions, documented methods, carefully sourced explanations, real examples, and data whose collection process can be inspected."],
    principles: [
      { title: "Specific claims", detail: "State exactly what is known, under which conditions, and with which important limits." },
      { title: "Visible provenance", detail: "Identify the source, method, author, date, and revision state where they affect trust." },
      { title: "Primary evidence", detail: "Prefer original documentation, standards, research, and first-party data over chains of summaries." },
      { title: "Honest uncertainty", detail: "Separate measured fact, external report, inference, estimate, and opinion." },
    ],
    workflow: [
      { title: "Select citation targets", detail: "Identify the definitions, findings, frameworks, and examples that deserve attribution." },
      { title: "Attach evidence", detail: "Place the strongest relevant source close to each material claim and explain what it supports." },
      { title: "Expose method and limits", detail: "For original work, document inputs, timing, exclusions, and uncertainty." },
      { title: "Review freshness", detail: "Update time-sensitive claims and show meaningful modification dates." },
    ],
    pitfalls: [
      { title: "Citation decoration", detail: "A list of references does not support claims unless the relationship is clear." },
      { title: "False precision", detail: "Unverifiable numbers and confident estimates weaken the entire source." },
      { title: "Circular sourcing", detail: "Several articles repeating one unsupported assertion do not create independent evidence." },
    ],
    measurement: ["Audit claim-to-source coverage, primary-source share, author and date visibility, broken references, unsupported quantitative language, and revision history.", "Observed citations are useful evidence, but absence from a small prompt sample is not proof that a page can never be cited."],
    future: "Publishers will need clearer provenance as answers combine more sources and modalities. Content operations should treat evidence metadata as part of the document, not a final editorial garnish.",
    takeaways: ["Retrieval is not the same as citation readiness.", "Specificity makes claims defensible.", "Primary evidence is preferable.", "Methods and limits should be visible.", "Citation observations require careful sampling."],
    faq: [
      { question: "What makes a page citable?", answer: "Useful specificity, credible evidence, clear provenance, accurate authorship, freshness, and relevance to the question all contribute." },
      { question: "Do outbound links reduce authority?", answer: "Responsible links to supporting evidence improve transparency. Their value should be judged by usefulness and credibility." },
      { question: "Can a product page be citation-ready?", answer: "Yes for verifiable product facts, documentation, and methods, provided marketing claims remain accurate and supportable." },
    ], references: [googleAi, { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" }],
  },
  {
    slug: "technical-ai-crawlability-checklist",
    lead: "Before a system can understand or cite content, it needs a reliable way to request the URL, receive the intended document, and follow its important relationships.",
    overview: ["Crawlability is not one robots.txt check. It includes DNS and server availability, HTTP status, redirect behavior, canonical identity, rendered content, navigation, sitemaps, robots controls, and authentication boundaries.", "Crawler policies differ. Decide intentionally which systems may access which content, document that decision, and test the production responses rather than copying a generic robots file."],
    principles: [
      { title: "Stable responses", detail: "Important URLs should return the intended status and content without redirect loops, intermittent errors, or device-dependent failure." },
      { title: "Explicit control", detail: "Use robots.txt for crawl management and supported page directives for indexing or snippet controls; do not confuse their purposes." },
      { title: "Rendered meaning", detail: "Core content and links should exist in the delivered or reliably rendered document." },
      { title: "Canonical consistency", detail: "Internal links, sitemap entries, metadata, and redirects should agree on the preferred URL." },
    ],
    workflow: [
      { title: "Fetch as an anonymous client", detail: "Record status, headers, body, rendering requirements, and performance for each priority template." },
      { title: "Review crawler controls", detail: "Compare robots rules, meta directives, headers, authentication, and content-use policy with the intended access decision." },
      { title: "Trace discovery", detail: "Confirm navigation and contextual HTML links lead to canonical pages and that sitemaps contain only valid preferred URLs." },
      { title: "Test failure states", detail: "Inspect soft 404s, rate limits, bot protection, regional behavior, and client-rendering failures." },
    ],
    pitfalls: [
      { title: "Using robots.txt for removal", detail: "A crawl block is not the same as a noindex instruction and can prevent a crawler from seeing page directives." },
      { title: "Sitemap-only pages", detail: "A sitemap can aid discovery but does not replace navigable internal links." },
      { title: "Testing source, not output", detail: "Build-time metadata is irrelevant if the production response differs." },
    ],
    measurement: ["Track successful fetch rate, status distribution, canonical mismatches, blocked priority URLs, orphan pages, rendered-content parity, sitemap validity, and server latency.", "Maintain a dated access matrix by crawler category because user-agent behavior and publisher policy can change."],
    future: "Sites will serve humans, search crawlers, answer engines, and action-oriented agents. Access policy will become a product and governance decision as much as a technical configuration.",
    takeaways: ["Crawlability begins with reliable HTTP.", "Robots controls have distinct purposes.", "Core meaning must survive rendering.", "Sitemaps do not repair orphan pages.", "Test production responses repeatedly."],
    faq: [
      { question: "Does robots.txt prevent indexing?", answer: "Not reliably. Google documents robots.txt primarily as crawl management; use appropriate indexing controls or access restrictions for removal goals." },
      { question: "Should every AI crawler be allowed?", answer: "That is a publisher policy decision. Evaluate discovery benefits, content-use preferences, capacity, privacy, and legal requirements." },
      { question: "Is server-side rendering mandatory?", answer: "No, but important content must be reliably available to the intended clients. Test actual rendered outcomes." },
    ], references: [googleRobots, { label: "Google Search: robots meta specifications", url: "https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag" }],
  },
  {
    slug: "rag-search-content-discovery",
    lead: "Retrieval-augmented generation connects an answer model to external evidence, but the full discovery path begins before retrieval and continues after a passage enters context.",
    overview: ["A simplified pipeline contains source discovery, crawling, parsing, chunking, representation, indexing, query interpretation, retrieval, reranking, context assembly, generation, and attribution.", "A page can fail at any stage. Improving prose cannot fix blocked access; improving crawlability cannot make an ambiguous passage relevant; retrieval does not guarantee the generated answer will cite or preserve it."],
    principles: [
      { title: "Separate stages", detail: "Diagnose discovery, extraction, retrieval, synthesis, and citation independently." },
      { title: "Preserve provenance", detail: "Identifiers and source metadata should remain attached to content throughout the pipeline." },
      { title: "Evaluate end to end", detail: "Component accuracy matters, but user-facing groundedness depends on the complete system." },
      { title: "Expect provider differences", detail: "External platforms use different indexes, tools, policies, models, and attribution interfaces." },
    ],
    workflow: [
      { title: "Map the intended question", detail: "Define which user need the source can answer and which passage contains the evidence." },
      { title: "Test source extraction", detail: "Verify meaningful text, headings, tables, and metadata survive parsing." },
      { title: "Evaluate retrieval", detail: "Use representative queries, hard negatives, freshness cases, and permission boundaries." },
      { title: "Inspect grounded answers", detail: "Check whether generated claims follow retrieved evidence and whether attribution points to the correct source." },
    ],
    pitfalls: [
      { title: "Calling every search RAG", detail: "Retrieval architectures vary; the label alone explains little about indexes, ranking, or grounding." },
      { title: "Assuming retrieval proves truth", detail: "Indexes can contain stale, irrelevant, conflicting, or malicious material." },
      { title: "Optimizing only embeddings", detail: "Access, parsing, reranking, context limits, and generation can dominate failure." },
    ],
    measurement: ["Measure source coverage, extraction fidelity, retrieval relevance, evidence recall, groundedness, attribution correctness, latency, freshness, and permission compliance.", "For external systems, describe only observable behavior. Do not present inferred proprietary pipeline details as verified facts."],
    future: "Retrieval is becoming more agentic and multi-step. Systems may reformulate questions, inspect several sources, call tools, and revise answers, increasing the importance of durable provenance and machine-operable interfaces.",
    takeaways: ["RAG is a multi-stage system.", "Failures must be localized by stage.", "Retrieved content is not automatically true.", "Provenance should survive the pipeline.", "External platform mechanics require cautious inference."],
    faq: [
      { question: "Does RAG eliminate hallucinations?", answer: "No. It can provide evidence, but retrieval and generation can still fail. Evaluation and controls remain necessary." },
      { question: "What is reranking?", answer: "A second selection stage that reorders candidate results using a more precise relevance method." },
      { question: "Why might a crawled page not be retrieved?", answer: "Its passages may be poorly extracted, weakly matched, stale, outranked, filtered, or absent from the specific retrieval index." },
    ], references: [googleAi, { label: "NIST: AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" }],
  },
  {
    slug: "how-ai-platforms-discover-sources",
    lead: "Major AI assistants can use different combinations of learned model knowledge, web search, partner indexes, direct browsing, retrieval systems, and product-specific citation interfaces.",
    overview: ["The exact ranking and selection systems are largely proprietary and change over time. Responsible analysis distinguishes published platform documentation, repeatable observation, and inference.", "A cross-platform strategy should therefore focus on accessible primary material, explicit entities, strong passage structure, source provenance, and real authority rather than reverse-engineering one temporary answer format."],
    principles: [
      { title: "Document the mode", detail: "Record whether web search or browsing was active, the product surface, account state, location, date, and model label when visible." },
      { title: "Sample repeated observations", detail: "One answer is an anecdote; use controlled prompt sets and repetitions to describe patterns." },
      { title: "Inspect source quality", detail: "Evaluate whether a citation supports the nearby claim rather than counting links alone." },
      { title: "Avoid hidden-system certainty", detail: "Do not claim to know proprietary weights or permanent preferences without primary evidence." },
    ],
    workflow: [
      { title: "Create a neutral question set", detail: "Cover branded, non-branded, definitional, procedural, comparative, and recommendation needs." },
      { title: "Run controlled samples", detail: "Keep timing and settings documented, repeat observations, and store complete outputs." },
      { title: "Classify outcomes", detail: "Separate mentions, linked citations, unlinked attributions, correct representation, and factual errors." },
      { title: "Connect to site evidence", detail: "Investigate access, source quality, entity clarity, and passage relevance before proposing changes." },
    ],
    pitfalls: [
      { title: "Provider folklore", detail: "Confident tactical claims often outlive the interface behavior that inspired them." },
      { title: "Prompt cherry-picking", detail: "Selecting only favorable outputs destroys the value of the measurement." },
      { title: "Citation-count equivalence", detail: "A citation can be irrelevant, incorrect, negative, or attached to a minor claim." },
    ],
    measurement: ["Report observation rate, citation rate, citation support, representation accuracy, source diversity, volatility, and resulting qualified traffic where available.", "Publish methodology with results and label inferences clearly so another reviewer can reproduce the observation."],
    future: "Discovery surfaces will converge with agents that search, compare, transact, and remember user context. Publisher success will depend on trustworthy information and reliable actions, not only answer citations.",
    takeaways: ["Platforms do not share one retrieval system.", "Product mode and date matter.", "Repeated samples beat anecdotes.", "Citation quality matters more than count.", "Proprietary mechanisms require epistemic humility."],
    faq: [
      { question: "Which AI platform is easiest to optimize for?", answer: "There is no durable universal answer. Build strong web foundations and measure the platforms relevant to your audience." },
      { question: "Can a citation test be reproduced exactly?", answer: "Often not exactly because outputs and indexes change, but a documented sampling method can be repeated and compared." },
      { question: "Does a brand mention equal visibility?", answer: "It is one observation. Assess accuracy, context, source attribution, consistency, and user outcome as well." },
    ], references: [googleAi, { label: "OpenAI: overview of web crawlers", url: "https://platform.openai.com/docs/bots" }],
  },
  {
    slug: "measure-ai-visibility",
    lead: "AI visibility measurement is credible only when it separates directly observed outputs, technical diagnostics, modeled estimates, and business outcomes.",
    overview: ["There is no universal rank position across generative systems. Responses can change with time, mode, model, location, context, and wording. Measurement should use a declared sample rather than imply complete coverage.", "A balanced scorecard tracks whether content is accessible, whether important questions retrieve it in observed tests, whether representation is accurate, and whether discovery produces useful visits or actions."],
    principles: [
      { title: "Define the observation unit", detail: "Specify the prompt, platform, mode, date, locale, repetition count, and expected topic." },
      { title: "Retain evidence", detail: "Store outputs, citations, timestamps, and page states so changes can be reviewed." },
      { title: "Label estimates", detail: "A readiness score or modeled probability should never be presented as an observed citation." },
      { title: "Measure outcomes", detail: "Connect discovery to qualified referrals, engagement, leads, or other approved goals where attribution permits." },
    ],
    workflow: [
      { title: "Choose priority question sets", detail: "Base them on real audience needs across discovery, comparison, decision, and support journeys." },
      { title: "Capture a baseline", detail: "Measure technical access, source presence, citations, representation, and referrals before intervention." },
      { title: "Change one coherent layer", detail: "Bundle related fixes but document what changed and why." },
      { title: "Repeat and review", detail: "Use the same sample, quantify volatility, and have a person inspect source support and representation." },
    ],
    pitfalls: [
      { title: "One-number dashboards", detail: "Composite scores hide whether a problem is technical, editorial, observational, or commercial." },
      { title: "Unstable prompt sets", detail: "Changing the questions and the website together makes comparison meaningless." },
      { title: "Ignoring negative context", detail: "A mention is not positive if the system describes the brand inaccurately or cites it for the wrong claim." },
    ],
    measurement: ["Use four panels: access and readiness, observed source presence, representation and citation quality, and business outcomes. Include sample size and collection dates.", "Treat causal claims carefully. Visibility can change because the site, platform, index, competition, query mix, or measurement method changed."],
    future: "Measurement standards will mature, but platform volatility will remain. Transparent sampling and evidence retention will matter more than increasingly elaborate opaque scores.",
    takeaways: ["There is no universal AI rank.", "Observed and modeled metrics must be separated.", "Prompt samples need version control.", "Representation quality matters.", "Business outcomes complete the scorecard."],
    faq: [
      { question: "What is the best AI visibility metric?", answer: "No single metric is sufficient. Use a scorecard spanning access, observed presence, representation quality, and outcomes." },
      { question: "How often should tests run?", answer: "Choose a cadence that matches content and platform change while controlling cost and avoiding overreaction to daily variance." },
      { question: "Can referral traffic identify every AI visit?", answer: "No. Referrer behavior and privacy constraints vary, so referral analytics provide partial evidence." },
    ], references: [googleAi],
  },
  {
    slug: "why-content-becomes-ai-invisible",
    lead: "Useful content can disappear from AI-assisted discovery because quality at the page level does not guarantee access, extraction, retrieval, or citation at the system level.",
    overview: ["Diagnose invisibility as a pipeline. First determine whether the URL is reachable and canonical. Then inspect rendered text, section structure, query relevance, evidence, freshness, and observed source selection.", "The phrase ‘AI ignored this page’ is usually too broad. A system may never have discovered it, may have extracted it poorly, may not consider it relevant, or may use its evidence without visible attribution."],
    principles: [
      { title: "Access before prose", detail: "A blocked, broken, or client-empty page cannot be rescued by better wording." },
      { title: "Extraction before authority", detail: "Verify that the useful text survives parsing and is associated with the correct heading and source." },
      { title: "Relevance before volume", detail: "A focused answer to a real question is more retrievable than a broad page that never becomes specific." },
      { title: "Evidence before promotion", detail: "Unsupported marketing claims are weak source material even when the page is technically perfect." },
    ],
    workflow: [
      { title: "Locate the failing stage", detail: "Test HTTP, rendering, canonicalization, extraction, query match, and observed citation in that order." },
      { title: "Compare competing sources", detail: "Identify which pages are selected and what evidence, clarity, or freshness they provide." },
      { title: "Make the smallest useful repair", detail: "Fix the diagnosed boundary rather than rewriting every page around speculation." },
      { title: "Re-test with controls", detail: "Repeat the same observation set and document platform variance." },
    ],
    pitfalls: [
      { title: "Assuming an indexing issue", detail: "Search indexing and a particular AI retrieval index are related in some systems but not interchangeable." },
      { title: "Adding generic length", detail: "More words can dilute the passage that contains the answer." },
      { title: "Claiming fixed exclusion percentages", detail: "Without a disclosed representative dataset, universal percentages are not defensible." },
    ],
    measurement: ["Record status, rendered content, canonical identity, inbound paths, section extraction, question alignment, evidence quality, freshness, and observed source presence.", "A stage-based report turns ‘invisible’ into an actionable diagnosis and makes uncertainty explicit."],
    future: "As retrieval systems use more modalities and agentic steps, visibility failures will become harder to infer from the final answer alone. Publishers will need better traces on their own side of the boundary.",
    takeaways: ["Content quality is only one pipeline stage.", "Diagnose before rewriting.", "Extraction can destroy useful meaning.", "Specific evidence beats generic length.", "Avoid unsupported universal statistics."],
    faq: [
      { question: "Why is a ranking page absent from AI answers?", answer: "The system may use a different index, passage selection method, freshness state, or source mix, or may not show all sources it used." },
      { question: "Will adding more content help?", answer: "Only if it fills a real information or evidence gap without weakening focus." },
      { question: "How do I know which stage failed?", answer: "Test access, rendering, canonical identity, extraction, relevance, and observed citations separately." },
    ], references: [googleAi, googleRobots],
  },
  {
    slug: "practical-geo-strategy",
    lead: "A practical generative engine optimization program coordinates existing web, content, evidence, analytics, and governance work around machine-assisted discovery.",
    overview: ["GEO should not become a factory for speculative pages. It is an operating discipline: identify important audience questions, make authoritative answers accessible and extractable, observe relevant surfaces, and improve from evidence.", "Engineering owns reliable delivery and controls. Content owns clarity and usefulness. Subject experts own factual review. Analytics owns the measurement method. Governance sets claims, privacy, and automation boundaries."],
    principles: [
      { title: "Question-led planning", detail: "Prioritize real audience decisions and tasks rather than generating keyword permutations." },
      { title: "Shared ownership", detail: "Assign technical, editorial, subject, measurement, and approval responsibilities." },
      { title: "Evidence-first publication", detail: "Create pages when the organization can add a clear explanation, method, tool, example, or original evidence." },
      { title: "Controlled iteration", detail: "Version changes, retain baselines, and review effects without claiming false causality." },
    ],
    workflow: [
      { title: "Frame the program", detail: "Choose audiences, surfaces, question sets, outcomes, exclusions, and review cadence." },
      { title: "Audit the foundation", detail: "Assess crawl access, architecture, entity identity, content gaps, evidence, and analytics." },
      { title: "Build coherent clusters", detail: "Publish a canonical hub and supporting pages with distinct purposes and reciprocal contextual links." },
      { title: "Operate the loop", detail: "Observe, diagnose, improve, validate, publish, and measure on a documented cadence." },
    ],
    pitfalls: [
      { title: "Scaled commodity content", detail: "Many low-value pages add contradiction, maintenance cost, and weak user experiences." },
      { title: "Optimization without governance", detail: "Automated claims and unreviewed schema can expose legal and trust risks." },
      { title: "Platform-specific panic", detail: "Chasing every interface change prevents durable technical and editorial work." },
    ],
    measurement: ["Review technical readiness, cluster coverage, evidence quality, observed representation, qualified traffic, maintenance burden, and correction rate.", "A quarterly strategy review should retire obsolete assumptions and pages as deliberately as it adds new work."],
    future: "GEO will likely settle into normal discovery operations. The durable differentiator will be the organization’s ability to produce accurate knowledge and maintain it across human and machine interfaces.",
    takeaways: ["GEO is an operating discipline.", "Real questions should drive content.", "Ownership crosses several teams.", "Clusters need distinct page purposes.", "Governance and maintenance are part of optimization."],
    faq: [
      { question: "Who should own GEO?", answer: "A cross-functional owner should coordinate web engineering, content, subject experts, analytics, and governance." },
      { question: "How quickly should results appear?", answer: "There is no reliable universal timeline because crawling, indexing, retrieval, competition, and platform updates vary." },
      { question: "Should every company launch a GEO program?", answer: "Only when machine-assisted discovery matters to its audience and the company can maintain useful, accurate source material." },
    ], references: [googleAi, { label: "Google Search: guidance on generative AI content", url: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" }],
  },
  {
    slug: "90-day-ai-visibility-roadmap",
    lead: "A 90-day roadmap creates enough time to establish a baseline, repair foundational problems, publish coherent improvements, and perform one responsible measurement cycle.",
    overview: ["The schedule is a planning frame, not a promise of external visibility. Crawling and platform behavior remain outside the publisher’s control. Success means completing verified improvements and creating a repeatable operating loop.", "Sequence matters. Technical access and canonical identity come before large content changes. Measurement design comes before claiming improvement. Publication comes with review and maintenance ownership."],
    principles: [
      { title: "Weeks 1–3: baseline", detail: "Define audiences and questions, inventory pages and entities, capture technical health, and record observed source presence." },
      { title: "Weeks 4–6: foundations", detail: "Repair access, rendering, canonicals, navigation, sitemaps, orphan pages, and identity contradictions." },
      { title: "Weeks 7–9: knowledge", detail: "Strengthen the pillar, supporting pages, section structure, sources, authorship, and internal relationships." },
      { title: "Weeks 10–12: validation", detail: "Test production output, repeat the baseline sample, inspect representation, and set the next review cycle." },
    ],
    workflow: [
      { title: "Assign owners and evidence", detail: "Every task needs an accountable owner, completion test, and retained artifact." },
      { title: "Limit work in progress", detail: "Complete the highest-impact cluster before opening many unrelated topics." },
      { title: "Publish behind quality gates", detail: "Require factual, editorial, accessibility, metadata, schema, and link review." },
      { title: "Close with decisions", detail: "Document what changed, what was observed, what remains unknown, and what to do next." },
    ],
    pitfalls: [
      { title: "Promising citations by day 90", detail: "The team controls site quality and measurement, not external system selection." },
      { title: "Starting with new articles", detail: "Publishing on a broken or contradictory foundation compounds cleanup." },
      { title: "Ending without maintenance", detail: "Freshness and correctness decay unless owners and review dates are explicit." },
    ],
    measurement: ["Use deliverable metrics during the program: repaired URLs, resolved contradictions, reviewed sections, valid schema, contextual links, and completed observations.", "Use external outcomes as evidence with uncertainty, not as guaranteed acceptance criteria."],
    future: "After the first cycle, shift from project mode to a quarterly portfolio: maintain important sources, deepen proven clusters, remove weak material, and refine measurement.",
    takeaways: ["Ninety days is a planning frame.", "Baseline before intervention.", "Repair foundations before scaling content.", "Quality gates protect trust.", "End with an owned maintenance loop."],
    faq: [
      { question: "Can AI visibility improve in 90 days?", answer: "Site readiness can improve substantially. External discovery changes may appear sooner or later and should not be guaranteed." },
      { question: "How large should the first cluster be?", answer: "Large enough to answer the priority journey without duplicating purpose. Quality and maintenance capacity matter more than a fixed count." },
      { question: "What happens after day 90?", answer: "Review evidence, prioritize the next constraint, maintain published sources, and repeat the measurement cycle." },
    ], references: [googleAi, googleRobots, googleStructured],
  },
] as const;

export function getVisibilityGuide(slug: string) {
  return visibilityGuides.find((guide) => guide.slug === slug);
}
