import Link from "next/link";
import { TelegramWebAppBridge } from "../../telegram-webapp-bridge";
import { PublisherIntakePreview } from "./publisher-intake";
import "../../telegram.css";
import "../advertising.css";
import "./publisher.css";

export const metadata = {
  title: "AdNexis Publisher Intake · Offline Preview",
  description: "Prepare an unverified public Telegram channel review packet locally. No submission or publication.",
  robots: { index: false, follow: false },
};

export default function PublisherOnboardingPreview() {
  return (
    <main className="tg-page">
      <TelegramWebAppBridge />
      <div className="tg-shell">
        <nav className="adnx-back" aria-label="Publisher preview navigation">
          <Link href="/telegram/advertising">← Back to advertising planner</Link>
        </nav>
        <PublisherIntakePreview />
      </div>
    </main>
  );
}
