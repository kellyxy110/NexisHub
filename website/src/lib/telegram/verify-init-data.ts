import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verify Telegram Mini App initData on the server.
 * Never trust initDataUnsafe or a client-provided Telegram user ID.
 * Pass the token from a server-only secret store; do not expose it to clients.
 */
export function verifyTelegramInitData(
  initData: string,
  botToken: string,
  options: { nowSeconds?: number; maxAgeSeconds?: number } = {},
): URLSearchParams {
  if (!initData || !botToken || initData.length > 8192) {
    throw new Error("Invalid Telegram authentication data");
  }
  const params = new URLSearchParams(initData);
  const hashValues = params.getAll("hash");
  if (hashValues.length !== 1 || !/^[a-f0-9]{64}$/i.test(hashValues[0])) {
    throw new Error("Invalid Telegram authentication hash");
  }
  const hash = hashValues[0].toLowerCase();
  params.delete("hash");
  if (params.has("signature")) params.delete("signature");
  const entries = Array.from(params.entries());
  if (new Set(entries.map(([key]) => key)).size !== entries.length) {
    throw new Error("Duplicate Telegram authentication fields");
  }
  const checkString = entries
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(botToken).digest();
  const expected = createHmac("sha256", secret).update(checkString).digest();
  if (!timingSafeEqual(expected, Buffer.from(hash, "hex"))) {
    throw new Error("Invalid Telegram authentication signature");
  }
  const authDate = params.get("auth_date");
  if (!authDate || !/^\d+$/.test(authDate)) {
    throw new Error("Missing Telegram authentication timestamp");
  }
  const timestamp = Number(authDate);
  const now = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const maxAge = options.maxAgeSeconds ?? 300;
  if (!Number.isSafeInteger(timestamp) || timestamp > now + 30 || now - timestamp > maxAge) {
    throw new Error("Expired Telegram authentication data");
  }
  return params;
}
