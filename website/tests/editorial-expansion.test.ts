import assert from "node:assert/strict";
import { test } from "node:test";
import { getVisibilityGuide } from "@/lib/visibility-content";

const completedSlugs = [
  "ai-readable-website-architecture",
  "structured-data-ai-machine-trust",
  "entity-clarity-ai-systems",
  "rag-search-content-discovery",
  "ai-visibility-vs-traditional-seo",
  "internal-linking-ai-discovery",
  "content-structure-ai-retrieval",
  "create-citation-ready-content",
  "technical-ai-crawlability-checklist",
  "how-ai-platforms-discover-sources",
  "measure-ai-visibility",
  "why-content-becomes-ai-invisible",
  "practical-geo-strategy",
  "90-day-ai-visibility-roadmap",
  "ai-in-education-practical-guide",
  "teacher-productivity-ai-tools",
  "digital-classroom-ai-workflows",
  "lesson-planning-question-banks-ai",
  "adaptive-learning-student-analytics",
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

test("all remediated visibility guides bypass generic expansion", () => {
  assert.equal(completedSlugs.length, 19);
  for (const slug of completedSlugs) {
    const guide = getVisibilityGuide(slug);
    assert.ok(guide, `${slug} should resolve`);
    assert.equal(guide.contentComplete, true, `${slug} should be explicitly complete`);
    const sectionTitles = (guide.deepDive ?? []).map((section) => section.title);
    for (const genericSection of genericSections) assert.ok(!sectionTitles.includes(genericSection), `${slug} contains ${genericSection}`);
    assert.ok(sectionTitles.length >= 5, `${slug} should retain substantive deep dives`);
  }
});

test("completed visibility guides no longer receive generic expansion", () => {
  for (const slug of completedSlugs) {
    const guide = getVisibilityGuide(slug);
    assert.ok(guide);
    const sectionTitles = (guide.deepDive ?? []).map((section) => section.title);
    assert.equal(sectionTitles.filter((title) => genericSections.includes(title)).length, 0);
  }
});
