import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { verifyTelegramInitData } from "../src/lib/telegram/verify-init-data.ts";

const TOKEN = "123456:local-test-token-not-a-real-secret";
const NOW = 1_800_000_000;

function signedData(fields) {
  const values = Object.entries(fields).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const checkString = values.map(([k, v]) => `${k}=${v}`).join("\n");
  const secret = createHmac("sha256", "WebAppData").update(TOKEN).digest();
  const hash = createHmac("sha256", secret).update(checkString).digest("hex");
  return new URLSearchParams([...values, ["hash", hash]]).toString();
}

test("accepts valid signed and fresh Telegram initData", () => {
  const input = signedData({ auth_date: String(NOW), query_id: "AA-test", user: '{"id":42}' });
  assert.equal(verifyTelegramInitData(input, TOKEN, { nowSeconds: NOW }).get("user"), '{"id":42}');
});

test("rejects tampering", () => {
  const input = signedData({ auth_date: String(NOW), user: '{"id":42}' });
  assert.throws(() => verifyTelegramInitData(input.replace("%3A42", "%3A43"), TOKEN, { nowSeconds: NOW }));
});

test("rejects stale and future auth timestamps", () => {
  assert.throws(() => verifyTelegramInitData(signedData({ auth_date: String(NOW - 301) }), TOKEN, { nowSeconds: NOW }));
  assert.throws(() => verifyTelegramInitData(signedData({ auth_date: String(NOW + 31) }), TOKEN, { nowSeconds: NOW }));
});

test("rejects duplicate fields", () => {
  const input = signedData({ auth_date: String(NOW), user: '{"id":42}' });
  assert.throws(() => verifyTelegramInitData(input + "&user=duplicate", TOKEN, { nowSeconds: NOW }));
});

test("rejects invalid hash and missing token", () => {
  const input = signedData({ auth_date: String(NOW) });
  assert.throws(() => verifyTelegramInitData(input, "different-token", { nowSeconds: NOW }));
  assert.throws(() => verifyTelegramInitData(input, "", { nowSeconds: NOW }));
});

test("accepts ordinally sorted Telegram fields including punctuation", () => {
  const input = signedData({ auth_date: String(NOW), zeta: "last", a_b: "underscore", aB: "camel" });
  assert.equal(verifyTelegramInitData(input, TOKEN, { nowSeconds: NOW }).get("a_b"), "underscore");
});

test("rejects duplicate hash and missing auth_date", () => {
  const input = signedData({ auth_date: String(NOW) });
  assert.throws(() => verifyTelegramInitData(input + "&hash=" + "0".repeat(64), TOKEN, { nowSeconds: NOW }));
  assert.throws(() => verifyTelegramInitData(signedData({ query_id: "AA-test" }), TOKEN, { nowSeconds: NOW }));
});

test("rejects oversized signed payloads", () => {
  assert.throws(() => verifyTelegramInitData("x".repeat(8193), TOKEN, { nowSeconds: NOW }));
});
