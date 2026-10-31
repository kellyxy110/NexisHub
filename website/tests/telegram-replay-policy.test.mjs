import assert from "node:assert/strict";
import test from "node:test";
import { reserveVerifiedTelegramLaunch, telegramReplayKey } from "../src/lib/telegram/replay-policy.ts";

test("same signed launch maps to the same opaque key", () => {
  assert.equal(telegramReplayKey("auth_date=123&hash=abc"), telegramReplayKey("auth_date=123&hash=abc"));
  assert.notEqual(telegramReplayKey("auth_date=123&hash=abc"), telegramReplayKey("auth_date=124&hash=abc"));
  assert.match(telegramReplayKey("sample"), /^[a-f0-9]{64}$/);
});
test("reserves a launch once and rejects subsequent attempts", async () => {
  const reserved = new Set();
  const store = { reserveOnce: async (key, expiry) => {
    assert.ok(expiry instanceof Date);
    if (reserved.has(key)) return false;
    reserved.add(key);
    return true;
  } };
  assert.equal(await reserveVerifiedTelegramLaunch("signed-launch", store, 1000), true);
  assert.equal(await reserveVerifiedTelegramLaunch("signed-launch", store, 1000), false);
});
test("fails closed on storage failure or invalid launch", async () => {
  const broken = { reserveOnce: async () => { throw new Error("database unavailable"); } };
  assert.equal(await reserveVerifiedTelegramLaunch("signed-launch", broken, 1000), false);
  assert.equal(await reserveVerifiedTelegramLaunch("", broken, 1000), false);
  assert.equal(await reserveVerifiedTelegramLaunch("signed-launch", broken, -1), false);
});
