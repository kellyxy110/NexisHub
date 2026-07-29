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
  return <main className="article-page"><div className="shell article-layout"><article className="article-body"><p className="eyebrow"><span /> Founder bootstrap</p><h1>Assign founder access.</h1><p>This one-time action succeeds only when your verified Auth.js email exactly matches `FOUNDER_EMAIL` and no different SUPER_ADMIN exists.</p><form action={bootstrapAction}><button className="button button--dark" type="submit">Bootstrap SUPER_ADMIN</button></form></article></div></main>;
}
