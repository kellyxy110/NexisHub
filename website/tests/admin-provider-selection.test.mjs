import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("environment example contains only the provider-neutral admin contract", () => {
  const source = readFileSync(new URL("../.env.example", import.meta.url), "utf8");
  assert.match(source, /NEXIS_ADMIN_DATABASE_URL=/);
  assert.match(source, /NEXIS_ADMIN_AUTH_SECRET=/);
  assert.match(source, /NEXIS_ADMIN_AUDIT_STORE=/);
  assert.doesNotMatch(source, /postgres:\/\/[^\n]+/i);
});
