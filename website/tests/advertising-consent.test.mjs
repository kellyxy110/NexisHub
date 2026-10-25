import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";
const { advertisingConsentKey, createAdvertisingRuntime } = await tsImport("../src/lib/advertising-consent.ts", import.meta.url);
function fixture(hostname = "www.thenexishub.org") {
  const storage = new Map(), scripts = [], removedSlots = [];
  let reloads = 0;
  const doc = { querySelector: () => scripts[0] ?? null, querySelectorAll: () => [{ remove() { removedSlots.push(true); } }], createElement: () => ({ dataset: {}, remove() { scripts.splice(scripts.indexOf(this), 1); } }), head: { appendChild(s) { scripts.push(s); } } };
  const win = { document: doc, location: { hostname }, localStorage: { getItem: key => storage.get(key) ?? null } };
  const runtime = createAdvertisingRuntime(win, ["/blog", "/blog/published", "/research"], () => reloads++);
  return { storage, scripts, removedSlots, win, runtime, reloads: () => reloads };
}
test("analytics opt-in cannot enable advertising; only its separate opt-in can", () => {
  const f = fixture(); f.storage.set("nexishub-analytics-consent", "allow"); f.runtime.visit("/blog"); assert.equal(f.scripts.length, 0);
  f.storage.set(advertisingConsentKey, "allow"); f.runtime.visit("/blog"); f.runtime.visit("/blog/published"); assert.equal(f.scripts.length, 1);
  assert.match(f.scripts[0].src, /ca-pub-3694194350196538/);
});
test("rejecting advertising unloads code and slots once, even when analytics remains allowed", () => {
  const f = fixture(); f.storage.set(advertisingConsentKey, "allow"); f.runtime.visit("/blog"); f.storage.set("nexishub-analytics-consent", "allow"); f.storage.set(advertisingConsentKey, "reject"); f.runtime.visit("/blog"); f.runtime.visit("/blog");
  assert.equal(f.scripts.length, 0); assert.equal(f.removedSlots.length, 1); assert.equal(f.reloads(), 1);
});
test("homepage, unknown articles, administration and preview hosts cannot load ads", () => {
  const f = fixture(); f.storage.set(advertisingConsentKey, "allow");
  for (const path of ["/", "/blog/unknown", "/admin", "/api/events"]) f.runtime.visit(path);
  assert.equal(f.scripts.length, 0);
  f.runtime.visit("/blog"); f.runtime.visit("/admin"); assert.equal(f.reloads(), 1);
  const preview = fixture("preview.vercel.app"); preview.storage.set(advertisingConsentKey, "allow"); preview.runtime.visit("/blog"); assert.equal(preview.scripts.length, 0);
});
test("storage failures fail closed and React remounts cannot duplicate an existing tag", () => {
  const f = fixture(); f.win.localStorage.getItem = () => { throw new Error("blocked"); }; f.runtime.visit("/blog"); assert.equal(f.scripts.length, 0);
  const g = fixture(); g.storage.set(advertisingConsentKey, "allow"); g.runtime.visit("/blog"); createAdvertisingRuntime(g.win, ["/blog"]).visit("/blog"); assert.equal(g.scripts.length, 1);
});
