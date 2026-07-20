import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = { title: "Terms of Use", description: "Draft NexisHub company website terms.", alternates: { canonical: "/legal/terms" } };

export default function TermsPage() {
  return <LegalDocument title="Terms of Use" summary="Terms for accessing the NexisHub company website.">
    <h2>1. Website use</h2><p>You may use this website for lawful informational purposes. You may not interfere with its operation, attempt unauthorized access, introduce malicious code, or use it to violate another person&apos;s rights.</p>
    <h2>2. Product services</h2><p>NexisHub presents information about products, including SiteNexis. Use of a product is governed by that product&apos;s own terms, privacy policy, account rules, and subscription conditions.</p>
    <h2>3. Informational content</h2><p>Company and product information may evolve. Published pricing and capabilities should be confirmed on the applicable live product before purchase. Nothing on this website is professional, legal, medical, or financial advice.</p>
    <h2>4. Intellectual property</h2><p>The website&apos;s original branding, interface, text, and code are protected by applicable intellectual-property laws. Third-party names and marks belong to their respective owners.</p>
    <h2>5. External links</h2><p>Links to SiteNexis and other services lead to separately operated experiences. NexisHub is not responsible for unrelated third-party content or availability.</p>
    <h2>6. Availability and warranties</h2><p>The website is provided on an “as available” basis. Final warranty disclaimers and limitations must be adapted to the company&apos;s jurisdiction by qualified legal counsel.</p>
    <h2>7. Liability</h2><p>Any limitation of liability is subject to applicable law. The legal entity, governing law, dispute process, and liability language remain pending legal confirmation.</p>
    <h2>8. Contact</h2><p>Questions can be submitted through the NexisHub contact page. An official legal notice address will be added after corporate details are approved.</p>
  </LegalDocument>;
}
