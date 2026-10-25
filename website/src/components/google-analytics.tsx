"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getGoogleAnalytics } from "@/lib/google-analytics";

export function GoogleAnalytics() {
  const path = usePathname();
  useEffect(() => {
    const analytics = getGoogleAnalytics(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "");
    if (!analytics || !path) return;
    analytics.visit(path);
    const consent = () => analytics.syncConsent(path);
    window.addEventListener("nexishub:consent", consent);
    return () => window.removeEventListener("nexishub:consent", consent);
  }, [path]);
  return null;
}
