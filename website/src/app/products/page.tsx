import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Mark, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore the connected NexisHub product ecosystem, from AI visibility intelligence to education, events, learning, and care workflows.",
  alternates: { canonical: "/products" },
};

function ProductAction({ href }: { href: string | null }) {
  if (!href) return <span className="directory-pending">Details will be shared when ready</span>;
  if (href.startsWith("http")) return <a href={href} target="_blank" rel="noopener noreferrer">Explore product <Arrow /></a>;
  return <Link href={href}>Explore product <Arrow /></Link>;
}

export default function ProductsPage() {
  return (
    <>
      <SiteHeader light />
      <main className="products-page">
        <section className="products-hero">
          <div className="shell products-hero-grid">
            <div>
              <p className="kicker">The NexisHub ecosystem</p>
              <h1>Independent products.<br /><span>One intelligent foundation.</span></h1>
            </div>
            <div className="products-hero-note">
              <p>Each NexisHub product focuses on a real problem. Underneath, they share intelligence, identity, analytics, and a common design language.</p>
              <a href="#explore">Explore the ecosystem <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section className="ecosystem-stage" id="explore">
          <div className="ecosystem-halo" aria-hidden="true" />
          <div className="shell ecosystem-stage-inner">
            <div className="ecosystem-intro">
              <p className="kicker kicker--light">Built once. Reused everywhere.</p>
              <h2>Connected below the surface.</h2>
              <p>Products remain focused while the platform handles what should never be rebuilt five times.</p>
            </div>

            <div className="ecosystem-map" aria-label="Six products connected to the NexisHub platform">
              <div className="map-ring map-ring--one" /><div className="map-ring map-ring--two" />
              <div className="map-spokes" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <div className="map-core"><Mark /><strong>NexisHub</strong><small>Platform core</small></div>
              {products.map((product, index) => (
                <div className={`map-product map-product--${index + 1} accent-${product.accent}`} key={product.name}>
                  <span className="map-product-icon"><i /></span>
                  <span><strong>{product.name}</strong><small>{product.status}</small></span>
                </div>
              ))}
            </div>

            <div className="ecosystem-foundation" aria-label="Shared platform capabilities">
              <span>Shared intelligence</span><span>One identity</span><span>Unified analytics</span><span>Common design system</span>
            </div>
          </div>
        </section>

        <section className="product-directory">
          <div className="shell">
            <div className="directory-heading"><p className="kicker">Six products across the NexisHub ecosystem</p><h2>Built around the people<br />who use them.</h2></div>
            <div className="directory-list">
              {products.map((product, index) => (
                <article className={`directory-item accent-${product.accent}`} key={product.name} data-product={product.name}>
                  <div className="directory-number">0{index + 1}</div>
                  <div className="directory-identity"><span className="directory-icon"><i /></span><div><p>{product.eyebrow}</p><h3>{product.name}</h3></div></div>
                  <div className="directory-copy"><p>{product.description}</p><span>For {product.audience}</span></div>
                  <div className="directory-action">
                    <span className="directory-status"><i />{product.status}</span>
                    <ProductAction href={product.href} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ecosystem-cta">
          <div className="shell ecosystem-cta-inner">
            <div><p className="kicker">Start with a flagship</p><h2>Explore the products shaping the NexisHub ecosystem.</h2></div>
            <div><p>SiteNexis and Pnyx are flagship products built on the NexisHub foundation.</p><Link className="button" href="/products/sitenexis" data-analytics="products-explore-sitenexis">Explore SiteNexis <Arrow /></Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
