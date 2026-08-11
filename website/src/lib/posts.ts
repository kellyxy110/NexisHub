import { editorialPosts } from "@/lib/editorial-catalog";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  targetKeyword: string;
  category: string;
  cluster: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  intent: "Informational" | "Commercial" | "Navigational";
  readingTime: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  tags: readonly string[];
  featuredImage: string;
  featuredImageAlt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  series: string;
  readingLevel: string;
  status: "Published" | "Draft";
  relatedSlugs?: readonly string[];
  siteNexisSource?: string;
};

const shared = {
  category: "AI Visibility",
  cluster: "E",
  intent: "Informational" as const,
  author: "NexisHub Editorial",
  publishedDate: "2026-07-23",
  updatedDate: "2026-07-23",
  series: "AI Visibility & Machine Discovery",
  readingLevel: "Technical practitioner",
  status: "Published" as const,
};

const visibilityPost = (post: Omit<BlogPost, keyof typeof shared | "canonicalPath" | "featuredImage">): BlogPost => ({
  ...shared,
  ...post,
  canonicalPath: `/blog/${post.slug}`,
  featuredImage: `/blog/${post.slug}/opengraph-image`,
});

const educationShared = {
  category: "Education Technology",
  cluster: "F",
  intent: "Informational" as const,
  author: "NexisHub Editorial",
  publishedDate: "2026-07-25",
  updatedDate: "2026-07-25",
  series: "Education Technology & TeachNexis",
  readingLevel: "Education leader",
  status: "Published" as const,
};

