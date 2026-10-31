"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { findTelegramAnswer, type TelegramAnswer } from "@/app/telegram/telegram-retrieval";

type Message = { role: "user" | "assistant"; text: string; source?: { href: string; label: string } };

export function SiteHelpAssistant({ answers }: { answers: readonly TelegramAnswer[] }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  function ask(input: string) {
    const question = input.trim().slice(0, 500);
    if (!question) return;
    const found = findTelegramAnswer(question, answers);
    const response: Message = found
      ? { role: "assistant", text: found.answer, source: { href: found.href, label: found.label } }
      : { role: "assistant", text: "I could not verify an answer from NexisHub's published information. Please contact the team.", source: { href: "/contact", label: "Contact NexisHub" } };
    setMessages((current) => [...current.slice(-18), { role: "user", text: question }, response]);
    setDraft("");
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); ask(draft); }
  return (
    <aside className="nh-help" aria-label="NexisHub help assistant">
      <button className="nh-help-toggle" type="button" aria-expanded={open} aria-controls="nh-help-panel" onClick={() => setOpen(!open)}>{open ? "Close help" : "Ask NexisHub"}</button>
      {open && <section className="nh-help-panel" id="nh-help-panel" aria-label="NexisHub assistant conversation">
        <div className="nh-help-head"><strong>NexisHub Assistant</strong><span>Published sources · Preview</span></div>
        <p>Ask about NexisHub and its products. Answers link to published information.</p>
        <div className="nh-help-suggestions">{answers.map((item, index) => <button key={item.question} type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); ask(item.question); }}>{item.question}</button>)}</div>
        <div className="nh-help-log" role="log" aria-live="polite">{messages.map((item, index) => <div key={index} className={item.role === "user" ? "nh-help-user" : "nh-help-answer"}><p>{item.text}</p>{item.source && <Link href={item.source.href}>{item.source.label}</Link>}</div>)}</div>
        <form onSubmit={submit}><label htmlFor="nh-help-input">Your question</label><div className="nh-help-form-row"><input id="nh-help-input" value={draft} maxLength={500} autoComplete="off" placeholder="Ask a question..." onChange={(event) => setDraft(event.target.value)} /><button type="submit" disabled={!draft.trim()}>Send</button></div></form>
        {messages.length > 0 && <button className="nh-help-clear" type="button" onClick={() => { setMessages([]); setSelected(null); }}>Clear conversation</button>}
        <small>Browser-only retrieval. No AI provider, account access or persistent conversation storage. Do not enter sensitive information.</small>
      </section>}
    </aside>
  );
}
