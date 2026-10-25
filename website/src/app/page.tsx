import { jsonLd, pageMetadata } from "@/lib/discovery";
import { siteAnswers } from "@/lib/site-answers";
import Link from "next/link";
import { Arrow, Mark, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getPost } from "@/lib/posts";
import { services } from "@/lib/studio-services";
import { products } from "@/lib/products";

export const metadata = { ...pageMetadata("NexisHub | AI Software, Research and Product Engineering", "NexisHub builds connected AI products and software infrastructure. Explore our products, engineering guides, research and product development Studio.", "/"), title: { absolute: "NexisHub | AI Software, Research and Product Engineering" } };

const featuredPosts = ["complete-guide-ai-software-development", "complete-guide-ai-visibility", "measure-ai-visibility"].map(getPost).filter((post) => post !== undefined);

const principles = [
  ["01", "Observe", "Start with the real problem, not the fashionable one."],
  ["02", "Understand", "Find the signal in complexity before deciding what to build."],
  ["03", "Build", "Turn understanding into software that feels clear and useful."],
  ["04", "Improve", "Learn from real use and make every interaction more effective."],
  ["05", "Scale", "Share the strongest foundations across the entire ecosystem."],
] as const;

function ProductLink({ href, name }: { href: string; name: string }) {
  const label = `Explore ${name}`;
  if (href.startsWith("http")) return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Arrow /></a>;
  return <Link href={href} aria-label={label}><Arrow /></Link>;
}

