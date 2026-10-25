import assert from "node:assert/strict";
import { test } from "node:test";
import { unstable_getResponseFromNextConfig } from "next/experimental/testing/server.js";
import { tsImport } from "tsx/esm/api";

const configModule = await tsImport("../next.config.ts", import.meta.url);
const nextConfig = configModule.default.default ?? configModule.default;
const { siteUrl } = await tsImport("../src/lib/site-url.ts", import.meta.url);

// Exercise Next's real route matcher, including host constraints and query handling.
for (const path of ["/", "/blog/complete-guide-ai-software-development?source=old&tag=a%20b", "/sitemap.xml", "/ads.txt"]) {
  test(`legacy production host permanently redirects ${path}`, async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://nexishub.vercel.app${path}`,
      headers: { host: "nexishub.vercel.app" },
      nextConfig,
    });
    assert.equal(response.status, 308);
    const actual = new URL(response.headers.get("location"));
    const expected = new URL(path, siteUrl);
    assert.equal(actual.origin, expected.origin);
    assert.equal(actual.pathname, expected.pathname);
    assert.deepEqual([...actual.searchParams], [...expected.searchParams]);
  });
}
for (const host of ["www.thenexishub.org", "localhost:3000", "nexishub-preview.vercel.app", "nexishubXvercelYapp"]) {
  test(`migration redirect does not capture ${host}`, async () => {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://${host}/blog`, headers: { host }, nextConfig,
    });
    assert.equal(response.headers.get("location"), null);
  });
}
