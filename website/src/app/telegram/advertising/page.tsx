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
        <section className="adnx-result" aria-label="AdNexis publisher onboarding preview">
          <h2>Own a public Telegram channel?</h2>
          <p>Prepare a local publisher review packet and see which evidence is needed before any future listing. This does not register or verify your channel.</p>
          <p><Link href="/telegram/advertising/publisher">Prepare publisher review packet</Link></p>
        </section>
      </div>
    </main>
  );
}
