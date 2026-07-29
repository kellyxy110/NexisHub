export type AdminRole = "SUPER_ADMIN" | "NRI_DIRECTOR" | "RESEARCH_LEAD" | "EDITOR" | "AUTHOR" | "TECHNICAL_REVIEWER" | "METHODOLOGY_REVIEWER" | "ETHICS_REVIEWER" | "LEGAL_REVIEWER" | "STUDIO_DIRECTOR" | "STUDIO_OPERATIONS" | "STUDIO_FINANCE" | "STUDIO_DELIVERY" | "VIEWER";
export type Permission = "publication:create" | "publication:edit-own" | "publication:edit-any" | "publication:submit-review" | "publication:assign-reviewer" | "publication:review" | "publication:adjudicate" | "publication:approve" | "publication:publish" | "publication:retract" | "publication:archive" | "consent:view" | "consent:create" | "consent:revoke" | "pilot:create" | "pilot:manage" | "pilot:analyse" | "studio:proposal-create" | "studio:sow-approve" | "studio:invoice-manage" | "studio:case-study-publish" | "admin:user-manage";

export type PublicationStatus = "IDEA" | "CONCEPT" | "PLANNING" | "DRAFT" | "INTERNAL_REVIEW" | "METHODOLOGY_REVIEW" | "ETHICS_REVIEW" | "EXTERNAL_REVIEW" | "REVISION_REQUIRED" | "APPROVED" | "SCHEDULED" | "PUBLISHED" | "CORRECTED" | "RETRACTED" | "ARCHIVED";
export type PilotStatus = "CONCEPT" | "PROTOCOL_DRAFT" | "AWAITING_APPROVAL" | "CONTACT_IDENTIFICATION" | "INVITATIONS_PENDING" | "RECRUITING" | "CONSENT_PENDING" | "READY" | "ACTIVE" | "PAUSED" | "DATA_COLLECTION_COMPLETE" | "ANALYSIS" | "REVIEW" | "COMPLETED" | "CANCELLED" | "ARCHIVED";
export type StudioProposalStatus = "DRAFT" | "INTERNAL_REVIEW" | "SENT" | "VIEWED" | "REVISION_REQUESTED" | "ACCEPTED" | "DECLINED" | "EXPIRED" | "WITHDRAWN" | "CONVERTED_TO_SOW";
export type ChangeRequestStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "ESTIMATED" | "APPROVED" | "REJECTED" | "DEFERRED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

const permissions: Record<AdminRole, readonly Permission[]> = {
  SUPER_ADMIN: ["publication:create", "publication:edit-own", "publication:edit-any", "publication:submit-review", "publication:assign-reviewer", "publication:review", "publication:adjudicate", "publication:approve", "publication:publish", "publication:retract", "publication:archive", "consent:view", "consent:create", "consent:revoke", "pilot:create", "pilot:manage", "pilot:analyse", "studio:proposal-create", "studio:sow-approve", "studio:invoice-manage", "studio:case-study-publish", "admin:user-manage"],
  NRI_DIRECTOR: ["publication:create", "publication:edit-any", "publication:submit-review", "publication:assign-reviewer", "publication:adjudicate", "publication:approve", "publication:publish", "publication:archive", "consent:view", "pilot:create", "pilot:manage", "pilot:analyse"],
  RESEARCH_LEAD: ["publication:create", "publication:edit-own", "publication:submit-review", "publication:assign-reviewer", "publication:adjudicate", "consent:view", "pilot:create", "pilot:manage", "pilot:analyse"],
  EDITOR: ["publication:create", "publication:edit-any", "publication:submit-review", "publication:archive"],
  AUTHOR: ["publication:create", "publication:edit-own", "publication:submit-review"],
  TECHNICAL_REVIEWER: ["publication:review"], METHODOLOGY_REVIEWER: ["publication:review"], ETHICS_REVIEWER: ["publication:review"], LEGAL_REVIEWER: ["publication:review"],
  STUDIO_DIRECTOR: ["studio:proposal-create", "studio:sow-approve", "studio:case-study-publish"], STUDIO_OPERATIONS: ["studio:proposal-create"], STUDIO_FINANCE: ["studio:invoice-manage"], STUDIO_DELIVERY: ["studio:proposal-create"], VIEWER: [],
};

