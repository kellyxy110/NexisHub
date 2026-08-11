import fs from "node:fs/promises";
import path from "node:path";

const sources = ["tasks.md", "decisions.md", "readme.md"];

export type CopilotResult = { source: string; excerpt: string; line: number };

export async function searchOperationsKnowledge(query: string): Promise<CopilotResult[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const terms = normalized.split(/\s+/).filter((term) => term.length > 2).slice(0, 8);
  const results: CopilotResult[] = [];
  for (const source of sources) {
    const file = await fs.readFile(path.join(/* turbopackIgnore: true */ process.cwd(), "..", source), "utf8").catch(() => "");
    const lines = file.split(/\r?\n/);
    lines.forEach((line, index) => {
      const candidate = line.toLowerCase();
      if (terms.some((term) => candidate.includes(term))) results.push({ source, excerpt: line.trim().slice(0, 280), line: index + 1 });
    });
  }
  return results.slice(0, 20);
}
