import assert from "node:assert/strict";
import test from "node:test";
import { extractVerifiedTelegramIdentity } from "../src/lib/telegram/verified-identity.ts";

const params = (user) => new URLSearchParams({ user: JSON.stringify(user) });

test("extracts minimal identity without retaining profile details", () => {
  assert.deepEqual(extractVerifiedTelegramIdentity(params({ id: 123456, first_name: "Ada", last_name: "N", photo_url: "https://example.com/private" })), { telegramUserId: "123456", displayName: "Ada N" });
});
test("rejects missing user", () => assert.throws(() => extractVerifiedTelegramIdentity(new URLSearchParams())));
test("rejects malformed JSON", () => assert.throws(() => extractVerifiedTelegramIdentity(new URLSearchParams({ user: "{" }))));
test("rejects invalid identifiers", () => {
  for (const id of [0, -1, "123", 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => extractVerifiedTelegramIdentity(params({ id, first_name: "Ada" })));
  }
});
test("rejects missing and oversized names", () => {
  assert.throws(() => extractVerifiedTelegramIdentity(params({ id: 1 })));
  assert.throws(() => extractVerifiedTelegramIdentity(params({ id: 1, first_name: "A".repeat(257) })));
});
