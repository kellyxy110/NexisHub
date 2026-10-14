import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";

test("store route, styles, and navigation are present", () => {
  assert.ok(existsSync("src/app/store/page.tsx"));
  assert.ok(existsSync("src/app/store/store.module.css"));
  const chrome = readFileSync("src/components/site-chrome.tsx", "utf8");
  assert.ok((chrome.match(/href="\/store"/g) ?? []).length >= 2, "Store must be linked from desktop and mobile navigation");
});

test("store is catalogue-only and cannot initiate payments", () => {
  const page = readFileSync("src/app/store/page.tsx", "utf8");
  assert.match(page, /Not available for purchase/);
  assert.match(page, /No payment is collected/);
  assert.match(page, /canonical: "\/store"/);
  assert.doesNotMatch(page, /https?:\/\/[^"\s]*(gumroad|stripe|paystack)|href=\{?[^\n]*(checkout|payment)/i, "Do not add active payment links before launch");
});
