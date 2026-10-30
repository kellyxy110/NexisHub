import { verifyTelegramInitData } from "./verify-init-data.ts";

export type TelegramVerificationResult = {
  status: number;
  body: { verified: boolean; error?: string };
};

/** Pure HTTP-independent verification policy, tested without a Next.js runtime. */
export function verifyTelegramLaunch(
  initData: unknown,
  options: { enabled: boolean; botToken?: string; nowSeconds?: number },
): TelegramVerificationResult {
  if (!options.enabled) return { status: 503, body: { verified: false, error: "not_enabled" } };
  if (!options.botToken) return { status: 503, body: { verified: false, error: "not_configured" } };
  if (typeof initData !== "string" || initData.length > 8192) {
    return { status: 400, body: { verified: false, error: "invalid_request" } };
  }
  try {
    verifyTelegramInitData(initData, options.botToken, { nowSeconds: options.nowSeconds });
    return { status: 200, body: { verified: true } };
  } catch {
    return { status: 401, body: { verified: false, error: "invalid_signature_or_expired" } };
  }
}
