import assert from "node:assert/strict";
import { test } from "node:test";
import { getVisibilityGuide } from "@/lib/visibility-content";

const pilotSlugs = [
  "ai-readable-website-architecture",
  "structured-data-ai-machine-trust",
  "entity-clarity-ai-systems",
  "rag-search-content-discovery",
] as const;

const genericSections = [
  "Apply the idea to a real page",
  "Build an evidence record",
  "Diagnose failure before prescribing volume",
  "Make ownership explicit",
  "Measure useful change",
  "Maintain the page after publication",
  "What would change the conclusion?",
];

test("remediated pilot guides bypass generic expansion", () => {
  for (const slug of pilotSlugs) {
    const guide = getVisibilityGuide(slug);
    assert.ok(guide, `${slug} should resolve`);
    assert.equal(guide.contentComplete, true, `${slug} should be explicitly complete`);
    const sectionTitles = (guide.deepDive ?? []).map((section) => section.title);
    for (const genericSection of genericSections) assert.ok(!sectionTitles.includes(genericSection), `${slug} contains ${genericSection}`);
    assert.ok(sectionTitles.length >= 7, `${slug} should retain substantive deep dives`);
  }
});

test("unreviewed short guides retain generic expansion", () => {
  const guide = getVisibilityGuide("ai-visibility-vs-traditional-seo");
  assert.ok(guide);
  const sectionTitles = (guide.deepDive ?? []).map((section) => section.title);
  assert.ok(sectionTitles.includes("Apply the idea to a real page"));
});
