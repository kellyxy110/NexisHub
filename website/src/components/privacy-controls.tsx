"use client";

import { useEffect, useState } from "react";
import { analyticsConsentVersion, analyticsConsentVersionKey } from "@/lib/google-analytics";

import { advertisingAllowed, advertisingChoiceEvent, advertisingConsentKey } from "@/lib/advertising-consent";

const consentKey = "nexishub-analytics-consent";

export function PrivacyControls() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const show = () => {
      try {
        setAnalytics(localStorage.getItem(consentKey) === "allow" && localStorage.getItem(analyticsConsentVersionKey) === analyticsConsentVersion);
        setAdvertising(advertisingAllowed(localStorage));
      } catch { setAnalytics(false); setAdvertising(false); }
      setOpen(true);
    };
    const timer = window.setTimeout(() => {
      try { if (localStorage.getItem(consentKey) === null || localStorage.getItem(analyticsConsentVersionKey) !== analyticsConsentVersion || localStorage.getItem(advertisingConsentKey) === null) show(); }
      catch { show(); }
    }, 0);
    window.addEventListener("nexishub:privacy", show);
    return () => { window.clearTimeout(timer); window.removeEventListener("nexishub:privacy", show); };
  }, []);
  function choose(allowAnalytics: boolean, allowAdvertising: boolean) {
    try {
      localStorage.setItem(consentKey, allowAnalytics ? "allow" : "reject");
      localStorage.setItem(analyticsConsentVersionKey, analyticsConsentVersion);
      localStorage.setItem(advertisingConsentKey, allowAdvertising ? "allow" : "reject");
    } catch { setStorageError(true); return; }
    window.dispatchEvent(new CustomEvent("nexishub:consent", { detail: allowAnalytics ? "allow" : "reject" }));
    window.dispatchEvent(new Event(advertisingChoiceEvent));
    setOpen(false);
  }
  if (!open) return null;
  return <aside className="privacy-banner" aria-label="Privacy choices"><div><strong>Your privacy, clearly handled.</strong><p>Choose analytics and advertising independently. Both are optional. Essential storage remembers your choices. Turning off loaded analytics or advertising reloads the page to stop its code. Where applicable, Google Privacy &amp; Messaging handles separate advertising choices.</p><div className="privacy-options"><label><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />Allow first-party analytics and Google Analytics</label><label><input type="checkbox" checked={advertising} onChange={(event) => setAdvertising(event.target.checked)} />Allow Google advertising to load on editorial pages. Google may ask for additional permissions; this does not grant personalised advertising consent.</label></div>{storageError && <p role="alert">Your browser could not save this choice. Optional services remain subject to the last saved choice. Enable site storage and try again.</p>}</div><div className="privacy-actions"><button onClick={() => choose(false, false)}>Essential only</button><button className="privacy-allow" onClick={() => choose(analytics, advertising)}>Save choices</button></div></aside>;
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
