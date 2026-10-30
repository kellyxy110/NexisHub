import { randomBytes } from "node:crypto";
import { verifyTelegramInitData } from "./verify-init-data.ts";
import { extractVerifiedTelegramIdentity } from "./verified-identity.ts";
import { reserveVerifiedTelegramLaunch, type TelegramReplayStore } from "./replay-policy.ts";
import { issueTelegramSession } from "./session-token.ts";
import { telegramSessionKey } from "./session-policy.ts";

export type TelegramLaunchSessionStore = TelegramReplayStore & {
  /** Must atomically persist this key and expiry, shared by all instances. */
  createSession: (key: string, userId: string, expiresAt: Date) => Promise<boolean>;
};

export type TelegramLaunchResult =
  | { ok: true; token: string; expiresAt: number }
  | { ok: false; error: "invalid_launch" | "replayed_or_unavailable" | "session_unavailable" | "not_configured" };

/**
 * Server-only launch orchestration. Caller must set a Secure HttpOnly SameSite cookie,
 * not return the bearer token in JSON. No route is wired to this function yet.
 */
export async function createVerifiedTelegramLaunchSession(
  initData: string,
  options: { botToken?: string; sessionSecret?: string; store: TelegramLaunchSessionStore; nowSeconds?: number },
): Promise<TelegramLaunchResult> {
  if (!options.botToken || !options.sessionSecret || options.sessionSecret.length < 32) {
    return { ok: false, error: "not_configured" };
  }
  const now = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  let userId: string;
  try {
    const verified = verifyTelegramInitData(initData, options.botToken, { nowSeconds: now });
    userId = extractVerifiedTelegramIdentity(verified).telegramUserId;
  } catch {
    return { ok: false, error: "invalid_launch" };
  }
  if (!await reserveVerifiedTelegramLaunch(initData, options.store, now)) {
    return { ok: false, error: "replayed_or_unavailable" };
  }
  const expiresAt = now + 900;
  const token = issueTelegramSession({ sub: userId, iat: now, exp: expiresAt, nonce: randomBytes(24).toString("hex") }, options.sessionSecret);
  try {
    if (!await options.store.createSession(telegramSessionKey(token), userId, new Date(expiresAt * 1000))) {
      return { ok: false, error: "session_unavailable" };
    }
  } catch {
    return { ok: false, error: "session_unavailable" };
  }
  return { ok: true, token, expiresAt };
}
