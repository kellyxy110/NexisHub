import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteNexisLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "SiteNexis — AI Retrieval & Machine Trust Intelligence",
  description: "See how AI systems retrieve, interpret, trust, cite, and recommend your website with 16 intelligence agents and 12 explainable scores.",
  alternates: { canonical: "/products/sitenexis" },
  openGraph: {
    title: "SiteNexis — The machine view of your website",
    description: "AI retrieval and machine trust intelligence from NexisHub.",
    url: "/products/sitenexis",
  },
};

const layers = [
  ["Layer 1", "Technical foundation", "Crawlability, SEO signals, link topology, performance, robots, sitemaps, canonicals, and structured access."],
  ["Layer 2", "Machine readability", "Entity clarity, schema, semantic trust, citation readiness, chunk quality, and AI extractability."],
  ["Layer 3", "AI visibility", "Retrieval readiness, perception graphs, surface inclusion probability, and explainable visibility scoring."],
  ["Layer 4", "Machine trust", "Six-stage retrieval simulation, temporal authority, contradiction detection, and recommendation mapping."],
] as const;

const process = [
  ["01", "Full-site crawl", "Renders and maps up to 500 pages, removes boilerplate, extracts semantic chunks, and identifies entities while respecting robots.txt."],
  ["02", "Parallel analysis", "SEO, schema, AI readability, entity intelligence, citation probability, and semantic trust agents run across the domain."],
  ["03", "AI visibility scoring", "Six weighted signals form an explainable visibility score, with every deduction tied to a named issue."],
  ["04", "Machine trust", "Layer 4 models retrieval, credibility, schema alignment, external validation, contradictions, and trust decay."],
  ["05", "Information gain", "The engine compares the search cohort, finds evidence and entity gaps, and classifies page intent with Scout."],
  ["06", "Global fix plan", "Issues become one dependency-aware P0/P1/P2 roadmap with impact, effort, and a complete report."],
] as const;

const capabilities = [
  ["Retrieval simulation", "Models extraction, chunking, ranking, compression, answer generation, and citation eligibility."],
  ["Entity intelligence", "Maps named entities and scores consistency, disambiguation, and external validation depth."],
  ["Machine trust", "Measures credibility consistency, schema alignment, contradictions, authority, and decay signals."],
  ["Citation probability", "Estimates citation eligibility using factual density, claim specificity, and authority signals."],
  ["Recommendation surfaces", "Maps likely inclusion across AI Overviews, chat retrieval, voice assistants, and agents."],
  ["Explainable action plan", "Turns every issue into a named recommendation ordered by priority, impact, and dependency."],
] as const;

const pricing = [
  { name: "Free", price: "$0", note: "One audit per month", features: ["1 audit / month", "Layer 1–2 modules", "PDF export", "No credit card"], href: siteNexisLinks.audit, featured: false },
  { name: "Starter", price: "$29", suffix: "/month", note: "For independent developers", features: ["50 audits / month", "Layer 1–3 modules", "PDF reports", "Email support"], href: `${siteNexisLinks.signup}?plan=starter`, featured: false },
  { name: "Pro", price: "$79", suffix: "/month", note: "The full intelligence stack", features: ["Unlimited audits", "All four layers", "Machine Trust", "Competitive analysis", "Priority support"], href: `${siteNexisLinks.signup}?plan=pro`, featured: true },
  { name: "Agency", price: "$249", suffix: "/month", note: "For managed portfolios", features: ["Unlimited audits", "Bulk domain scanning", "White-label reports", "API access", "Dedicated manager"], href: siteNexisLinks.contact, featured: false },
] as const;

