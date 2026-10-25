"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { advertisingChoiceEvent, createAdvertisingRuntime } from "@/lib/advertising-consent";

// The root controller permits vendor loading only on the explicit editorial allowlist.
// A local advertising opt-in does not override Google's separate CMP choices.
export function AdSenseLoader({ allowedPaths }: { allowedPaths: readonly string[] }) {
  const pathname = usePathname();
  useEffect(() => {
    const runtime = createAdvertisingRuntime(window, allowedPaths);
    const sync = () => runtime.visit(pathname);
    sync();
    window.addEventListener(advertisingChoiceEvent, sync);
    return () => window.removeEventListener(advertisingChoiceEvent, sync);
  }, [pathname, allowedPaths]);
  return null;
}
