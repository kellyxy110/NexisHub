import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { POST as contactPost } from "../src/app/api/contact/route";
import { POST as subscribePost } from "../src/app/api/subscribe/route";

const endpoint = "https://example.invalid/make-webhook";
const configuredKey = "unit-test-make-key";
const originalFetch = globalThis.fetch;
const originalUrl = process.env.FORM_WEBHOOK_URL;
const originalToken = process.env.FORM_WEBHOOK_TOKEN;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalUrl === undefined) delete process.env.FORM_WEBHOOK_URL;
  else process.env.FORM_WEBHOOK_URL = originalUrl;
  if (originalToken === undefined) delete process.env.FORM_WEBHOOK_TOKEN;
  else process.env.FORM_WEBHOOK_TOKEN = originalToken;
});

async function callContact(payload: Record<string, string>, status = 204) {
  let requestInit: RequestInit | undefined;
  process.env.FORM_WEBHOOK_URL = endpoint;
  globalThis.fetch = async (_input, init) => {
    requestInit = init;
    return new Response(null, { status });
  };
  const response = await contactPost(new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }));
  return { response, requestInit };
}

async function callNewsletter(status = 204) {
  let requestInit: RequestInit | undefined;
  process.env.FORM_WEBHOOK_URL = endpoint;
  globalThis.fetch = async (_input, init) => {
    requestInit = init;
    return new Response(null, { status });
  };
  const response = await subscribePost(new Request("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "subscriber@example.com" }),
  }));
  return { response, requestInit };
}

function contactPayload() {
  return {
    name: "Example Contact",
    email: "contact@example.com",
    topic: "general",
    message: "A sufficiently detailed contact message.",
  };
}

test("configured Make key is sent as x-make-apikey and not Authorization", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { requestInit } = await callContact(contactPayload());
  const headers = new Headers(requestInit?.headers);
  assert.equal(headers.get("x-make-apikey"), configuredKey);
  assert.equal(headers.has("authorization"), false);
});

test("Make key is not included in the request body", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { requestInit } = await callContact(contactPayload());
  assert.equal(String(requestInit?.body).includes(configuredKey), false);
});

test("Contact payload remains unchanged", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { requestInit } = await callContact(contactPayload());
  const body = JSON.parse(String(requestInit?.body));
  assert.deepEqual(Object.keys(body).sort(), ["email", "kind", "message", "name", "submittedAt", "topic"]);
  assert.equal(body.kind, "contact");
  assert.equal(body.name, "Example Contact");
  assert.equal(body.email, "contact@example.com");
  assert.equal(body.topic, "general");
  assert.equal(body.message, "A sufficiently detailed contact message.");
});

test("Studio payload remains unchanged", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { requestInit } = await callContact({
    name: "Example Founder",
    email: "founder@example.com",
    topic: "studio",
    message: "A sufficiently detailed Studio project brief.",
    company: "Example Company",
    companyWebsiteUrl: "https://example.com",
    studioService: "engineering",
    timeline: "exploring",
    riskContext: "No special context.",
  });
  const body = JSON.parse(String(requestInit?.body));
  assert.deepEqual(Object.keys(body).sort(), ["company", "companyWebsiteUrl", "email", "kind", "message", "name", "riskContext", "studioService", "submittedAt", "timeline", "topic"]);
  assert.equal(body.kind, "studio_enquiry");
  assert.equal(body.topic, "studio");
});

test("Newsletter payload remains unchanged", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { requestInit } = await callNewsletter();
  const body = JSON.parse(String(requestInit?.body));
  assert.deepEqual(Object.keys(body).sort(), ["email", "kind", "submittedAt"]);
  assert.equal(body.kind, "newsletter");
  assert.equal(body.email, "subscriber@example.com");
});

test("missing Make key fails closed with configuration status", async () => {
  delete process.env.FORM_WEBHOOK_TOKEN;
  const { response } = await callContact(contactPayload());
  assert.equal(response.status, 503);
});

test("non-2xx Make response remains an application 502", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { response } = await callNewsletter(401);
  assert.equal(response.status, 502);
});

test("2xx Make response preserves application success", async () => {
  process.env.FORM_WEBHOOK_TOKEN = configuredKey;
  const { response } = await callNewsletter(204);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});
