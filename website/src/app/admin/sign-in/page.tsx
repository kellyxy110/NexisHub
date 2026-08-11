/* eslint-disable @next/next/no-html-link-for-pages */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAdminFeatureFlags } from "@/lib/admin-features";
import { AdminSignInForm } from "@/components/admin-sign-in-form";

export default async function AdminSignInPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/admin");
  const flags = getAdminFeatureFlags();
  return <main className="admin-auth-page"><div className="admin-auth-card"><a className="admin-brand admin-brand--dark" href="/"><span className="admin-brand-mark">N</span><span><strong>NexisHub</strong><small>Administration</small></span></a><div className="admin-auth-copy"><p className="admin-kicker">Secure workspace</p><h1>Founder sign-in.</h1><p>Passwordless access is delivered through a secure email link. Only the verified founder account can continue to administration.</p></div><div className="admin-auth-state"><span className={`admin-state-dot ${flags.founderSafeAdminEnabled ? "admin-state-dot--green" : "admin-state-dot--amber"}`} /><div><strong>{flags.founderSafeAdminEnabled ? "Ready for authenticated access" : "Configuration required"}</strong><p>{flags.founderSafeAdminEnabled ? "Request a secure link below." : "Production email delivery must be enabled by the founder."}</p></div></div><AdminSignInForm /><p className="admin-auth-footnote">The sign-in form never reveals whether an address is registered. Set a verified <code>AUTH_EMAIL_FROM</code> sender and enable Auth.js email delivery in Vercel.</p><a className="admin-text-link" href="/">Return to NexisHub →</a></div></main>;
}
