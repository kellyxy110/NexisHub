import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/admin-infrastructure.ts", import.meta.url), "utf8");

test("administration is disabled when infrastructure variables are absent", () => {
  assert.match(source, /"DISABLED"/);
  assert.match(source, /NEXIS_ADMIN_DATABASE_URL/);
  assert.match(source, /NEXIS_ADMIN_AUTH_SECRET/);
  assert.match(source, /NEXIS_ADMIN_AUDIT_STORE/);
});

test("administration configuration requires all three infrastructure categories", () => {
  assert.match(source, /databaseConfigured && authenticationConfigured && auditPersistenceConfigured/);
  assert.match(source, /assertAdminInfrastructureConfigured/);
});
