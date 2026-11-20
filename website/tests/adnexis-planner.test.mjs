import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";

const { createAdvertisingPlan } = await tsImport("../src/lib/adnexis-planner.ts", import.meta.url);

const base = {
  product: "NexisHub Studio",
  audience: "small business owners",
  region: "Nigeria",
  goal: "enquiries",
  currency: "NGN",
  totalBudget: 50_000,
  channels: [],
};

test("produces a deterministic read-only plan without invented publishers", () => {
  const plan = createAdvertisingPlan(base);
  assert.equal(plan.channels.length, 0);
  assert.match(plan.brief, /NGN 50,000/);
  assert.ok(plan.warnings.some((entry) => entry.includes("No publisher candidates")));
  assert.ok(plan.tracking.includes("Consented enquiries"));
  assert.equal(JSON.stringify(plan).includes("guaranteed customers"), false);
});

test("compares manually supplied rates without claiming verified reach", () => {
  const plan = createAdvertisingPlan({
    ...base,
    channels: [{ name: "Channel A (user supplied)", placementPrice: 20_000, averagePostViews: 4_000 }],
  });
  assert.equal(plan.channels[0].estimatedCostPerThousandViews, 5_000);
  assert.ok(plan.channels[0].notes.some((note) => note.includes("not verified")));
});

test("missing reach evidence prevents a misleading CPM calculation", () => {
  const plan = createAdvertisingPlan({
    ...base,
    channels: [{ name: "Publisher B", placementPrice: 8_000, averagePostViews: null }],
  });
  assert.equal(plan.channels[0].estimatedCostPerThousandViews, null);
  assert.ok(plan.channels[0].notes.some((note) => note.includes("dated post-view evidence")));
});

test("flags placements that exceed the campaign budget", () => {
  const plan = createAdvertisingPlan({
    ...base,
    channels: [{ name: "Expensive channel", placementPrice: 60_000, averagePostViews: 3_000 }],
  });
  assert.ok(plan.channels[0].notes.some((note) => note.includes("more than the entire")));
  assert.ok(plan.warnings.some((note) => note.includes("combined entered placement")));
});

test("rejects malformed, negative and unbounded inputs", () => {
  assert.throws(() => createAdvertisingPlan({ ...base, totalBudget: 0 }), /budget/);
  assert.throws(() => createAdvertisingPlan({ ...base, totalBudget: -3 }), /budget/);
  assert.throws(() => createAdvertisingPlan({ ...base, totalBudget: Number.NaN }), /budget/);
  assert.throws(() => createAdvertisingPlan({ ...base, product: "" }), /Product or service/);
  assert.throws(() => createAdvertisingPlan({ ...base, audience: "x" }), /Audience/);
  assert.throws(() => createAdvertisingPlan({ ...base, currency: "EUR" }), /currency/);
  assert.throws(() => createAdvertisingPlan({ ...base, channels: Array.from({ length: 4 }, () => ({ name: "Test", placementPrice: null, averagePostViews: null })) }), /three/);
  assert.throws(() => createAdvertisingPlan({ ...base, channels: [{ name: "Channel C", placementPrice: -1, averagePostViews: 10 }] }), /price/);
});

test("rejects duplicate publisher names instead of quietly doubling a candidate", () => {
  assert.throws(() => createAdvertisingPlan({
    ...base,
    channels: [
      { name: "Channel One", placementPrice: 1_000, averagePostViews: 500 },
      { name: "channel one", placementPrice: 2_000, averagePostViews: 800 },
    ],
  }), /different name/);
});

test("uses goal-specific measurement without promising sales", () => {
  const awareness = createAdvertisingPlan({ ...base, goal: "awareness" });
  const visits = createAdvertisingPlan({ ...base, goal: "website-visits" });
  assert.ok(awareness.tracking.includes("Post views"));
  assert.ok(visits.tracking.includes("Tagged link clicks"));
  assert.ok(!awareness.tracking.includes("Guaranteed sales"));
});
