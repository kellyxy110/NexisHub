"use client";

import { useState } from "react";
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

/** Official SDK only. Never use initDataUnsafe for authentication. */
export function TelegramWebAppBridge({ authEnabled = false }: { authEnabled?: boolean }) {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "unavailable" | "signed_out">("idle");

  async function initialize() {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;
    try {
      webApp.ready?.();
      webApp.expand?.();
      webApp.setHeaderColor?.("#ffffff");
      webApp.setBackgroundColor?.("#ffffff");
    } catch {
      // Older Telegram clients may not support all optional methods.
    }
    if (!authEnabled || !webApp.initData) return;
    setStatus("connecting");
    try {
      const response = await fetch("/api/telegram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ initData: webApp.initData }),
      });
      if (!response.ok) { setStatus("unavailable"); return; }
      const session = await fetch("/api/telegram/session", { credentials: "same-origin", cache: "no-store" });
      setStatus(session.ok && (await session.json()).authenticated === true ? "connected" : "unavailable");
    } catch {
      setStatus("unavailable");
    }
  }

  async function logout() {
    try {
      const response = await fetch("/api/telegram/logout", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      if (!response.ok) { setStatus("unavailable"); return; }
      const session = await fetch("/api/telegram/session", { credentials: "same-origin", cache: "no-store" });
      setStatus(session.status === 401 ? "signed_out" : "unavailable");
    } catch {
      setStatus("unavailable");
    }
  }

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" onLoad={() => { void initialize(); }} />
      {authEnabled && status !== "idle" && (
        <div role="status" aria-live="polite" style={{ padding: "0.65rem 1rem", textAlign: "center", fontSize: "0.85rem" }}>
          {status === "connecting" && "Verifying Telegram session…"}
          {status === "connected" && (
            <span>Telegram session verified. <button type="button" onClick={() => { void logout(); }}>Sign out</button></span>
          )}
          {status === "unavailable" && "Telegram sign-in is unavailable. You can still explore NexisHub."}
          {status === "signed_out" && "Signed out of NexisHub."}
        </div>
      )}
    </>
  );
}
