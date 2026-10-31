"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type TelegramWebApp = {
  initData?: string;
  ready?: () => void;
  expand?: () => void;
  version?: string;
  isVersionAtLeast?: (version: string) => boolean;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  colorScheme?: "light" | "dark";
  onEvent?: (event: "themeChanged" | "viewportChanged", callback: () => void) => void;
  offEvent?: (event: "themeChanged" | "viewportChanged", callback: () => void) => void;
  viewportStableHeight?: number;
  viewportHeight?: number;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

/** Official SDK only. Never use initDataUnsafe for authentication. */
export function TelegramWebAppBridge({ authEnabled = false }: { authEnabled?: boolean }) {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "unavailable" | "signed_out">("idle");
  const [sdkState, setSdkState] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    if (sdkState !== "ready") return;
    const webApp = window.Telegram?.WebApp;
    if (!webApp) {
      queueMicrotask(() => setStatus("unavailable"));
      return;
    }

    const syncThemeAndViewport = () => {
      const theme = webApp.colorScheme === "dark" ? "dark" : "light";
      document.documentElement.dataset.nexishubTelegramTheme = theme;
      const height = webApp.viewportStableHeight ?? webApp.viewportHeight;
      if (height && Number.isFinite(height)) document.documentElement.style.setProperty("--tg-viewport-height", `${height}px`);
      const [major, minor] = (webApp.version ?? "").split(".").map(Number);
      const supportsColorApi = webApp.isVersionAtLeast?.("6.1") ??
        (Number.isFinite(major) && Number.isFinite(minor) && (major > 6 || (major === 6 && minor >= 1)));
      if (supportsColorApi) {
        webApp.setHeaderColor?.(theme === "dark" ? "#0b1220" : "#ffffff");
        webApp.setBackgroundColor?.(theme === "dark" ? "#0b1220" : "#f5f7fb");
      }
    };

    const initialize = async () => {
      try {
        webApp.ready?.();
        webApp.expand?.();
        syncThemeAndViewport();
        webApp.onEvent?.("themeChanged", syncThemeAndViewport);
        webApp.onEvent?.("viewportChanged", syncThemeAndViewport);
      } catch {
        // Older Telegram clients may not support optional WebApp methods.
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
    };

    void initialize();
    return () => {
      webApp.offEvent?.("themeChanged", syncThemeAndViewport);
      webApp.offEvent?.("viewportChanged", syncThemeAndViewport);
      delete document.documentElement.dataset.nexishubTelegramTheme;
      document.documentElement.style.removeProperty("--tg-viewport-height");
    };
  }, [authEnabled, sdkState]);

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
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" onLoad={() => setSdkState("ready")} onError={() => { setSdkState("unavailable"); setStatus("unavailable"); }} />
      {sdkState === "loading" && <div className="tg-sdk-loading" role="status" aria-live="polite">Preparing Telegram tools…</div>}
      {status !== "idle" && (
        <div className="tg-auth-status" role="status" aria-live="polite">
          {status === "connecting" && "Verifying Telegram session…"}
          {!authEnabled && status === "unavailable" && sdkState === "unavailable" && "Telegram tools are unavailable here. You can still explore NexisHub."}
          {!authEnabled && status === "unavailable" && sdkState !== "unavailable" && "Telegram account access is not enabled. You can still explore NexisHub."}
          {status === "connected" && (
            <span>Telegram session verified. <button className="tg-auth-action" type="button" onClick={() => { void logout(); }}>Sign out</button></span>
          )}
          {status === "unavailable" && "Telegram sign-in is unavailable. You can still explore NexisHub."}
          {status === "signed_out" && "Signed out of NexisHub."}
        </div>
      )}
    </>
  );
}
