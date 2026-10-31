import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { createVerifiedTelegramLaunchSession } from "../src/lib/telegram/launch-session-policy.ts";
import { readTelegramSession } from "../src/lib/telegram/session-token.ts";

const botToken = "123456:local-test-token-not-a-real-secret";
const sessionSecret = "x".repeat(48);
const now = 1800000000;
function signedData() {
  const fields = [["auth_date", String(now)], ["user", JSON.stringify({ id: 42, first_name: "Ada" })]];
  const secret = createHmac("sha256", "WebAppData").update(botToken).digest();
  const hash = createHmac("sha256", secret).update(fields.map(([k, v]) => k + "=" + v).join("\n")).digest("hex");
  return new URLSearchParams([...fields, ["hash", hash]]).toString();
}
test("issues a short-lived session once, never on replay", async () => {
  const launches = new Set();
  const sessions = new Map();
  const store = {
    reserveOnce: async (key) => { if (launches.has(key)) return false; launches.add(key); return true; },
    createSession: async (key, id, expiry) => { sessions.set(key, { id, expiry }); return true; },
  };
  const initData = signedData();
  const first = await createVerifiedTelegramLaunchSession(initData, { botToken, sessionSecret, store, nowSeconds: now });
  assert.equal(first.ok, true);
  assert.equal(readTelegramSession(first.token, sessionSecret, now)?.sub, "42");
  assert.equal(sessions.size, 1);
  const again = await createVerifiedTelegramLaunchSession(initData, { botToken, sessionSecret, store, nowSeconds: now });
  assert.deepEqual(again, { ok: false, error: "replayed_or_unavailable" });
});
test("rejects invalid launch before touching persistence", async () => {
  const store = { reserveOnce: async () => { throw new Error("should not run"); }, createSession: async () => true };
  assert.deepEqual(await createVerifiedTelegramLaunchSession("invalid", { botToken, sessionSecret, store, nowSeconds: now }), { ok: false, error: "invalid_launch" });
});
test("fails closed when session persistence fails", async () => {
  const store = { reserveOnce: async () => true, createSession: async () => { throw new Error("database down"); } };
  assert.deepEqual(await createVerifiedTelegramLaunchSession(signedData(), { botToken, sessionSecret, store, nowSeconds: now }), { ok: false, error: "session_unavailable" });
});

test("rejects invalid time without reserving a launch", async () => {
  let touched = false;
  const store = {
    reserveOnce: async () => { touched = true; return true; },
    createSession: async () => { touched = true; return true; },
  };
  const result = await createVerifiedTelegramLaunchSession(signedData(), { botToken, sessionSecret, store, nowSeconds: Number.NaN });
  assert.deepEqual(result, { ok: false, error: "invalid_launch" });
  assert.equal(touched, false);
});
