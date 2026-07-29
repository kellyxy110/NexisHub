import { getAdminInfrastructureConfig } from "@/lib/admin-infrastructure";

export type AdminFeatureFlags = {
  adminEnabled: boolean;
  nriPublicationAdminEnabled: boolean;
  nriReviewAdminEnabled: boolean;
  nriPilotAdminEnabled: boolean;
  nriConsentAdminEnabled: boolean;
  studioOperationsAdminEnabled: boolean;
  adminEmailSendingEnabled: boolean;
  founderOnly: boolean;
  authenticationReady: boolean;
};

type Environment = Record<string, string | undefined>;

const enabled = (environment: Environment, key: string) => environment[key]?.toLowerCase() === "true";

export function getAdminFeatureFlags(environment: Environment = process.env): AdminFeatureFlags {
  const infrastructure = getAdminInfrastructureConfig(environment);
  const authenticationReady = environment.NEXIS_ADMIN_AUTH_READY === "true" && infrastructure.authenticationConfigured;
  const adminEnabled = enabled(environment, "ADMIN_ENABLED") && infrastructure.status === "CONFIGURED" && authenticationReady;
  const moduleEnabled = (key: string) => adminEnabled && enabled(environment, key);
  return {
    adminEnabled,
    nriPublicationAdminEnabled: moduleEnabled("NRI_PUBLICATION_ADMIN_ENABLED"),
    nriReviewAdminEnabled: moduleEnabled("NRI_REVIEW_ADMIN_ENABLED"),
    nriPilotAdminEnabled: moduleEnabled("NRI_PILOT_ADMIN_ENABLED"),
    nriConsentAdminEnabled: moduleEnabled("NRI_CONSENT_ADMIN_ENABLED"),
    studioOperationsAdminEnabled: moduleEnabled("STUDIO_OPERATIONS_ADMIN_ENABLED"),
    adminEmailSendingEnabled: moduleEnabled("ADMIN_EMAIL_SENDING_ENABLED"),
    founderOnly: adminEnabled,
    authenticationReady,
  };
}
