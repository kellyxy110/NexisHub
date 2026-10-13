import assert from "node:assert/strict";
import { test } from "node:test";
import { editorialPosts } from "@/lib/editorial-catalog";
import { getPost } from "@/lib/posts";
import { getVisibilityGuide } from "@/lib/visibility-content";

const pilotSlugs = [
  "designing-fast-websites",
  "reliable-rag-systems",
  "event-qr-attendance-data",
  "reproducible-ai-research-study",
] as const;

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

test("the four catalog pilot guides use independent substantive content", () => {
  const sharedParagraph = "Begin by naming the user, the situation, the current failure, and the decision the system must support. Avoid replacing this step with a feature list. Features describe what software can do. A problem statement explains why the work should exist and what evidence would show that the result is useful.";
  const bodies = pilotSlugs.map((slug) => {
    const guide = getVisibilityGuide(slug);
    assert.ok(guide, `${slug} should resolve`);
    const paragraphs = (guide.deepDive ?? []).flatMap((section) => section.paragraphs);
    assert.ok(paragraphs.length >= 8, `${slug} should have substantive pilot content`);
    assert.ok(!paragraphs.includes(sharedParagraph), `${slug} should not inherit the catalog boilerplate`);
    return paragraphs.join(" ");
  });
  assert.equal(new Set(bodies).size, pilotSlugs.length);
});

test("all catalog routes and related links remain intact", () => {
  const slugs = new Set(editorialPosts.map((post) => post.slug));
  assert.equal(editorialPosts.length, 36);
  for (const post of editorialPosts) {
    assert.equal(post.status, "Published");
    assert.equal(post.canonicalPath, `/blog/${post.slug}`);
    assert.ok(getPost(post.slug), `${post.slug} should resolve through the blog registry`);
    for (const relatedSlug of post.relatedSlugs ?? []) assert.ok(slugs.has(relatedSlug), `${post.slug} has an unknown related slug`);
  }
});

test("all catalog articles have differentiated deep dives and article references", () => {
  const paragraphs = editorialPosts.flatMap((post) => {
    const guide = getVisibilityGuide(post.slug);
    assert.ok(guide, `${post.slug} should resolve`);
    assert.ok(guide.references.length >= 2, `${post.slug} needs article-level references`);
    return (guide.deepDive ?? []).flatMap((section) => section.paragraphs);
  });
  const counts = new Map<string, number>();
  for (const paragraph of paragraphs) counts.set(paragraph, (counts.get(paragraph) ?? 0) + 1);
  const repeatedSubstantive = [...counts.entries()].filter(([paragraph, count]) => count > 1 && paragraph.split(/\s+/).length >= 20);
  assert.deepEqual(repeatedSubstantive, [], "long substantive deep-dive paragraphs must not be shared across catalog articles");
});
