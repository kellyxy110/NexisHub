export const advertisingConsentKey = "nexishub-advertising-consent-v1";
export const advertisingChoiceEvent = "nexishub:advertising-consent";
export const ADSENSE_CLIENT_ID = "ca-pub-3694194350196538";

export function advertisingAllowed(storage: Pick<Storage, "getItem">) {
  try { return storage.getItem(advertisingConsentKey) === "allow"; } catch { return false; }
}

export function createAdvertisingRuntime(win: Window, allowedPaths: readonly string[], reload = () => win.location.reload()) {
  const doc = win.document;
  const paths = new Set(allowedPaths);
  const selector = `script[data-nexishub-adsense="${ADSENSE_CLIENT_ID}"]`;
  let loaded = Boolean(doc.querySelector(selector));
  return {
    visit(path: string) {
      let allowed = false;
      try { allowed = win.location.hostname === "www.thenexishub.org" && paths.has(path) && advertisingAllowed(win.localStorage); } catch { /* Storage unavailable: fail closed. */ }
      if (!allowed) {
        if (loaded) {
          doc.querySelector(selector)?.remove();
          doc.querySelectorAll("ins.adsbygoogle").forEach((slot) => slot.remove());
          loaded = false;
          // Reload unloads executed advertising code, including outstanding vendor timers.
          reload();
        }
        return;
      }
      if (loaded) return;
      const script = doc.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.dataset.nexishubAdsense = ADSENSE_CLIENT_ID;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      doc.head.appendChild(script);
      loaded = true;
    },
  };
}
