import assert from "node:assert/strict";
import test from "node:test";
import { issueTelegramSession } from "../src/lib/telegram/session-token.ts";
import { authorizeTelegramSession, revokeTelegramSession, telegramSessionKey } from "../src/lib/telegram/session-policy.ts";

const secret = "a".repeat(48);
const token = issueTelegramSession({ sub: "345", iat: 1000, exp: 1600, nonce: "b".repeat(32) }, secret);
test("authorizes only a persisted active session", async () => {
  const active = new Set([telegramSessionKey(token)]);
  const store = {
    isActive: async (key, userId) => userId === "345" && active.has(key),
    revoke: async (key, userId) => userId === "345" && active.delete(key),
  };
  assert.equal((await authorizeTelegramSession(token, secret, store, 1100))?.sub, "345");
  assert.equal(await revokeTelegramSession(token, secret, store, 1100), true);
  assert.equal(await authorizeTelegramSession(token, secret, store, 1100), null);
});
test("fails closed for expired tokens and unavailable persistence", async () => {
  const broken = {
    isActive: async () => { throw new Error("unavailable"); },
    revoke: async () => { throw new Error("unavailable"); },
  };
  assert.equal(await authorizeTelegramSession(token, secret, broken, 1100), null);
  assert.equal(await revokeTelegramSession(token, secret, broken, 1100), false);
  assert.equal(await authorizeTelegramSession(token, secret, broken, 1700), null);
  assert.equal(await authorizeTelegramSession("bad", secret, broken, 1100), null);
});
