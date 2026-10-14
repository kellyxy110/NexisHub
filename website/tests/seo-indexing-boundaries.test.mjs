import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const boundarySource = readFileSync("src/lib/article-boundaries.ts", "utf8");
const productsSource = readFileSync("src/app/products/page.tsx", "utf8");

test("editorial boundaries keep AI-search language category-specific", () => {
  assert.match(boundarySource, /category === "Healthcare AI"/);
  assert.match(boundarySource, /category === "Education Technology"/);
  assert.match(boundarySource, /category === "AI Visibility"/);
  assert.match(boundarySource, /No optimization can guarantee selection or citation by an external system/);
  assert.match(boundarySource, /not a substitute for teacher judgment/);
  assert.match(boundarySource, /Examples are illustrative and should be validated/);
});

test("the sitemap-indexed Pnyx profile has a contextual internal link", () => {
  assert.match(productsSource, /href="\/products\/pnyx"/);
});
