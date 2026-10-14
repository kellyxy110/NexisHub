import assert from "node:assert/strict";
import test from "node:test";
import { authOptions, sendAuthVerificationRequest } from "../src/lib/auth";
import { sendBrevoVerificationEmail } from "../src/lib/brevo-email";

const originalKey = process.env.BREVO_API_KEY;
const originalFetch = globalThis.fetch;

function restore() {
  if (originalKey === undefined) delete process.env.BREVO_API_KEY;
  else process.env.BREVO_API_KEY = originalKey;
  globalThis.fetch = originalFetch;
}

test.afterEach(restore);

test("keeps Auth.js email authentication disabled unless explicitly enabled", async () => {
  delete process.env.BREVO_API_KEY;
  process.env.AUTH_EMAIL_ENABLED = "false";
  const provider = authOptions.providers[0] as { id: string; maxAge: number; options: { maxAge: number } };
  assert.equal(provider.id, "email");
  assert.equal(provider.options.maxAge, 600);
  assert.equal(authOptions.session?.strategy, "database");
  await assert.rejects(() => sendAuthVerificationRequest({ identifier: "founder@example.com", url: "https://example.com" }), /disabled/);
});

test("sends a verification email through Brevo without exposing the key", async () => {
  process.env.BREVO_API_KEY = "brevo-test-key";
  let request: RequestInit | undefined;
  globalThis.fetch = async (_input, init) => {
    request = init;
    return new Response(JSON.stringify({ messageId: "brevo-message-id" }), { status: 201, headers: { "content-type": "application/json" } });
  };

  await sendBrevoVerificationEmail({ from: "admin@nexishub.example", to: "founder@example.com", url: "https://nexishub.vercel.app/api/auth/callback/email?token=opaque-token" });
  assert.equal(request?.method, "POST");
  assert.equal((request?.headers as Record<string, string>)["api-key"], "brevo-test-key");
  const payload = JSON.parse(String(request?.body));
  assert.equal(payload.sender.email, "admin@nexishub.example");
  assert.equal(payload.to[0].email, "founder@example.com");
  assert.match(payload.htmlContent, /opaque-token/);
});

test("fails closed when Brevo configuration is missing", async () => {
  delete process.env.BREVO_API_KEY;
  await assert.rejects(() => sendBrevoVerificationEmail({ from: "admin@nexishub.example", to: "founder@example.com", url: "https://example.com/callback?token=opaque-token" }), /not configured/);
});

for (const [name, response] of [
  ["provider failure", new Response("provider error", { status: 502 })],
  ["malformed response", new Response(JSON.stringify({}), { status: 201 })],
] as const) {
  test(`hides Brevo details on ${name}`, async () => {
    process.env.BREVO_API_KEY = "brevo-test-key";
    globalThis.fetch = async () => response;
    await assert.rejects(
      () => sendBrevoVerificationEmail({ from: "admin@nexishub.example", to: "founder@example.com", url: "https://example.com/callback?token=opaque-token" }),
      (error: Error) => error.message === "Authentication email delivery failed." && !error.message.includes("brevo-test-key") && !error.message.includes("opaque-token"),
    );
  });
}

test("converts provider timeouts into a safe failure", async () => {
  process.env.BREVO_API_KEY = "brevo-test-key";
  globalThis.fetch = async (_input, init) => await new Promise((_resolve, reject) => init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))));
  await assert.rejects(() => sendBrevoVerificationEmail({ from: "admin@nexishub.example", to: "founder@example.com", url: "https://example.com/callback?token=opaque-token" }), /delivery failed/);
});
