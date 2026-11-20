/**
 * Phase 2 AdNexis: local-only publisher intake and review-packet preparation.
 * No account is created, data submitted, channel verified or listing published.
 */
import { evaluatePublisherEvidence, type EvidenceOrigin, type PublisherEvidencePassport } from "./adnexis-evidence";

export type PublisherCategory = "technology" | "education" | "business" | "events" | "local-services" | "general";
export type PublisherCurrency = "NGN" | "USD";

export type PublisherIntake = {
  channel: string;
  displayName: string;
  category: PublisherCategory;
  targetAudience: string;
  audienceRegion: string;
  contactHandle: string;
  currency: PublisherCurrency;
  quotedPrice: number | null;
  averagePostViews: number | null;
  evidenceOrigin: EvidenceOrigin;
  evidenceReference: string;
  evidenceObservedOn: string;
  permissionToPrepareReviewPacket: boolean;
  consentToFutureListing: boolean;
};

export type PublisherReviewPacket = {
  packetVersion: 1;
  status: "DRAFT_FOR_MANUAL_REVIEW";
  channelUrl: string;
  channelHandle: string;
  displayName: string;
  category: PublisherCategory;
  targetAudience: string;
  audienceRegion: string;
  contactHandle: string | null;
  currency: PublisherCurrency;
  quotedPrice: number | null;
  averagePostViews: number | null;
  evidence: PublisherEvidencePassport;
  consentToFutureListing: boolean;
  safeguards: readonly string[];
  reviewQuestions: readonly string[];
  verifiedByNexisHub: false;
  submittedToNexisHub: false;
  isPublicListing: false;
};

const categories = new Set<PublisherCategory>(["technology", "education", "business", "events", "local-services", "general"]);
const currencies = new Set<PublisherCurrency>(["NGN", "USD"]);
const handlePattern = /^[A-Za-z][A-Za-z0-9_]{4,31}$/;

function required(value: string, name: string, max: number): string {
  if (typeof value !== "string" || value.trim().length < 3 || value.trim().length > max) {
    throw new Error(`${name} must contain between 3 and ${max} characters.`);
  }
  return value.trim();
}

export function normaliseTelegramChannel(input: string): { handle: string; url: string } {
  if (typeof input !== "string") throw new Error("Enter a public Telegram channel username.");
  const clean = input.trim();
  const match = /^(?:@|https:\/\/t\.me\/)?([A-Za-z][A-Za-z0-9_]{4,31})\/?$/i.exec(clean);
  if (!match || !handlePattern.test(match[1])) {
    throw new Error("Use a public @username or https://t.me/username. Private links and external URLs are not accepted.");
  }
  const handle = match[1].toLowerCase();
  return { handle, url: `https://t.me/${handle}` };
}

function optionalContact(input: string): string | null {
  if (!input.trim()) return null;
  return "@" + normaliseTelegramChannel(input).handle;
}

function optionalAmount(value: number | null, field: string): number | null {
  if (value === null) return null;
  if (!Number.isSafeInteger(value) || value < 0 || value > 1_000_000_000) {
    throw new Error(`${field} must be a non-negative whole number, or left blank.`);
  }
  return value;
}

/**
 * Produces a manually transferable draft. This is NOT registration, approval,
 * identity verification, payment onboarding or a submission endpoint.
 */
