import { readFileSync, existsSync } from "node:fs";

const checks = [
  ["posts registry", "src/lib/posts.ts"],
  ["NRI programme registry", "src/lib/nri-programmes.ts"],
  ["NRI publication registry", "../nri-publication-registry.ts"],
  ["sitemap", "src/app/sitemap.ts"],
  ["robots", "src/app/robots.ts"],
];
const failures = [];
for (const [label, path] of checks) {
  if (!existsSync(path)) failures.push(`${label}: missing ${path}`);
}
const posts = existsSync("src/lib/posts.ts") ? readFileSync("src/lib/posts.ts", "utf8") : "";
const programmes = existsSync("src/lib/nri-programmes.ts") ? readFileSync("src/lib/nri-programmes.ts", "utf8") : "";
if (!posts.includes('status: "Published"')) failures.push("posts registry: no published status found");
if ((programmes.match(/programme\(/g) ?? []).length < 30) failures.push("NRI programme registry: fewer than 30 programme records found");
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; } else console.log("Editorial maintenance checks passed: source registries and discovery files are present.");
