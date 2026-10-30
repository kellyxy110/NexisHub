"use client";

import { useState } from "react";
import Link from "next/link";

const answers = [
  { question: "What is NexisHub?", answer: "NexisHub brings together connected digital products, research and software services. Explore the products directory to see what is currently available.", href: "/products", label: "View products" },
  { question: "What services does Studio offer?", answer: "NexisHub Studio is the place to explore website, intelligent software and digital service enquiries.", href: "/studio", label: "Explore Studio" },
  { question: "Where can I find research?", answer: "You can browse NexisHub research, publications and practical guides in the Research section.", href: "/research", label: "View research" },
  { question: "How can I contact the team?", answer: "For a project or partnership enquiry, use the NexisHub contact page.", href: "/contact", label: "Contact NexisHub" },
];

export function TelegramAssistant() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="tg-assistant" aria-label="NexisHub help assistant">
      <button type="button" className="tg-assistant-toggle" aria-expanded={open} aria-controls="tg-assistant-panel" onClick={() => setOpen(!open)}>
        <span aria-hidden="true">✦</span> {open ? "Close assistant" : "Ask NexisHub"}
      </button>
      {open && <div className="tg-assistant-panel" id="tg-assistant-panel">
        <div className="tg-assistant-heading"><strong>NexisHub Assistant</strong><span>Quick answers · Preview</span></div>
        <p className="tg-assistant-intro">What would you like to know? Choose a question below.</p>
        <div className="tg-assistant-questions">
          {answers.map((item, i) => <button key={item.question} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.question}</button>)}
        </div>
        {selected !== null && <div className="tg-assistant-answer" aria-live="polite"><p>{answers[selected].answer}</p><Link href={answers[selected].href}>{answers[selected].label} ↗</Link></div>}
        <p className="tg-assistant-disclaimer">This is a limited, prewritten help assistant. AI responses and Telegram account access are not enabled. Please do not enter sensitive information.</p>
      </div>}
    </section>
  );
}
