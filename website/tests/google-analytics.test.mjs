import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";
const { createGoogleAnalytics, publicAnalyticsPath } = await tsImport("../src/lib/google-analytics.ts", import.meta.url);
const id = "G-Q5RFEC75WC";
function fixture(consent = null, hostname = "www.thenexishub.org") {
  const scripts = [], cookies = [], handlers = {};
  const storage = new Map(consent ? [["nexishub-analytics-consent", consent], ["nexishub-analytics-consent-version", "ga4-2026-10-25"]] : []);
  class Element { constructor(dataset = {}) { this.dataset = dataset; } closest() { return this; } }
  const doc = {
    title: "NexisHub Blog", referrer: "https://example.com/private?email=person@example.com", documentElement: { scrollHeight: 2000 },
    head: { appendChild(script) { scripts.push(script); } },
    createElement() { return { remove() { scripts.splice(scripts.indexOf(this), 1); } }; },
    getElementById(value) { return scripts.find((script) => script.id === value); },
    addEventListener(name, handler) { handlers[name] = handler; },
    get cookie() { return "_ga=client; _ga_Q5RFEC75WC=session; preference=keep"; },
    set cookie(value) { cookies.push(value); },
  };
  let reloads = 0;
  const win = { document: doc, Element, location: { hostname, origin: `https://${hostname}` }, innerHeight: 1000, scrollY: 500, localStorage: { getItem: (key) => storage.get(key) ?? null }, addEventListener(name, handler) { handlers[name] = handler; } };
  const runtime = createGoogleAnalytics(win, id, () => reloads++);
  return { runtime, win, doc, scripts, cookies, storage, handlers, Element, reloads: () => reloads, commands: () => (win.dataLayer ?? []).map((entry) => Array.from(entry)) };
}
const views = (f) => f.commands().filter((command) => command[0] === "event" && command[1] === "page_view");

test("no vendor script or queued analytics before opt-in, including private storage failure", () => {
  const f = fixture(); f.runtime.visit("/blog"); f.handlers.click({ target: new f.Element({ analytics: "cta" }) });
  assert.equal(f.scripts.length, 0); assert.deepEqual(f.commands(), []);
  f.win.localStorage.getItem = () => { throw new Error("blocked"); };
  f.runtime.visit("/blog"); assert.equal(f.scripts.length, 0);
});
test("opt-in loads one tag, keeps advertising denied, and strips sensitive URL parts", () => {
  const f = fixture("allow"); f.runtime.visit("/blog?email=person@example.com#token"); f.runtime.visit("/blog");
  assert.equal(f.scripts.length, 1); assert.equal(views(f).length, 1);
  assert.equal(views(f)[0][2].page_location, "https://www.thenexishub.org/blog");
  assert.equal(views(f)[0][2].page_referrer, "https://example.com");
  const consent = f.commands().find((c) => c[0] === "consent" && c[1] === "update")[2];
  assert.deepEqual(consent, { analytics_storage: "granted" });
  const defaults = f.commands().find((c) => c[0] === "consent" && c[1] === "default")[2];
  assert.equal(defaults.ad_storage, "denied"); assert.equal(defaults.ad_user_data, "denied");
  assert.doesNotMatch(JSON.stringify(f.commands()), /person@example|private\?/);
});
test("client navigation produces one explicit view per route and no automatic initial view", () => {
  const f = fixture("allow"); f.runtime.visit("/"); f.runtime.visit("/"); f.runtime.visit("/about"); f.runtime.visit("/about");
  assert.equal(views(f).length, 2);
  assert.equal(views(f)[1][2].page_referrer, "https://www.thenexishub.org/");
  assert.equal(f.commands().find((c) => c[0] === "config")[2].send_page_view, false);
});
test("withdrawal disables measurement, deletes only GA cookies and unloads vendor code", () => {
  const f = fixture("allow"); f.runtime.visit("/blog"); const count = f.commands().length;
  f.storage.set("nexishub-analytics-consent", "reject"); f.runtime.syncConsent("/blog");
  assert.equal(f.win[`ga-disable-${id}`], true); assert.equal(f.scripts.length, 0); assert.equal(f.reloads(), 1);
  assert.ok(f.cookies.some((value) => value.startsWith("_ga="))); assert.ok(f.cookies.some((value) => value.startsWith("_ga_Q5RFEC75WC=")));
  assert.ok(f.cookies.every((value) => !value.startsWith("preference=")));
  f.handlers.click({ target: new f.Element({ analytics: "cta" }) }); assert.equal(f.commands().length, count);
});
test("private routes are excluded before load and stop an already loaded tag", () => {
  const f = fixture("allow"); f.runtime.visit("/admin"); assert.equal(f.scripts.length, 0);
  f.runtime.visit("/"); f.runtime.visit("/admin/sign-in?email=secret"); assert.equal(f.reloads(), 1); assert.equal(views(f).length, 1);
  assert.equal(publicAnalyticsPath("/api/auth/session"), null); assert.equal(publicAnalyticsPath("/research/publications/paper/cite"), null);
});
test("preview hosts and invalid measurement IDs cannot load vendor code", () => {
  const f = fixture("allow", "preview.vercel.app"); assert.equal(f.runtime, null);
  const g = fixture(); assert.equal(createGoogleAnalytics(g.win, "invalid"), null);
});
test("delegated events collect only approved static identifiers and deduplicate thresholds", () => {
  const f = fixture("allow"); f.runtime.visit("/blog");
  f.handlers.click({ target: new f.Element({ analytics: "home-cta", email: "secret@example.com" }) });
  f.handlers.click({ target: new f.Element({ analytics: "secret@example.com" }) });
  f.handlers.pointerover({ target: new f.Element({ product: "SiteNexis" }) }); f.handlers.pointerover({ target: new f.Element({ product: "SiteNexis" }) });
  f.handlers.scroll(); f.handlers.scroll();
  assert.equal(f.commands().filter((c) => c[1] === "cta_click").length, 1);
  assert.equal(f.commands().filter((c) => c[1] === "product_interaction").length, 1);
  assert.equal(f.commands().filter((c) => c[1] === "scroll_depth").length, 2);
  assert.doesNotMatch(JSON.stringify(f.commands()), /secret@example/);
});

test("a legacy first-party opt-in does not authorize the new Google Analytics integration", () => {
  const f = fixture("allow"); f.storage.delete("nexishub-analytics-consent-version");
  f.runtime.visit("/"); assert.equal(f.scripts.length, 0);
  f.storage.set("nexishub-analytics-consent-version", "ga4-2026-10-25");
  f.runtime.syncConsent("/"); assert.equal(f.scripts.length, 1);
});
