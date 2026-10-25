import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";

const canonicalOrigin = "https://www.thenexishub.org";
const base = process.env.DISCOVERY_BASE_URL ?? "http://127.0.0.1:3151";
const local = !process.env.DISCOVERY_BASE_URL;
const server = local ? spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3151"], { stdio: ["ignore", "ignore", "inherit"] }) : null;
const request = (path, options = {}) => fetch(new URL(path, base), { signal: AbortSignal.timeout(30000), ...options });
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
function meta(html, key) {
  return [...html.matchAll(/<meta\s[^>]*>/g)].map((match) => attributes(match[0])).find((attrs) => attrs.name === key || attrs.property === key)?.content;
}
function canonical(html) { return [...html.matchAll(/<link\s[^>]*>/g)].map((match) => attributes(match[0])).find((attrs) => attrs.rel === "canonical")?.href; }
function schemas(html) { return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1])); }

try {
  if (server) {
    let ready = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      try { if ((await request("/")).ok) { ready = true; break; } } catch { /* wait for local startup */ }
      if (server.exitCode !== null) throw new Error("Production server exited during startup");
      await delay(200);
    }
    assert.ok(ready, "Production server did not start");
  }
  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "Sitemap has duplicate URLs");
  assert.ok(urls.length > 80);
  for (const slug of ["discovery", "design", "engineering", "artificial-intelligence", "optimisation"]) assert.ok(urls.includes(`${canonicalOrigin}/studio/${slug}`));
  assert.ok(urls.includes(`${canonicalOrigin}/editorial-policy`));
  const records = new Map();
  let position = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (position < urls.length) {
      const url = urls[position++];
      assert.equal(new URL(url).origin, canonicalOrigin);
      const path = new URL(url).pathname;
      const response = await request(path, { redirect: "manual" });
      assert.equal(response.status, 200, `${path} is not a valid sitemap destination`);
      const html = await response.text();
      assert.equal(canonical(html)?.replace(/\/$/, ""), url.replace(/\/$/, ""), `${path} canonical`);
      assert.doesNotMatch(meta(html, "robots") ?? "", /noindex/);
      assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/);
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
      assert.ok(title && meta(html, "description"), `${path} title or description missing`);
      assert.equal(meta(html, "og:url")?.replace(/\/$/, ""), url.replace(/\/$/, ""), `${path} social URL`);
      assert.ok(meta(html, "og:title") && meta(html, "og:description"), `${path} social metadata missing`);
      assert.equal(meta(html, "twitter:card"), "summary_large_image");
      assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path} must have one main heading`);
      const graph = schemas(html).flatMap((schema) => schema["@graph"] ?? [schema]);
      assert.ok(graph.some((entity) => entity["@id"] === `${canonicalOrigin}/#organization`));
      records.set(path, { html, graph, title });
    }
  }));
  console.log(`PASS ${urls.length} sitemap destinations: HTTP 200, self-canonical, indexable, unique main heading, social metadata and identity graph`);
  const titles = [...records.values()].map((record) => record.title);
  assert.equal(new Set(titles).size, titles.length, "Duplicate sitemap page titles");
  for (const [path, { graph }] of records) {
    if (!path.startsWith("/blog/")) continue;
    const article = graph.find((entity) => entity["@type"] === "TechArticle");
    assert.equal(article?.publisher["@id"], `${canonicalOrigin}/#organization`, `${path} publisher identity`);
    assert.equal(article?.author["@id"], `${canonicalOrigin}/editorial-policy#editorial`, `${path} authorship`);
    assert.ok(article?.datePublished && article?.dateModified, `${path} article dates`);
    assert.ok(graph.find((entity) => entity["@type"] === "BreadcrumbList"));
  }
  const home = records.get("/");
  assert.match(home.html, /NexisHub, explained/);
  assert.equal(home.graph.find((entity) => entity["@type"] === "FAQPage").mainEntity.length, 4);
  for (const path of ["/research/not-a-real-section", "/research/programmes/not-a-real-programme", "/research/publications/not-a-real-paper/cite", "/studio/not-a-real-service", "/research/toString"]) {
    const response = await request(path, { redirect: "manual" });
    assert.equal(response.status, 404, `${path} is a soft 404`);
  }
  console.log("PASS 5 nonexistent/prototype-name routes return real HTTP 404");
  for (const path of ["/research/white-papers", "/research/programmes/ai-visibility-index", "/research/search", "/research/publications/ai-visibility-index/cite"]) {
    assert.ok(!urls.includes(canonicalOrigin + path));
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(meta(html, "robots") ?? "", /noindex/, `${path} needs noindex`);
  }
  const adminResponse = await request("/admin/__discovery__", { method: "HEAD", redirect: "manual" });
  assert.match(adminResponse.headers.get("x-robots-tag") ?? "", /noindex, nofollow/);
  console.log("PASS unfinished/utility pages remain accessible, noindex and absent from sitemap; admin indexing is blocked by response headers");
  const llms = await (await request("/llms.txt")).text();
  for (const path of records.keys()) if (path.startsWith("/blog/")) assert.ok(llms.includes(canonicalOrigin + path), `${path} missing from machine navigation`);
  assert.ok((await (await request("/robots.txt")).text()).includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  for (const agent of ["Googlebot", "OAI-SearchBot", "bingbot"]) assert.equal((await request("/", { headers: { "user-agent": agent } })).status, 200);
  console.log("PASS discovery endpoints and basic crawler requests (not proof of provider indexing)");
  console.log("DISCOVERY VERIFICATION PASSED");
} finally {
  if (server && server.exitCode === null) { server.kill("SIGTERM"); await once(server, "exit"); }
}
