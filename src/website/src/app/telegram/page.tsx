import Link from "next/link";

export const metadata = {
  title: "NexisHub | Telegram",
  description: "Explore NexisHub services from Telegram.",
  robots: { index: false, follow: false },
};

const destinations = [
  { label: "Explore NexisHub", href: "/", description: "Discover our platform and services." },
  { label: "Our products", href: "/products", description: "Browse the NexisHub product directory." },
  { label: "NexisHub Studio", href: "/studio", description: "Explore digital services and enquiries." },
];

export default function TelegramLanding() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 bg-white px-5 py-10 text-slate-900">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">NexisHub on Telegram</p>
        <h1 className="text-3xl font-bold">One Hub. Countless Solutions. Limitless Impact.</h1>
        <p className="text-slate-600">A simple gateway to NexisHub. More Telegram-native features are in development.</p>
      </header>
      <nav aria-label="NexisHub destinations" className="grid gap-3">
        {destinations.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-xl border border-slate-200 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
            <span className="block font-semibold text-blue-800">{item.label}</span>
            <span className="mt-1 block text-sm text-slate-600">{item.description}</span>
          </Link>
        ))}
      </nav>
      <p className="text-xs text-slate-500">Telegram authentication and account linking are not enabled on this page. Never enter your Telegram bot token here.</p>
    </main>
  );
}
