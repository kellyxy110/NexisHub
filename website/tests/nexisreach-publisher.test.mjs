import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";

const { createPublisherReviewPacket, normaliseTelegramChannel, rehearsePublisherReview } =
  await tsImport("../src/lib/nexisreach-publisher.ts", import.meta.url);

const asOf = new Date("2026-11-20T10:00:00Z");
const base = {
  channel: "@ExampleChannel",
  displayName: "Example Technology Channel",
  category: "technology",
  targetAudience: "Nigerian developers",
  audienceRegion: "Nigeria",
  contactHandle: "@contactaccount",
  currency: "NGN",
  quotedPrice: 10000,
  averagePostViews: 5000,
  evidenceOrigin: "public-posts",
  evidenceReference: "https://t.me/ExampleChannel/123",
  evidenceObservedOn: "2026-11-19",
  permissionToPrepareReviewPacket: true,
  consentToFutureListing: false,
};

test("validates and canonicalises strictly public Telegram usernames", () => {
  assert.equal(normaliseTelegramChannel("@ExampleChannel").url, "https://t.me/examplechannel");
  assert.equal(normaliseTelegramChannel("https://t.me/examplechannel").handle, "examplechannel");
  for (const bad of ["https://evil.example/@examplechannel", "https://t.me/+privateInvite", "a", "https://t.me/foo/bar", "https://t.me/examplechannel?start=abc", "t.me/examplechannel", ""]) {
    assert.throws(() => normaliseTelegramChannel(bad), /public|username|links/);
  }
});

test("publisher intake only creates an offline, unverified, unpublished packet", () => {
  const packet = createPublisherReviewPacket(base, asOf);
  assert.equal(packet.channelHandle, "examplechannel");
  assert.equal(packet.status, "DRAFT_FOR_MANUAL_REVIEW");
  assert.equal(packet.submittedToNexisHub, false);
  assert.equal(packet.isPublicListing, false);
  assert.equal(packet.verifiedByNexisHub, false);
  assert.equal(packet.evidence.verifiedByNexisHub, false);
  assert.equal(packet.consentToFutureListing, false);
  assert.ok(packet.safeguards.some((s) => s.includes("Do not publish")));
});

test("missing evidence and missing prices remain missing rather than invented", () => {
  const packet = createPublisherReviewPacket({
    ...base,
    contactHandle: "", quotedPrice: null, averagePostViews: null,
    evidenceOrigin: "none", evidenceReference: "", evidenceObservedOn: "",
  }, asOf);
  assert.equal(packet.contactHandle, null);
  assert.equal(packet.quotedPrice, null);
  assert.equal(packet.evidence.status, "No evidence supplied");
  assert.ok(packet.safeguards.some((s) => s.includes("No usable post-view evidence")));
});

test("publisher consent and all quoted numbers are validated", () => {
  assert.throws(() => createPublisherReviewPacket({ ...base, permissionToPrepareReviewPacket: false }, asOf), /consent/);
  assert.throws(() => createPublisherReviewPacket({ ...base, quotedPrice: -1 }, asOf), /price/);
  assert.throws(() => createPublisherReviewPacket({ ...base, averagePostViews: Number.NaN }, asOf), /views/);
  assert.throws(() => createPublisherReviewPacket({ ...base, category: "unlisted" }, asOf), /category/);
  assert.throws(() => createPublisherReviewPacket({ ...base, audienceRegion: "" }, asOf), /region/);
  assert.throws(() => createPublisherReviewPacket({ ...base, evidenceObservedOn: "2027-01-01" }, asOf), /future/);
});

const checked = {
  reviewerLabel: "Independent Reviewer",
  decision: "recommend-approval",
  notes: "Checked all supplied material and publisher channel control separately.",
  channelControlEvidenceInspected: true,
  audienceClaimsIndependentlyChecked: true,
  pricingTermsInspected: true,
  permissionToListChecked: true,
};

test("offline reviewer cannot recommend publishing when publisher declined listing consent", () => {
  const packet = createPublisherReviewPacket(base, asOf);
  assert.throws(() => rehearsePublisherReview(packet, checked), /consent/);
});

test("offline reviewer cannot recommend approval from self-reported publisher claims", () => {
  const packet = createPublisherReviewPacket({
    ...base, consentToFutureListing: true,
    evidenceOrigin: "publisher-claim",
  }, asOf);
  assert.throws(() => rehearsePublisherReview(packet, checked), /Independent source evidence/);
});

test("offline reviewer must attest all evidence checks", () => {
  const packet = createPublisherReviewPacket({ ...base, consentToFutureListing: true }, asOf);
  assert.throws(
    () => rehearsePublisherReview(packet, { ...checked, audienceClaimsIndependentlyChecked: false }),
    /All manual evidence checks/,
  );
});

test("review rehearsal returns recommendation only, never real verification", () => {
  const packet = createPublisherReviewPacket({ ...base, consentToFutureListing: true }, asOf);
  const outcome = rehearsePublisherReview(packet, checked);
  assert.equal(outcome.recommendation, "recommend-approval");
  assert.equal(outcome.reviewMode, "OFFLINE_REHEARSAL_ONLY");
  assert.equal(outcome.verifiedByNexisHub, false);
  assert.equal(outcome.published, false);
  assert.equal(outcome.needsAuthenticatedReviewer, true);
});

test("a draft can be rejected or sent back for evidence without approval", () => {
  const packet = createPublisherReviewPacket(base, asOf);
  const rejected = rehearsePublisherReview(packet, { ...checked, decision: "reject" });
  const moreEvidence = rehearsePublisherReview(packet, { ...checked, decision: "request-evidence" });
  assert.equal(rejected.published, false);
  assert.equal(moreEvidence.verifiedByNexisHub, false);
});

test("rejects missing reviewer notes and self-described reviewer names", () => {
  const packet = createPublisherReviewPacket(base, asOf);
  assert.throws(() => rehearsePublisherReview(packet, { ...checked, reviewerLabel: packet.channelHandle, decision: "reject" }), /publisher handle/);
  assert.throws(() => rehearsePublisherReview(packet, { ...checked, notes: "bad", decision: "reject" }), /12 characters/);
});
