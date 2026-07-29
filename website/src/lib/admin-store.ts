import type { AuditEvent } from "@/lib/workflows";

export type AdminPublicationRecord = { id: string; slug: string; title: string; status: string; version: string; updatedAt: string };
export type AdminStore = {
  getPublication(id: string): Promise<AdminPublicationRecord | null>;
  savePublicationDraft(record: AdminPublicationRecord): Promise<AdminPublicationRecord>;
  appendAuditEvent(event: AuditEvent): Promise<void>;
};

export class AdminInfrastructureDisabledError extends Error {
  constructor() {
    super("Administrative storage is disabled until a configured provider, authentication layer, and audit store are available.");
    this.name = "AdminInfrastructureDisabledError";
  }
}

export class DisabledAdminStore implements AdminStore {
  async getPublication(id: string): Promise<never> { void id; throw new AdminInfrastructureDisabledError(); }
  async savePublicationDraft(record: AdminPublicationRecord): Promise<never> { void record; throw new AdminInfrastructureDisabledError(); }
  async appendAuditEvent(event: AuditEvent): Promise<never> { void event; throw new AdminInfrastructureDisabledError(); }
}

export function createAdminStore(): AdminStore { return new DisabledAdminStore(); }