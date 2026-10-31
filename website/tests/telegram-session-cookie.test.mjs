import assert from "node:assert/strict";
import test from "node:test";
import { TELEGRAM_SESSION_COOKIE, telegramSessionCookie, clearTelegramSessionCookie } from "../src/lib/telegram/session-cookie.ts";

const token = "abcDEF123_-".repeat(8) + "." + "abcDEF123_-".repeat(4);
test("sets secure host-only HttpOnly short-lived cookie", () => {
  const cookie = telegramSessionCookie(token, 1900, 1000);
  assert.equal(cookie.name, "__Host-nexishub-telegram");
  assert.equal(cookie.name, TELEGRAM_SESSION_COOKIE);
  assert.equal(cookie.options.secure, true);
  assert.equal(cookie.options.httpOnly, true);
  assert.equal(cookie.options.sameSite, "lax");
  assert.equal(cookie.options.path, "/");
  assert.equal(cookie.options.maxAge, 900);
  assert.equal("domain" in cookie.options, false);
});
test("rejects overlong, expired, malformed and invalid cookie values", () => {
  assert.throws(() => telegramSessionCookie(token, 1901, 1000));
  assert.throws(() => telegramSessionCookie(token, 1000, 1000));
  assert.throws(() => telegramSessionCookie("bad", 1100, 1000));
  assert.throws(() => telegramSessionCookie(token, Number.NaN, 1000));
});
test("clears using the identical cookie scope", () => {
  const cleared = clearTelegramSessionCookie();
  assert.equal(cleared.name, TELEGRAM_SESSION_COOKIE);
  assert.equal(cleared.options.maxAge, 0);
  assert.equal(cleared.options.path, "/");
  assert.equal(cleared.options.secure, true);
  assert.equal(cleared.options.httpOnly, true);
});
