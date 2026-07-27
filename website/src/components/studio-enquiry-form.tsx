"use client";

import { FormEvent, useState } from "react";

export function StudioEnquiryForm() {
  const enabled = process.env.NEXT_PUBLIC_FORMS_ENABLED === "true";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    setState("sending");
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      if (response.ok) { event.currentTarget.reset(); setState("sent"); } else setState("error");
    } catch { setState("error"); }
  }

  return <form className="studio-enquiry-form" onSubmit={submit}>
    <input type="hidden" name="topic" value="studio" />
    <div className="form-row"><label>Name<input name="name" autoComplete="name" required maxLength={100} /></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div>
    <div className="form-row"><label>Organisation<input name="company" autoComplete="organization" required maxLength={150} /></label><label>Website<input name="companyWebsiteUrl" type="url" placeholder="https://" maxLength={300} /></label></div>
    <div className="form-row"><label>What do you need?<select name="studioService" defaultValue="discovery"><option value="discovery">Product discovery</option><option value="design">Product design</option><option value="engineering">Product engineering</option><option value="ai">AI implementation</option><option value="optimisation">Product optimisation</option></select></label><label>Timeline<select name="timeline" defaultValue="exploring"><option value="exploring">Exploring options</option><option value="one-to-three-months">One to three months</option><option value="three-to-six-months">Three to six months</option><option value="ongoing">Ongoing partnership</option></select></label></div>
    <label>What would you like to build or improve?<textarea name="message" required minLength={20} maxLength={3000} rows={6} /></label>
    <label>Anything about data or compliance we should understand?<textarea name="riskContext" maxLength={1200} rows={3} /></label>
    <input className="form-honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="button" type="submit" disabled={!enabled || state === "sending"}>{state === "sending" ? "Sending…" : "Send project brief"}</button>
    {!enabled && <p className="form-notice">Studio enquiry delivery is being configured. The form will open when the delivery destination is ready.</p>}
    {state === "sent" && <p className="form-success" role="status">Brief sent. We will review the context and respond with the next useful step.</p>}
    {state === "error" && <p className="form-error" role="alert">The brief could not be delivered. Please try again later.</p>}
  </form>;
}
