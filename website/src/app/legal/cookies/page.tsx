import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = { title: "Cookie Policy", description: "NexisHub cookie and local-storage policy draft.", alternates: { canonical: "/legal/cookies" } };

export default function CookiesPage() {
  return <LegalDocument title="Cookie Policy" summary="How storage and optional analytics are controlled on this website.">
    <h2>1. Essential storage</h2><p>The website may store a consent preference so it remembers whether you accepted or rejected optional analytics. This is necessary to respect your choice.</p>
    <h2>2. Optional analytics</h2><p>When you choose “Allow analytics,” the website may send pseudonymous interaction events such as CTA clicks and scroll depth to the configured analytics provider. No analytics events are intentionally sent before consent.</p>
    <h2>3. Advertising and Google consent</h2><p>Public editorial and research pages include a consent-gated Google AdSense loader. When Google advertising is served, Google and its partners may use advertising cookies or similar technologies based on visits to this website or other websites. Users can review Google&apos;s personalized advertising settings at <a href="https://adssettings.google.com/" rel="noreferrer">Google Ads Settings</a> and available choices for some third-party advertising cookies at <a href="https://www.aboutads.info/choices/" rel="noreferrer">aboutads.info</a>. Google Privacy &amp; Messaging is configured for the site and may present a separate advertising consent message to visitors in covered regions. The first-party “Allow analytics” choice is not a statement of Google advertising consent.</p>
    <h2>4. Form submissions</h2><p>Contact and newsletter forms do not require advertising cookies in the NexisHub interface. Their protected delivery endpoint may process request-security information when a submission is made.</p>
    <h2>5. Current provider status</h2><p>The site is hosted on Vercel. The repository does not hard-code a third-party analytics vendor; optional analytics and form delivery use protected endpoints when configured. Provider names, cookie lifetimes, purposes, and retention details remain subject to operational confirmation and legal review.</p>
    <h2>6. Changing your choice</h2><p>You can clear the site&apos;s local storage or use the “Cookie choices” control shown in the footer to make a new first-party analytics choice. Google advertising choices, where shown, are managed through Google Privacy &amp; Messaging.</p>
  </LegalDocument>;
}
