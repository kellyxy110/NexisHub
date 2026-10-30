import { createHmac, timingSafeEqual } from "node:crypto";

export type TelegramSession = { sub: string; iat: number; exp: number; nonce: string };
const MAX_AGE_SECONDS = 15 * 60;
const ID = /^[1-9][0-9]{0,19}$/;
const NONCE = /^[a-f0-9]{32,128}$/;
const b64 = (value: string) => Buffer.from(value, "utf8").toString("base64url");
const sign = (payload: string, secret: string) => createHmac("sha256", secret).update("nexishub.telegram.session.v1." + payload).digest();

export function issueTelegramSession(session: TelegramSession, secret: string): string {
  if (secret.length < 32 || !ID.test(session.sub) || !NONCE.test(session.nonce) ||
      !Number.isSafeInteger(session.iat) || !Number.isSafeInteger(session.exp) ||
      session.exp <= session.iat || session.exp - session.iat > MAX_AGE_SECONDS) {
    throw new Error("Invalid Telegram session configuration");
  }
  const payload = b64(JSON.stringify(session));
  return payload + "." + sign(payload, secret).toString("base64url");
}

export function readTelegramSession(token: string, secret: string, now = Math.floor(Date.now() / 1000)): TelegramSession | null {
  if (secret.length < 32 || token.length > 2048 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) return null;
  const [payload, mac] = token.split(".");
  const provided = Buffer.from(mac, "base64url");
  const expected = sign(payload, secret);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return null;
  try {
    const data: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    const s = data as Record<string, unknown>;
    if (typeof s.sub !== "string" || !ID.test(s.sub) || typeof s.nonce !== "string" || !NONCE.test(s.nonce) ||
        typeof s.iat !== "number" || typeof s.exp !== "number" ||
        !Number.isSafeInteger(s.iat) || !Number.isSafeInteger(s.exp) ||
        s.iat > now + 30 || s.exp <= now || s.exp <= s.iat || s.exp - s.iat > MAX_AGE_SECONDS) return null;
    return { sub: s.sub, iat: s.iat, exp: s.exp, nonce: s.nonce };
  } catch { return null; }
}
