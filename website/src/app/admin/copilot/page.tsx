/* eslint-disable @next/next/no-html-link-for-pages */
import { redirect } from "next/navigation";
import { getCurrentAdminPrincipal } from "@/lib/admin-session";
import { searchOperationsKnowledge } from "@/lib/operations-copilot";

export const dynamic = "force-dynamic";

export default async function OperationsCopilotPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const principal = await getCurrentAdminPrincipal();
  if (!principal) redirect("/admin/sign-in");
  const query = (await searchParams).q?.trim() ?? "";
  const results = await searchOperationsKnowledge(query);
  return <main className="admin-page"><div className="admin-shell"><aside className="admin-sidebar"><a className="admin-brand" href="/admin"><span className="admin-brand-mark">N</span><span><strong>NexisHub</strong><small>Administration</small></span></a><nav aria-label="Administration navigation"><span className="admin-nav-label">Workspace</span><a className="admin-nav-link" href="/admin">Overview</a><a className="admin-nav-link admin-nav-link--active" href="/admin/copilot">Operations Copilot</a></nav><a className="admin-back-link" href="/">← Back to NexisHub</a></aside><section className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">Read-only founder tool</p><h1>Operations Copilot</h1></div><span className="admin-account">{principal.email}</span></header><div className="admin-notice"><span className="admin-notice-icon">i</span><div><strong>Evidence-first mode</strong><p>This first release searches approved project records and returns source excerpts. It does not publish, send, approve, or mutate data.</p></div></div><section className="admin-card"><h2>Search NexisHub operations</h2><p className="admin-card-lede">Ask about tasks, decisions, implementation status, or documented next steps.</p><form className="admin-sign-in-form" method="get"><label htmlFor="copilot-query">Question or topic</label><input id="copilot-query" name="q" defaultValue={query} placeholder="What remains for NRI administration?" /><button className="admin-primary-button" type="submit">Search records <span>→</span></button></form>{query ? <div className="admin-module-list" aria-live="polite">{results.length ? results.map((result) => <div key={`${result.source}-${result.line}`}><span className="admin-module-dot admin-module-dot--blue" /><span><strong>{result.source}:{result.line}</strong><br />{result.excerpt}</span></div>) : <p role="status">No matching documented evidence was found.</p>}</div> : <p className="admin-auth-footnote">Search results will include the source file and line number so every answer remains reviewable.</p>}</section></section></div></main>;
}
