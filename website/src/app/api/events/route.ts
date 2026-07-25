import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as { name?: unknown; path?: unknown; properties?: unknown } | null;
  if (!payload || typeof payload.name !== "string" || payload.name.length > 80 || typeof payload.path !== "string" || !payload.path.startsWith("/") || payload.path.length > 500 || (payload.properties !== undefined && (!payload.properties || typeof payload.properties !== "object"))) return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  const endpoint = process.env.ANALYTICS_WEBHOOK_URL;
  if (!endpoint) return new NextResponse(null, { status: 204 });
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json", authorization: process.env.ANALYTICS_WEBHOOK_TOKEN ? `Bearer ${process.env.ANALYTICS_WEBHOOK_TOKEN}` : "" }, body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }) });
  return new NextResponse(null, { status: response.ok ? 204 : 502 });
}
