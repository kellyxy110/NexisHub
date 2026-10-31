import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";

const bridge = fs.readFileSync(new URL("../src/app/telegram/telegram-webapp-bridge.tsx", import.meta.url), "utf8");
const assistant = fs.readFileSync(new URL("../src/app/telegram/telegram-assistant.tsx", import.meta.url), "utf8");
const styles = fs.readFileSync(new URL("../src/app/telegram/telegram.css", import.meta.url), "utf8");

test("Telegram bridge keeps auth gated and synchronizes theme and viewport events", () => {
  assert.match(bridge, /authEnabled/);
  assert.match(bridge, /if \(!authEnabled \|\| !webApp\.initData\) return/);
  assert.match(bridge, /themeChanged/);
  assert.match(bridge, /viewportChanged/);
  assert.match(bridge, /safe|tg-viewport-height/i);
  assert.match(bridge, /isVersionAtLeast|version/);
  assert.match(bridge, /6\.1/);
});

test("Telegram interface includes honest loading, empty and unavailable states", () => {
  assert.match(bridge, /Preparing Telegram tools/);
  assert.match(bridge, /Telegram tools are unavailable here/);
  assert.match(assistant, /No question yet/);
  assert.match(assistant, /not generative AI/);
});

test("Telegram styles cover safe areas, dark mode, reduced motion and keyboard focus", () => {
  assert.match(styles, /safe-area-inset-top/);
  assert.match(styles, /safe-area-inset-bottom/);
  assert.match(styles, /data-nexishub-telegram-theme="dark"/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /focus-visible/);
  assert.match(styles, /min-height:48px/);
});
