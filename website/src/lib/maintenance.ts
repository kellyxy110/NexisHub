export type LinkHealth = "HEALTHY" | "REDIRECTED" | "DEGRADED" | "BROKEN" | "BLOCKED" | "TIMEOUT" | "UNKNOWN";
export type FreshnessStatus = "CURRENT" | "REVIEW_DUE" | "POSSIBLY_STALE" | "STALE" | "SUPERSEDED" | "RETRACTED" | "UNAVAILABLE" | "UNKNOWN";
export type MaintenanceTaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "BLOCKED" | "COMPLETED" | "CANCELLED";
export type LinkCheckRecord = { url: string; status: LinkHealth; httpStatus: number | null; checkedAt: string | null; redirectUrl?: string; notes?: string };
export type SourceRecord = { title: string; url: string; publisher?: string; publicationDate?: string; lastAccessedAt?: string; lastCheckedAt?: string; expectedReviewIntervalDays?: number; status: FreshnessStatus; notes?: string };
export type MaintenanceTask = { id: string; title: string; category: "SOURCE_REVIEW" | "LINK_CHECK" | "POLICY_REVIEW" | "ACCESSIBILITY" | "LEGAL_REVIEW" | "ROADMAP" | "DOI"; status: MaintenanceTaskStatus; owner: string; dueAt: string | null; evidence: string[] };

export function classifyFreshness(source: Pick<SourceRecord, "publicationDate" | "lastCheckedAt" | "expectedReviewIntervalDays">, now = new Date()) : FreshnessStatus {
  if (!source.lastCheckedAt) return "UNKNOWN";
  const interval = source.expectedReviewIntervalDays ?? 365;
  const dueAt = new Date(new Date(source.lastCheckedAt).getTime() + interval * 86400000);
  return now > dueAt ? "REVIEW_DUE" : "CURRENT";
}
