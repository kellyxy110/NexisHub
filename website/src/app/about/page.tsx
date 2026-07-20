import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Mark, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "About",
  description: "NexisHub builds connected intelligent software around shared infrastructure, human judgment, and real problems.",
  alternates: { canonical: "/about" },
};

const values = [
  ["Build what matters", "Start with a real human problem and earn the right to add technology."],
  ["Intelligence with integrity", "AI should inform and amplify people—never manipulate or obscure judgment."],
  ["Simplicity wins", "Complex foundations should produce clear, calm experiences."],
  ["Learn relentlessly", "Products improve through observation, evidence, and honest feedback."],
  ["Excellence over hype", "Make verifiable claims, explain the system, and let the work carry the story."],
  ["Human first", "Technology is strongest when it expands what people can understand and create."],
] as const;

export default function AboutPage() {
  return (
    <><SiteHeader light /><main className="about-page">
      <section className="about-hero"><div className="shell"><p className="kicker">About NexisHub</p><h1>Intelligence should make<br /><span>the world more understandable.</span></h1><p>NexisHub is an AI infrastructure company building connected software for work, learning, creation, organization, and better decisions.</p></div></section>
      <section className="about-belief"><div className="shell about-belief-grid"><p className="kicker">What we believe</p><div><h2>Technology should solve real problems. Not create more.</h2><p>We build focused products on a shared foundation so teams get software that feels simple without rebuilding identity, intelligence, analytics, and design for every new idea.</p></div></div></section>
      <section className="about-system"><div className="shell"><div className="about-system-heading"><div><p className="kicker kicker--light">One connected company</p><h2>Products above.<br />Infrastructure below.</h2></div><p>SiteNexis is the first live proof point. Every product that follows inherits the same platform contracts and quality bar.</p></div><div className="about-platform"><div className="about-products"><span>SiteNexis <b>Live</b></span><span>TeachNexis</span><span>LogicLand</span><span>EventNexis</span><span>CareBridge</span></div><div className="about-core"><Mark /><strong>NexisHub platform</strong><small>Identity · Intelligence · Analytics · Design</small></div></div></div></section>
      <section className="about-values"><div className="shell"><div className="about-values-heading"><p className="kicker">Our operating principles</p><h2>How we choose<br />what to build.</h2></div><div className="about-values-grid">{values.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="about-team"><div className="shell about-team-inner"><div><p className="kicker">The people</p><h2>Built with care.<br />Shared when ready.</h2></div><div><p>NexisHub does not publish invented team biographies or placeholder portraits. Founder and team information will appear here only after the people involved approve it.</p><Link className="button" href="/contact">Contact NexisHub <Arrow /></Link></div></div></section>
    </main><SiteFooter /></>
  );
}
