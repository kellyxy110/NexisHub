"use client";

import { useEffect } from "react";

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
 * Progressive enhancement for Telegram's in-app WebView.
 * No initData is read, persisted, transmitted or treated as authentication.
 * The normal browser experience remains unchanged.
 */
export function TelegramWebAppBridge() {
  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;
    try {
      webApp.ready?.();
      webApp.expand?.();
      webApp.setHeaderColor?.("#ffffff");
      webApp.setBackgroundColor?.("#ffffff");
    } catch {
      // Telegram bridge methods are optional across client versions.
    }
  }, []);
  return null;
}
