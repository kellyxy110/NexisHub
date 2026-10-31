import assert from "node:assert/strict";
import test from "node:test";
import { createPrismaTelegramSessionStore } from "../src/lib/telegram/prisma-session-store.ts";

test("database uniqueness rejects replay, and revocation disables session", async () => {
  const launches = new Set();
  const sessions = new Map();
  const db = {
    telegramLaunchReplay: {
      create: async ({ data }) => {
        if (launches.has(data.key)) throw new Error("unique violation");
        launches.add(data.key);
      },
    },
    telegramAuthSession: {
      create: async ({ data }) => { sessions.set(data.key, { ...data, revokedAt: null }); },
      findFirst: async ({ where }) => {
        const session = sessions.get(where.key);
        return session && session.telegramUserId === where.telegramUserId &&
          session.revokedAt === null && session.expiresAt > where.expiresAt.gt ? { key: where.key } : null;
      },
      updateMany: async ({ where, data }) => {
        const session = sessions.get(where.key);
        if (!session || session.telegramUserId !== where.telegramUserId || session.revokedAt !== null) return { count: 0 };
        session.revokedAt = data.revokedAt;
        return { count: 1 };
      },
    },
  };
  const store = createPrismaTelegramSessionStore(db);
  assert.equal(await store.reserveOnce("replay-key", new Date(Date.now() + 60000)), true);
  assert.equal(await store.reserveOnce("replay-key", new Date(Date.now() + 60000)), false);
  assert.equal(await store.createSession("session-key", "42", new Date(Date.now() + 60000)), true);
  assert.equal(await store.isActive("session-key", "42"), true);
  assert.equal(await store.isActive("session-key", "43"), false);
  assert.equal(await store.revoke("session-key", "42"), true);
  assert.equal(await store.isActive("session-key", "42"), false);
  assert.equal(await store.revoke("session-key", "42"), false);
});
test("fails closed when database creation is unavailable", async () => {
  const unavailable = {
    telegramLaunchReplay: { create: async () => { throw new Error("offline"); } },
    telegramAuthSession: {
      create: async () => { throw new Error("offline"); },
      findFirst: async () => { throw new Error("offline"); },
      updateMany: async () => { throw new Error("offline"); },
    },
  };
  const store = createPrismaTelegramSessionStore(unavailable);
  assert.equal(await store.reserveOnce("key", new Date()), false);
  assert.equal(await store.createSession("key", "42", new Date()), false);
  await assert.rejects(() => store.isActive("key", "42"));
});
