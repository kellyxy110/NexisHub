import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = { title: "Privacy Policy", description: "Draft NexisHub website privacy policy.", alternates: { canonical: "/legal/privacy" } };

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" summary="How the NexisHub company website handles information.">
    <h2>1. Scope</h2><p>This draft applies to the NexisHub company website. SiteNexis is a separate product experience with its own published privacy policy and service terms.</p>
    <h2>2. Information you provide</h2><p>If form delivery is enabled and you submit the contact or newsletter form, we process the information you enter, such as your name, email address, inquiry topic, and message.</p>
    <h2>3. Technical information</h2><p>The hosting platform may process standard request information needed to deliver and secure the website, including IP address, browser type, device information, requested URL, and timestamps. Optional analytics events are sent only after analytics consent.</p>
    <h2>4. How information is used</h2><p>Information is used to respond to inquiries, deliver requested updates, understand website performance, protect the service, and meet legal obligations. NexisHub does not use the company website to sell personal information.</p>
    <h2>5. Service providers</h2><p>The website is intended to be hosted on Vercel. Additional form, analytics, monitoring, or email providers will be listed here before they are enabled in production.</p>
    <h2>6. Retention and security</h2><p>Information should be kept only for as long as necessary for the stated purpose. Exact retention periods and the approved company security contact require legal and operational confirmation before launch.</p>
    <h2>7. Your choices</h2><p>You can reject optional analytics through the website consent control. Requests to access, correct, or delete submitted information can be made through the contact page once the official company contact destination is configured.</p>
    <h2>8. International and legal details</h2><p>The legal entity, governing jurisdiction, controller address, and any region-specific disclosures are pending company confirmation and legal review.</p>
    <h2>9. Changes</h2><p>Material changes will be reflected by updating the date at the top of this policy.</p>
  </LegalDocument>;
}