export default function SiteNexisPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SiteNexis",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "AI Retrieval and Machine Trust Intelligence platform.",
    url: siteNexisLinks.home,
    brand: { "@type": "Brand", name: "NexisHub" },
    offers: pricing.map((plan) => ({ "@type": "Offer", name: plan.name, price: plan.price.replace("$", ""), priceCurrency: "USD" })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <SiteHeader />
      <main className="sn-page">
        <section className="sn-hero">
          <div className="sn-hero-grid" aria-hidden="true" />
          <div className="shell sn-hero-inner">
            <div className="sn-hero-copy">
              <Link className="sn-breadcrumb" href="/products">NexisHub products <span>/</span> SiteNexis</Link>
              <p className="eyebrow"><span /> AI retrieval + machine trust intelligence</p>
              <h1>The machine view<br />of your website.</h1>
              <p>SiteNexis models how AI systems retrieve, interpret, trust, cite, and recommend your content—showing exactly where machine understanding forms and where it breaks.</p>
              <div className="sn-hero-actions">
                <a className="button button--sn" href={siteNexisLinks.audit} data-analytics="sitenexis-run-audit">Run free audit <Arrow /></a>
                <a className="sn-text-link" href={siteNexisLinks.methodology}>Read the methodology <Arrow /></a>
              </div>
              <div className="sn-proof"><span>Free</span><span>No account required</span><span>Results in about 60 seconds</span></div>
            </div>

            <div className="sn-console" aria-label="Conceptual SiteNexis intelligence report">
              <div className="sn-console-top"><span><i /> SiteNexis intelligence</span><small>16 agents active</small></div>
              <div className="sn-console-score"><div><small>Machine Trust</small><strong>84</strong><span>Illustrative interface</span></div><div className="sn-score-orbit"><i /><i /><i /><b>84</b></div></div>
              <div className="sn-console-metrics"><div><span>71</span><small>AI Visibility</small></div><div><span>62</span><small>Citation probability</small></div><div><span>88</span><small>Retrieval ready</small></div></div>
              <div className="sn-agent-list"><span><i />Entity intelligence <b>Complete</b></span><span><i />Semantic trust <b>Complete</b></span><span><i />Retrieval simulation <b>Running</b></span><span><i />Surface mapping <b>Queued</b></span></div>
            </div>
          </div>
          <div className="shell sn-hero-foot"><span>16 intelligence agents</span><span>12 explainable scores</span><span>4 dependency layers</span><span>6-stage retrieval model</span></div>
        </section>

        <section className="sn-problem">
          <div className="shell sn-problem-grid">
            <p className="kicker">The machine-first web</p>
            <div><h2>AI systems don&apos;t read pages.<br /><span>They retrieve, rank, and cite chunks.</span></h2><p>Your content passes through extraction, semantic chunking, ranking, compression, answer generation, and citation filtering. Traditional audits see the page. SiteNexis examines the complete retrieval path.</p></div>
          </div>
          <div className="shell sn-pipeline" aria-label="Six-stage AI retrieval pipeline">
            {['Extract','Chunk','Rank','Compress','Generate','Cite'].map((stage, index) => <div key={stage}><span>0{index + 1}</span><strong>{stage}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>)}
          </div>
        </section>

        <section className="sn-layers">
          <div className="shell">
            <div className="sn-section-heading"><div><p className="kicker kicker--light">The intelligence stack</p><h2>Four layers.<br />One coherent model.</h2></div><p>Each layer depends on the one beneath it. Scores stay traceable because machine trust is built from observable signals, not a black box.</p></div>
            <div className="sn-layer-list">{layers.map(([label, title, text], index) => <article key={label}><span>0{index + 1}</span><div><small>{label}</small><h3>{title}</h3></div><p>{text}</p><i aria-hidden="true" /></article>)}</div>
          </div>
        </section>

        <section className="sn-process">
          <div className="shell">
            <div className="sn-section-heading sn-section-heading--dark"><div><p className="kicker">How it works</p><h2>From domain<br />to decision roadmap.</h2></div><a className="sn-text-link sn-text-link--dark" href={siteNexisLinks.methodology}>Full methodology <Arrow /></a></div>
            <div className="sn-process-grid">{process.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          </div>
        </section>

        <section className="sn-capabilities">
          <div className="shell">
            <div className="sn-capability-title"><p className="kicker">Intelligence modules</p><h2>Twelve scores.<br /><span>Every one explainable.</span></h2><p>No composite number without a sub-score breakdown. Every deduction maps to an issue and every issue maps to an action.</p></div>
            <div className="sn-capability-grid">{capabilities.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div className="sn-capability-icon"><i /><i /><i /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="sn-surfaces">
          <div className="shell sn-surfaces-grid">
            <div><p className="kicker kicker--light">Recommendation surfaces</p><h2>One audit.<br />Every major AI surface.</h2><p>SiteNexis estimates where content can surface and identifies the measurable structural signals blocking inclusion.</p><a className="sn-text-link" href={siteNexisLinks.docs}>Explore the documentation <Arrow /></a></div>
            <div className="sn-surface-list"><span><i className="g" />Google AI Overviews <b>Structure + authority</b></span><span><i className="c" />ChatGPT browsing <b>Retrieval + citation</b></span><span><i className="p" />Perplexity <b>Evidence + freshness</b></span><span><i className="a" />Claude web search <b>Semantic trust</b></span><span><i className="m" />Gemini <b>Entity confidence</b></span></div>
          </div>
        </section>

        <section className="sn-pricing" id="pricing">
          <div className="shell"><div className="sn-pricing-heading"><p className="kicker">Simple, published pricing</p><h2>Start free.<br /><span>Scale with intelligence.</span></h2><a href={siteNexisLinks.pricing}>Compare every feature <Arrow /></a></div>
            <div className="sn-pricing-grid">{pricing.map((plan) => <article className={plan.featured ? "is-featured" : ""} key={plan.name}>{plan.featured && <div className="sn-popular">Most popular</div>}<h3>{plan.name}</h3><div className="sn-price"><strong>{plan.price}</strong><span>{'suffix' in plan ? plan.suffix : ''}</span></div><p>{plan.note}</p><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a className={plan.featured ? "button button--sn" : "button button--outline"} href={plan.href} data-analytics={`sitenexis-plan-${plan.name.toLowerCase()}`}>{plan.name === 'Agency' ? 'Contact sales' : plan.name === 'Free' ? 'Run free audit' : 'Get started'} <Arrow /></a></article>)}</div>
            <p className="sn-price-note">Pricing is synchronized with the live SiteNexis pricing page and may change there first.</p>
          </div>
        </section>

        <section className="sn-final"><div className="shell sn-final-inner"><p className="eyebrow"><span /> Free intelligence audit</p><h2>See what AI systems<br />actually extract.</h2><p>Run all available free-layer agents on your domain. No account or credit card required.</p><a className="button button--sn" href={siteNexisLinks.audit} data-analytics="sitenexis-final-audit">Run your first audit <Arrow /></a></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
