"use client";

import { useEffect } from "react";

// This public identifier is not a secret. The component is imported only by
// substantive public editorial/research pages, never by the root layout,
// admin surfaces, API routes, or non-HTML resources.
export const ADSENSE_CLIENT_ID = "ca-pub-3694194350196538";

export function AdSenseLoader() {
  useEffect(() => {
    const load = () => {
      if (window.localStorage.getItem("nexishub-analytics-consent") !== "allow") return;
      if (document.querySelector(`script[data-nexishub-adsense="${ADSENSE_CLIENT_ID}"]`)) return;
      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.dataset.nexishubAdsense = ADSENSE_CLIENT_ID;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      document.head.appendChild(script);
    };
    load();
    window.addEventListener("nexishub:consent", load);
    return () => window.removeEventListener("nexishub:consent", load);
  }, []);
  return null;
}
