import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const routes = ["src/app/page.tsx", "src/app/products/page.tsx", "src/app/products/sitenexis/page.tsx", "src/app/about/page.tsx", "src/app/contact/page.tsx", "src/app/legal/page.tsx", "src/app/legal/privacy/page.tsx", "src/app/legal/terms/page.tsx", "src/app/legal/cookies/page.tsx"];

test("all launch routes have page modules", () => { for (const route of routes) assert.ok(existsSync(route), `${route} is missing`); });
test("discovery endpoints are implemented", () => { for (const file of ["src/app/sitemap.ts", "src/app/robots.ts", "src/app/llms.txt/route.ts", "src/app/manifest.ts"]) assert.ok(existsSync(file), `${file} is missing`); });
test("SiteNexis links use the live application", () => { const links = readFileSync("src/lib/site-links.ts", "utf8"); assert.match(links, /https:\/\/sitenexis\.vercel\.app/); assert.doesNotMatch(links, /localhost/); });
test("future products remain marked in development", () => { const products = readFileSync("src/lib/products.ts", "utf8").split("export const products")[1]; assert.equal((products.match(/status: "Live"/g) ?? []).length, 1); assert.equal((products.match(/status: "In development"/g) ?? []).length, 4); });
test("legal drafts carry review status", () => { const legal = readFileSync("src/components/legal-document.tsx", "utf8"); assert.match(legal, /Draft for legal review/); });
