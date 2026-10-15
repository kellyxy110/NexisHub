import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

test("store uses a single typed catalogue for index and detail pages", () => {
  const catalog = readFileSync("src/lib/store-catalog.ts", "utf8");
  const index = readFileSync("src/app/store/page.tsx", "utf8");
  const detail = readFileSync("src/app/store/[slug]/page.tsx", "utf8");
  assert.match(catalog, /export const plannedStoreResources/);
  for (const slug of ["ai-visibility-toolkit", "product-discovery-workbook", "learning-design-templates"]) {
    assert.match(catalog, new RegExp(slug));
  }
  assert.match(index, /plannedStoreResources\.map/);
  assert.match(index, /href=\{\x60\/store\/\$\{resource\.slug\}\x60\}/);
  assert.match(detail, /generateStaticParams/);
  assert.match(detail, /dynamicParams = false/);
  assert.match(detail, /getPlannedStoreResource/);
  assert.match(detail, /canonical: `\/store\/\$\{resource\.slug\}`/);
});

test("detail routes are non-transactional and openly disclose planning status", () => {
  const detail = readFileSync("src/app/store/[slug]/page.tsx", "utf8");
  assert.match(detail, /not yet available for purchase or download/);
  assert.match(detail, /No payment is collected/);
  assert.match(detail, /not promised deliverables/);
  assert.doesNotMatch(detail, /href=["'`][^"'`]*(?:gumroad|checkout|stripe|paystack)/i);
});

test("store routes are included in sitemap", () => {
  assert.ok(existsSync("src/app/store/[slug]/page.tsx"));
  const sitemap = readFileSync("src/app/sitemap.ts", "utf8");
  assert.match(sitemap, /plannedStoreResources/);
  assert.match(sitemap, /\/store/);
});
