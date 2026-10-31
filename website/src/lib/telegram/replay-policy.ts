import { createHash } from "node:crypto";

/**
 * Persistence adapter must atomically insert a unique key and return false on conflict.
 * A process-local Set is NOT suitable for multi-instance deployments.
 */
export type TelegramReplayStore = {
  reserveOnce: (key: string, expiresAt: Date) => Promise<boolean>;
};

export function telegramReplayKey(initData: string): string {
  if (typeof initData !== "string" || initData.length === 0 || initData.length > 8192) {
    throw new Error("Invalid Telegram launch");
  }
  return createHash("sha256").update("nexishub.telegram.initdata.v1\0").update(initData).digest("hex");
}

/**
 * Invoke only after Telegram HMAC and auth_date verification.
 * Fail closed if persistence is unavailable or reserveOnce throws.
 */
export async function reserveVerifiedTelegramLaunch(
  initData: string,
  store: TelegramReplayStore,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  if (!Number.isSafeInteger(nowSeconds) || nowSeconds < 0) return false;
  try {
    const key = telegramReplayKey(initData);
    return (await store.reserveOnce(key, new Date((nowSeconds + 360) * 1000))) === true;
  } catch {
    return false;
  }
}
