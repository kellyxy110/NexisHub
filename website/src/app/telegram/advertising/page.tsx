import Link from "next/link";
import "../telegram.css";
import "./advertising.css";
import { AdvertisingPlanner } from "./advertising-planner";
import { TelegramWebAppBridge } from "../telegram-webapp-bridge";

export const metadata = {
  title: "AdNexis · Advertising campaign planner preview",
  description: "Session-only campaign planning with user-supplied publisher offers. No bookings, payments or ad placements.",
  robots: { index: false, follow: false },
};

export default function AdvertisingPreviewPage() {
  return (
    <main className="tg-page">
      <TelegramWebAppBridge />
      <div className="tg-shell">
        <nav className="adnx-back" aria-label="Advertising preview navigation">
          <Link href="/telegram">← Back to NexisHub on Telegram</Link>
        </nav>
        <AdvertisingPlanner />
      </div>
    </main>
  );
}
