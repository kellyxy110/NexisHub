export type PublicationStatus = "Draft" | "Planning" | "Pre-Review" | "Peer Review" | "Revision" | "Published" | "Archived";
export type PublicationRecord = {
  slug: string;
  title: string;
  subtitle: string;
  type: "Working Paper" | "Research Note" | "Technical Report" | "White Paper" | "Benchmark";
  status: PublicationStatus;
  version: string;
  datePublished: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  canonicalPath: string;
  doi: string | null;
  reviewLevel: string;
  licence: string;
  dataAvailability: string;
};

export const nriPublications: readonly PublicationRecord[] = [{
  slug: "ai-visibility-index",
  title: "AI Visibility Index: A Framework for Measuring Machine Discovery, Retrieval, and Representation",
  subtitle: "A proposed framework for transparent observation of public information in AI-assisted systems.",
  type: "Working Paper",
  status: "Pre-Review",
  version: "0.1",
  datePublished: "2026-07-27",
  authors: ["Nexis Research Institute", "Ekeleme Kelechi David, Founding Research Lead"],
  abstract: "This working paper proposes a multi-dimensional framework for studying access, identity, semantic clarity, evidence, retrieval presence, representation accuracy, and attribution. It does not publish validated scores or organisation rankings.",
  keywords: ["AI visibility", "information retrieval", "machine discovery", "source attribution", "reproducibility"],
  canonicalPath: "/research/ai-visibility-index",
  doi: null,
  reviewLevel: "Pre-review working paper. Reviewers Vacant / To Be Appointed.",
  licence: "Rights and reuse terms pending confirmation. No open licence is implied.",
  dataAvailability: "No pilot data or organisation-level findings are included.",
}];

export const publicationBySlug = new Map(nriPublications.map((publication) => [publication.slug, publication]));
