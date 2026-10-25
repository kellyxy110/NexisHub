import { jsonLd, pageMetadata } from "@/lib/discovery";
import Image from "next/image";
import { Arrow, Mark, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata = pageMetadata("About NexisHub and its Founder", "NexisHub is a founder-operated technology brand in Nigeria building connected AI products and software infrastructure. Meet founder Ekeleme Kelechi David.", "/about");

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
    <><SiteHeader light /><main className="about-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "Person", "@id": "https://www.thenexishub.org/about#founder", name: "Ekeleme Kelechi David", url: "https://www.thenexishub.org/about#founder", jobTitle: "Founder and current individual operator", image: "https://www.thenexishub.org/images/founder.jpeg" }) }} />
      <section className="about-hero"><div className="shell"><p className="kicker">About NexisHub</p><h1>Intelligence should make<br /><span>the world more understandable.</span></h1><p>NexisHub is a founder-operated technology brand developing connected software for work, learning, creation, organization, and better decisions. The founder identifies Abia State, Nigeria, as the operating base. NexisHub is not currently presented as a CAC-registered company.</p></div></section>
      <section className="about-belief"><div className="shell about-belief-grid"><p className="kicker">What we believe</p><div><h2>Technology should solve real problems. Not create more.</h2><p>We build focused products and are developing reusable foundations for identity, intelligence, analytics and design. Shared services are an architectural direction; integration and account arrangements vary by product.</p></div></div></section>
      <section className="about-system"><div className="shell"><div className="about-system-heading"><div><p className="kicker kicker--light">One connected product vision</p><h2>Products above.<br />Infrastructure below.</h2></div><p>SiteNexis is the first live proof point. TeachNexis and EventNexis now extend the same connected product foundation.</p></div><div className="about-platform"><div className="about-products"><span>SiteNexis <b>Live</b></span><span>TeachNexis <b>Live</b></span><span>LogicLand</span><span>EventNexis <b>Live</b></span><span>CareBridge</span></div><div className="about-core"><Mark /><strong>NexisHub platform</strong><small>Identity · Intelligence · Analytics · Design</small></div></div></div></section>
      <section className="about-values"><div className="shell"><div className="about-values-heading"><p className="kicker">Our operating principles</p><h2>How we choose<br />what to build.</h2></div><div className="about-values-grid">{values.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="about-founder" id="founder"><div className="shell founder-grid"><div className="founder-portrait"><Image src="/images/founder.jpeg" alt="Ekeleme Kelechi David, founder of NexisHub" width={720} height={1120} priority /></div><div className="founder-copy"><p className="kicker">The founder</p><h2>Ekeleme Kelechi David</h2><p className="founder-role">Founder and current individual operator · AI visibility researcher · Educator · Developer</p><p>NexisHub currently operates under its founder&apos;s personal name in Abia State, Nigeria, while business registration remains pending. Product availability and legal arrangements for each product should be checked on its own website.</p><p>Ekeleme founded NexisHub and SiteNexis after observing that strong content could rank well in traditional search and still remain invisible to AI systems. His work focuses on making machine understanding measurable, explainable, and useful to the people creating the work.</p><p>He brings together teaching, web development, and research into AI retrieval, machine trust, entity clarity, and the systems that shape how information is discovered.</p><a className="inline-link" href="https://sitenexis.com/founder" target="_blank" rel="noopener noreferrer">Read the founder story <Arrow /></a></div></div></section>
      <section className="trusted-section"><div className="shell trusted-inner"><p className="kicker">Trusted by</p><div className="trusted-list"><a href="https://genshipyard.com" target="_blank" rel="noopener noreferrer">genshipyard<span>.com</span></a><a href="https://truvyx.org" target="_blank" rel="noopener noreferrer">truvyx<span>.org</span></a></div></div></section>
    </main><SiteFooter /></>
  );
}
