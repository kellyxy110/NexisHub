import { redirect } from "next/navigation";
import { getCurrentAdminPrincipal } from "@/lib/admin-session";
import { getAdminFeatureFlags } from "@/lib/admin-features";
import { getPrisma } from "@/lib/prisma";
import { nriPublications } from "@/lib/nri-publication-registry";

export const dynamic = "force-dynamic";

export default async function AdminPublicationsPage() {
  const principal = await getCurrentAdminPrincipal();
  if (!principal) redirect("/admin/sign-in");
  const flags = getAdminFeatureFlags();
  const persisted = flags.nriPublicationAdminEnabled ? await getPrisma().publication.findMany({ orderBy: { updatedAt: "desc" }, select: { id: true, slug: true, title: true, status: true, version: true, updatedAt: true } }).catch(() => []) : [];
  const records = persisted.length ? persisted.map((publication) => ({ ...publication, source: "Database" })) : nriPublications.map((publication) => ({ id: publication.slug, slug: publication.slug, title: publication.title, status: publication.status, version: publication.version, updatedAt: new Date(publication.datePublished), source: "File registry" }));
  return <main className="admin-page"><div className="admin-shell"><aside className="admin-sidebar"><a className="admin-brand" href="/admin"><span className="admin-brand-mark">N</span><span><strong>NexisHub</strong><small>Administration</small></span></a><nav aria-label="Administration navigation"><span className="admin-nav-label">Research</span><a className="admin-nav-link admin-nav-link--active" href="/admin/publications">Publications</a><a className="admin-nav-link" href="/admin/copilot">Operations Copilot</a></nav><a className="admin-back-link" href="/admin">← Overview</a></aside><section className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">Nexis Research Institute</p><h1>Publications</h1></div><span className="admin-account">{principal.email}</span></header><div className="admin-notice"><span className="admin-notice-icon">i</span><div><strong>{flags.nriPublicationAdminEnabled ? "Database-backed workspace" : "Read-only registry view"}</strong><p>{flags.nriPublicationAdminEnabled ? "Draft persistence is available to authorized users. Publication approval and Version 1.0 gates remain enforced." : "The publication administration flag is not enabled. Showing the truthful file-backed registry without enabling mutations."}</p></div></div><section className="admin-card"><div className="admin-card-heading"><div><span className="admin-card-index">01</span><h2>Publication records</h2></div><span className="admin-status admin-status--blue">{records.length} record{records.length === 1 ? "" : "s"}</span></div><div className="admin-module-list">{records.map((record) => <div key={record.id}><span className="admin-module-dot admin-module-dot--blue" /><span><strong>{record.title}</strong><br /><small>{record.source} · Version {record.version} · {record.status} · Updated {record.updatedAt.toISOString().slice(0, 10)}</small></span><span className="admin-module-state">{record.slug}</span></div>)}</div></section></section></div></main>;
}
