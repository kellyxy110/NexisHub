import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const helper = readFileSync("src/lib/form-webhook.ts", "utf8");
const contact = readFileSync("src/app/api/contact/route.ts", "utf8");
const subscribe = readFileSync("src/app/api/subscribe/route.ts", "utf8");

test("form delivery fails closed and uses Make authentication", () => {
  assert.match(helper, /if \(!apiKey\) return null/);
  assert.match(helper, /"x-make-apikey": apiKey/);
  assert.doesNotMatch(helper, /authorization:/);
  assert.match(contact, /if \(!webhookRequest\) return NextResponse\.json/);
  assert.match(subscribe, /if \(!webhookRequest\) return NextResponse\.json/);
});
