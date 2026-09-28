import assert from "node:assert/strict";
import { test } from "node:test";
import { Agent001InputSchema, Agent001ResultSchema, LeadSchema } from "../src/lib/lead-contract";
import { ContentRegisterRecordSchema, isNewsletterEligible } from "../src/lib/content-contract";

const contactLead = {
  lead_id: "lead-example-1",
  created_at: "2026-09-28T08:00:00.000Z",
  source: "nexishub.com",
  form_type: "contact",
  name: "Example Contact",
  email: "contact@example.com",
  message: "A sufficiently detailed contact enquiry.",
  status: "NEW",
  ai_status: "PENDING",
};

const studioLead = {
  ...contactLead,
  lead_id: "lead-example-2",
  form_type: "studio_enquiry",
  company: "Example Company",
  website: "https://example.com",
  service: "engineering",
  timeline: "exploring",
  risk_context: "No sensitive data.",
};

const agentInput = {
  source: "nexishub.com",
  name: "Example Founder",
  email: "founder@example.com",
  company: "Example Company",
  website: "https://example.com",
  service: "engineering",
  timeline: "exploring",
  message: "A sufficiently detailed Studio project brief.",
  risk_context: "No sensitive data.",
};

const agentResult = {
  summary: "The prospect needs engineering support.",
  intent: "commercial enquiry",
  category: "engineering",
  requirements: ["Technical discovery"],
  missing_information: ["Budget range"],
  risk_signals: [],
  suggested_next_action: "Schedule a discovery call.",
  discovery_questions: ["What outcome matters most?"],
  confidence: 0.8,
};

const publishedRecord = {
  content_id: "content-example-1",
  published_at: "2026-09-28T08:00:00.000Z",
  brand: "NEXISHUB",
  channel: "BLOG",
  title: "A verified example article",
  canonical_url: "https://nexishub.com/blog/example",
  topic: "AI engineering",
  summary: "A verified public article.",
  status: "PUBLISHED",
  newsletter_eligible: true,
  last_newsletter_date: null,
};

test("accepts a minimal Contact-like lead", () => {
  assert.deepEqual(LeadSchema.parse(contactLead), contactLead);
});

test("accepts a Studio-like lead", () => {
  assert.equal(LeadSchema.parse(studioLead).form_type, "studio_enquiry");
});

test("does not require optional lead fields", () => {
  assert.equal(LeadSchema.parse(contactLead).phone, undefined);
});

test("rejects invalid lead status", () => {
  assert.throws(() => LeadSchema.parse({ ...contactLead, status: "UNKNOWN" }));
});

test("rejects invalid AI status", () => {
  assert.throws(() => LeadSchema.parse({ ...contactLead, ai_status: "UNKNOWN" }));
});

test("rejects malformed lead timestamps", () => {
  assert.throws(() => LeadSchema.parse({ ...contactLead, created_at: "not-a-timestamp" }));
});

test("validates Agent 001 input", () => {
  assert.deepEqual(Agent001InputSchema.parse(agentInput), agentInput);
});

test("accepts a valid Agent 001 result", () => {
  assert.deepEqual(Agent001ResultSchema.parse(agentResult), agentResult);
});

test("accepts Agent 001 confidence of zero", () => {
  assert.equal(Agent001ResultSchema.parse({ ...agentResult, confidence: 0 }).confidence, 0);
});

test("accepts Agent 001 confidence of one", () => {
  assert.equal(Agent001ResultSchema.parse({ ...agentResult, confidence: 1 }).confidence, 1);
});

test("rejects Agent 001 confidence below zero", () => {
  assert.throws(() => Agent001ResultSchema.parse({ ...agentResult, confidence: -0.1 }));
});

test("rejects Agent 001 confidence above one", () => {
  assert.throws(() => Agent001ResultSchema.parse({ ...agentResult, confidence: 1.1 }));
});

test("rejects an Agent 001 result without summary", () => {
  assert.throws(() => Agent001ResultSchema.parse({ ...agentResult, summary: undefined }));
});

test("rejects a non-string Agent 001 requirement", () => {
  assert.throws(() => Agent001ResultSchema.parse({ ...agentResult, requirements: ["ok", 4] }));
});

test("rejects a malformed Agent 001 result", () => {
  assert.throws(() => Agent001ResultSchema.parse({ ...agentResult, confidence: "0.8" }));
});

test("accepts a published NexisHub blog record", () => {
  assert.equal(ContentRegisterRecordSchema.parse(publishedRecord).brand, "NEXISHUB");
});

test("accepts a published SiteNexis YouTube record", () => {
  const record = { ...publishedRecord, content_id: "content-example-2", brand: "SITENEXIS", channel: "YOUTUBE", canonical_url: "https://youtube.com/watch?v=example" };
  assert.equal(ContentRegisterRecordSchema.parse(record).channel, "YOUTUBE");
});

test("accepts a valid published and eligible content record", () => {
  assert.equal(isNewsletterEligible(publishedRecord), true);
});

test("draft content is not newsletter eligible", () => {
  assert.equal(isNewsletterEligible({ ...publishedRecord, status: "DRAFT" }), false);
});

test("approved but unpublished content is not newsletter eligible", () => {
  assert.equal(isNewsletterEligible({ ...publishedRecord, status: "APPROVED" }), false);
});

test("archived content is not newsletter eligible", () => {
  assert.equal(isNewsletterEligible({ ...publishedRecord, status: "ARCHIVED" }), false);
});

test("explicitly ineligible content is not newsletter eligible", () => {
  assert.equal(isNewsletterEligible({ ...publishedRecord, newsletter_eligible: false }), false);
});

test("invalid content URL is not newsletter eligible", () => {
  assert.equal(isNewsletterEligible({ ...publishedRecord, canonical_url: "not-a-url" }), false);
});

test("missing content URL is not newsletter eligible", () => {
  assert.equal(isNewsletterEligible({ ...publishedRecord, canonical_url: "" }), false);
});

test("rejects invalid or missing content URLs at the record boundary", () => {
  assert.throws(() => ContentRegisterRecordSchema.parse({ ...publishedRecord, canonical_url: "not-a-url" }));
  assert.throws(() => ContentRegisterRecordSchema.parse({ ...publishedRecord, canonical_url: undefined }));
});
