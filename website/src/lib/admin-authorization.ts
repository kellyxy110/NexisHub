import type { AdminRole, Permission } from "@/lib/workflows";
import { hasPermission } from "@/lib/workflows";
import { getAdminFeatureFlags } from "@/lib/admin-features";

export type AdminPrincipal = { id: string; role: AdminRole; verified: boolean };

export type AuthorizationResult = { allowed: boolean; reason: "ok" | "admin-disabled" | "unverified-principal" | "insufficient-permission" };

export function authorizeAdmin(principal: AdminPrincipal | null, permission: Permission, environment: Record<string, string | undefined> = process.env): AuthorizationResult {
  const flags = getAdminFeatureFlags(environment);
  if (!flags.founderSafeAdminEnabled) return { allowed: false, reason: "admin-disabled" };
  if (!principal?.verified) return { allowed: false, reason: "unverified-principal" };
  if (!hasPermission(principal.role, permission)) return { allowed: false, reason: "insufficient-permission" };
  return { allowed: true, reason: "ok" };
}
