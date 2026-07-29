import { readFileSync, existsSync, writeFileSync } from "node:fs";

const sitemapPath = "src/app/sitemap.ts";
const reportPath = process.env.EDITORIAL_LINK_REPORT ?? "editorial-link-report.json";
const shouldCheck = process.argv.includes("--check");
const timeoutMs = Number(process.env.EDITORIAL_LINK_TIMEOUT_MS ?? 10000);

function classify(response) {
  if (!response) return "UNKNOWN";
  if (response.status >= 200 && response.status < 300) return "HEALTHY";
  if (response.status >= 300 && response.status < 400) return "REDIRECTED";
  if (response.status === 401 || response.status === 403 || response.status === 429) return "BLOCKED";
  if (response.status >= 400 && response.status < 500) return "BROKEN";
  if (response.status >= 500) return "DEGRADED";
  return "UNKNOWN";
}

function urlsFromSitemap() {
  if (!existsSync(sitemapPath)) return [];
  const source = readFileSync(sitemapPath, "utf8");
  return [...source.matchAll(/https?:\/\/[^"'`\s}]+/g)].map((match) => match[0].replace(/[),]+$/, ""));
}

async function checkUrl(url) {
  if (!shouldCheck) return { url, status: "UNKNOWN", httpStatus: null, checkedAt: null, notes: "Report-only mode. Use --check to make network requests." };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "manual", signal: controller.signal });
    if (response.status === 405) response = await fetch(url, { method: "GET", redirect: "manual", signal: controller.signal });
    return { url, status: classify(response), httpStatus: response.status, checkedAt: new Date().toISOString(), redirectUrl: response.headers.get("location") ?? undefined };
  } catch (error) {
    const notes = error?.name === "AbortError" ? "Request timed out." : String(error?.message ?? error);
    return { url, status: error?.name === "AbortError" ? "TIMEOUT" : "UNKNOWN", httpStatus: null, checkedAt: new Date().toISOString(), notes };
  } finally {
    clearTimeout(timer);
  }
}

const urls = [...new Set(urlsFromSitemap())];
const records = [];
for (const url of urls) records.push(await checkUrl(url));
const report = { generatedAt: new Date().toISOString(), mode: shouldCheck ? "network-check" : "report-only", source: sitemapPath, records };
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`Editorial link monitor wrote ${records.length} records to ${reportPath} (${report.mode}).`);

if (records.some((record) => ["BROKEN", "TIMEOUT"].includes(record.status))) process.exitCode = 1;
