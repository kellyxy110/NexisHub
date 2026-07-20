import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = { title: "Cookie Policy", description: "Draft NexisHub cookie and local-storage policy.", alternates: { canonical: "/legal/cookies" } };

export default function CookiesPage() {
  return <LegalDocument title="Cookie Policy" summary="How storage and optional analytics are controlled on this website.">
    <h2>1. Essential storage</h2><p>The website may store a consent preference so it remembers whether you accepted or rejected optional analytics. This is necessary to respect your choice.</p>
    <h2>2. Optional analytics</h2><p>When you choose “Allow analytics,” the website may send pseudonymous interaction events such as CTA clicks and scroll depth to the configured analytics provider. No analytics events are intentionally sent before consent.</p>
    <h2>3. Form submissions</h2><p>Contact and newsletter forms do not require advertising cookies. Their delivery providers may process request-security information when a submission is made.</p>
    <h2>4. Current provider status</h2><p>No third-party analytics provider is enabled by the repository alone. The production policy must be updated with provider names, cookie lifetimes, and purposes before credentials are configured.</p>
    <h2>5. Changing your choice</h2><p>You can clear the site&apos;s local storage or use the consent control shown on the website to make a new choice.</p>
  </LegalDocument>;
}
