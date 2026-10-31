/**
 * Run only against a disposable migrated PostgreSQL database:
 * TELEGRAM_AUTH_TEST_DATABASE_URL=postgresql://... node scripts/telegram-auth-integration.mjs
 * Never run against production. Uses isolated synthetic Telegram credentials.
 */
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { createPrismaTelegramSessionStore } from "../src/lib/telegram/prisma-session-store.ts";
import { createVerifiedTelegramLaunchSession } from "../src/lib/telegram/launch-session-policy.ts";
import { authorizeTelegramSession, revokeTelegramSession } from "../src/lib/telegram/session-policy.ts";
import { allowTelegramAuthAttempt } from "../src/lib/telegram/auth-rate-limit.ts";

const url = process.env.TELEGRAM_AUTH_TEST_DATABASE_URL;
if (!url || !/^(postgres|postgresql):\/\//.test(url) || /production|prod\./i.test(url)) {
  throw new Error("Explicit disposable TELEGRAM_AUTH_TEST_DATABASE_URL required");
}
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
const store = createPrismaTelegramSessionStore(db);
const botToken = "123456:synthetic-test-token";
const sessionSecret = "synthetic-test-session-secret-".repeat(3);
const now = Math.floor(Date.now() / 1000);
const data = new URLSearchParams({ auth_date: String(now), user: JSON.stringify({ id: 777000123, first_name: "Test" }), query_id: "isolated-" + Date.now() });
const check = [...data.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k,v]) => k + "=" + v).join("\n");
const signingKey = createHmac("sha256", "WebAppData").update(botToken).digest();
data.set("hash", createHmac("sha256", signingKey).update(check).digest("hex"));
try {
  const [a,b] = await Promise.all([createVerifiedTelegramLaunchSession(data.toString(), { botToken, sessionSecret, store, nowSeconds: now }),createVerifiedTelegramLaunchSession(data.toString(), { botToken, sessionSecret, store, nowSeconds: now })]);
  assert.equal([a,b].filter(x => x.ok).length, 1, "concurrent replay must issue exactly one session");
  const success = a.ok ? a : b;
  assert.equal((await authorizeTelegramSession(success.token, sessionSecret, store, now))?.sub, "777000123");
  assert.equal(await revokeTelegramSession(success.token, sessionSecret, store, now), true);
  assert.equal(await authorizeTelegramSession(success.token, sessionSecret, store, now), null);
  const key = "isolated-test-" + Date.now();
  for (let i = 0; i < 10; i++) assert.equal(await allowTelegramAuthAttempt(db, key, sessionSecret), true);
  assert.equal(await allowTelegramAuthAttempt(db, key, sessionSecret), false);
  console.log("PASS: atomic replay, issuance, revocation and rate limit against PostgreSQL");
} finally {
  await db.$disconnect();
}
