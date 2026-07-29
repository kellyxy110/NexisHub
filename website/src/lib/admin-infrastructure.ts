export type AdminInfrastructureStatus = "DISABLED" | "CONFIGURED";

export type AdminInfrastructureConfig = {
  status: AdminInfrastructureStatus;
  databaseConfigured: boolean;
  authenticationConfigured: boolean;
  auditPersistenceConfigured: boolean;
  reason: string;
};

type Environment = Record<string, string | undefined>;

const requiredDatabaseKeys = ["NEXIS_ADMIN_DATABASE_URL"];
const requiredAuthenticationKeys = ["NEXIS_ADMIN_AUTH_SECRET"];
const requiredAuditKeys = ["NEXIS_ADMIN_AUDIT_STORE"];

function hasValues(environment: Environment, keys: string[]) {
  return keys.every((key) => Boolean(environment[key]?.trim()));
}

export function getAdminInfrastructureConfig(environment: Environment = process.env): AdminInfrastructureConfig {
  const databaseConfigured = hasValues(environment, requiredDatabaseKeys);
  const authenticationConfigured = hasValues(environment, requiredAuthenticationKeys);
  const auditPersistenceConfigured = hasValues(environment, requiredAuditKeys);
  const configured = databaseConfigured && authenticationConfigured && auditPersistenceConfigured;
  return {
    status: configured ? "CONFIGURED" : "DISABLED",
    databaseConfigured,
    authenticationConfigured,
    auditPersistenceConfigured,
    reason: configured
      ? "Administrative infrastructure variables are present. Provider and deployment checks are still required before enabling mutations."
      : "Administrative writes remain disabled until database, authentication, and audit persistence are configured.",
  };
}

export function assertAdminInfrastructureConfigured(environment: Environment = process.env) {
  const config = getAdminInfrastructureConfig(environment);
  if (config.status === "DISABLED") throw new Error(config.reason);
  return config;
}
