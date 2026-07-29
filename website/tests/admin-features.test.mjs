import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/admin-features.ts", import.meta.url), "utf8");

test("admin feature flags require infrastructure and authentication readiness", () => {
  assert.match(source, /ADMIN_ENABLED/);
  assert.match(source, /NEXIS_ADMIN_AUTH_READY/);
  assert.match(source, /infrastructure\.status === "CONFIGURED"/);
  assert.match(source, /authenticationReady/);
});

test("sensitive modules are independently gated", () => {
  for (const name of ["NRI_CONSENT_ADMIN_ENABLED", "NRI_PILOT_ADMIN_ENABLED", "ADMIN_EMAIL_SENDING_ENABLED"]) assert.match(source, new RegExp(name));
  assert.match(source, /moduleEnabled/);
});