export function hasPermission(role: AdminRole, permission: Permission) { return permissions[role].includes(permission); }
export function permissionsFor(role: AdminRole) { return permissions[role]; }

const transitions: Record<string, Record<string, readonly string[]>> = {
  publication: { IDEA: ["CONCEPT"], CONCEPT: ["PLANNING", "DRAFT"], PLANNING: ["DRAFT"], DRAFT: ["INTERNAL_REVIEW"], INTERNAL_REVIEW: ["METHODOLOGY_REVIEW", "REVISION_REQUIRED"], METHODOLOGY_REVIEW: ["ETHICS_REVIEW", "EXTERNAL_REVIEW", "REVISION_REQUIRED"], ETHICS_REVIEW: ["EXTERNAL_REVIEW", "APPROVED", "REVISION_REQUIRED"], EXTERNAL_REVIEW: ["APPROVED", "REVISION_REQUIRED"], REVISION_REQUIRED: ["DRAFT", "INTERNAL_REVIEW"], APPROVED: ["SCHEDULED", "PUBLISHED"], SCHEDULED: ["PUBLISHED"], PUBLISHED: ["CORRECTED", "RETRACTED", "ARCHIVED"], CORRECTED: ["PUBLISHED", "RETRACTED", "ARCHIVED"], RETRACTED: ["ARCHIVED"], ARCHIVED: [] },
  pilot: { CONCEPT: ["PROTOCOL_DRAFT"], PROTOCOL_DRAFT: ["AWAITING_APPROVAL"], AWAITING_APPROVAL: ["CONTACT_IDENTIFICATION"], CONTACT_IDENTIFICATION: ["INVITATIONS_PENDING"], INVITATIONS_PENDING: ["RECRUITING"], RECRUITING: ["CONSENT_PENDING", "CANCELLED"], CONSENT_PENDING: ["READY", "PAUSED"], READY: ["ACTIVE"], ACTIVE: ["PAUSED", "DATA_COLLECTION_COMPLETE"], PAUSED: ["READY", "ACTIVE", "CANCELLED"], DATA_COLLECTION_COMPLETE: ["ANALYSIS"], ANALYSIS: ["REVIEW"], REVIEW: ["COMPLETED", "ANALYSIS"], COMPLETED: ["ARCHIVED"], CANCELLED: ["ARCHIVED"], ARCHIVED: [] },
  proposal: { DRAFT: ["INTERNAL_REVIEW", "SENT", "WITHDRAWN"], INTERNAL_REVIEW: ["DRAFT", "SENT", "WITHDRAWN"], SENT: ["VIEWED", "REVISION_REQUESTED", "ACCEPTED", "DECLINED", "EXPIRED", "WITHDRAWN"], VIEWED: ["REVISION_REQUESTED", "ACCEPTED", "DECLINED", "EXPIRED", "WITHDRAWN"], REVISION_REQUESTED: ["DRAFT", "SENT", "WITHDRAWN"], ACCEPTED: ["CONVERTED_TO_SOW"], DECLINED: [], EXPIRED: [], WITHDRAWN: [], CONVERTED_TO_SOW: [] },
  changeRequest: { DRAFT: ["SUBMITTED", "CANCELLED"], SUBMITTED: ["UNDER_REVIEW", "CANCELLED"], UNDER_REVIEW: ["ESTIMATED", "REJECTED", "DEFERRED"], ESTIMATED: ["APPROVED", "REJECTED", "DEFERRED"], APPROVED: ["IN_PROGRESS"], IN_PROGRESS: ["COMPLETED", "CANCELLED"], DEFERRED: ["SUBMITTED", "CANCELLED"], REJECTED: [], COMPLETED: [], CANCELLED: [] },
};

export function canTransition(workflow: keyof typeof transitions, from: string, to: string) { return transitions[workflow][from]?.includes(to) ?? false; }
export function transition(workflow: keyof typeof transitions, from: string, to: string) { if (!canTransition(workflow, from, to)) throw new Error(`Invalid ${workflow} transition: ${from} -> ${to}`); return to; }

export type AuditEvent = { id: string; actorId: string; action: string; entityType: string; entityId: string; createdAt: string; reason?: string };
export function createAuditEvent(input: Omit<AuditEvent, "id" | "createdAt">): AuditEvent { return { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }; }

export function isPublicPublication(status: PublicationStatus) { return ["PUBLISHED", "CORRECTED"].includes(status); }