const educationPost = (post: Omit<BlogPost, keyof typeof educationShared | "canonicalPath" | "featuredImage">): BlogPost => ({
  ...educationShared,
  ...post,
  canonicalPath: `/blog/${post.slug}`,
  featuredImage: `/blog/${post.slug}/opengraph-image`,
});

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "complete-guide-ai-software-development",
    title: "The Complete Guide to AI Software Development (2026)",
    description: "A practical, vendor-neutral guide to designing, evaluating, securing, and operating AI-native software in production.",
    targetKeyword: "AI software development",
    category: "AI Software Development",
    cluster: "A",
    difficulty: "Intermediate",
    intent: "Informational",
    readingTime: "18 min read",
    author: "NexisHub Editorial",
    publishedDate: "2026-07-20",
    updatedDate: "2026-07-20",
    tags: ["AI engineering", "LLMs", "agents", "evaluation", "AI architecture", "production AI"],
    featuredImage: "/blog/ai-software-development-2026.svg",
    featuredImageAlt: "A six-layer AI software system connecting experience, orchestration, intelligence, knowledge, evaluation, and operations.",
    seoTitle: "AI Software Development: The Complete 2026 Guide",
    seoDescription: "Learn how to build reliable AI software in 2026, from use-case design and architecture to evaluation, security, observability, and production operations.",
    canonicalPath: "/blog/complete-guide-ai-software-development",
    series: "AI Software Development",
    readingLevel: "Technical practitioner",
    status: "Published",
    relatedSlugs: ["complete-guide-ai-visibility", "rag-search-content-discovery", "how-ai-platforms-discover-sources"],
  },
  visibilityPost({
    slug: "complete-guide-ai-visibility", title: "The Complete Guide to AI Visibility and Machine Discovery (2026)",
    description: "A comprehensive framework for making useful web content crawlable, understandable, retrievable, defensible, and citable across AI-assisted discovery systems.",
    targetKeyword: "AI visibility", difficulty: "Intermediate", readingTime: "24 min read",
    tags: ["AI visibility", "machine discovery", "GEO", "AI search", "retrieval"],
    featuredImageAlt: "A four-stage path from web crawl to AI citation.",
    seoTitle: "AI Visibility: The Complete Machine Discovery Guide", seoDescription: "Learn how crawl access, semantic clarity, retrieval readiness, and evidence work together to improve AI visibility.",
    relatedSlugs: [
      "ai-visibility-vs-traditional-seo", "ai-readable-website-architecture", "internal-linking-ai-discovery",
      "structured-data-ai-machine-trust", "entity-clarity-ai-systems", "content-structure-ai-retrieval",
      "create-citation-ready-content", "technical-ai-crawlability-checklist", "rag-search-content-discovery",
      "how-ai-platforms-discover-sources", "measure-ai-visibility", "why-content-becomes-ai-invisible",
      "practical-geo-strategy", "90-day-ai-visibility-roadmap",
    ],
    siteNexisSource: "https://sitenexis.vercel.app/blog/link-graph-hub-pages",
  }),
  visibilityPost({
    slug: "ai-visibility-vs-traditional-seo", title: "AI Visibility vs Traditional SEO: What Changes and What Stays the Same",
    description: "A clear comparison of search ranking, AI retrieval, citations, and the technical foundations both disciplines share.",
    targetKeyword: "AI visibility vs SEO", difficulty: "Beginner", readingTime: "15 min read",
    tags: ["AI SEO", "GEO", "technical SEO", "AI search"], featuredImageAlt: "Search ranking and AI retrieval paths compared side by side.",
    seoTitle: "AI Visibility vs SEO: A Practical Comparison", seoDescription: "Understand where AI visibility differs from SEO, where the disciplines overlap, and how to plan one coherent discovery strategy.",
    relatedSlugs: ["complete-guide-ai-visibility", "measure-ai-visibility", "practical-geo-strategy"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/what-is-geo-generative-engine-optimisation-guide",
  }),
  visibilityPost({
    slug: "ai-readable-website-architecture", title: "How to Design a Website Architecture That AI Systems Can Understand",
    description: "Design hubs, routes, navigation, and page relationships that remain legible to people, crawlers, and retrieval systems.",
    targetKeyword: "AI website architecture", difficulty: "Advanced", readingTime: "17 min read",
    tags: ["information architecture", "crawlability", "link graph", "web engineering"], featuredImageAlt: "A website hub connecting related pages in a machine-readable graph.",
    seoTitle: "AI-Readable Website Architecture: A Design Guide", seoDescription: "Build a website structure that exposes clear topics, entities, routes, and relationships to search and AI retrieval systems.",
    relatedSlugs: ["complete-guide-ai-visibility", "internal-linking-ai-discovery", "technical-ai-crawlability-checklist"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/link-graph-internal-topology",
  }),
  visibilityPost({
    slug: "internal-linking-ai-discovery", title: "Internal Linking for AI Discovery: A Practical Architecture Guide",
    description: "Use contextual links, descriptive anchors, hubs, and reciprocal relationships to expose a coherent knowledge graph.",
    targetKeyword: "internal linking for AI", difficulty: "Intermediate", readingTime: "16 min read",
    tags: ["internal linking", "anchor text", "topical authority", "link graph"], featuredImageAlt: "Contextual internal links connecting entities and topic clusters.",
    seoTitle: "Internal Linking for AI Discovery", seoDescription: "Plan internal links that improve navigation, crawl discovery, entity relationships, and topical coherence without over-optimization.",
    relatedSlugs: ["complete-guide-ai-visibility", "ai-readable-website-architecture", "entity-clarity-ai-systems"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/link-graph-anchor-text-entity-signal",
  }),
  visibilityPost({
    slug: "structured-data-ai-machine-trust", title: "Structured Data for AI Products: Schema, Entities, and Machine Trust",
    description: "Implement structured data as an accurate machine-readable description of visible content, not as a shortcut to visibility.",
    targetKeyword: "structured data for AI", difficulty: "Advanced", readingTime: "16 min read",
    tags: ["structured data", "Schema.org", "JSON-LD", "machine trust"], featuredImageAlt: "JSON-LD entities aligned with visible page content.",
    seoTitle: "Structured Data for AI: Schema and Machine Trust", seoDescription: "Learn how to choose, validate, and maintain structured data that accurately represents content and entity relationships.",
    relatedSlugs: ["complete-guide-ai-visibility", "entity-clarity-ai-systems", "create-citation-ready-content"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/schema-markup-ai-trust-signals-2025",
  }),
  visibilityPost({
    slug: "entity-clarity-ai-systems", title: "Entity Clarity: How to Help AI Systems Understand Your Brand",
    description: "Create a consistent, evidence-backed identity across pages so machines can resolve who you are and what you do.",
    targetKeyword: "entity clarity", difficulty: "Intermediate", readingTime: "16 min read",
    tags: ["entity SEO", "knowledge graph", "brand identity", "semantic clarity"], featuredImageAlt: "A central brand entity connected to consistent supporting facts.",
    seoTitle: "Entity Clarity for AI Systems", seoDescription: "Improve machine understanding with consistent names, definitions, relationships, authorship, and corroborating evidence.",
    relatedSlugs: ["complete-guide-ai-visibility", "structured-data-ai-machine-trust", "how-ai-platforms-discover-sources"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/entity-optimization-the-signal-ai-systems-weight-most",
  }),
  visibilityPost({
    slug: "content-structure-ai-retrieval", title: "How to Structure Content for AI Retrieval and Semantic Chunking",
    description: "Write self-contained sections with explicit headings, local context, and evidence that survive extraction from the full page.",
    targetKeyword: "content structure for AI retrieval", difficulty: "Intermediate", readingTime: "17 min read",
    tags: ["semantic chunking", "AI retrieval", "content design", "headings"], featuredImageAlt: "A long article divided into stable, self-contained semantic chunks.",
    seoTitle: "Content Structure for AI Retrieval and Chunking", seoDescription: "Structure headings, sections, definitions, examples, and evidence so extracted content remains useful outside its original page.",
    relatedSlugs: ["complete-guide-ai-visibility", "create-citation-ready-content", "why-content-becomes-ai-invisible"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/aive-chunk-engineering",
  }),
  visibilityPost({
    slug: "create-citation-ready-content", title: "How to Create Content AI Systems Can Cite With Confidence",
    description: "Turn retrievable pages into defensible sources through precise claims, provenance, authorship, freshness, and clear limits.",
    targetKeyword: "citation ready content", difficulty: "Intermediate", readingTime: "16 min read",
    tags: ["AI citations", "provenance", "content quality", "machine trust"], featuredImageAlt: "A sourced claim moving from retrieval into an AI citation.",
    seoTitle: "How to Create Citation-Ready Content for AI", seoDescription: "Make content easier to cite with specific claims, visible evidence, source provenance, accountable authorship, and honest uncertainty.",
    relatedSlugs: ["complete-guide-ai-visibility", "content-structure-ai-retrieval", "measure-ai-visibility"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/pvf-citation-readiness-vs-retrieval",
  }),
  visibilityPost({
    slug: "technical-ai-crawlability-checklist", title: "The Technical AI Crawlability Checklist for Modern Websites",
    description: "Audit status codes, robots controls, rendering, canonicals, sitemaps, navigation, and content access before optimizing semantics.",
    targetKeyword: "AI crawlability checklist", difficulty: "Advanced", readingTime: "17 min read",
    tags: ["AI crawlers", "robots.txt", "technical SEO", "rendering"], featuredImageAlt: "A technical crawl path checking robots, rendering, canonicals, and sitemaps.",
    seoTitle: "Technical AI Crawlability Checklist", seoDescription: "Use this technical checklist to verify that search and AI discovery systems can access, render, identify, and navigate important pages.",
    relatedSlugs: ["complete-guide-ai-visibility", "ai-readable-website-architecture", "90-day-ai-visibility-roadmap"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/dom-robots-txt-audit",
  }),
  visibilityPost({
    slug: "rag-search-content-discovery", title: "RAG, Search, and the New Content Discovery Pipeline",
    description: "Follow content from crawling and indexing through retrieval, ranking, context assembly, generation, and citation.",
    targetKeyword: "RAG and search", difficulty: "Advanced", readingTime: "17 min read",
    tags: ["RAG", "retrieval", "AI search", "context engineering"], featuredImageAlt: "A retrieval-augmented generation pipeline from source pages to grounded answers.",
    seoTitle: "RAG, Search, and Content Discovery", seoDescription: "Understand how retrieval-augmented systems discover, select, assemble, and cite web content, and where visibility can fail.",
    relatedSlugs: ["complete-guide-ai-visibility", "content-structure-ai-retrieval", "how-ai-platforms-discover-sources"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/rag-seo-retrieval-augmented-generation-content-strategy",
  }),
  visibilityPost({
    slug: "how-ai-platforms-discover-sources", title: "How ChatGPT, Claude, Gemini, and Perplexity Discover Sources",
    description: "A provider-aware framework for understanding web search, retrieval, citations, and the limits of outside observation.",
    targetKeyword: "how AI platforms discover sources", difficulty: "Intermediate", readingTime: "17 min read",
    tags: ["ChatGPT", "Claude", "Gemini", "Perplexity", "AI citations"], featuredImageAlt: "Multiple AI discovery surfaces retrieving from a shared set of web sources.",
    seoTitle: "How AI Platforms Discover and Cite Sources", seoDescription: "Compare source discovery across major AI assistants without assuming opaque ranking systems work the same way.",
    relatedSlugs: ["complete-guide-ai-visibility", "rag-search-content-discovery", "create-citation-ready-content"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/how-chatgpt-perplexity-claude-choose-citations",
  }),
  visibilityPost({
    slug: "measure-ai-visibility", title: "How to Measure AI Visibility Without Relying on Vanity Metrics",
    description: "Build a repeatable scorecard for access, retrieval, citations, representation quality, referral outcomes, and change over time.",
    targetKeyword: "measure AI visibility", difficulty: "Advanced", readingTime: "17 min read",
    tags: ["AI visibility metrics", "measurement", "citations", "analytics"], featuredImageAlt: "An AI visibility scorecard separating observations, estimates, and business outcomes.",
    seoTitle: "How to Measure AI Visibility", seoDescription: "Measure AI visibility with repeatable prompts, source observations, technical signals, citation evidence, and business outcomes.",
    relatedSlugs: ["complete-guide-ai-visibility", "create-citation-ready-content", "practical-geo-strategy"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/how-to-increase-citation-probability-ai-search",
  }),
  visibilityPost({
    slug: "why-content-becomes-ai-invisible", title: "Why Good Content Becomes Invisible to AI Systems",
    description: "Diagnose the access, extraction, context, evidence, and maintenance failures that can hide otherwise useful content.",
    targetKeyword: "content invisible to AI", difficulty: "Intermediate", readingTime: "16 min read",
    tags: ["AI invisibility", "content quality", "retrieval failure", "crawlability"], featuredImageAlt: "Useful content fading at different stages of the AI retrieval pipeline.",
    seoTitle: "Why Good Content Becomes Invisible to AI", seoDescription: "Find why useful content disappears between crawl, extraction, retrieval, and citation, then fix the failing layer.",
    relatedSlugs: ["complete-guide-ai-visibility", "content-structure-ai-retrieval", "90-day-ai-visibility-roadmap"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/why-ai-systems-ignore-70-percent-of-your-content",
  }),
  visibilityPost({
    slug: "practical-geo-strategy", title: "A Practical GEO Strategy for Technical and Content Teams",
    description: "Coordinate engineering, content, analytics, and governance around measurable improvements to machine discovery.",
    targetKeyword: "GEO strategy", difficulty: "Intermediate", readingTime: "16 min read",
    tags: ["GEO", "AI visibility", "content operations", "technical SEO"], featuredImageAlt: "Technical and content teams working through a shared GEO operating loop.",
    seoTitle: "A Practical GEO Strategy for 2026", seoDescription: "Build a responsible GEO program across technical access, content structure, entity clarity, evidence, measurement, and iteration.",
    relatedSlugs: ["complete-guide-ai-visibility", "ai-visibility-vs-traditional-seo", "measure-ai-visibility"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/aive-retrieval-readiness-checklist",
  }),
  visibilityPost({
    slug: "90-day-ai-visibility-roadmap", title: "The 90-Day AI Visibility Roadmap for Growing Websites",
    description: "Sequence technical repairs, content improvements, entity alignment, measurement, and review into a realistic twelve-week program.",
    targetKeyword: "AI visibility roadmap", difficulty: "Beginner", readingTime: "16 min read",
    tags: ["AI visibility roadmap", "GEO plan", "content operations", "website audit"], featuredImageAlt: "A twelve-week roadmap from visibility baseline to measured iteration.",
    seoTitle: "A 90-Day AI Visibility Roadmap", seoDescription: "Follow a twelve-week plan to establish a baseline, repair access, strengthen content, align entities, and measure AI visibility.",
    relatedSlugs: ["complete-guide-ai-visibility", "technical-ai-crawlability-checklist", "practical-geo-strategy"],
    siteNexisSource: "https://sitenexis.vercel.app/blog/dom-heading-hierarchy-extraction",
  }),
  visibilityPost({
    slug: "how-ai-systems-discover-websites", title: "How AI Systems Discover and Interpret Websites", description: "Understand the chain of access, interpretation, retrieval, evidence, and representation behind AI-assisted website discovery.", targetKeyword: "how AI systems discover websites", difficulty: "Intermediate", readingTime: "20 min read", tags: ["AI discovery", "web crawling", "retrieval", "machine interpretation"], featuredImageAlt: "A website moving through access, interpretation, retrieval, evidence, and representation stages.", seoTitle: "How AI Systems Discover and Interpret Websites", seoDescription: "A practical framework for understanding how AI-assisted systems access, interpret, retrieve, and represent website content.", relatedSlugs: ["complete-guide-ai-visibility", "rag-search-content-discovery", "technical-ai-crawlability-checklist"], siteNexisSource: "https://sitenexis.vercel.app/blog/how-chatgpt-perplexity-claude-choose-citations",
  }),
  visibilityPost({
    slug: "what-makes-website-citable-by-ai", title: "What Makes a Website Citable by an AI System?", description: "Learn how specific claims, context, provenance, authorship, freshness, and limitations contribute to citation readiness.", targetKeyword: "what makes a website citable by AI", difficulty: "Intermediate", readingTime: "19 min read", tags: ["AI citations", "provenance", "source quality", "content evidence"], featuredImageAlt: "A precise claim connected to local context, provenance, and an inspectable source.", seoTitle: "What Makes a Website Citable by AI Systems", seoDescription: "Understand the practical conditions that make web content easier for AI systems and readers to locate, interpret, and verify.", relatedSlugs: ["complete-guide-ai-visibility", "create-citation-ready-content", "measure-ai-visibility"], siteNexisSource: "https://sitenexis.vercel.app/blog/pvf-citation-readiness-vs-retrieval",
  }),
  visibilityPost({
    slug: "structured-data-for-machine-understanding", title: "Structured Data for Machine Understanding", description: "Implement structured data as an accurate machine-readable description of visible content, entities, and real relationships.", targetKeyword: "structured data for machine understanding", difficulty: "Advanced", readingTime: "19 min read", tags: ["structured data", "Schema.org", "JSON-LD", "machine understanding"], featuredImageAlt: "Structured data entities aligned with visible website content and relationships.", seoTitle: "Structured Data for Machine Understanding", seoDescription: "A practical guide to using accurate Schema.org and JSON-LD markup to clarify visible content and entity relationships.", relatedSlugs: ["structured-data-ai-machine-trust", "entity-clarity-ai-systems", "ai-readable-website-architecture"], siteNexisSource: "https://sitenexis.vercel.app/blog/schema-markup-ai-trust-signals-2025",
  }),
  visibilityPost({
    slug: "why-traditional-seo-does-not-explain-ai-visibility", title: "Why Traditional SEO Does Not Fully Explain AI Visibility", description: "Understand which discovery foundations SEO and AI visibility share and which outputs require separate measurement.", targetKeyword: "traditional SEO and AI visibility", difficulty: "Beginner", readingTime: "18 min read", tags: ["SEO", "AI visibility", "GEO", "search measurement"], featuredImageAlt: "Traditional search results and AI-assisted answers connected by shared web foundations.", seoTitle: "Why SEO Does Not Fully Explain AI Visibility", seoDescription: "Learn why technical SEO remains important while AI retrieval, synthesis, citations, and representation require additional analysis.", relatedSlugs: ["ai-visibility-vs-traditional-seo", "measure-ai-visibility", "practical-geo-strategy"], siteNexisSource: "https://sitenexis.vercel.app/blog/what-is-geo-generative-engine-optimisation-guide",
  }),
  visibilityPost({
    slug: "retrieval-ranking-recommendation-ai-search", title: "Retrieval, Ranking, and Recommendation: How AI Search Differs", description: "Separate candidate retrieval, source selection, answer synthesis, citation, and user action when analysing AI search.", targetKeyword: "retrieval ranking recommendation AI search", difficulty: "Advanced", readingTime: "20 min read", tags: ["AI search", "retrieval", "ranking", "recommendation systems"], featuredImageAlt: "Candidate sources moving through retrieval, selection, synthesis, citation, and user action.", seoTitle: "Retrieval, Ranking, and Recommendation in AI Search", seoDescription: "A systems framework for understanding the distinct stages behind AI-assisted search and source selection.", relatedSlugs: ["rag-search-content-discovery", "how-ai-platforms-discover-sources", "measure-ai-visibility"], siteNexisSource: "https://sitenexis.vercel.app/blog/rag-seo-retrieval-augmented-generation-content-strategy",
  }),
  visibilityPost({
    slug: "audit-framework-ai-readable-websites", title: "A Practical Audit Framework for AI-Readable Websites", description: "Build a repeatable website audit that identifies failing layers, preserves evidence, assigns owners, and avoids unexplained scores.", targetKeyword: "AI-readable website audit", difficulty: "Advanced", readingTime: "20 min read", tags: ["website audit", "AI readability", "technical SEO", "accessibility"], featuredImageAlt: "An audit checklist covering access, meaning, evidence, measurement, and review.", seoTitle: "A Practical Audit Framework for AI-Readable Websites", seoDescription: "Use a repeatable framework to audit technical access, semantic clarity, evidence, accessibility, and AI discovery readiness.", relatedSlugs: ["complete-guide-ai-visibility", "technical-ai-crawlability-checklist", "90-day-ai-visibility-roadmap"], siteNexisSource: "https://sitenexis.vercel.app/blog/aive-retrieval-readiness-checklist",
  }),
  visibilityPost({
    slug: "machine-trust-without-measuring-truth", title: "Measuring Machine Trust Without Pretending to Measure Truth", description: "Define machine trust metrics carefully by separating constructs, proxies, uncertainty, and governance limits.", targetKeyword: "machine trust measurement", difficulty: "Advanced", readingTime: "19 min read", tags: ["machine trust", "AI measurement", "research methods", "uncertainty"], featuredImageAlt: "A measurement framework separating evidence, proxy signals, uncertainty, and interpretation.", seoTitle: "Measuring Machine Trust Without Pretending to Measure Truth", seoDescription: "A careful framework for measuring machine trust signals without confusing proxy metrics with truth or validated outcomes.", relatedSlugs: ["structured-data-ai-machine-trust", "measure-ai-visibility", "complete-guide-ai-visibility"], siteNexisSource: "https://sitenexis.vercel.app/blog/entity-optimization-the-signal-ai-systems-weight-most",
  }),
  visibilityPost({
    slug: "evidence-first-content-human-machine-readers", title: "Building Evidence-First Content for Human and Machine Readers", description: "Design content around claim inventories, source quality, authorship, uncertainty, and correction so it can be evaluated and retrieved responsibly.", targetKeyword: "evidence-first content", difficulty: "Intermediate", readingTime: "19 min read", tags: ["evidence-based content", "technical writing", "citations", "content governance"], featuredImageAlt: "A content claim connected to an author, source, date, limitation, and correction record.", seoTitle: "Evidence-First Content for Human and Machine Readers", seoDescription: "Learn how to write content that exposes claims, sources, uncertainty, authorship, and maintenance responsibilities clearly.", relatedSlugs: ["create-citation-ready-content", "content-structure-ai-retrieval", "complete-guide-ai-visibility"], siteNexisSource: "https://sitenexis.vercel.app/blog/pvf-citation-readiness-vs-retrieval",
  }),
  visibilityPost({
    slug: "technical-anatomy-machine-discoverable-website", title: "The Technical Anatomy of a Machine-Discoverable Website", description: "Trace machine discoverability from HTTP response and rendering through navigation, canonicals, sitemaps, metadata, and accessibility.", targetKeyword: "machine-discoverable website", difficulty: "Advanced", readingTime: "20 min read", tags: ["web engineering", "crawlability", "rendering", "accessibility"], featuredImageAlt: "A technical website path from request and rendering to navigation, metadata, and accessible content.", seoTitle: "The Technical Anatomy of a Machine-Discoverable Website", seoDescription: "A technical guide to the web engineering foundations that help people, crawlers, and retrieval systems reach useful content.", relatedSlugs: ["technical-ai-crawlability-checklist", "ai-readable-website-architecture", "structured-data-ai-machine-trust"], siteNexisSource: "https://sitenexis.vercel.app/blog/dom-robots-txt-audit",
  }),
  visibilityPost({
    slug: "entity-clarity-missing-layer-ai-search", title: "Entity Clarity: The Missing Layer in AI Search", description: "Create a consistent, evidence-backed identity across names, definitions, relationships, authorship, and authoritative references.", targetKeyword: "entity clarity in AI search", difficulty: "Intermediate", readingTime: "19 min read", tags: ["entity clarity", "knowledge graphs", "brand identity", "AI search"], featuredImageAlt: "An organisation entity connected to consistent names, people, products, definitions, and sources.", seoTitle: "Entity Clarity: The Missing Layer in AI Search", seoDescription: "Improve AI search understanding with consistent organisation names, definitions, relationships, authorship, and corroborating evidence.", relatedSlugs: ["entity-clarity-ai-systems", "structured-data-ai-machine-trust", "how-ai-platforms-discover-sources"], siteNexisSource: "https://sitenexis.vercel.app/blog/entity-optimization-the-signal-ai-systems-weight-most",
  }),
  educationPost({
    slug: "ai-in-education-practical-guide", title: "AI in Education: A Practical Guide for Schools and Teachers",
    description: "A practical framework for using AI in schools without replacing teacher judgment, weakening privacy, or adding unnecessary complexity.",
    targetKeyword: "AI in education", difficulty: "Beginner", readingTime: "17 min read",
    tags: ["AI in education", "TeachNexis", "school technology", "teacher productivity"], featuredImageAlt: "A teacher using an AI planning workspace beside lesson materials and student needs.",
    seoTitle: "AI in Education: A Practical Guide for Schools", seoDescription: "Learn how schools can use AI for planning, assessment, feedback, and administration while keeping teachers accountable and students protected.",
    relatedSlugs: ["teacher-productivity-ai-tools", "digital-classroom-ai-workflows", "adaptive-learning-student-analytics"],
  }),
  educationPost({
    slug: "teacher-productivity-ai-tools", title: "Teacher Productivity with AI: Planning, Feedback, and Admin Workflows",
    description: "Use AI to reduce repetitive teaching workload while preserving professional review, classroom context, and student-specific judgment.",
    targetKeyword: "teacher productivity AI", difficulty: "Beginner", readingTime: "15 min read",
    tags: ["teacher productivity", "lesson planning", "AI tools", "TeachNexis"], featuredImageAlt: "A weekly teaching plan organized into lessons, feedback, and administrative tasks.",
    seoTitle: "Teacher Productivity with AI Tools", seoDescription: "See where AI can help teachers plan lessons, draft feedback, organize materials, and reduce administrative work without automating judgment.",
    relatedSlugs: ["ai-in-education-practical-guide", "lesson-planning-question-banks-ai", "digital-classroom-ai-workflows"],
  }),
  educationPost({
    slug: "digital-classroom-ai-workflows", title: "Digital Classroom Workflows: How AI Can Support Everyday Teaching",
    description: "Design classroom workflows where AI helps organize resources, questions, feedback, and follow-up without becoming the center of the lesson.",
    targetKeyword: "digital classroom AI", difficulty: "Intermediate", readingTime: "15 min read",
    tags: ["digital classroom", "AI workflows", "school systems", "education technology"], featuredImageAlt: "A digital classroom workflow linking lesson resources, assessment, feedback, and revision.",
    seoTitle: "Digital Classroom AI Workflows", seoDescription: "Build practical AI-supported classroom workflows for lesson resources, question practice, feedback loops, and teacher review.",
    relatedSlugs: ["ai-in-education-practical-guide", "teacher-productivity-ai-tools", "adaptive-learning-student-analytics"],
  }),
  educationPost({
    slug: "lesson-planning-question-banks-ai", title: "AI Lesson Planning and Question Banks: A Safe Operating Model",
    description: "Create lesson plans and question banks with AI while keeping curriculum alignment, difficulty, bias review, and teacher approval explicit.",
    targetKeyword: "AI lesson planning", difficulty: "Intermediate", readingTime: "15 min read",
    tags: ["lesson planning", "question banks", "assessment", "TeachNexis"], featuredImageAlt: "A lesson plan and question bank passing through curriculum, difficulty, and review checks.",
    seoTitle: "AI Lesson Planning and Question Banks", seoDescription: "Use AI for lesson plans and question banks with clear curriculum mapping, difficulty checks, teacher review, and student-appropriate safeguards.",
    relatedSlugs: ["teacher-productivity-ai-tools", "ai-in-education-practical-guide", "adaptive-learning-student-analytics"],
  }),
  educationPost({
    slug: "adaptive-learning-student-analytics", title: "Adaptive Learning and Student Analytics Without Losing the Human Context",
    description: "Use student analytics to support intervention and personalization while avoiding surveillance, over-scoring, and unsupported conclusions.",
    targetKeyword: "adaptive learning student analytics", difficulty: "Advanced", readingTime: "15 min read",
    tags: ["adaptive learning", "student analytics", "education AI", "learning data"], featuredImageAlt: "A student learning dashboard separating evidence, recommendations, and teacher decisions.",
    seoTitle: "Adaptive Learning and Student Analytics", seoDescription: "Design adaptive learning and student analytics workflows that support teachers with evidence while preserving context, privacy, and human review.",
    relatedSlugs: ["digital-classroom-ai-workflows", "lesson-planning-question-banks-ai", "ai-in-education-practical-guide"],
  }),
] as const;

export const allEditorialPosts: readonly BlogPost[] = [...blogPosts, ...editorialPosts];

export const firstPost = allEditorialPosts[0];
export const visibilityPosts = allEditorialPosts.filter((post) => post.cluster === "E");
export const educationPosts = allEditorialPosts.filter((post) => post.cluster === "F");
export const dynamicGuidePosts = allEditorialPosts.filter((post) => post.cluster !== "A");
export const featuredVisibilityPost = visibilityPosts[0];

export function getPost(slug: string) {
  return allEditorialPosts.find((post) => post.slug === slug);
}
