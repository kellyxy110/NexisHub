import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export function LegalDocument({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return <><SiteHeader light /><main className="legal-document"><header className="shell legal-header"><p className="kicker">Legal</p><h1>{title}</h1><p>{summary}</p><div className="legal-review">Draft for legal review · Last updated 20 July 2026</div></header><div className="shell legal-layout"><aside><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/cookies">Cookies</Link><Link href="/contact">Contact</Link></aside><article>{children}</article></div></main><SiteFooter /></>;
}
