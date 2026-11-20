import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { tsImport } from "tsx/esm/api";

const { getAdNexisMoreEntries } = await tsImport(
  "../src/lib/adnexis-telegram-integration.ts",
  import.meta.url,
);

const certified = {
  approvedForTestPreview: true,
  baselineSourceVerified: true,
  telegramClientCertified: true,
};

test("integration is off by default and never changes the existing tab shell", () => {
  assert.deepEqual(getAdNexisMoreEntries(), []);
  const legacyLanding = readFileSync(new URL("../src/app/telegram/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(legacyLanding, /AdNexis campaign planner \(preview\)/);
});

test("missing any explicit release gate keeps AdNexis out of More", () => {
  for (const key of Object.keys(certified)) {
    assert.deepEqual(getAdNexisMoreEntries({ ...certified, [key]: false }), []);
  }
});

test("all gates yield internal preview-only destinations in More", () => {
  const entries = getAdNexisMoreEntries(certified);
  assert.deepEqual(entries.map((item) => item.href), [
    "/telegram/advertising",
    "/telegram/advertising/publisher",
  ]);
  assert.ok(entries.every((item) => item.section === "More" && item.isPreview === true));
  assert.ok(entries.every((item) => item.href.startsWith("/telegram/")));
  assert.ok(entries.every((item) => !/verified channel|guaranteed|automatic booking/i.test(item.description)));
});

test("menu contract cannot be mutated by a host rendering it", () => {
  const entries = getAdNexisMoreEntries(certified);
  assert.equal(Object.isFrozen(entries), true);
  assert.ok(entries.every((item) => Object.isFrozen(item)));
});
