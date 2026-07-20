import Link from "next/link";
import { siteNexisLinks } from "@/lib/site-links";
import { NewsletterForm } from "@/components/newsletter-form";
import { PrivacyButton } from "@/components/privacy-controls";

export function Mark({ small = false }: { small?: boolean }) {
  return <span className={small ? "mark mark--small" : "mark"} aria-hidden="true"><span /><span /><span /></span>;
}

export function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={light ? "site-header site-header--light" : "site-header"}>
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="NexisHub home"><Mark small /><span>NexisHub</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/products">Products</Link><Link href="/#platform">Platform</Link><Link href="/#principles">Principles</Link><Link href="/about">Company</Link>
        </nav>
        <div className="nav-actions"><a className="text-link" href={siteNexisLinks.login}>Sign in</a><a className="button button--small" href={siteNexisLinks.audit} data-analytics="sitenexis-start-free">Run free audit <Arrow /></a></div>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation"><Link href="/products">Products</Link><Link href="/#platform">Platform</Link><Link href="/#principles">Principles</Link><Link href="/about">Company</Link><a href={siteNexisLinks.audit} data-analytics="sitenexis-start-free-mobile">Run free audit</a></nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-top">
        <div><Link className="brand brand--footer" href="/"><Mark small /><span>NexisHub</span></Link><p>Intelligent software for the next generation.</p></div>
        <div className="footer-links">
          <div><strong>Products</strong><Link href="/products/sitenexis">SiteNexis</Link><Link href="/products">All products</Link></div>
          <div><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/legal">Legal</Link></div>
          <div><strong>Resources</strong><a href={siteNexisLinks.methodology}>Methodology</a><a href={siteNexisLinks.docs}>SiteNexis docs</a><a href={siteNexisLinks.pricing}>Pricing</a></div>
        </div>
        <NewsletterForm />
      </div>
      <div className="shell footer-bottom"><span>© 2026 NexisHub. All rights reserved.</span><div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/cookies">Cookies</Link><PrivacyButton /></div></div>
    </footer>
  );
}
