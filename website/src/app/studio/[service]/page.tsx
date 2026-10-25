import { notFound } from "next/navigation";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/discovery";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";

import { services } from "@/lib/studio-services";

export function generateStaticParams() { return services.map(({ slug }) => ({ service: slug })); }

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(`${service.name} | NexisHub Studio`, service.summary, `/studio/${service.slug}`);
}

export default async function StudioServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.summary, provider: { "@type": "Organization", name: "NexisHub Studio", url: "https://www.thenexishub.org/studio" }, areaServed: "Africa and international clients", url: `https://www.thenexishub.org/studio/${service.slug}`, mainEntity: { "@type": "FAQPage", mainEntity: service.questions.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } };
  return <><SiteHeader light /><main className="article-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema([{ name: "Home", path: "" }, { name: "Studio", path: "/studio" }, { name: service.name, path: `/studio/${service.slug}` }])) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><header className="article-hero"><div className="shell article-hero-inner"><nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">NexisHub</Link><span>/</span><Link href="/studio">Studio</Link><span>/</span><span>{service.name}</span></nav><p className="eyebrow"><span /> NexisHub Studio</p><h1>{service.name}<br /><em>with evidence behind the work.</em></h1><p className="article-deck">{service.summary}</p><div className="article-byline"><span>Engineering Intelligent Products.</span><span>Custom scope after discovery</span></div></div></header><div className="shell article-layout"><aside className="article-toc"><p>Studio services</p><nav aria-label="Studio services">{services.map((item) => <Link href={`/studio/${item.slug}`} key={item.slug}>{item.name}</Link>)}</nav></aside><article className="article-body"><p className="article-lead">The Studio shapes each engagement around the organisation, users, constraints, and desired outcome. The service is a working discipline, not a fixed technology package.</p><section><h2>What this includes</h2><ul className="article-checklist">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>How the engagement works</h2><p>We begin by defining the problem and the decision the work must support. The scope, exclusions, dependencies, ownership, and acceptance criteria are recorded before implementation. Reviews happen at the points where a decision can still change without avoidable rework.</p><p>Where the work includes AI, the project also documents evidence sources, permissions, evaluation cases, human review, monitoring, and rollback conditions.</p></section><section><h2>Frequently asked questions</h2><div className="article-faq">{service.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section><section className="article-product"><span>Start with the problem</span><h2>Tell us what needs to work better.</h2><p>Share the context, users, timeline, and constraints. We will determine whether a discovery sprint is the right next step.</p><Link className="button button--white" href="/studio">Discuss a Studio engagement <Arrow /></Link></section></article></div></main><SiteFooter /></>;
}
