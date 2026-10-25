import { pageMetadata } from "@/lib/discovery";
import { ContactForm } from "@/components/contact-form";
import { Arrow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteNexisLinks } from "@/lib/site-links";

export const metadata = pageMetadata("Contact NexisHub", "Contact NexisHub about software development, AI products, Studio engagements or corrections to published articles.", "/contact");

export default function ContactPage() {
  return <><SiteHeader light /><main className="contact-page"><section className="contact-hero"><div className="shell contact-grid"><div><p className="kicker">Contact NexisHub</p><h1>Start a useful<br />conversation.</h1><p>For partnerships, company questions, product ideas, press or privacy enquiries, email <a href="mailto:nexishub.company@gmail.com">nexishub.company@gmail.com</a>. The contact form may be unavailable while its delivery service is configured.</p><div className="contact-product"><span>Need SiteNexis support?</span><a href={siteNexisLinks.contact}>Contact the product team <Arrow /></a></div></div><ContactForm /></div></section></main><SiteFooter /></>;
}
