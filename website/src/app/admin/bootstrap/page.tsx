import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { bootstrapFounder } from "@/lib/founder-bootstrap";

async function bootstrapAction() {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/admin/sign-in");
  await bootstrapFounder(session.user.id);
  redirect("/admin");
}

export default async function FounderBootstrapPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/sign-in");
  return <main className="admin-auth-page"><div className="admin-auth-card"><a className="admin-brand admin-brand--dark" href="/"><span className="admin-brand-mark">N</span><span><strong>NexisHub</strong><small>Administration</small></span></a><div className="admin-auth-copy"><p className="admin-kicker">One-time setup</p><h1>Confirm founder access.</h1><p>This action assigns <strong>SUPER_ADMIN</strong> only when your verified Auth.js email matches the configured founder address.</p></div><div className="admin-confirmation"><span className="admin-confirmation-number">01</span><div><strong>Founder identity check</strong><p>Your session and verified email are checked server-side before any role is assigned.</p></div></div><form action={bootstrapAction}><button className="admin-primary-button" type="submit">Assign SUPER_ADMIN <span>→</span></button></form><a className="admin-text-link" href="/admin">Return to dashboard →</a></div></main>;
}
