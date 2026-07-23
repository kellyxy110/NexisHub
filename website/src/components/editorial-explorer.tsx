"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { editorialHubs } from "@/lib/editorial";

const groups = ["All", "Engineering", "Intelligence", "Domains", "Knowledge"] as const;

export function EditorialExplorer() {
  const [query, setQuery] = useState(""); const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const results = useMemo(() => editorialHubs.filter((hub) => (group === "All" || hub.group === group) && `${hub.name} ${hub.description}`.toLowerCase().includes(query.toLowerCase())), [query, group]);
  return <div className="editorial-explorer"><div className="editorial-tools"><div className="category-pills" aria-label="Filter editorial hubs">{groups.map((item) => <button className={item === group ? "is-active" : ""} onClick={() => setGroup(item)} key={item}>{item}</button>)}</div><label className="editorial-search"><span>Search topics</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="AI visibility, infrastructure…" /></label></div><div className="editorial-grid">{results.map((hub, index) => <article key={hub.name}><span>{String(index + 1).padStart(2, "0")} · {hub.group}</span><h3>{hub.name}</h3><p>{hub.description}</p>{hub.href ? <Link href={hub.href}>{hub.articleCount} published {hub.articleCount === 1 ? "article" : "articles"} <b>→</b></Link> : <small>Editorial hub · Articles forthcoming</small>}</article>)}</div>{results.length === 0 && <p className="editorial-empty">No editorial hub matches that search.</p>}</div>;
}
