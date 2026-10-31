/**
 * Call only with URLSearchParams returned by verifyTelegramInitData.
 * This parser is NOT an authentication boundary.
 */
export type VerifiedTelegramIdentity = {
  telegramUserId: string;
  displayName: string;
};

export function extractVerifiedTelegramIdentity(verifiedParams: URLSearchParams): VerifiedTelegramIdentity {
  const raw = verifiedParams.get("user");
  if (!raw || raw.length > 4096) throw new Error("Missing Telegram user");
  let value: unknown;
  try { value = JSON.parse(raw); } catch { throw new Error("Invalid Telegram user"); }
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid Telegram user");
  const user = value as Record<string, unknown>;
  if (typeof user.id !== "number" || !Number.isSafeInteger(user.id) || user.id <= 0) {
    throw new Error("Invalid Telegram user ID");
  }
  if (typeof user.first_name !== "string" || user.first_name.length < 1 || user.first_name.length > 256) {
    throw new Error("Invalid Telegram user name");
  }
  const lastName = typeof user.last_name === "string" ? user.last_name.slice(0, 256) : "";
  return {
    telegramUserId: String(user.id),
    displayName: [user.first_name, lastName].filter(Boolean).join(" "),
  };
}
