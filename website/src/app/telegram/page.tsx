import Link from "next/link";
import Image from "next/image";
import "./telegram.css";

export const metadata = {
  title: "NexisHub on Telegram",
  description: "Explore NexisHub products, research and digital services.",
  robots: { index: false, follow: false },
};

const destinations = [
  { label: "Explore products", href: "/products", description: "Discover the connected NexisHub ecosystem.", number: "01" },
  { label: "NexisHub Studio", href: "/studio", description: "Websites, intelligent software and digital solutions.", number: "02" },
  { label: "Research & insights", href: "/research", description: "Explore our research and practical guides.", number: "03" },
  { label: "Contact NexisHub", href: "/contact", description: "Ask about a project or a partnership.", number: "04" },
];

export default function TelegramLanding() {
  return (
    <main className="tg-page">
      <div className="tg-shell">
        <header className="tg-topbar">
          <Link href="/" className="tg-identity" aria-label="NexisHub home">
            <span className="tg-logo"><Image src="/nexishub-logo.jpeg" width={40} height={40} alt="" /></span>
            <span>Nexis<span className="tg-accent">Hub</span></span>
          </Link>
          <span className="tg-preview">EARLY PREVIEW</span>
        </header>
        <section className="tg-hero" aria-labelledby="tg-title">
          <span className="tg-kicker"><span className="tg-dot" /> YOUR CONNECTED DIGITAL HUB</span>
          <h1 id="tg-title">One Hub.<br /><span>Countless Solutions.</span><br />Limitless Impact.</h1>
          <p>Explore our products, research and digital services, all from one place.</p>
          <Link className="tg-primary" href="/products">Explore NexisHub <span aria-hidden="true">↗</span></Link>
        </section>
        <section className="tg-section" aria-label="Explore NexisHub">
          <div className="tg-section-heading"><h2>Where would you like to go?</h2><span>DISCOVER</span></div>
          <nav className="tg-links" aria-label="NexisHub destinations">
            {destinations.map((item) => (
              <Link key={item.href} href={item.href} className="tg-card">
                <span className="tg-number">{item.number}</span>
                <span className="tg-card-body"><strong>{item.label}</strong><small>{item.description}</small></span>
                <span className="tg-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </section>
        <footer className="tg-footer"><span>NexisHub · Telegram preview</span><p>Telegram sign-in and account linking are not yet enabled. This preview does not request credentials or bot tokens.</p></footer>
      </div>
    </main>
  );
}
