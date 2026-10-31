import { createHmac } from "node:crypto";

export type TelegramRateLimitDatabase = {
  $queryRaw: (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Array<{ count: number }>>;
};

/**
 * Atomic PostgreSQL fixed-window counter. Call before signature verification.
 * Fail closed if database is unavailable. Caller must supply a trusted
 * platform-derived network key, never an unvalidated client-supplied header.
 */
export async function allowTelegramAuthAttempt(
  db: TelegramRateLimitDatabase,
  networkKey: string,
  secret: string,
  now = new Date(),
): Promise<boolean> {
  if (!networkKey || networkKey.length > 256 || secret.length < 32 || !Number.isFinite(now.getTime())) return false;
  const start = new Date(Math.floor(now.getTime() / 60000) * 60000);
  const expiry = new Date(start.getTime() + 120000);
  const key = createHmac("sha256", secret).update("nexishub.telegram.auth.rate.v1\0").update(networkKey).digest("hex");
  try {
    const rows = await db.$queryRaw`
      INSERT INTO "TelegramAuthRateLimit" ("key", "windowStart", "count", "expiresAt")
      VALUES (${key}, ${start}, 1, ${expiry})
      ON CONFLICT ("key", "windowStart")
      DO UPDATE SET "count" = "TelegramAuthRateLimit"."count" + 1
      WHERE "TelegramAuthRateLimit"."count" < 10
      RETURNING "count"
    `;
    return rows.length === 1 && rows[0].count <= 10;
  } catch {
    return false;
  }
}
