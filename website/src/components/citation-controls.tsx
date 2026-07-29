"use client";

import { useState } from "react";

export function CitationControls({ slug }: { slug: string }) {
  const [format, setFormat] = useState("apa");
  const [message, setMessage] = useState("");
  const citationUrl = `/research/publications/${slug}/citation?format=${format}`;
  async function copyCitation() {
    try { const response = await fetch(citationUrl); const value = await response.text(); await navigator.clipboard.writeText(value); setMessage("Citation copied"); } catch { setMessage("Copy unavailable. Use the download link."); }
  }
  return <div className="citation-controls" aria-label="Citation tools"><label htmlFor="citation-format">Format</label><select id="citation-format" value={format} onChange={(event) => setFormat(event.target.value)}><option value="apa">APA</option><option value="bibtex">BibTeX</option><option value="json">JSON</option></select><button type="button" onClick={copyCitation}>Copy citation</button><a href={citationUrl} download>Download</a>{message && <span role="status" aria-live="polite">{message}</span>}</div>;
}
