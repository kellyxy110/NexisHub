import { redirect } from "next/navigation";
import { getAdminFeatureFlags } from "@/lib/admin-features";
import { getCurrentAdminPrincipal } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const principal = await getCurrentAdminPrincipal();
  if (!principal) redirect("/admin/sign-in");
  const flags = getAdminFeatureFlags();
  return <main className="article-page"><div className="shell article-layout"><article className="article-body"><p className="eyebrow"><span /> Founder administration</p><h1>Operations dashboard.</h1><p>Signed in as {principal.email} with {principal.role}.</p><section><h2>Activation status</h2><p><strong>Founder-safe administration:</strong> {flags.founderSafeAdminEnabled ? "Enabled" : "Gated"}</p><p>Publication drafts and Studio operations can be activated independently after infrastructure and authorization evidence passes.</p></section><section><h2>High-risk modules</h2><p>Reviewer records, pilot participants, consent, production invitations, legal workflows, and Version 1.0 publication remain disabled.</p></section></article></div></main>;
}