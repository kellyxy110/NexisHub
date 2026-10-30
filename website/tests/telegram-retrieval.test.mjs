import assert from "node:assert/strict";
import test from "node:test";
import { findTelegramAnswer } from "../src/app/telegram/telegram-retrieval.ts";

const answers = [
  { question: "What is NexisHub?", answer: "NexisHub is a technology brand.", href: "/about", label: "About" },
  { question: "Can NexisHub help build a website or AI product?", answer: "Studio offers software engineering and website design.", href: "/studio", label: "Studio" },
  { question: "Is NexisHub research peer reviewed?", answer: "The research is a pre-review working paper.", href: "/research", label: "Research" },
];

test("routes a natural website question to the Studio answer", () => {
  assert.equal(findTelegramAnswer("Can NexisHub help me build a website?", answers)?.href, "/studio");
});

test("does not fabricate an answer for unrelated questions", () => {
  assert.equal(findTelegramAnswer("What is the weather on Mars?", answers), null);
});

test("rejects empty and stopword-only queries", () => {
  assert.equal(findTelegramAnswer("", answers), null);
  assert.equal(findTelegramAnswer("what can you tell me", answers), null);
});

test("finds research answer from explicit research wording", () => {
  assert.equal(findTelegramAnswer("Is the research peer reviewed?", answers)?.href, "/research");
});

test("does not match NexisHub name alone to an arbitrary answer", () => {
  assert.equal(findTelegramAnswer("NexisHub", answers), null);
});


test("normalizes plural website wording to the published Studio answer", () => {
  assert.equal(findTelegramAnswer("Do you build websites?", answers)?.href, "/studio");
});

test("normalizes offerings to product without fabricating unrelated answers", () => {
  const productAnswers = [{ question: "Which products are live?", answer: "Check the product registry.", href: "/products", label: "Products" }];
  assert.equal(findTelegramAnswer("What offerings are available?", productAnswers)?.href, "/products");
  assert.equal(findTelegramAnswer("Tell me about space travel", productAnswers), null);
});
