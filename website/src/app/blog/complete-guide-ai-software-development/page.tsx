import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { firstPost as post } from "@/lib/posts";
import { siteNexisLinks } from "@/lib/site-links";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexishub.vercel.app";

export const metadata: Metadata = {
  title: post.seoTitle,
  description: post.seoDescription,
  keywords: [post.targetKeyword, ...post.tags],
  authors: [{ name: post.author }],
  alternates: { canonical: post.canonicalPath },
  openGraph: {
    type: "article",
    url: post.canonicalPath,
    title: post.seoTitle,
    description: post.seoDescription,
    publishedTime: post.publishedDate,
    modifiedTime: post.updatedDate,
    authors: [post.author],
    tags: [...post.tags],
    images: [{ url: post.featuredImage, width: 1600, height: 900, alt: post.featuredImageAlt }],
  },
  twitter: { card: "summary_large_image", title: post.seoTitle, description: post.seoDescription, images: [post.featuredImage] },
};

const toc = [
  ["what", "What AI software development means"],
  ["architecture", "The six-layer architecture"],
  ["lifecycle", "A production lifecycle"],
  ["evaluation", "Evaluation before optimization"],
  ["security", "Security and human control"],
  ["best-practices", "Best practices"],
  ["mistakes", "Common mistakes"],
  ["tools", "Choosing tools"],
  ["future", "What comes next"],
  ["takeaways", "Key takeaways"],
  ["faq", "Frequently asked questions"],
] as const;

const faq = [
  { question: "What is AI software development?", answer: "AI software development is the practice of building software whose behavior depends partly on machine learning models. It combines normal application engineering with context design, evaluation, safety controls, and continuous monitoring." },
  { question: "How is AI software different from traditional software?", answer: "Traditional code is largely deterministic. Model outputs are probabilistic and sensitive to instructions, context, tools, and model versions. Teams therefore test behavior with representative evaluations as well as unit and integration tests." },
  { question: "Should every AI product use agents?", answer: "No. Use deterministic code for known rules and workflows for predictable sequences. Use an agent only when the task genuinely requires flexible, model-directed decisions or tool use." },
  { question: "What should a team evaluate first?", answer: "Start with task success on real examples, then measure groundedness, safety, latency, cost, and user impact. The exact scorecard should reflect the risk and purpose of the product." },
  { question: "How do you reduce hallucinations?", answer: "Constrain the task, provide authoritative context, require structured outputs, validate claims and tool results, measure failure cases, and allow the system to abstain or escalate when evidence is weak." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: post.title,
  description: post.description,
  image: `${base}${post.featuredImage}`,
  datePublished: post.publishedDate,
  dateModified: post.updatedDate,
  author: { "@type": "Organization", name: post.author, url: base },
  publisher: { "@type": "Organization", name: "NexisHub", url: base },
  mainEntityOfPage: `${base}${post.canonicalPath}`,
  articleSection: post.category,
  keywords: post.tags.join(", "),
  proficiencyLevel: post.readingLevel,
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: base },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: `${base}${post.canonicalPath}` },
  ],
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
const json = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");

