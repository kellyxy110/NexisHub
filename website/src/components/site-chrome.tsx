import Link from "next/link";
import Image from "next/image";
import { siteNexisLinks } from "@/lib/site-links";
import { NewsletterForm } from "@/components/newsletter-form";
import { PrivacyButton } from "@/components/privacy-controls";

export function Mark({ small = false }: { small?: boolean }) {
  return <span className={small ? "mark mark--small" : "mark"} aria-hidden="true"><svg viewBox="0 0 64 64"><defs><linearGradient id="nexis-gradient" x1="7" y1="7" x2="57" y2="57"><stop stopColor="#9b2cff"/><stop offset=".48" stopColor="#4c63ff"/><stop offset="1" stopColor="#00d9e8"/></linearGradient></defs><path d="M32 17v-8M45 24l8-5M45 40l8 5M32 47v8M19 40l-8 5M19 24l-8-5M32 17l13 7v16l-13 7-13-7V24z" fill="none" stroke="url(#nexis-gradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="7" r="5" fill="#a42cff"/><circle cx="55" cy="18" r="5" fill="#6472ff"/><circle cx="55" cy="46" r="5" fill="#00d9e8"/><circle cx="32" cy="57" r="5" fill="#159cf2"/><circle cx="9" cy="46" r="5" fill="#6541ff"/><circle cx="9" cy="18" r="5" fill="#902cff"/></svg></span>;
}

export function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={light ? "site-header site-header--light" : "site-header"}>
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="NexisHub home"><Mark small /><span className="brand-name">Nexis<b>Hub</b></span></Link>
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
        <div><Link className="official-logo" href="/" aria-label="NexisHub home"><Image src="/nexishub-logo.jpeg" width={720} height={888} alt="NexisHub — Intelligent Products. Connected Future." /></Link><p>Intelligent software for the next generation.</p></div>
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
