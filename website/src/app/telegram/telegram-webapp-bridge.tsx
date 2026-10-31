"use client";

import Script from "next/script";

type TelegramWebApp = {
  initData?: string;
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
export function TelegramWebAppBridge({ authEnabled = false }: { authEnabled?: boolean }) {
  function initialize() {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;
    try {
      webApp.ready?.();
      webApp.expand?.();
      webApp.setHeaderColor?.("#ffffff");
      webApp.setBackgroundColor?.("#ffffff");
      if (authEnabled && typeof webApp.initData === "string" && webApp.initData.length > 0) {
        void fetch("/api/telegram/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          cache: "no-store",
          body: JSON.stringify({ initData: webApp.initData }),
        }).catch(() => { /* Authentication remains optional for the public preview. */ });
      }
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
