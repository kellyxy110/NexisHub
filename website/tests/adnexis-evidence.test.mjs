import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";

const { evaluatePublisherEvidence } = await tsImport("../src/lib/adnexis-evidence.ts", import.meta.url);
const now = new Date("2026-11-20T09:00:00Z");

test("unknown publisher evidence is never described as verified", () => {
  const passport = evaluatePublisherEvidence(undefined, now);
  assert.equal(passport.status, "No evidence supplied");
  assert.equal(passport.verifiedByNexisHub, false);
  assert.ok(passport.notes.some((note) => note.includes("independent confirmation")));
});

test("a dated publisher claim remains self-reported", () => {
  const passport = evaluatePublisherEvidence({
    origin: "publisher-claim", reference: "Publisher screenshot", observedOn: "2026-11-18",
  }, now);
  assert.equal(passport.status, "Publisher claim only");
  assert.equal(passport.ageDays, 2);
  assert.equal(passport.verifiedByNexisHub, false);
});

test("third-party material never becomes automatic certification", () => {
  const passport = evaluatePublisherEvidence({
    origin: "third-party-material", reference: "Report page 2", observedOn: "2026-11-10",
  }, now);
  assert.equal(passport.status, "Reference supplied, unverified");
  assert.equal(passport.verifiedByNexisHub, false);
});

test("old supporting material triggers a freshness question", () => {
  const passport = evaluatePublisherEvidence({
    origin: "public-posts", reference: "Dated public post", observedOn: "2026-09-15",
  }, now);
  assert.equal(passport.status, "Older source material");
  assert.ok(passport.notes.some((note) => note.includes("over 30 days")));
});

test("missing metadata does not imply a reliable source", () => {
  const passport = evaluatePublisherEvidence({
    origin: "public-posts", reference: "", observedOn: "",
  }, now);
  assert.equal(passport.status, "Incomplete source details");
  assert.ok(passport.notes.some((note) => note.includes("retrievable reference")));
});

test("invalid dates, future claims and invalid evidence types are rejected", () => {
  const basic = { origin: "public-posts", reference: "public post", observedOn: "2026-11-19" };
  assert.throws(() => evaluatePublisherEvidence({ ...basic, observedOn: "2026-02-31" }, now), /real calendar date/);
  assert.throws(() => evaluatePublisherEvidence({ ...basic, observedOn: "2026-11-21" }, now), /future/);
  assert.throws(() => evaluatePublisherEvidence({ ...basic, observedOn: "20 Nov 2026" }, now), /YYYY-MM-DD/);
  assert.throws(() => evaluatePublisherEvidence({ ...basic, origin: "unknown" }, now), /valid evidence source/);
});

test("oversized or contradictory references are rejected", () => {
  assert.throws(() => evaluatePublisherEvidence({
    origin: "public-posts", reference: "a".repeat(241), observedOn: "",
  }, now), /240 characters/);
  assert.throws(() => evaluatePublisherEvidence({
    origin: "none", reference: "public post", observedOn: "",
  }, now), /Choose the source/);
});
