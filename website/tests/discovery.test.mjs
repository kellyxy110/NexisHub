import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";

const { pageMetadata, jsonLd, breadcrumbSchema } = await tsImport("../src/lib/discovery.ts", import.meta.url);

test("utility metadata keeps a self-canonical while opting out of indexing", () => {
  const metadata = pageMetadata("Cite a paper", "Download citation metadata", "/research/publications/paper/cite", false);
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.robots.follow, true);
  assert.equal(metadata.alternates.canonical, "/research/publications/paper/cite");
  assert.equal(metadata.openGraph.url, "/research/publications/paper/cite");
  assert.equal(metadata.twitter.title, metadata.title);
});

test("JSON-LD cannot terminate its containing HTML script", () => {
  const text = "A </script><script>alert(1)</script> title";
  const serialized = jsonLd({ name: text });
  assert.equal(serialized.includes("<"), false);
  assert.equal(JSON.parse(serialized).name, text);
});

test("breadcrumbs preserve the hierarchy and absolute canonical origin", () => {
  const graph = breadcrumbSchema([{ name: "Home", path: "" }, { name: "Studio", path: "/studio" }, { name: "Engineering", path: "/studio/engineering" }]);
  assert.deepEqual(graph.itemListElement.map((item) => item.position), [1, 2, 3]);
  assert.equal(graph.itemListElement[2].item, "https://www.thenexishub.org/studio/engineering");
});
