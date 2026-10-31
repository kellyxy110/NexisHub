import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPrisma } from "../../../../lib/prisma";
import { createPrismaTelegramSessionStore } from "../../../../lib/telegram/prisma-session-store";
import { revokeTelegramSession } from "../../../../lib/telegram/session-policy";
import { TELEGRAM_SESSION_COOKIE, clearTelegramSessionCookie } from "../../../../lib/telegram/session-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

export async function POST(request: Request) {
  if (process.env.TELEGRAM_MINIAPP_AUTH_ENABLED !== "true") {
    return NextResponse.json({ loggedOut: false, error: "not_enabled" }, { status: 503, headers });
  }
  const origin = request.headers.get("origin");
  const expected = new URL(request.url).origin;
  if (origin !== expected) {
    return NextResponse.json({ loggedOut: false, error: "invalid_origin" }, { status: 403, headers });
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(TELEGRAM_SESSION_COOKIE)?.value;
  if (token) {
    const secret = process.env.TELEGRAM_MINIAPP_SESSION_SECRET;
    if (!secret || secret.length < 32) {
      return NextResponse.json({ loggedOut: false, error: "not_configured" }, { status: 503, headers });
    }
    try {
      const revoked = await revokeTelegramSession(token, secret, createPrismaTelegramSessionStore(getPrisma()));
      if (!revoked) {
        return NextResponse.json({ loggedOut: false, error: "revocation_unconfirmed" }, { status: 503, headers });
      }
    } catch {
      return NextResponse.json({ loggedOut: false, error: "revocation_unconfirmed" }, { status: 503, headers });
    }
  }
  const response = NextResponse.json({ loggedOut: true }, { status: 200, headers });
  const cookie = clearTelegramSessionCookie();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
