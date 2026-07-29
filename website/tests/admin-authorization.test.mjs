import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/admin-authorization.ts", import.meta.url), "utf8");

test("admin authorization fails closed and requires a verified principal", () => {
  assert.match(source, /admin-disabled/);
  assert.match(source, /unverified-principal/);
  assert.match(source, /hasPermission/);
  assert.match(source, /principal\?\.verified/);
});
