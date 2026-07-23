import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/newsletter-form";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getPost, visibilityPosts } from "@/lib/posts";
import { siteNexisLinks } from "@/lib/site-links";
import { getVisibilityGuide } from "@/lib/visibility-content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexishub.vercel.app";
const aiDevelopmentPath = "/blog/complete-guide-ai-software-development";
const json = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");
const dateLabel = (value: string) => new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

export const dynamicParams = false;

export function generateStaticParams() {
  return visibilityPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.cluster !== "E") return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: [post.targetKeyword, ...post.tags],
    authors: [{ name: post.author }],
    alternates: { canonical: post.canonicalPath },
    openGraph: {
      type: "article", url: post.canonicalPath, title: post.seoTitle, description: post.seoDescription,
      publishedTime: post.publishedDate, modifiedTime: post.updatedDate, authors: [post.author], tags: [...post.tags],
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.featuredImageAlt }],
    },
    twitter: { card: "summary_large_image", title: post.seoTitle, description: post.seoDescription, images: [post.featuredImage] },
  };
}

export default async function VisibilityArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const guide = getVisibilityGuide(slug);
  if (!post || post.cluster !== "E" || !guide) notFound();

  const related = (post.relatedSlugs ?? []).map(getPost).filter((item) => item !== undefined);
  const toc = [["overview", "The operating idea"], ["principles", "Core principles"], ["workflow", "Implementation workflow"], ["pitfalls", "Common mistakes"], ["measurement", "How to measure it"], ["future", "What comes next"], ["takeaways", "Key takeaways"], ["faq", "Frequently asked questions"], ["references", "References"]] as const;
  const articleSchema = {
    "@context": "https://schema.org", "@type": "TechArticle", headline: post.title, description: post.description,
    image: `${base}${post.featuredImage}`, datePublished: post.publishedDate, dateModified: post.updatedDate,
    author: { "@type": "Organization", name: post.author, url: base }, publisher: { "@type": "Organization", name: "NexisHub", url: base },
    mainEntityOfPage: `${base}${post.canonicalPath}`, articleSection: post.category, keywords: post.tags.join(", "), proficiencyLevel: post.readingLevel,
  };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: base },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: `${base}${post.canonicalPath}` },
  ] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <><SiteHeader light /><main className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(faqSchema) }} />
    <header className="article-hero"><div className="shell article-hero-inner">
      <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">NexisHub</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span>AI Visibility</span></nav>
      <p className="eyebrow"><span /> Cluster E · {slug === "complete-guide-ai-visibility" ? "Pillar guide" : "Field guide"}</p>
      <h1>{post.title}</h1>
      <p className="article-deck">{post.description}</p>
      <div className="article-byline"><span>By {post.author}</span><span>Published <time dateTime={post.publishedDate}>{dateLabel(post.publishedDate)}</time></span><span>{post.readingTime}</span><span>Reviewed {dateLabel(post.updatedDate)}</span></div>
    </div></header>
    <div className="shell article-visual"><Image src={post.featuredImage} alt={post.featuredImageAlt} width={1200} height={630} priority unoptimized /></div>
    <div className="shell article-layout">
      <aside className="article-toc"><p>In this guide</p><nav aria-label="Table of contents">{toc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><div className="article-series"><span>Series</span><strong>{post.series}</strong><small>{post.cluster} · Reviewed guide</small></div></aside>
      <article className="article-body">
        <p className="article-lead">{guide.lead}</p>
        <p>This guide is part of the <Link href="/blog/complete-guide-ai-visibility">NexisHub AI visibility pillar</Link>. For the systems behind retrieval and generation, start with the <Link href={aiDevelopmentPath}>complete guide to AI software development</Link>.</p>

        <section id="overview"><h2>The operating idea</h2>{guide.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-callout"><strong>Editorial boundary</strong><p>NexisHub separates verified platform documentation, repeatable observation, and inference. No optimization can guarantee selection or citation by an external system.</p></div></section>

        <section id="principles"><h2>Core principles</h2><ol className="article-steps">{guide.principles.map((point) => <li key={point.title}><b>{point.title}</b><span>{point.detail}</span></li>)}</ol></section>

        <section id="workflow"><h2>A practical implementation workflow</h2><p>Apply the work in a controlled sequence. Keep a baseline, name an owner, and define the evidence that will show whether each step was completed.</p><ol className="article-steps">{guide.workflow.map((point, index) => <li key={point.title}><b>{index + 1}. {point.title}</b><span>{point.detail}</span></li>)}</ol></section>

        <section id="pitfalls"><h2>Common mistakes</h2>{guide.pitfalls.map((point) => <div key={point.title}><h3>{point.title}</h3><p>{point.detail}</p></div>)}</section>

        <section id="measurement"><h2>How to measure it responsibly</h2>{guide.measurement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-callout article-callout--dark"><strong>Evidence rule</strong><p>Keep observed outputs, diagnostic scores, inferred causes, and business outcomes in separate fields. A modelled score is not a citation, and correlation is not proof of cause.</p></div></section>

        <section id="future"><h2>What comes next</h2><p>{guide.future}</p><p>The durable response is to build pages that are accessible, semantically explicit, useful outside their original layout, and backed by evidence a reader can inspect.</p></section>

        <section id="takeaways"><h2>Key takeaways</h2><div className="article-takeaways">{guide.takeaways.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</p>)}</div></section>

        <section id="faq"><h2>Frequently asked questions</h2><div className="article-faq">{guide.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>

        <section id="references" className="article-references"><h2>References and further reading</h2><ol>{guide.references.map((reference) => <li key={reference.url}><a href={reference.url}>{reference.label}</a></li>)}<li><a href={post.siteNexisSource}>SiteNexis technical field note related to this guide</a></li></ol></section>

        <section className="article-product"><span>Apply the framework</span><h2>See how machines read your website.</h2><p>SiteNexis analyzes crawl structure, semantic clarity, retrieval readiness, entity consistency, and machine-trust signals, then exposes the findings as an explainable action plan.</p><a className="button button--white" href={siteNexisLinks.audit} data-analytics={`article-${post.slug}-sitenexis`}>Run a SiteNexis audit <Arrow /></a></section>

        <section className="article-related"><p className="kicker">Continue the cluster</p><h2>Related NexisHub guides</h2><div>{related.map((item) => <Link href={item.canonicalPath} key={item.slug}><span>{item.category}</span><strong>{item.title}</strong></Link>)}</div></section>
      </article>
    </div>
    <section className="article-newsletter"><div className="shell"><div><p className="kicker kicker--light">NexisHub dispatch</p><h2>Practical intelligence,<br />published carefully.</h2></div><NewsletterForm /></div></section>
  </main><SiteFooter /></>;
}
