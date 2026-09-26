import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = { title: "Legal", description: "NexisHub legal documents and publication status.", alternates: { canonical: "/legal" } };

export default function LegalPage() {
  return <><SiteHeader light /><main className="legal-index"><div className="shell"><p className="kicker">Legal center</p><h1>Clear rules.<br /><span>Honest status.</span></h1><p>These documents describe the current NexisHub company website. They remain implementation drafts pending qualified legal counsel and confirmation of the company details, jurisdiction, retention periods, and official legal-contact destination.</p><div className="legal-cards"><Link href="/legal/privacy"><span>01</span><h2>Privacy Policy</h2><p>What the website collects, why, and the controls available to visitors.</p><Arrow /></Link><Link href="/legal/terms"><span>02</span><h2>Terms of Use</h2><p>The rules governing use of the NexisHub company website.</p><Arrow /></Link><Link href="/legal/cookies"><span>03</span><h2>Cookie Policy</h2><p>Essential storage, optional analytics, advertising, and consent choices.</p><Arrow /></Link></div></div></main><SiteFooter /></>;
}
