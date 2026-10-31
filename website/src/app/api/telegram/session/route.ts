import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPrisma } from "../../../../lib/prisma";
import { createPrismaTelegramSessionStore } from "../../../../lib/telegram/prisma-session-store";
import { authorizeTelegramSession } from "../../../../lib/telegram/session-policy";
import { TELEGRAM_SESSION_COOKIE } from "../../../../lib/telegram/session-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

export async function GET() {
  if (process.env.TELEGRAM_MINIAPP_AUTH_ENABLED !== "true") {
    return NextResponse.json({ authenticated: false, error: "not_enabled" }, { status: 503, headers });
  }
  const secret = process.env.TELEGRAM_MINIAPP_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return NextResponse.json({ authenticated: false, error: "not_configured" }, { status: 503, headers });
  }
  const token = (await cookies()).get(TELEGRAM_SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401, headers });
  try {
    const store = createPrismaTelegramSessionStore(getPrisma());
    const session = await authorizeTelegramSession(token, secret, store);
    if (!session) return NextResponse.json({ authenticated: false }, { status: 401, headers });
    return NextResponse.json({ authenticated: true, expiresAt: session.exp }, { status: 200, headers });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 503, headers });
  }
}
