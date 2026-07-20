import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteNexisLinks } from "@/lib/site-links";

export const metadata: Metadata = { title: "Contact", description: "Contact NexisHub or reach the SiteNexis product team.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <><SiteHeader light /><main className="contact-page"><section className="contact-hero"><div className="shell contact-grid"><div><p className="kicker">Contact NexisHub</p><h1>Start a useful<br />conversation.</h1><p>Partnerships, company questions, product ideas, or press inquiries—send enough context for the right response.</p><div className="contact-product"><span>Need SiteNexis support?</span><a href={siteNexisLinks.contact}>Contact the product team <Arrow /></a></div></div><ContactForm /></div></section></main><SiteFooter /></>;
}