export function createPublisherReviewPacket(input: PublisherIntake, asOf: Date = new Date()): PublisherReviewPacket {
  if (input.permissionToPrepareReviewPacket !== true) {
    throw new Error("The publisher must consent to preparing a local review packet.");
  }
  if (!categories.has(input.category)) throw new Error("Choose a supported advertising category.");
  if (!currencies.has(input.currency)) throw new Error("Choose a supported currency.");
  const channel = normaliseTelegramChannel(input.channel);
  const evidence = evaluatePublisherEvidence({
    origin: input.evidenceOrigin,
    reference: input.evidenceReference,
    observedOn: input.evidenceObservedOn,
  }, asOf);
  const safeguards = [
    "This is a local draft; nothing has been sent to NexisHub or published.",
    "Channel ownership, posting authority, geography, views, prices and advertising rights are unverified.",
    "No Telegram bot-admin access, login credentials, payment details or private invite links should be shared.",
    "Manual independent checks and authenticated reviewer approval are required before any public listing.",
  ];
  if (!input.consentToFutureListing) {
    safeguards.push("Publisher has not opted into a future public directory. Do not publish this information.");
  }
  if (input.quotedPrice === null) safeguards.push("Price is not supplied; obtain complete placement terms.");
  if (input.averagePostViews === null || input.averagePostViews === 0) safeguards.push("No usable post-view evidence for a reach comparison.");
  const questions = [
    "Confirm control of the public Telegram channel using a time-limited challenge, without requesting admin privileges.",
    "Ask for recent, independently inspectable post data and document any discrepancies.",
    "Establish the authority to offer advertising and check content/publisher eligibility.",
    "Confirm placement format, duration, fees, cancellation rights and jurisdiction.",
    "Do not approve publication without authenticated independent review and explicit publisher consent.",
  ];
  return {
    packetVersion: 1,
    status: "DRAFT_FOR_MANUAL_REVIEW",
    channelUrl: channel.url,
    channelHandle: channel.handle,
    displayName: required(input.displayName, "Display name", 100),
    category: input.category,
    targetAudience: required(input.targetAudience, "Target audience", 160),
    audienceRegion: required(input.audienceRegion, "Audience region", 100),
    contactHandle: optionalContact(input.contactHandle),
    currency: input.currency,
    quotedPrice: optionalAmount(input.quotedPrice, "Quoted price"),
    averagePostViews: optionalAmount(input.averagePostViews, "Average post views"),
    evidence,
    consentToFutureListing: input.consentToFutureListing === true,
    safeguards,
    reviewQuestions: questions,
    verifiedByNexisHub: false,
    submittedToNexisHub: false,
    isPublicListing: false,
  };
}

/**
 * For an offline review rehearsal only. The caller cannot grant platform
 * authentication or mark a listing verified. A real reviewer service needs
 * server-side identity, immutable audit records, evidence and consent.
 */
export type ReviewerChecklist = {
  reviewerLabel: string;
  decision: "request-evidence" | "reject" | "recommend-approval";
  notes: string;
  channelControlEvidenceInspected: boolean;
  audienceClaimsIndependentlyChecked: boolean;
  pricingTermsInspected: boolean;
  permissionToListChecked: boolean;
};

export type OfflineReviewOutcome = {
  reviewMode: "OFFLINE_REHEARSAL_ONLY";
  recommendation: ReviewerChecklist["decision"];
  notes: string;
  verifiedByNexisHub: false;
  published: false;
  needsAuthenticatedReviewer: true;
};

export function rehearsePublisherReview(packet: PublisherReviewPacket, input: ReviewerChecklist): OfflineReviewOutcome {
  if (packet.status !== "DRAFT_FOR_MANUAL_REVIEW" || packet.isPublicListing || packet.verifiedByNexisHub) {
    throw new Error("Only unpublished, unverified draft packets may be reviewed.");
  }
  const reviewerLabel = required(input.reviewerLabel, "Reviewer label", 100);
  if (reviewerLabel.toLowerCase() === packet.channelHandle.toLowerCase()) {
    throw new Error("The reviewer label must not be the publisher handle.");
  }
  const notes = required(input.notes, "Review notes", 1000);
  if (notes.length < 12) throw new Error("Review notes must contain at least 12 characters.");
  if (!["request-evidence", "reject", "recommend-approval"].includes(input.decision)) {
    throw new Error("Choose an allowed review recommendation.");
  }
  if (input.decision === "recommend-approval") {
    if (!packet.consentToFutureListing) throw new Error("Cannot recommend listing without recorded publisher consent.");
    if (packet.evidence.status === "No evidence supplied" || packet.evidence.status === "Incomplete source details" || packet.evidence.status === "Publisher claim only") {
      throw new Error("Independent source evidence is required before recommending approval.");
    }
    if (!input.channelControlEvidenceInspected || !input.audienceClaimsIndependentlyChecked ||
        !input.pricingTermsInspected || !input.permissionToListChecked) {
      throw new Error("All manual evidence checks must be attested before recommendation.");
    }
  }
  return {
    reviewMode: "OFFLINE_REHEARSAL_ONLY",
    recommendation: input.decision,
    notes,
    verifiedByNexisHub: false,
    published: false,
    needsAuthenticatedReviewer: true,
  };
}
