export type AdminInfrastructureStatus = "DISABLED" | "CONFIGURED";

export type AdminInfrastructureConfig = {
  status: AdminInfrastructureStatus;
  databaseConfigured: boolean;
  authenticationConfigured: boolean;
  auditPersistenceConfigured: boolean;
  reason: string;
};

type Environment = Record<string, string | undefined>;

const hasAnyValue = (environment: Environment, keys: string[]) => keys.some((key) => Boolean(environment[key]?.trim()));

export function getAdminInfrastructureConfig(environment: Environment = process.env): AdminInfrastructureConfig {
  // The approved production stack uses the provider-native variables. The
  // NEXIS_ADMIN_* names remain accepted for older deployments and tests.
  const databaseConfigured = hasAnyValue(environment, ["DATABASE_URL", "NEXIS_ADMIN_DATABASE_URL"]);
  const authenticationConfigured = hasAnyValue(environment, ["AUTH_SECRET", "NEXIS_ADMIN_AUTH_SECRET"]);
  const auditPersistenceConfigured = hasAnyValue(environment, ["DATABASE_URL", "NEXIS_ADMIN_AUDIT_STORE"]);
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
