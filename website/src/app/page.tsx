import Link from "next/link";
import { Arrow, Mark, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { products } from "@/lib/products";

const principles = [
  ["01", "Observe", "Start with the real problem, not the fashionable one."],
  ["02", "Understand", "Find the signal in complexity before deciding what to build."],
  ["03", "Build", "Turn understanding into software that feels clear and useful."],
  ["04", "Improve", "Learn from real use and make every interaction more effective."],
  ["05", "Scale", "Share the strongest foundations across the entire ecosystem."],
] as const;

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NexisHub",
    description: "NexisHub builds intelligent software that helps people work, learn, create, organize, and make better decisions through AI.",
    url: "https://nexishub.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Intelligent software, one ecosystem</p>
              <h1>Building intelligence<br /><em>into what comes next.</em></h1>
              <p className="hero-lede">NexisHub creates connected AI products that help people work, learn, create, organize, and make better decisions.</p>
              <div className="hero-actions"><a className="button" href="#products" data-analytics="home-explore-products">Explore products <Arrow /></a><Link className="button button--ghost" href="/products/sitenexis" data-analytics="home-see-sitenexis">See SiteNexis</Link></div>
            </div>

            <div className="orbit" aria-label="NexisHub connected product ecosystem">
              <div className="orbit-ring orbit-ring--outer" /><div className="orbit-ring orbit-ring--inner" />
              <div className="orbit-lines" aria-hidden="true"><span className="line line--one" /><span className="line line--two" /><span className="line line--three" /><span className="line line--four" /><span className="line line--five" /></div>
              <div className="orbit-center"><Mark /><strong>NexisHub</strong><small>Shared intelligence</small></div>
              {products.map((product, index) => <div className={`orbit-node orbit-node--${index + 1} accent-${product.accent}`} key={product.name}><i /><span>{product.name}</span></div>)}
            </div>
          </div>
          <div className="shell hero-foot"><p>One foundation</p><p>Five focused products</p><p>Built to work together</p></div>
        </section>

        <section className="products-section" id="products">
          <div className="shell">
            <div className="section-heading"><div><p className="kicker">The ecosystem</p><h2>Focused products.<br />Connected by design.</h2></div><p>Every product solves a distinct problem while sharing the same intelligence, design language, and quality bar.</p></div>
            <div className="product-list">
              {products.map((product, index) => (
                <article className={`product-row accent-${product.accent}`} key={product.name} data-product={product.name}>
                  <span className="product-index">0{index + 1}</span>
                  <div className="product-title"><i /><div><h3>{product.name}</h3><p>{product.eyebrow}</p></div></div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-status"><span>{product.status}</span>{product.href ? <Link href={product.href} aria-label={`Explore ${product.name}`}><Arrow /></Link> : <span className="soon-mark" aria-hidden="true">—</span>}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section" id="platform">
          <div className="shell platform-grid">
            <div className="platform-copy"><p className="kicker kicker--light">The shared foundation</p><h2>Infrastructure that gets smarter with every product.</h2><p>Identity, intelligence, analytics, and design are shared at the platform level. Teams get focused software without fragmented accounts or disconnected experiences.</p><Link className="inline-link" href="/about">Why we build this way <Arrow /></Link></div>
            <div className="platform-visual" aria-label="Shared platform layers">
              <div className="platform-core"><Mark small /><span>Nexis platform</span></div>
              <div className="platform-layer layer--one"><span>NexisAI</span><small>Shared intelligence</small></div>
              <div className="platform-layer layer--two"><span>NexisAuth</span><small>One identity</small></div>
              <div className="platform-layer layer--three"><span>Analytics</span><small>One event language</small></div>
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

        <section className="closing-section"><div className="shell closing-inner"><Mark /><p className="kicker">Intelligence. Connection. Creation.</p><h2>We&apos;re building the foundation for better software.</h2><a className="button" href="#products">Explore the ecosystem <Arrow /></a></div></section>
      </main>

      <SiteFooter />
    </>
  );
}
