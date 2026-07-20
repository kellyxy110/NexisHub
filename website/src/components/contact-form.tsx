"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const enabled = process.env.NEXT_PUBLIC_FORMS_ENABLED === "true";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    setState("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    if (response.ok) { event.currentTarget.reset(); setState("sent"); } else { setState("error"); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Name<input name="name" autoComplete="name" required maxLength={100} /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div>
      <label>What can we help with?<select name="topic" defaultValue="general"><option value="general">General inquiry</option><option value="partnership">Partnership</option><option value="press">Press</option><option value="product">Product question</option></select></label>
      <label>Message<textarea name="message" required minLength={10} maxLength={3000} rows={7} /></label>
      <input className="form-honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="button" type="submit" disabled={!enabled || state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      {!enabled && <p className="form-notice">Company-form delivery is being configured. For SiteNexis product support, use the direct support link alongside this form.</p>}
      {state === "sent" && <p className="form-success" role="status">Message sent. Thank you.</p>}
      {state === "error" && <p className="form-error" role="alert">The message could not be delivered. Please try again later.</p>}
    </form>
  );
}
