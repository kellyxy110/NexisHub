import assert from "node:assert/strict";
import test from "node:test";
import { issueTelegramSession, readTelegramSession } from "../src/lib/telegram/session-token.ts";

const secret = "s".repeat(48);
const session = { sub: "123456", iat: 1000, exp: 1600, nonce: "a".repeat(32) };
test("accepts signed session within validity window", () => {
  const token = issueTelegramSession(session, secret);
  assert.deepEqual(readTelegramSession(token, secret, 1200), session);
});
test("rejects expired, future and tampered sessions", () => {
  const token = issueTelegramSession(session, secret);
  assert.equal(readTelegramSession(token, secret, 1600), null);
  assert.equal(readTelegramSession(token, secret, 900), null);
  assert.equal(readTelegramSession(token.slice(0, -1) + (token.endsWith("A") ? "B" : "A"), secret, 1200), null);
  assert.equal(readTelegramSession(token, "z".repeat(48), 1200), null);
});
test("refuses weak secrets and long-lived sessions", () => {
  assert.throws(() => issueTelegramSession(session, "short"));
  assert.throws(() => issueTelegramSession({ ...session, exp: 2000 }, secret));
  assert.equal(readTelegramSession("bad", secret, 1200), null);
});
