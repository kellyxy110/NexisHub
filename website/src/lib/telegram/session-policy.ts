import { createHash } from "node:crypto";
import { readTelegramSession, type TelegramSession } from "./session-token.ts";

export type TelegramSessionStore = {
  isActive: (sessionKey: string, telegramUserId: string) => Promise<boolean>;
  revoke: (sessionKey: string, telegramUserId: string) => Promise<boolean>;
};

/** Store only a one-way fingerprint, never the bearer token. */
export function telegramSessionKey(token: string): string {
  if (typeof token !== "string" || !token || token.length > 2048) throw new Error("Invalid session token");
  return createHash("sha256").update("nexishub.telegram.session.lookup.v1\0").update(token).digest("hex");
}

/** Requires an atomic, persistent session store shared across all server instances. */
export async function authorizeTelegramSession(
  token: string,
  secret: string,
  store: TelegramSessionStore,
  nowSeconds?: number,
): Promise<TelegramSession | null> {
  try {
    const session = readTelegramSession(token, secret, nowSeconds);
    if (!session) return null;
    const active = await store.isActive(telegramSessionKey(token), session.sub);
    return active === true ? session : null;
  } catch {
    return null;
  }
}

export async function revokeTelegramSession(
  token: string,
  secret: string,
  store: TelegramSessionStore,
  nowSeconds?: number,
): Promise<boolean> {
  try {
    const session = readTelegramSession(token, secret, nowSeconds);
    if (!session) return false;
    return (await store.revoke(telegramSessionKey(token), session.sub)) === true;
  } catch {
    return false;
  }
}
