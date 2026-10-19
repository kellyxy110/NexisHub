import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = { title: "Terms of Use", description: "Founder-operated NexisHub website terms, pending legal review.", alternates: { canonical: "/legal/terms" } };

export default function TermsPage() {
  return <LegalDocument title="Terms of Use" summary="Terms for using the founder-operated NexisHub website.">
    <h2>1. Website operator and use</h2><p>NexisHub is currently a brand operated by its founder in an individual capacity and is not presented as a CAC-registered company. The About page identifies the founder as Ekeleme Kelechi David, using the founder's confirmed legal name. These draft website terms do not establish separate corporate registration.</p><p>You may use this website for lawful informational purposes. You may not interfere with its operation, attempt unauthorized access, introduce malicious code, or use it to violate another person&apos;s rights.</p>
    <h2>2. Product services</h2><p>NexisHub presents information about products, including SiteNexis, TeachNexis, and EventNexis. Use of a product is governed by that product&apos;s own terms, privacy policy, account rules, and subscription conditions.</p>
    <h2>3. Informational content</h2><p>Brand and product information may evolve. Published pricing and capabilities should be confirmed on the applicable live product before purchase. Nothing on this website is professional, legal, medical, or financial advice.</p>
    <h2>4. Intellectual property</h2><p>The website&apos;s original branding, interface, text, and code are protected by applicable intellectual-property laws. Third-party names and marks belong to their respective owners.</p>
    <h2>5. External links</h2><p>Links to SiteNexis and other services lead to separately operated experiences. NexisHub is not responsible for unrelated third-party content or availability.</p>
    <h2>6. Availability and warranties</h2><p>The website is provided on an “as available” basis. Final warranty disclaimers and limitations must be adapted to the operator&apos;s verified jurisdiction by qualified legal counsel.</p>
    <h2>7. Liability</h2><p>Any limitation of liability is subject to applicable law. The operator&apos;s legal identity, governing law, dispute process, and enforceable liability language remain pending confirmation and review. No unverified statutory rights are waived by this draft.</p>
    <h2>8. Contact</h2><p>Questions can be submitted through the NexisHub contact page. A reliable legal-notice and privacy-contact destination must be verified before these terms are finalized; visitors should not assume that a disabled form is a working legal-notice channel.</p>
  </LegalDocument>;
}
