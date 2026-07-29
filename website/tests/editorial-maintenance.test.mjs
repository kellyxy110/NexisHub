import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);

test("editorial link monitor is report-only by default", () => {
  const source = readFileSync(new URL("scripts/editorial-link-monitor.mjs", root), "utf8");
  assert.match(source, /report-only/);
  assert.match(source, /BROKEN/);
  assert.match(source, /TIMEOUT/);
});

test("editorial maintenance tooling exists", () => {
  assert.equal(existsSync(new URL("scripts/editorial-maintenance.mjs", root)), true);
  assert.equal(existsSync(new URL("src/lib/maintenance.ts", root)), true);
});
