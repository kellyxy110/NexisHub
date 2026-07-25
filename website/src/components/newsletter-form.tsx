"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const enabled = process.env.NEXT_PUBLIC_FORMS_ENABLED === "true";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!enabled) return; setState("sending");
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      if (response.ok) { event.currentTarget.reset(); setState("sent"); } else setState("error");
    } catch { setState("error"); }
  }
  return <form className="newsletter" onSubmit={submit}><label htmlFor="newsletter-email">Product and company updates</label><div><input id="newsletter-email" name="email" type="email" required placeholder="Email address" aria-label="Email address" disabled={!enabled} /><button type="submit" disabled={!enabled || state === "sending"} aria-label="Subscribe">{state === "sending" ? "…" : "→"}</button></div>{!enabled && <small>Subscriptions open when delivery is configured.</small>}{state === "sent" && <small role="status">You&apos;re subscribed.</small>}{state === "error" && <small role="alert">Could not subscribe. Try again later.</small>}</form>;
}
