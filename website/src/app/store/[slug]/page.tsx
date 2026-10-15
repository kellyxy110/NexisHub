import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getPlannedStoreResource, plannedStoreResources } from "@/lib/store-catalog";
import styles from "../store.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return plannedStoreResources.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getPlannedStoreResource(slug);
  if (!resource) return { title: "Resource unavailable", robots: { index: false, follow: false } };
  return {
    title: resource.title,
    description: resource.summary,
    alternates: { canonical: `/store/${resource.slug}` },
  };
}

export default async function StoreResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = getPlannedStoreResource(slug);
  if (!resource) notFound();

  return (
    <>
      <SiteHeader light />
      <main className={styles.main}>
        <section className={styles.detailHero}>
          <div className="shell">
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/store">Store</Link><span aria-hidden="true"> / </span><span aria-current="page">{resource.title}</span>
            </nav>
            <p className="kicker">{resource.category}</p>
            <h1>{resource.title}</h1>
            <p className={styles.intro}>{resource.summary}</p>
            <p className={styles.notice} role="status"><strong>In preparation.</strong> This resource is not yet available for purchase or download. Pricing, final contents and delivery method have not been confirmed. No payment is collected.</p>
          </div>
        </section>
        <section className={styles.detailBody}>
          <div className="shell">
            <div className={styles.detailGrid}>
              <div>
                <p className="kicker">Why we're planning it</p>
                <h2>Designed for a real workflow.</h2>
                <p>{resource.purpose}</p>
              </div>
              <aside className={styles.detailAside} aria-label="Resource overview">
                <h2>Who it is for</h2>
                <p>{resource.audience}</p>
                <h2>Possible contents</h2>
                <p>These are ideas being considered, not promised deliverables.</p>
                <ul>{resource.possibleContents.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className={styles.availability}>Status: planned. No checkout or download is available.</p>
              </aside>
            </div>
            <Link className={styles.backLink} href="/store">← Back to all planned resources</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
