import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const modules = [
  "src/lib/nexisreach-planner.ts",
  "src/lib/nexisreach-evidence.ts",
  "src/lib/nexisreach-publisher.ts",
  "src/lib/nexisreach-telegram-integration.ts",
  "src/app/telegram/advertising/advertising-planner.tsx",
  "src/app/telegram/advertising/page.tsx",
  "src/app/telegram/advertising/publisher/publisher-intake.tsx",
  "src/app/telegram/advertising/publisher/page.tsx",
];
test("advertising modules use the NexisReach namespace without stale legacy brand", () => {
  for (const path of modules) {
    const current = root + path;
    assert.equal(existsSync(current), true, `Missing ${path}`);
    assert.doesNotMatch(readFileSync(current, "utf8"), /adnexis|adnx-/i, `Legacy identifier in ${path}`);
  }
  for (const legacy of [
    "src/lib/adnexis-planner.ts", "src/lib/adnexis-evidence.ts",
    "src/lib/adnexis-publisher.ts", "src/lib/adnexis-telegram-integration.ts",
  ]) assert.equal(existsSync(root + legacy), false, `Obsolete file ${legacy}`);
});
