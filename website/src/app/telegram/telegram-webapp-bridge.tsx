"use client";

import Script from "next/script";

type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

/**
 * Official Telegram Mini App bridge. Loading the SDK is necessary because
 * Telegram's WebApp interface is not guaranteed to exist without its script.
 * This does not read, send or trust initData and does not authenticate users.
 */
export function TelegramWebAppBridge() {
  function initialize() {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;
    try {
      webApp.ready?.();
      webApp.expand?.();
      webApp.setHeaderColor?.("#ffffff");
      webApp.setBackgroundColor?.("#ffffff");
    } catch {
      // Older clients may not support optional bridge methods.
    }
  }

  return (
    <Script
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="afterInteractive"
      onLoad={initialize}
    />
  );
}
