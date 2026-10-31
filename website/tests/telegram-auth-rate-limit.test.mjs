import assert from "node:assert/strict";
import test from "node:test";
import { allowTelegramAuthAttempt } from "../src/lib/telegram/auth-rate-limit.ts";

const secret = "s".repeat(48);
test("permits ten attempts per network key and minute, then blocks", async () => {
  const counters = new Map();
  const db = { $queryRaw: async (_strings, key, start) => {
    const id = key + ":" + start.toISOString();
    const count = (counters.get(id) ?? 0) + 1;
    if (count > 10) return [];
    counters.set(id, count);
    return [{ count }];
  } };
  for (let i = 0; i < 10; i++) {
    assert.equal(await allowTelegramAuthAttempt(db, "trusted-network", secret, new Date("2026-10-31T01:01:00Z")), true);
  }
  assert.equal(await allowTelegramAuthAttempt(db, "trusted-network", secret, new Date("2026-10-31T01:01:00Z")), false);
  assert.equal(await allowTelegramAuthAttempt(db, "trusted-network", secret, new Date("2026-10-31T01:02:00Z")), true);
});
test("fails closed for invalid network, weak secret, or database outage", async () => {
  const db = { $queryRaw: async () => { throw new Error("offline"); } };
  assert.equal(await allowTelegramAuthAttempt(db, "network", secret), false);
  assert.equal(await allowTelegramAuthAttempt(db, "", secret), false);
  assert.equal(await allowTelegramAuthAttempt(db, "network", "weak"), false);
});
