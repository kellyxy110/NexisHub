import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import styles from "./store.module.css";

export const metadata: Metadata = {
  title: "Store | NexisHub",
  description: "Discover the upcoming NexisHub digital resources and toolkits. Checkout is not yet available.",
  alternates: { canonical: "/store" },
};

const plannedResources = [
  {
    title: "AI Visibility Toolkit",
    category: "Search intelligence",
    description: "A practical collection of checklists and worksheets for reviewing how a website communicates with search engines and AI systems.",
  },
  {
    title: "Product Discovery Workbook",
    category: "Product engineering",
    description: "A structured guide for defining a problem, validating assumptions, and preparing a focused software product brief.",
  },
  {
    title: "Learning Design Templates",
    category: "Education",
    description: "Planned templates for turning lessons into exploration, practice, assessment, and revision activities.",
  },
] as const;

export default function StorePage() {
  return (
    <>
      <SiteHeader light />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="shell">
            <p className="kicker">NexisHub Store</p>
            <h1>Tools worth using.<br /><span>Knowledge worth keeping.</span></h1>
            <p className={styles.intro}>We are preparing digital resources shaped by the work behind our products. This is a preview of the catalogue, not an active shop.</p>
            <p className={styles.notice} role="status"><strong>Coming soon.</strong> Products cannot be purchased or downloaded here yet. No payment is collected.</p>
            <a className={styles.jump} href="#catalogue">Explore planned resources ↓</a>
          </div>
        </section>
        <section className={styles.catalogue} id="catalogue" aria-labelledby="catalogue-title">
          <div className="shell">
            <div className={styles.heading}>
              <p className="kicker">In preparation</p>
              <h2 id="catalogue-title">A small catalogue. A useful beginning.</h2>
              <p>Descriptions are indicative. Contents, availability, pricing, and delivery providers will be confirmed before launch.</p>
            </div>
            <div className={styles.grid}>
              {plannedResources.map((resource, index) => (
                <article className={styles.card} key={resource.title}>
                  <span className={styles.index}>0{index + 1} / Planned resource</span>
                  <p className={styles.category}>{resource.category}</p>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <span className={styles.availability}>Not available for purchase</span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.closing}>
          <div className="shell">
            <h2>Explore what we are already building.</h2>
            <p>The Store will complement our software products, not replace them.</p>
            <Link className="button" href="/products">Explore NexisHub products →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
