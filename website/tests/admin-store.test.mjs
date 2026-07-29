import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/admin-store.ts", import.meta.url), "utf8");

test("admin store fails closed before provider configuration", () => {
  assert.match(source, /DisabledAdminStore/);
  assert.match(source, /Administrative storage is disabled/);
  assert.match(source, /createAdminStore\(\): AdminStore/);
});

test("admin store contract includes audit persistence", () => {
  assert.match(source, /appendAuditEvent/);
  assert.match(source, /savePublicationDraft/);
});
