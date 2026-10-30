export type TelegramAnswer = { question: string; answer: string; href: string; label: string };

const stopWords = new Set(["what", "where", "when", "which", "who", "how", "can", "the", "and", "are", "does", "with", "about", "from", "have", "this", "that", "your", "their", "nexishub", "please", "tell", "me"]);
const aliases: Record<string, string> = { products: "product", websites: "website", services: "service", offerings: "product", apps: "app", applications: "app", teaching: "education", educators: "education" };
const tokens = (value: string) => [...new Set((value.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((word) => word.length > 2 && !stopWords.has(word)).map((word) => aliases[word] ?? word))];

export function findTelegramAnswer(question: string, answers: readonly TelegramAnswer[]): TelegramAnswer | null {
  const query = tokens(question);
  if (!query.length) return null;
  const ranked = answers.map((item) => {
    const questionTokens = tokens(item.question);
    const contentTokens = new Set([...questionTokens, ...tokens(item.answer)]);
    const score = query.reduce((sum, word) => sum + (questionTokens.includes(word) ? 3 : contentTokens.has(word) ? 1 : 0), 0);
    return { item, score };
  }).sort((a, b) => b.score - a.score);
  return ranked[0]?.score >= 3 ? ranked[0].item : null;
}
