import { NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/prisma";
import { createPrismaTelegramSessionStore } from "../../../../lib/telegram/prisma-session-store";
import { createVerifiedTelegramLaunchSession } from "../../../../lib/telegram/launch-session-policy";
import { telegramSessionCookie } from "../../../../lib/telegram/session-cookie";
import { allowTelegramAuthAttempt } from "../../../../lib/telegram/auth-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

/** Disabled by default. Requires migrated PostgreSQL and server-only secrets. */
export async function POST(request: Request) {
  if (process.env.TELEGRAM_MINIAPP_AUTH_ENABLED !== "true") {
    return NextResponse.json({ authenticated: false, error: "not_enabled" }, { status: 503, headers });
  }
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ authenticated: false, error: "invalid_origin" }, { status: 403, headers });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ authenticated: false, error: "invalid_content_type" }, { status: 415, headers });
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(length) || length > 12288) {
    return NextResponse.json({ authenticated: false, error: "invalid_request" }, { status: 413, headers });
  }
  let initData: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12288) return NextResponse.json({ authenticated: false, error: "invalid_request" }, { status: 413, headers });
    const body: unknown = JSON.parse(raw);
    initData = body && typeof body === "object" && !Array.isArray(body) && "initData" in body
      ? (body as { initData: unknown }).initData : undefined;
  } catch {
    return NextResponse.json({ authenticated: false, error: "invalid_request" }, { status: 400, headers });
  }
  if (typeof initData !== "string" || initData.length > 8192) {
    return NextResponse.json({ authenticated: false, error: "invalid_request" }, { status: 400, headers });
  }
  const botToken = process.env.TELEGRAM_MINIAPP_BOT_TOKEN;
  const sessionSecret = process.env.TELEGRAM_MINIAPP_SESSION_SECRET;
  if (!botToken || !sessionSecret || sessionSecret.length < 32) {
    return NextResponse.json({ authenticated: false, error: "not_configured" }, { status: 503, headers });
  }
  try {
    // Trust only the platform-controlled forwarding header on Vercel.
    // Other hosts must supply an audited equivalent before enabling authentication.
    const networkKey = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : null;
    const db = getPrisma();
    if (!networkKey || !await allowTelegramAuthAttempt(db as unknown as Parameters<typeof allowTelegramAuthAttempt>[0], networkKey, sessionSecret)) {
      return NextResponse.json({ authenticated: false, error: "rate_limited_or_unavailable" }, { status: 429, headers });
    }
    const now = Math.floor(Date.now() / 1000);
    const result = await createVerifiedTelegramLaunchSession(initData, {
      botToken, sessionSecret, store: createPrismaTelegramSessionStore(db), nowSeconds: now,
    });
    if (!result.ok) {
      const status = result.error === "invalid_launch" ? 401 : result.error === "replayed_or_unavailable" ? 409 : 503;
      return NextResponse.json({ authenticated: false, error: result.error }, { status, headers });
    }
    const response = NextResponse.json({ authenticated: true, expiresAt: result.expiresAt }, { status: 200, headers });
    const cookie = telegramSessionCookie(result.token, result.expiresAt, now);
    response.cookies.set(cookie.name, cookie.value, cookie.options);
    return response;
  } catch {
    return NextResponse.json({ authenticated: false, error: "session_unavailable" }, { status: 503, headers });
  }
}
