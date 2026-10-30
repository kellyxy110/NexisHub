import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { verifyTelegramLaunch } from "../src/lib/telegram/verify-launch.ts";

const token = "123456:synthetic-test-only";
const now = 1_800_000_000;

function signed(fields) {
  const entries = Object.entries(fields).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  const check = entries.map(([key, value]) => `${key}=${value}`).join("\n");
  const secret = createHmac("sha256", "WebAppData").update(token).digest();
  const hash = createHmac("sha256", secret).update(check).digest("hex");
  return new URLSearchParams([...entries, ["hash", hash]]).toString();
}

test("launch verification is disabled by default", () => {
  assert.deepEqual(verifyTelegramLaunch("untrusted", { enabled: false }), {
    status: 503, body: { verified: false, error: "not_enabled" },
  });
});

test("launch verification requires a server-side token", () => {
  assert.equal(verifyTelegramLaunch("untrusted", { enabled: true }).status, 503);
});

test("launch verification accepts fresh signed data", () => {
  const input = signed({ auth_date: String(now), user: '{"id":42}' });
  assert.deepEqual(verifyTelegramLaunch(input, { enabled: true, botToken: token, nowSeconds: now }), {
    status: 200, body: { verified: true },
  });
});

test("launch verification rejects invalid, expired and oversized data", () => {
  const input = signed({ auth_date: String(now), user: '{"id":42}' });
  assert.equal(verifyTelegramLaunch(input, { enabled: true, botToken: "wrong", nowSeconds: now }).status, 401);
  assert.equal(verifyTelegramLaunch(input, { enabled: true, botToken: token, nowSeconds: now + 301 }).status, 401);
  assert.equal(verifyTelegramLaunch("x".repeat(8193), { enabled: true, botToken: token, nowSeconds: now }).status, 400);
});