export default function AiSoftwareDevelopmentGuide() {
  return <><SiteHeader light /><main className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(faqSchema) }} />
    <header className="article-hero"><div className="shell article-hero-inner">
      <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">NexisHub</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span>AI Software Development</span></nav>
      <p className="eyebrow"><span /> Cluster A · Pillar guide</p>
      <h1>The Complete Guide to<br /><em>AI Software Development.</em></h1>
      <p className="article-deck">{post.description}</p>
      <div className="article-byline"><span>By {post.author}</span><span>Published <time dateTime={post.publishedDate}>July 20, 2026</time></span><span>{post.readingTime}</span><span>Updated July 20, 2026</span></div>
    </div></header>
    <div className="shell article-visual"><Image src={post.featuredImage} alt={post.featuredImageAlt} width={1600} height={900} priority /></div>
    <div className="shell article-layout">
      <aside className="article-toc"><p>In this guide</p><nav aria-label="Table of contents">{toc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><div className="article-series"><span>Series</span><strong>{post.series}</strong><small>A1 · Pillar</small></div></aside>
      <article className="article-body">
        <p className="article-lead">AI software development is not ordinary application development with a chatbot added at the end. It is the discipline of designing useful software around a component that can interpret, generate, choose, and sometimes act, but cannot be treated as perfectly deterministic.</p>
        <p>The teams that succeed in 2026 treat the model as one part of a larger system. They define the user problem first. They control context. They measure behavior. They keep high-risk actions behind clear permissions. They operate the product with the same rigor applied to any critical service.</p>

        <section id="what"><h2>What AI software development means</h2>
          <p>AI software development combines conventional software engineering with model-centered disciplines such as instruction design, retrieval, tool use, evaluation, and behavioral monitoring. The output is an application whose capabilities depend partly on a model and partly on the system wrapped around it.</p>
          <p>The distinction matters because a model is not a database or a pure function. The same request can produce different outputs. Small context changes can alter behavior. A model upgrade can improve one task and regress another. Normal tests remain essential, but they are no longer sufficient.</p>
          <div className="article-callout"><strong>A useful definition</strong><p>AI software is a product in which learned model behavior contributes to the user outcome, while deterministic software constrains, verifies, and operates that behavior.</p></div>
          <h3>Use the least intelligent mechanism that works</h3>
          <p>Not every problem needs a model. Use code for fixed rules, search for exact retrieval, a workflow for a known sequence, and an agent only when the system must choose its next action under uncertainty.</p>
          <p>Anthropic distinguishes workflows, where code defines the path, from agents, where the model directs its process and tool use. That distinction is more useful than treating every multi-step feature as an agent.</p>
        </section>

        <section id="architecture"><h2>The six-layer architecture</h2>
          <p>A production AI product is easier to reason about when it is separated into six layers. The boundaries do not need to become separate services. They need to become separate responsibilities.</p>
          <ol className="article-steps">
            <li><b>Experience</b><span>The interface, interaction model, feedback controls, and explanation shown to the user.</span></li>
            <li><b>Orchestration</b><span>The deterministic control flow, state machine, permissions, retries, timeouts, and tool boundaries.</span></li>
            <li><b>Intelligence</b><span>The selected models, instructions, structured outputs, routing rules, and fallback behavior.</span></li>
            <li><b>Knowledge</b><span>The approved context, retrieval pipeline, data permissions, freshness rules, and provenance.</span></li>
            <li><b>Evaluation</b><span>The examples, graders, human review, release thresholds, and regression reports that define acceptable behavior.</span></li>
            <li><b>Operations</b><span>Tracing, cost controls, incident handling, model change management, privacy, and production monitoring.</span></li>
          </ol>
          <p>This separation prevents a common architectural mistake: asking the prompt to carry responsibilities that belong in code. Authentication, authorization, irreversible action limits, and financial constraints should not depend on the model remembering an instruction.</p>
        </section>

        <section id="lifecycle"><h2>A production lifecycle for AI software</h2>
          <h3>1. Frame the user outcome</h3><p>Describe the decision or task the product improves. Name the user, the current workflow, the expected value, and the consequence of being wrong. “Add AI” is not a product requirement.</p>
          <h3>2. Establish a non-AI baseline</h3><p>Measure the existing workflow or simplest deterministic solution. A model should earn its place by improving task success, time, coverage, or usability enough to justify added cost and risk.</p>
          <h3>3. Build a representative evaluation set</h3><p>Collect real or carefully reviewed examples before tuning the system. Include normal cases, edge cases, ambiguous requests, missing information, adversarial inputs, and situations where the correct response is to abstain.</p>
          <h3>4. Prototype with a strong model</h3><p>Use a capable model to find the achievable quality ceiling. Once the behavior is understood, test smaller or specialized models against the same evaluations to reduce latency and cost without guessing.</p>
          <h3>5. Design context and tools</h3><p>Give the model the minimum high-quality context needed for the task. Make tools narrow, well named, typed, permission-aware, and observable. Treat tool results as untrusted input until validated.</p>
          <h3>6. Add layered safeguards</h3><p>Combine deterministic validation, model-based checks, access control, rate limits, content policies, and human approval. No single guardrail should be expected to catch every failure.</p>
          <h3>7. Release behind measured boundaries</h3><p>Start with a narrow audience or low-risk scope. Log traces safely. Compare production behavior with the evaluation set. Expand autonomy only when evidence supports it.</p>
          <h3>8. Operate a learning loop</h3><p>Turn production failures and user corrections into reviewed evaluation cases. Version prompts, tools, models, and datasets together so a result can be reproduced and a regression can be explained.</p>
        </section>

        <section id="evaluation"><h2>Evaluation comes before optimization</h2>
          <p>Evaluation is the main difference between a persuasive demo and an engineered AI product. OpenAI recommends establishing evaluation baselines before replacing capable models with smaller ones for cost or speed. Anthropic similarly frames evaluations as a way to expose behavioral changes before they reach users.</p>
          <p>A useful scorecard measures more than answer similarity:</p>
          <ul><li><strong>Task success:</strong> Did the system complete the user’s actual job?</li><li><strong>Groundedness:</strong> Are factual claims supported by approved evidence?</li><li><strong>Tool correctness:</strong> Did the system choose and call the right tool with valid arguments?</li><li><strong>Safety:</strong> Did it respect permissions, privacy, scope, and refusal rules?</li><li><strong>Experience:</strong> Was the result clear, useful, and appropriately uncertain?</li><li><strong>Operations:</strong> Did it meet latency, reliability, and cost budgets?</li></ul>
          <p>Use deterministic graders where the answer is exact. Use model graders for nuanced criteria only after calibrating them against human judgment. Keep human review for high-impact cases and for checking whether the evaluation itself still reflects user needs.</p>
        </section>

        <section id="security"><h2>Security and human control are architecture</h2>
          <p>The OWASP Top 10 for LLM applications places prompt injection at the top of its 2025 risk list. This is not only a prompt-writing problem. Any untrusted document, web page, message, or tool result can contain instructions that conflict with the system’s purpose.</p>
          <p>Design as if the model can be persuaded. Separate data from instructions. Give each tool the least privilege required. Require approval for consequential actions. Validate outputs before they reach databases, users, or external systems. Set maximum turns, time, spend, and action counts.</p>
          <p>NIST organizes AI risk work around four continuous functions: Govern, Map, Measure, and Manage. That is a useful operating model. Governance sets responsibility. Mapping defines context and impact. Measurement produces evidence. Management acts on the evidence.</p>
          <div className="article-callout article-callout--dark"><strong>Human control should be meaningful</strong><p>Approval is useful only when the person can understand the proposed action, its evidence, and its consequence. A vague confirmation dialog is not oversight.</p></div>
        </section>

        <section id="best-practices"><h2>Best practices that survive model changes</h2>
          <ul className="article-checklist">
            <li>Design around a measurable user outcome, not a model capability.</li><li>Keep deterministic rules deterministic.</li><li>Prefer structured outputs at system boundaries.</li><li>Make source provenance visible when facts matter.</li><li>Let the system say it lacks enough evidence.</li><li>Version prompts, tools, datasets, and models.</li><li>Evaluate every meaningful change before release.</li><li>Capture user corrections without silently treating all feedback as truth.</li><li>Expose autonomy gradually and reversibly.</li><li>Monitor quality, cost, latency, and safety together.</li>
          </ul>
        </section>

        <section id="mistakes"><h2>Common mistakes</h2>
          <h3>Starting with a multi-agent architecture</h3><p>More agents create more handoffs, state, latency, and failure modes. Start with one prompt, then a workflow, then one agent with clear tools. Split the system only when evaluations reveal a real boundary.</p>
          <h3>Treating retrieval as a truth guarantee</h3><p>Retrieval can return stale, irrelevant, or malicious content. Rank sources, enforce permissions, preserve provenance, and evaluate whether the answer is supported by the retrieved evidence.</p>
          <h3>Optimizing cost before proving quality</h3><p>A cheap system that fails the task is expensive. Establish the quality target first. Then route simpler work to smaller models and reserve stronger models for cases that need them.</p>
          <h3>Hiding uncertainty</h3><p>Confident language is not confidence. Give the system clear ways to qualify, ask, abstain, or escalate. Show users why an answer deserves trust.</p>
          <h3>Shipping without change control</h3><p>Model providers update systems. Knowledge changes. Prompts evolve. Without versions, evaluation gates, and rollback paths, teams cannot explain why behavior changed.</p>
        </section>

        <section id="tools"><h2>Choosing tools without choosing a religion</h2>
          <p>The right stack follows the product’s constraints. Most teams need an application framework, model API or runtime, structured data store, retrieval system when private knowledge is required, evaluation harness, tracing, and standard observability.</p>
          <p>Choose components by interface quality, data policy, regional availability, latency, price, operational burden, and measured task performance. Avoid building a platform before the product has one proven workflow. Avoid locking core business logic inside a framework that cannot be tested without the framework.</p>
          <p>Protocols such as MCP can standardize how agents discover and use tools, but a protocol does not remove the need for permission design, clear tool contracts, output validation, and evaluation.</p>
        </section>

        <section id="future"><h2>What comes next</h2>
          <p>Three shifts are already shaping the next generation of AI products.</p>
          <h3>Context engineering becomes a core discipline</h3><p>As systems operate across longer tasks, teams must decide what enters context, what stays in memory, what is summarized, and what must be retrieved again. Anthropic describes this as the broader successor to prompt engineering.</p>
          <h3>Evaluation becomes continuous</h3><p>Static benchmark scores cannot describe a product operating with private data, tools, policies, and real users. Evaluation will sit inside development, release, and monitoring workflows.</p>
          <h3>Interfaces expose evidence and control</h3><p>Good AI interfaces will show sources, proposed actions, permissions, progress, uncertainty, and recovery paths. The experience layer will become part of the safety system.</p>
        </section>

        <section id="takeaways"><h2>Key takeaways</h2>
          <div className="article-takeaways"><p><b>01</b>AI software is a system, not a model wrapper.</p><p><b>02</b>Use deterministic code wherever the behavior is known.</p><p><b>03</b>Create evaluations before optimizing models, prompts, or cost.</p><p><b>04</b>Treat context, tools, and model output as security boundaries.</p><p><b>05</b>Expand autonomy only when measured evidence supports it.</p></div>
        </section>

        <section id="faq"><h2>Frequently asked questions</h2><div className="article-faq">{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>

        <section className="article-references"><h2>External authority references</h2><ol>
          <li><a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a></li><li><a href="https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook">NIST AI RMF Playbook</a></li><li><a href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/">OpenAI, A practical guide to building AI agents</a></li><li><a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic, Building effective agents</a></li><li><a href="https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents">Anthropic, Demystifying evals for AI agents</a></li><li><a href="https://genai.owasp.org/llm-top-10/">OWASP Top 10 for LLM and Generative AI Applications</a></li>
        </ol></section>

        <section className="article-product"><span>Applied AI visibility</span><h2>Can AI systems retrieve, understand, and trust your website?</h2><p>SiteNexis analyzes machine visibility across technical, semantic, content, and authority layers, then turns the findings into an explainable action plan.</p><a className="button button--white" href={siteNexisLinks.audit} data-analytics="article-a1-sitenexis">Run a SiteNexis audit <Arrow /></a></section>

        <section className="article-related"><p className="kicker">Continue exploring</p><h2>Related NexisHub work</h2><div><Link href="/research"><span>Research agenda</span><strong>How NexisHub turns questions into reviewed evidence.</strong></Link><a href={siteNexisLinks.methodology}><span>SiteNexis methodology</span><strong>See the analysis system operating in a live product.</strong></a></div></section>
      </article>
    </div>
    <section className="article-newsletter"><div className="shell"><div><p className="kicker kicker--light">NexisHub dispatch</p><h2>Practical intelligence,<br />published carefully.</h2></div><NewsletterForm /></div></section>
  </main><SiteFooter /></>;
}
