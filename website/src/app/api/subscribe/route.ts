import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = payload?.email?.trim();
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  const endpoint = process.env.FORM_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Subscription delivery is not configured" }, { status: 503 });
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json", authorization: process.env.FORM_WEBHOOK_TOKEN ? `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` : "" }, body: JSON.stringify({ kind: "newsletter", submittedAt: new Date().toISOString(), email }) });
  if (!response.ok) return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
