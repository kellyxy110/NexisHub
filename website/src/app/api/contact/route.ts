import { NextResponse } from "next/server";

type ContactPayload = { name?: string; email?: string; topic?: string; message?: string; companyWebsite?: string; company?: string; companyWebsiteUrl?: string; studioService?: string; timeline?: string; riskContext?: string };

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;
  if (!payload || payload.companyWebsite) return NextResponse.json({ ok: true });
  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const company = payload.company?.trim();
  const companyWebsiteUrl = payload.companyWebsiteUrl?.trim();
  const riskContext = payload.riskContext?.trim();
  const topics = new Set(["general", "partnership", "press", "product"]);
  const studioServices = new Set(["discovery", "design", "engineering", "ai", "optimisation"]);
  const timelines = new Set(["exploring", "one-to-three-months", "three-to-six-months", "ongoing"]);
  const isStudio = payload.topic === "studio";
  if (!name || name.length > 100 || !email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200 || !message || message.length < 10 || message.length > 3000 || (!isStudio && !topics.has(payload.topic ?? "general")) || (isStudio && (!company || company.length > 150 || !studioServices.has(payload.studioService ?? "") || !timelines.has(payload.timeline ?? "") || (companyWebsiteUrl && companyWebsiteUrl.length > 300) || (riskContext && riskContext.length > 1200)))) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  const endpoint = process.env.FORM_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Form delivery is not configured" }, { status: 503 });
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json", authorization: process.env.FORM_WEBHOOK_TOKEN ? `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` : "" }, body: JSON.stringify({ kind: isStudio ? "studio_enquiry" : "contact", submittedAt: new Date().toISOString(), name, email, topic: payload.topic ?? "general", message, company, companyWebsiteUrl, studioService: payload.studioService, timeline: payload.timeline, riskContext }) });
  if (!response.ok) return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
