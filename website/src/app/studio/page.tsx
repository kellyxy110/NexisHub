import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Mark, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Studio",
  description: "NexisHub Studio designs, engineers, launches, and improves intelligent digital products.",
  alternates: { canonical: "/studio" },
};

const services = [
  ["01", "Product discovery", "Turn a difficult business problem into a clear product opportunity, a defined audience, and a buildable first release."],
  ["02", "Product design", "Create information architecture, user flows, interfaces, prototypes, and design systems that make complex products easier to use."],
  ["03", "Product engineering", "Build reliable web platforms, SaaS products, internal systems, APIs, and cloud infrastructure around the requirements that matter."],
  ["04", "Artificial intelligence", "Apply agents, knowledge systems, semantic search, document intelligence, and workflow automation where they improve a real process."],
  ["05", "Product optimisation", "Improve existing software through architecture review, performance work, accessibility, security, testing, and AI visibility."],
] as const;

const process = [
  ["01", "Discover", "Understand the organisation, users, constraints, risks, and outcome before choosing the solution."],
  ["02", "Research", "Test assumptions, study alternatives, and identify the smallest useful product to build."],
  ["03", "Design", "Make the structure and interaction clear before engineering turns it into a working system."],
  ["04", "Engineer", "Build with deliberate architecture, documented decisions, measurable quality, and continuous testing."],
  ["05", "Launch and improve", "Deploy carefully, observe real use, support the team, and improve the product from evidence."],
] as const;

export default function StudioPage() {
  return <>
    <SiteHeader light />
    <main className="studio-page">
      <section className="studio-hero"><div className="shell studio-hero-grid"><div><p className="kicker">NexisHub Studio</p><h1>Engineering intelligent<br /><span>products that matter.</span></h1><p className="studio-lede">We help organisations turn important ideas into reliable, scalable, and carefully engineered digital products.</p><div className="studio-actions"><a className="button" href="/contact" data-analytics="studio-start-conversation">Start a conversation <Arrow /></a><a className="inline-link" href="#services">Explore capabilities <Arrow /></a></div></div><div className="studio-orbit" aria-label="NexisHub Studio product engineering disciplines"><div className="studio-orbit-ring studio-orbit-ring--outer" /><div className="studio-orbit-ring studio-orbit-ring--inner" /><div className="studio-orbit-core"><Mark small /><strong>Studio</strong><small>Product engineering</small></div><span className="studio-orbit-node studio-orbit-node--one">Strategy</span><span className="studio-orbit-node studio-orbit-node--two">Design</span><span className="studio-orbit-node studio-orbit-node--three">Engineering</span><span className="studio-orbit-node studio-orbit-node--four">Intelligence</span></div></div></section>

      <section className="studio-belief"><div className="shell studio-belief-grid"><p className="kicker">The Studio position</p><div><h2>We are not a web design agency.</h2><p>We are product engineers. We work across discovery, research, design, software engineering, artificial intelligence, launch, and long-term improvement.</p><p>The objective is not to deliver a polished screen and leave. It is to create a product that people can use, a team can operate, and an organisation can continue to improve.</p></div></div></section>

      <section className="studio-services" id="services"><div className="shell"><div className="studio-section-heading"><div><p className="kicker kicker--light">What we do</p><h2>From the first question<br />to the working product.</h2></div><p>Each engagement is shaped around the problem, users, risk, and desired outcome. The technology follows the requirements.</p></div><div className="studio-service-grid">{services.map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="studio-process"><div className="shell"><div className="studio-section-heading"><div><p className="kicker">How we work</p><h2>Clear phases.<br /><span>Shared decisions.</span></h2></div><p>Good delivery makes decisions visible. Every phase produces something the next phase can inspect, question, and improve.</p></div><div className="studio-process-list">{process.map(([number, title, text]) => <article key={title}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="studio-principles"><div className="shell studio-principles-grid"><div><p className="kicker kicker--light">Engineering principles</p><h2>Built for use.<br />Ready for change.</h2></div><div><p>Purpose before features. Evidence before certainty. Security before exposure. Accessibility before polish. Documentation before handover.</p><p>We use the same discipline that guides NexisHub products, adapted to the reality of each client organisation and its team.</p><div className="studio-principle-tags"><span>Human-centred</span><span>AI-ready</span><span>Accessible</span><span>Maintainable</span><span>Data-informed</span><span>Secure by design</span></div></div></div></section>

      <section className="studio-boundaries"><div className="shell studio-boundaries-grid"><div><p className="kicker">A useful boundary</p><h2>Technology is not the strategy.</h2></div><div><p>We do not begin with a preferred stack or a fashionable feature. We begin with the people, decisions, workflow, and constraints that define the product.</p><p>For AI work, that means identifying what the system should do, what it must not do, what evidence it can use, how its output will be evaluated, and where a person remains responsible.</p><Link className="inline-link" href="/contact">Discuss a product problem <Arrow /></Link></div></div></section>

      <section className="studio-cta"><div className="shell studio-cta-inner"><Mark /><p className="kicker">NexisHub Studio</p><h2>Bring us the problem<br />before the solution.</h2><a className="button button--white" href="/contact" data-analytics="studio-cta-contact">Start a conversation <Arrow /></a></div></section>
    </main>
    <SiteFooter />
  </>;
}
