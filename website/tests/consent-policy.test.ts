import assert from "node:assert/strict";
import { test } from "node:test";
import { isAnalyticsAllowed } from "../src/lib/consent-policy";

test("analytics is denied when consent is unset", () => assert.equal(isAnalyticsAllowed(null), false));
test("analytics is allowed only after allow", () => assert.equal(isAnalyticsAllowed("allow"), true));
test("analytics is denied after reject", () => assert.equal(isAnalyticsAllowed("reject"), false));
test("allow to reject withdraws analytics", () => {
  assert.equal(isAnalyticsAllowed("allow"), true);
  assert.equal(isAnalyticsAllowed("reject"), false);
});
test("reject to allow enables analytics only after a new choice", () => {
  assert.equal(isAnalyticsAllowed("reject"), false);
  assert.equal(isAnalyticsAllowed("allow"), true);
});
