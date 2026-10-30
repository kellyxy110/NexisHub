import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../src/app/api/telegram/verify/route.ts";

test("Telegram verification endpoint stays disabled by default", async () => {
  const previousFlag = process.env.TELEGRAM_MINIAPP_AUTH_ENABLED;
  const previousToken = process.env.TELEGRAM_MINIAPP_BOT_TOKEN;
  try {
    delete process.env.TELEGRAM_MINIAPP_AUTH_ENABLED;
    delete process.env.TELEGRAM_MINIAPP_BOT_TOKEN;
    const response = await POST(new Request("https://example.test/api/telegram/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ initData: "untrusted" }),
    }));
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), { verified: false, error: "not_enabled" });
  } finally {
    if (previousFlag === undefined) delete process.env.TELEGRAM_MINIAPP_AUTH_ENABLED;
    else process.env.TELEGRAM_MINIAPP_AUTH_ENABLED = previousFlag;
    if (previousToken === undefined) delete process.env.TELEGRAM_MINIAPP_BOT_TOKEN;
    else process.env.TELEGRAM_MINIAPP_BOT_TOKEN = previousToken;
  }
});
