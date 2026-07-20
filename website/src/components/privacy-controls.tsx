"use client";

import { useEffect, useState } from "react";

const consentKey = "nexishub-analytics-consent";

export function PrivacyControls() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setOpen(localStorage.getItem(consentKey) === null), 0); const show = () => setOpen(true); window.addEventListener("nexishub:privacy", show); return () => { window.clearTimeout(timer); window.removeEventListener("nexishub:privacy", show); }; }, []);
  function choose(value: "allow" | "reject") { localStorage.setItem(consentKey, value); window.dispatchEvent(new CustomEvent("nexishub:consent", { detail: value })); setOpen(false); }
  if (!open) return null;
  return <aside className="privacy-banner" aria-label="Privacy choices"><div><strong>Your privacy, clearly handled.</strong><p>Essential storage remembers this choice. Optional analytics helps us understand page and CTA usage without advertising trackers.</p></div><div><button onClick={() => choose("reject")}>Essential only</button><button className="privacy-allow" onClick={() => choose("allow")}>Allow analytics</button></div></aside>;
}

export function AnalyticsTracker() {
  useEffect(() => {
    const sentDepths = new Set<number>();
    const allowed = () => localStorage.getItem(consentKey) === "allow";
    const send = (name: string, properties: Record<string, string | number> = {}) => { if (!allowed()) return; navigator.sendBeacon?.("/api/events", new Blob([JSON.stringify({ name, path: location.pathname, properties })], { type: "application/json" })); };
    const click = (event: MouseEvent) => { const target = (event.target as HTMLElement).closest<HTMLElement>("[data-analytics]"); if (target?.dataset.analytics) send("cta_click", { id: target.dataset.analytics }); };
    const seenProducts = new Set<string>();
    const product = (event: PointerEvent) => { const target = (event.target as HTMLElement).closest<HTMLElement>("[data-product]"); const id = target?.dataset.product; if (id && !seenProducts.has(id)) { seenProducts.add(id); send("product_interaction", { product: id }); } };
    const scroll = () => { const available = document.documentElement.scrollHeight - innerHeight; if (available <= 0) return; const depth = Math.round((scrollY / available) * 100); [25, 50, 75, 100].forEach((mark) => { if (depth >= mark && !sentDepths.has(mark)) { sentDepths.add(mark); send("scroll_depth", { percent: mark }); } }); };
    document.addEventListener("click", click); document.addEventListener("pointerover", product); window.addEventListener("scroll", scroll, { passive: true }); send("page_view");
    return () => { document.removeEventListener("click", click); document.removeEventListener("pointerover", product); window.removeEventListener("scroll", scroll); };
  }, []);
  return null;
}

export function PrivacyButton() { return <button className="privacy-button" onClick={() => window.dispatchEvent(new Event("nexishub:privacy"))}>Cookie choices</button>; }
