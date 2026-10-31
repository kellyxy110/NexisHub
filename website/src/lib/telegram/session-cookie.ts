/**
 * Server-only cookie policy. Never expose a Telegram session bearer token
 * through JSON, localStorage, logs, or client-side JavaScript.
 */
export const TELEGRAM_SESSION_COOKIE = "__Host-nexishub-telegram";

export type TelegramCookie = {
  name: string;
  value: string;
  options: {
    httpOnly: true;
    secure: true;
    sameSite: "lax";
    path: "/";
    maxAge: number;
    priority: "high";
  };
};

export function telegramSessionCookie(token: string, expiresAt: number, nowSeconds: number): TelegramCookie {
  if (typeof token !== "string" || token.length < 16 || token.length > 2048 ||
      !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token) ||
      !Number.isSafeInteger(expiresAt) || !Number.isSafeInteger(nowSeconds) ||
      expiresAt <= nowSeconds || expiresAt - nowSeconds > 900) {
    throw new Error("Invalid Telegram session cookie");
  }
  return {
    name: TELEGRAM_SESSION_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: expiresAt - nowSeconds,
      priority: "high",
    },
  };
}

export function clearTelegramSessionCookie(): TelegramCookie {
  return {
    name: TELEGRAM_SESSION_COOKIE,
    value: "",
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      priority: "high",
    },
  };
}
