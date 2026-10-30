import { NextResponse } from "next/server";
import { verifyTelegramInitData } from "@/lib/telegram/verify-init-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Explicitly gated Telegram launch verification. Never returns Telegram
 * identity data, session cookies or raw initData.
 *
 * Enable only after rotating the bot token and provisioning it server-side.
 */
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (process.env.TELEGRAM_MINIAPP_AUTH_ENABLED !== "true") {
    return NextResponse.json({ verified: false, error: "not_enabled" }, { status: 503, headers });
  }
  const token = process.env.TELEGRAM_MINIAPP_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({ verified: false, error: "not_configured" }, { status: 503, headers });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ verified: false, error: "invalid_content_type" }, { status: 415, headers });
  }
  const body = await request.text();
  if (body.length > 12288) {
    return NextResponse.json({ verified: false, error: "invalid_request" }, { status: 413, headers });
  }
  let initData: unknown;
  try {
    const parsed: unknown = JSON.parse(body);
    initData = parsed && typeof parsed === "object" && "initData" in parsed
      ? (parsed as { initData: unknown }).initData
      : undefined;
  } catch {
    return NextResponse.json({ verified: false, error: "invalid_request" }, { status: 400, headers });
  }
  if (typeof initData !== "string") {
    return NextResponse.json({ verified: false, error: "invalid_request" }, { status: 400, headers });
  }
  try {
    verifyTelegramInitData(initData, token);
    return NextResponse.json({ verified: true }, { headers });
  } catch {
    return NextResponse.json({ verified: false, error: "invalid_signature_or_expired" }, { status: 401, headers });
  }
}
