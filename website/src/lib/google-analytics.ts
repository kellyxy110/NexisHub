export type AnalyticsRuntime = { visit: (path: string) => void; syncConsent: (path: string) => void };
type AnalyticsWindow = Window & typeof globalThis & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; __nexisGa4?: AnalyticsRuntime; [key: `ga-disable-${string}`]: boolean | undefined };
const consentKey = "nexishub-analytics-consent";
export const analyticsConsentVersionKey = "nexishub-analytics-consent-version";
export const analyticsConsentVersion = "ga4-2026-10-25";
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };

export function publicAnalyticsPath(value: string) {
  const path = value.split(/[?#]/, 1)[0];
  return /^\/(?:$|about$|contact$|editorial-policy$|products(?:\/[a-z0-9-]+)?$|studio(?:\/[a-z0-9-]+)?$|blog(?:\/[a-z0-9-]+)?$|research(?:\/[a-z0-9-]+)?$|legal(?:\/(?:privacy|terms|cookies))?$)/.test(path) ? path : null;
}

export function createGoogleAnalytics(win: AnalyticsWindow, id: string, reload = () => win.location.reload()): AnalyticsRuntime | null {
  if (!/^G-[A-Z0-9]{6,20}$/.test(id) || win.location.hostname !== "www.thenexishub.org") return null;
  const doc = win.document;
  let initialized = false;
  let lastPath: string | null = null;
  let currentPath: string | null = null;
  let lastReferrer = "";
  const depths = new Set<number>();
  const seenProducts = new Set<string>();
  const allowed = () => { try { return win.localStorage.getItem(consentKey) === "allow" && win.localStorage.getItem(analyticsConsentVersionKey) === analyticsConsentVersion; } catch { return false; } };
  const command = (...args: unknown[]) => win.gtag?.(...args);
  const locationFor = (path: string) => `${win.location.origin}${path}`;
  const externalReferrer = () => { try { return new URL(doc.referrer).origin; } catch { return ""; } };
  const parameters = () => ({ page_location: locationFor(currentPath!), page_title: doc.title, page_referrer: lastReferrer });
  const event = (name: string, values: Record<string, string | number>) => {
    if (initialized && allowed() && currentPath) command("event", name, { ...values, ...parameters(), send_to: id });
  };
  const token = (value: string) => /^[a-z0-9_.-]{1,100}$/i.test(value) ? value : null;
  const stop = () => {
    win[`ga-disable-${id}`] = true;
    doc.getElementById("nexishub-ga4")?.remove();
    for (const cookie of doc.cookie.split(";")) {
      const name = cookie.trim().split("=", 1)[0];
      if (!/^_ga(?:_[a-zA-Z0-9]+)?$/.test(name)) continue;
      for (const domain of ["", win.location.hostname, "thenexishub.org"]) doc.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax; Secure`;
    }
    initialized = false;
    // Reload unloads the already-executed vendor code after withdrawal/private navigation.
    reload();
  };
  const visit = (value: string) => {
    const path = publicAnalyticsPath(value);
    if (!path) { currentPath = null; if (initialized) stop(); return; }
    currentPath = path;
    if (!allowed()) return;
    if (!initialized) {
      win[`ga-disable-${id}`] = false;
      win.dataLayer ??= [];
      // Keep Google's documented IArguments command-queue format.
      // eslint-disable-next-line prefer-rest-params
      win.gtag ??= function () { win.dataLayer!.push(arguments); };
      command("consent", "default", denied);
      command("consent", "update", { analytics_storage: "granted" });
      command("js", new Date());
      command("config", id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 90 * 86400, cookie_update: false, page_location: locationFor(path), page_referrer: externalReferrer() });
      const script = doc.createElement("script");
      script.id = "nexishub-ga4";
      script.async = true;
      script.referrerPolicy = "origin";
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      doc.head.appendChild(script);
      initialized = true;
    }
    if (path === lastPath) return;
    lastReferrer = lastPath ? locationFor(lastPath) : externalReferrer();
    lastPath = path;
    depths.clear(); seenProducts.clear();
    event("page_view", {});
  };
  doc.addEventListener("click", (e) => {
    const node = e.target instanceof win.Element ? e.target.closest<HTMLElement>("[data-analytics]") : null;
    const id = node?.dataset.analytics && token(node.dataset.analytics);
    if (id) event("cta_click", { cta_id: id });
  });
  doc.addEventListener("pointerover", (e) => {
    const node = e.target instanceof win.Element ? e.target.closest<HTMLElement>("[data-product]") : null;
    const product = node?.dataset.product && token(node.dataset.product);
    if (product && !seenProducts.has(product)) { seenProducts.add(product); event("product_interaction", { product }); }
  });
  win.addEventListener("scroll", () => {
    const available = doc.documentElement.scrollHeight - win.innerHeight;
    if (!initialized || !allowed() || available <= 0) return;
    const depth = Math.round((win.scrollY / available) * 100);
    for (const percent of [25, 50, 75, 100]) if (depth >= percent && !depths.has(percent)) { depths.add(percent); event("scroll_depth", { percent }); }
  }, { passive: true });
  return { visit, syncConsent(path) { if (!allowed() && initialized) stop(); else visit(path); } };
}

export function getGoogleAnalytics(id: string) {
  const win = window as unknown as AnalyticsWindow;
  win.__nexisGa4 ??= createGoogleAnalytics(win, id) ?? undefined;
  return win.__nexisGa4;
}
