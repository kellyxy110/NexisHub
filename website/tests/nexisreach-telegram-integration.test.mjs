import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { tsImport } from "tsx/esm/api";

const { getNexisReachMoreEntries } = await tsImport(
  "../src/lib/nexisreach-telegram-integration.ts",
  import.meta.url,
);

const certified = {
  approvedForTestPreview: true,
  baselineSourceVerified: true,
  telegramClientCertified: true,
};

test("integration is off by default and never changes the existing tab shell", () => {
  assert.deepEqual(getNexisReachMoreEntries(), []);
  const legacyLanding = readFileSync(new URL("../src/app/telegram/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(legacyLanding, /NexisReach campaign planner \(preview\)/);
});

test("missing any explicit release gate keeps NexisReach out of More", () => {
  for (const key of Object.keys(certified)) {
    assert.deepEqual(getNexisReachMoreEntries({ ...certified, [key]: false }), []);
  }
});

test("all gates yield internal preview-only destinations in More", () => {
  const entries = getNexisReachMoreEntries(certified);
  assert.deepEqual(entries.map((item) => item.href), [
    "/telegram/advertising",
    "/telegram/advertising/publisher",
  ]);
  assert.ok(entries.every((item) => item.section === "More" && item.isPreview === true));
  assert.ok(entries.every((item) => item.href.startsWith("/telegram/")));
  assert.ok(entries.every((item) => !/\b(?:verified channel|guaranteed|automatic booking)\b/i.test(item.description)));
});

test("menu contract cannot be mutated by a host rendering it", () => {
  const entries = getNexisReachMoreEntries(certified);
  assert.equal(Object.isFrozen(entries), true);
  assert.ok(entries.every((item) => Object.isFrozen(item)));
});
