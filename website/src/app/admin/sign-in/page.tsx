import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAdminFeatureFlags } from "@/lib/admin-features";

export default async function AdminSignInPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/admin");
  const flags = getAdminFeatureFlags();
  return <main className="article-page"><div className="shell article-layout"><article className="article-body"><p className="eyebrow"><span /> NexisHub administration</p><h1>Founder sign-in.</h1><p>Authentication uses a passwordless email link. Production sending remains disabled until the Resend configuration and founder approval are complete.</p><p><strong>Administration status:</strong> {flags.founderSafeAdminEnabled ? "Ready for authenticated access" : "Configuration required"}</p><p>Set the documented Vercel environment variables before enabling sign-in.</p></article></div></main>;
}