export default function Home() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: siteAnswers.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Intelligent software, one ecosystem</p>
              <h1>AI products.<br /><em>Software built for real work.</em></h1>
              <p className="hero-lede">Explore software for search visibility, teaching and events. Work with NexisHub Studio to design, build or improve your own digital product.</p>
              <div className="hero-actions"><a className="button" href="#products" data-analytics="home-explore-products">Explore products <Arrow /></a><Link className="button button--ghost" href="/products/sitenexis" data-analytics="home-see-sitenexis">See SiteNexis</Link></div>
            </div>

            <div className="orbit" aria-label="NexisHub connected product ecosystem">
              <div className="orbit-ring orbit-ring--outer" /><div className="orbit-ring orbit-ring--inner" />
              <div className="orbit-lines" aria-hidden="true"><span className="line line--one" /><span className="line line--two" /><span className="line line--three" /><span className="line line--four" /><span className="line line--five" /></div>
              <div className="orbit-center"><Mark /><strong>NexisHub</strong><small>Shared AI direction</small></div>
              {products.map((product, index) => <div className={`orbit-node orbit-node--${index + 1} accent-${product.accent}`} key={product.name}><i /><span>{product.name}</span></div>)}
            </div>
          </div>
          <div className="shell hero-foot"><p>One foundation</p><p>Six focused products</p><p>Built to work together</p></div>
        </section>

        <section className="trusted-section trusted-section--home"><div className="shell trusted-inner"><p className="kicker">Trusted by</p><div className="trusted-list"><a href="https://genshipyard.com" target="_blank" rel="noopener noreferrer">genshipyard<span>.com</span></a><a href="https://truvyx.org" target="_blank" rel="noopener noreferrer">truvyx<span>.org</span></a></div></div></section>

        <section className="products-section" id="products">
          <div className="shell">
            <div className="section-heading"><div><p className="kicker">The ecosystem</p><h2>Focused products.<br />Connected by design.</h2></div><p>Each product serves a different audience. Live means a public product is available; it does not certify every feature as production-ready. Check each product’s scope and terms before use.</p></div>
            <div className="product-list">
              {products.map((product, index) => (
                <article className={`product-row accent-${product.accent}`} key={product.name} data-product={product.name}>
                  <span className="product-index">0{index + 1}</span>
                  <div className="product-title"><i /><div><h3>{product.name}</h3><p>{product.eyebrow}</p></div></div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-status"><span>{product.status}</span>{product.href ? <ProductLink href={product.href} name={product.name} /> : <span className="soon-mark" aria-hidden="true">—</span>}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section" id="platform">
          <div className="shell platform-grid">
            <div className="platform-copy"><p className="kicker kicker--light">Our platform direction</p><h2>Build strong foundations.<br />Reuse what works.</h2><p>We are working toward shared identity, AI services, analytics and design across NexisHub products. Integration varies by product. A single account across every product is not currently promised.</p><Link className="inline-link" href="/about">Why we build this way <Arrow /></Link></div>
            <div className="platform-visual" aria-label="Planned shared platform layers">
              <div className="platform-core"><Mark small /><span>Platform roadmap</span></div>
              <div className="platform-layer layer--one"><span>NexisAI</span><small>Shared AI direction</small></div>
              <div className="platform-layer layer--two"><span>NexisAuth</span><small>Shared identity planned</small></div>
              <div className="platform-layer layer--three"><span>Analytics</span><small>Common measurement goal</small></div>
              <div className="platform-layer layer--four"><span>Design system</span><small>One quality bar</small></div>
            </div>
          </div>
        </section>

        <section className="principles-section" id="principles">
          <div className="shell">
            <div className="statement"><p className="kicker">How we work</p><h2>Technology should solve real problems. <span>Not create more.</span></h2></div>
            <div className="principles-grid">{principles.map(([number, title, description]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
          </div>
        </section>

        <section className="featured-section">
          <div className="shell"><div className="featured-card">
            <div className="featured-copy"><p className="eyebrow eyebrow--blue"><span /> Now live</p><h2>Be visible wherever your customers search.</h2><p>SiteNexis helps businesses understand and improve how they appear across traditional search and the new world of AI answers.</p><Link className="button button--white" href="/products/sitenexis" data-analytics="home-featured-sitenexis">Explore SiteNexis <Arrow /></Link></div>
            <div className="dashboard" aria-label="Conceptual SiteNexis dashboard preview">
              <div className="dashboard-bar"><span className="mini-brand"><i /> SiteNexis</span><span className="avatar">NH</span></div>
              <div className="dashboard-body"><p>AI visibility overview</p><div className="score-card"><div><small>Visibility score</small><strong>84</strong><span>Illustrative preview</span></div><div className="score-ring"><span>84%</span></div></div>
                <div className="chart-card"><div className="chart-head"><span>Search presence</span><small>Concept view</small></div><svg viewBox="0 0 420 130" role="img" aria-label="Illustrative upward visibility trend"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2d7ff9" stopOpacity=".28" /><stop offset="1" stopColor="#2d7ff9" stopOpacity="0" /></linearGradient></defs><path className="chart-area" d="M0 112 C45 98,55 104,90 91 S145 79,175 83 S230 55,260 63 S315 28,345 38 S390 16,420 12 L420 130 L0 130Z" /><path className="chart-line" d="M0 112 C45 98,55 104,90 91 S145 79,175 83 S230 55,260 63 S315 28,345 38 S390 16,420 12" /></svg></div>
              </div>
            </div>
          </div></div>
        </section>

        <section className="home-studio" aria-labelledby="home-studio-title"><div className="shell">
          <div className="section-heading"><div><p className="kicker">NexisHub Studio</p><h2 id="home-studio-title">Have a problem<br />worth building for?</h2></div><p>Start with your users, current workflow and constraints. We can help scope a first release or improve software you already run.</p></div>
          <div className="home-service-grid">{services.map((service) => <article key={service.slug}><h3><Link href={`/studio/${service.slug}`}>{service.name} <Arrow /></Link></h3><p>{service.summary}</p></article>)}</div>
          <Link className="button" href="/studio#enquiry" data-analytics="home-start-project">Start a project <Arrow /></Link>
        </div></section>

        <section className="home-reading" aria-labelledby="home-reading-title"><div className="shell"><p className="kicker">Engineering, evidence and research</p><h2 id="home-reading-title">Read how we think<br />through the work.</h2>
          <div className="home-reading-grid">{featuredPosts.map((post) => <article key={post.slug}><span>Practical guide</span><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.description}</p><Link className="inline-link" href={`/blog/${post.slug}`} data-analytics={`home-read-${post.slug}`}>Read the guide <Arrow /></Link></article>)}
          <article><span>Pre-review working paper</span><h3><Link href="/research/ai-visibility-index">AI Visibility Index, version 0.1</Link></h3><p>A proposed research framework with stated methods and limitations. It does not report validated scores or rankings.</p><Link className="inline-link" href="/research/ai-visibility-index" data-analytics="home-read-working-paper">Read the working paper <Arrow /></Link></article></div>
          <Link className="inline-link" href="/blog">Browse all guides <Arrow /></Link>
        </div></section>

        <section className="discovery-answers" aria-labelledby="nexishub-answers"><div className="shell"><p className="kicker">About the ecosystem</p><h2 id="nexishub-answers">NexisHub, explained.</h2><div className="article-faq">{siteAnswers.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer} <Link href={item.path}>{item.link}</Link></p></details>)}</div><p><Link href="/editorial-policy">How we publish, check sources and handle corrections</Link></p></div></section>

        <section className="closing-section"><div className="shell closing-inner"><Mark /><p className="kicker">Intelligence. Connection. Creation.</p><h2>We&apos;re building the foundation for better software.</h2><a className="button" href="#products">Explore the ecosystem <Arrow /></a></div></section>
      </main>

      <SiteFooter />
    </>
  );
}
