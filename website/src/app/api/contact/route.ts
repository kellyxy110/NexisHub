import { NextResponse } from "next/server";

type ContactPayload = { name?: string; email?: string; topic?: string; message?: string; companyWebsite?: string };

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;
  if (!payload || payload.companyWebsite) return NextResponse.json({ ok: true });
  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const topics = new Set(["general", "partnership", "press", "product"]);
  if (!name || name.length > 100 || !email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200 || !message || message.length < 10 || message.length > 3000 || !topics.has(payload.topic ?? "general")) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  const endpoint = process.env.FORM_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Form delivery is not configured" }, { status: 503 });
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json", authorization: process.env.FORM_WEBHOOK_TOKEN ? `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` : "" }, body: JSON.stringify({ kind: "contact", submittedAt: new Date().toISOString(), name, email, topic: payload.topic ?? "general", message }) });
  if (!response.ok) return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
