"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { nriProgrammes } from "@/lib/nri-programmes";

export default function ResearchSearchPage() {
  const [query, setQuery] = useState(""); const [area, setArea] = useState("All"); const areas = ["All", ...Array.from(new Set(nriProgrammes.map((item) => item.area)))];
  const matches = useMemo(() => nriProgrammes.filter((item) => (area === "All" || item.area === area) && `${item.title} ${item.overview} ${item.status}`.toLowerCase().includes(query.toLowerCase())), [area, query]);
  return <main className="shell" style={{ padding: "140px 0" }}><p className="kicker">Nexis Research Institute</p><h1>Research search</h1><p>Search programmes by title, area, status, or topic.</p><div style={{ display: "flex", gap: 12, margin: "40px 0", flexWrap: "wrap" }}><label><span className="sr-only">Search research</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search programmes" /></label><label><span className="sr-only">Filter by area</span><select value={area} onChange={(event) => setArea(event.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label></div><p>{matches.length} programme records</p><div className="research-grid">{matches.map((item) => <article key={item.slug}><span>{item.status}</span><h2><Link href={`/research/programmes/${item.slug}`}>{item.title}</Link></h2><p>{item.overview}</p><small>{item.area}</small></article>)}</div></main>;
}
