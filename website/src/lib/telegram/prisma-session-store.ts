import type { TelegramLaunchSessionStore } from "./launch-session-policy.ts";
import type { TelegramSessionStore } from "./session-policy.ts";

/** Minimal Prisma-compatible contract, injected by server-only routes. */
export type TelegramAuthDatabase = {
  telegramLaunchReplay: {
    create: (args: { data: { key: string; expiresAt: Date } }) => Promise<unknown>;
  };
  telegramAuthSession: {
    create: (args: { data: { key: string; telegramUserId: string; expiresAt: Date } }) => Promise<unknown>;
    findFirst: (args: { where: { key: string; telegramUserId: string; revokedAt: null; expiresAt: { gt: Date } }; select: { key: true } }) => Promise<{ key: string } | null>;
    updateMany: (args: { where: { key: string; telegramUserId: string; revokedAt: null }; data: { revokedAt: Date } }) => Promise<{ count: number }>;
  };
};

export function createPrismaTelegramSessionStore(db: TelegramAuthDatabase): TelegramLaunchSessionStore & TelegramSessionStore {
  return {
    async reserveOnce(key, expiresAt) {
      try {
        // Primary-key uniqueness is the atomic replay guard across all app instances.
        await db.telegramLaunchReplay.create({ data: { key, expiresAt } });
        return true;
      } catch (error) {
        // Fail closed on duplicates and all other database errors.
        void error;
        return false;
      }
    },
    async createSession(key, telegramUserId, expiresAt) {
      try {
        await db.telegramAuthSession.create({ data: { key, telegramUserId, expiresAt } });
        return true;
      } catch {
        return false;
      }
    },
    async isActive(key, telegramUserId) {
      const result = await db.telegramAuthSession.findFirst({
        where: { key, telegramUserId, revokedAt: null, expiresAt: { gt: new Date() } },
        select: { key: true },
      });
      return result !== null;
    },
    async revoke(key, telegramUserId) {
      const result = await db.telegramAuthSession.updateMany({
        where: { key, telegramUserId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return result.count === 1;
    },
  };
}
