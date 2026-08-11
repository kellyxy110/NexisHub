"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function AdminSignInForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const result = await signIn("email", { email, redirect: false, callbackUrl: "/admin" });
    setPending(false);
    if (result?.error) setMessage("The sign-in link could not be requested. Check the configuration and try again.");
    else setMessage("If this address is eligible, a secure sign-in link has been sent.");
  }

  return <form className="admin-sign-in-form" onSubmit={submit}>
    <label htmlFor="admin-email">Founder email</label>
    <input id="admin-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
    <button className="admin-primary-button" type="submit" disabled={pending}>{pending ? "Requesting link…" : "Email me a sign-in link"} <span>→</span></button>
    {message ? <p className="admin-form-message" role="status">{message}</p> : null}
  </form>;
}
