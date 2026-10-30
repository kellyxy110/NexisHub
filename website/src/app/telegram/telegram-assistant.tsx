"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Answer = { question: string; answer: string; href: string; label: string };

export function TelegramAssistant({ answers }: { answers: readonly Answer[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="tg-assistant" aria-label="NexisHub help assistant">
      <button type="button" className="tg-assistant-toggle" aria-expanded={open} aria-controls="tg-assistant-panel" onClick={() => setOpen(!open)}>
        <Image className="tg-assistant-logo" src="/nexishub-logo.jpeg" width={28} height={28} alt="" aria-hidden="true" /> {open ? "Close assistant" : "Ask NexisHub"}
      </button>
      {open && <div className="tg-assistant-panel" id="tg-assistant-panel">
        <div className="tg-assistant-heading"><strong>NexisHub Assistant</strong><span>Source-backed answers · Preview</span></div>
        <p className="tg-assistant-intro">Choose a question to see an answer from NexisHub&apos;s published information.</p>
        <div className="tg-assistant-questions">
          {answers.map((item, i) => <button key={item.question} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.question}</button>)}
        </div>
        {selected !== null && <div className="tg-assistant-answer" aria-live="polite"><p>{answers[selected].answer}</p><Link href={answers[selected].href}>{answers[selected].label} ↗</Link></div>}
        <p className="tg-assistant-disclaimer">Answers are taken from NexisHub&apos;s current site content. This preview does not support free-form AI chat or Telegram account access. Do not enter sensitive information.</p>
      </div>}
    </section>
  );
}
