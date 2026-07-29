import type { Metadata } from "next";
import Link from "next/link";
import { CitationControls } from "@/components/citation-controls";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { publicationBySlug } from "@/lib/nri-publication-registry";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = publicationBySlug.get((await params).slug) ?? [...publicationBySlug.values()][0]; return { title: `Cite ${item.title}`, description: "Citation and metadata exports for an NRI publication." }; }

export default async function CitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = publicationBySlug.get((await params).slug) ?? [...publicationBySlug.values()][0];
  return <><SiteHeader light /><main className="article-page"><header className="article-hero"><div className="shell article-hero-inner"><nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">NexisHub</Link><span>/</span><Link href="/research">Research</Link><span>/</span><Link href={item.canonicalPath}>{item.title}</Link><span>/</span><span>Cite</span></nav><p className="eyebrow"><span /> Citation metadata · Version {item.version}</p><h1>Cite this<br /><em>publication.</em></h1><p className="article-deck">Use the controls below to copy or download the available metadata. No DOI is registered for this publication.</p></div></header><div className="shell article-layout"><article className="article-body"><section><h2>{item.title}</h2><p>{item.authors.join(", ")} ({item.datePublished.slice(0, 4)}). {item.type}, Version {item.version}. Nexis Research Institute.</p><CitationControls slug={item.slug} /></section><section><h2>Permanent URL</h2><p><a href={`https://nexishub.vercel.app${item.canonicalPath}`}>https://nexishub.vercel.app{item.canonicalPath}</a></p><p><strong>Status:</strong> {item.status}. <strong>Review:</strong> {item.reviewLevel}</p></section><section className="article-callout"><strong>Metadata boundary</strong><p>The exports reflect the current repository record. They do not assert peer review, DOI registration, participant data, or validated findings.</p></section></article></div></main><SiteFooter /></>;
}
