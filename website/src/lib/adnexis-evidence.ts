/**
 * Publisher Evidence Passport for the read-only AdNexis campaign planner.
 * Source details are user entered. No channel is checked or certified.
 */
export type EvidenceOrigin = "none" | "publisher-claim" | "public-posts" | "third-party-material";
export type PublisherEvidenceInput = {
  origin: EvidenceOrigin;
  reference: string;
  observedOn: string;
};
export type PublisherEvidencePassport = {
  status: "No evidence supplied" | "Publisher claim only" | "Incomplete source details" | "Older source material" | "Reference supplied, unverified";
  sourceLabel: string;
  reference: string | null;
  observedOn: string | null;
  ageDays: number | null;
  verifiedByNexisHub: false;
  notes: string[];
};

const sources: Record<EvidenceOrigin, string> = {
  none: "No evidence source supplied",
  "publisher-claim": "Publisher's own statement",
  "public-posts": "Public posts or statistics supplied by the advertiser",
  "third-party-material": "Third-party material supplied by the advertiser",
};

/** 30 days triggers a freshness question; it does not establish authenticity. */
export function evaluatePublisherEvidence(
  submitted?: PublisherEvidenceInput,
  asOf: Date = new Date(),
): PublisherEvidencePassport {
  const origin = submitted?.origin ?? "none";
  if (!Object.hasOwn(sources, origin)) throw new Error("Choose a valid evidence source.");
  const reference = (submitted?.reference ?? "").trim();
  const observedOn = (submitted?.observedOn ?? "").trim();
  if (reference.length > 240) throw new Error("Evidence reference must be 240 characters or fewer.");
  if (origin === "none" && (reference || observedOn)) {
    throw new Error("Choose the source of your evidence before entering reference details.");
  }
  if (!Number.isFinite(asOf.getTime())) throw new Error("Invalid assessment date.");
  let ageDays: number | null = null;
  if (observedOn) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(observedOn)) {
      throw new Error("Evidence date must use YYYY-MM-DD.");
    }
    const timestamp = Date.parse(observedOn + "T00:00:00Z");
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== observedOn) {
      throw new Error("Evidence date is not a real calendar date.");
    }
    const utcDay = Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), asOf.getUTCDate());
    ageDays = Math.round((utcDay - timestamp) / 86_400_000);
    if (ageDays < 0) throw new Error("Evidence date cannot be in the future.");
  }
  const notes = [
    "Source details are supplied by you. NexisHub has not fetched, inspected or authenticated them.",
    "Subscriber counts and post views do not prove unique reach, location or sales.",
  ];
  let status: PublisherEvidencePassport["status"] = "No evidence supplied";
  if (origin === "none") {
    notes.push("Ask for a dated source and independent confirmation of publisher authority.");
  } else {
    if (!reference) notes.push("Provide a retrievable reference or a description of dated evidence.");
    if (!observedOn) notes.push("Record when you observed the source.");
    if (origin === "publisher-claim") notes.push("Publisher claims require independent checking before payment.");
    if (ageDays !== null && ageDays > 30) notes.push("Source is over 30 days old. Request more recent evidence.");
    if (origin === "publisher-claim") status = "Publisher claim only";
    else if (!reference || !observedOn) status = "Incomplete source details";
    else if (ageDays !== null && ageDays > 30) status = "Older source material";
    else status = "Reference supplied, unverified";
  }
  return {
    status,
    sourceLabel: sources[origin],
    reference: reference || null,
    observedOn: observedOn || null,
    ageDays,
    verifiedByNexisHub: false,
    notes,
  };
}
