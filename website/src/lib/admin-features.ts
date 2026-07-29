import { getAdminInfrastructureConfig } from "@/lib/admin-infrastructure";

export type AdminFeatureFlags = {
  adminEnabled: boolean;
  founderAdminEnabled: boolean;
  founderSafeAdminEnabled: boolean;
  nriPublicationAdminEnabled: boolean;
  nriReviewAdminEnabled: boolean;
  nriConsentAdminEnabled: boolean;
  nriPilotAdminEnabled: boolean;
  studioOperationsEnabled: boolean;
  emailInvitationsEnabled: boolean;
  publicationV1Enabled: boolean;
  founderOnly: boolean;
  authenticationReady: boolean;
  migrationsReady: boolean;
  securityChecksPassed: boolean;
  founderVerified: boolean;
};

type Environment = Record<string, string | undefined>;
const enabled = (environment: Environment, key: string) => environment[key]?.toLowerCase() === "true";

export function getAdminFeatureFlags(environment: Environment = process.env): AdminFeatureFlags {
  const infrastructure = getAdminInfrastructureConfig(environment);
  const authenticationReady = environment.NEXIS_ADMIN_AUTH_READY === "true" && infrastructure.authenticationConfigured;
  const migrationsReady = environment.NEXIS_ADMIN_MIGRATIONS_READY === "true";
  const securityChecksPassed = environment.NEXIS_ADMIN_SECURITY_CHECKS_PASSED === "true";
  const founderVerified = environment.NEXIS_ADMIN_FOUNDER_VERIFIED === "true";
  const founderAdminEnabled = enabled(environment, "FOUNDER_ADMIN_ENABLED");
  const founderSafeAdminEnabled = enabled(environment, "ADMIN_ENABLED") && founderAdminEnabled && infrastructure.status === "CONFIGURED" && authenticationReady && migrationsReady && securityChecksPassed && founderVerified;
  const moduleEnabled = (key: string) => founderSafeAdminEnabled && enabled(environment, key);
  return {
    adminEnabled: founderSafeAdminEnabled,
    founderAdminEnabled,
    founderSafeAdminEnabled,
    nriPublicationAdminEnabled: moduleEnabled("NRI_PUBLICATION_ADMIN_ENABLED"),
    nriReviewAdminEnabled: moduleEnabled("NRI_REVIEW_ADMIN_ENABLED"),
    nriConsentAdminEnabled: moduleEnabled("NRI_CONSENT_ADMIN_ENABLED"),
    nriPilotAdminEnabled: moduleEnabled("NRI_PILOT_ADMIN_ENABLED"),
    studioOperationsEnabled: moduleEnabled("STUDIO_OPERATIONS_ENABLED"),
    emailInvitationsEnabled: moduleEnabled("EMAIL_INVITATIONS_ENABLED"),
    publicationV1Enabled: moduleEnabled("PUBLICATION_V1_ENABLED"),
    founderOnly: founderSafeAdminEnabled,
    authenticationReady,
    migrationsReady,
    securityChecksPassed,
    founderVerified,
  };
}