export type StudioRole = "STUDIO_DIRECTOR" | "STUDIO_OPERATIONS" | "STUDIO_FINANCE" | "STUDIO_DELIVERY" | "UNASSIGNED";
export type StudioLeadershipRecord = { role: StudioRole; displayName: string; status: "Founder-Led" | "Vacant" | "To Be Appointed" | "Pending Confirmation" };
export type ProposalRecord = { proposalNumber: string; clientName: string; status: "DRAFT" | "INTERNAL_REVIEW" | "SENT" | "VIEWED" | "REVISION_REQUESTED" | "ACCEPTED" | "DECLINED" | "EXPIRED" | "WITHDRAWN" | "CONVERTED_TO_SOW"; version: string; legalStatus: "Draft commercial policy. Founder approval required." | "Pending External Legal Review" };
export type SowRecord = { sowNumber: string; proposalNumber: string; clientLegalName: string; status: "DRAFT" | "LEGAL_REVIEW_PENDING" | "CLIENT_REVIEW" | "REVISION" | "APPROVED" | "SIGNED" | "ACTIVE" | "COMPLETED" | "TERMINATED" | "ARCHIVED"; signedAt: string | null };
export type CaseStudyPermission = { clientName: string; status: "NOT_REQUESTED" | "REQUEST_DRAFT" | "SENT" | "PENDING" | "APPROVED" | "APPROVED_WITH_LIMITATIONS" | "DECLINED" | "REVOKED" | "EXPIRED"; approvedScope: string[] };

export const foundingStudioLeadership: readonly StudioLeadershipRecord[] = [
  { role: "STUDIO_DIRECTOR", displayName: "Ekeleme Kelechi David", status: "Founder-Led" },
  { role: "STUDIO_OPERATIONS", displayName: "", status: "To Be Appointed" },
  { role: "STUDIO_FINANCE", displayName: "", status: "To Be Appointed" },
  { role: "STUDIO_DELIVERY", displayName: "", status: "To Be Appointed" },
];

export const emptyCaseStudyPermission: CaseStudyPermission = { clientName: "", status: "NOT_REQUESTED", approvedScope: [] };
