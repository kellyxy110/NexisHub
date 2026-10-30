"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { findTelegramAnswer, type TelegramAnswer } from "./telegram-retrieval";

type Message = { role: "user" | "assistant"; text: string; source?: { href: string; label: string } };

export function TelegramAssistant({ answers }: { answers: readonly TelegramAnswer[] }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  function ask(question: string) {
    const value = question.trim().slice(0, 500);
    if (!value) return;
    const match = findTelegramAnswer(value, answers);
    const reply: Message = match
      ? { role: "assistant", text: match.answer, source: { href: match.href, label: match.label } }
      : { role: "assistant", text: "I could not find a reliable answer in NexisHub's published information. Try one of the suggested questions, or contact the team for help.", source: { href: "/contact", label: "Contact NexisHub" } };
    setMessages((current) => [...current.slice(-18), { role: "user", text: value }, reply]);
    setDraft("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(draft);
  }

  return (
    <section className="tg-assistant" aria-label="NexisHub help assistant">
      <button type="button" className="tg-assistant-toggle" aria-expanded={open} aria-controls="tg-assistant-panel" onClick={() => setOpen(!open)}>
        <Image className="tg-assistant-logo" src="/nexishub-logo.jpeg" width={28} height={28} alt="" aria-hidden="true" /> {open ? "Close assistant" : "Ask NexisHub"}
      </button>
      {open && <div className="tg-assistant-panel" id="tg-assistant-panel">
        <div className="tg-assistant-heading"><strong>NexisHub Assistant</strong><span>Published information · Preview</span></div>
        <p className="tg-assistant-intro">Ask a question or choose a suggestion. Answers come from NexisHub&apos;s published information.</p>
        <div className="tg-assistant-questions">
          {answers.map((item, i) => <button key={item.question} type="button" aria-pressed={selected === i} onClick={() => { setSelected(i); ask(item.question); }}>{item.question}</button>)}
        </div>
        <div className="tg-chat-messages" role="log" aria-live="polite" aria-label="Conversation">
          {messages.map((message, i) => <div key={i} className={`tg-chat-message tg-chat-${message.role}`}><p>{message.text}</p>{message.source && <Link href={message.source.href}>{message.source.label} ↗</Link>}</div>)}
        </div>
        <form className="tg-chat-form" onSubmit={submit}>
          <label htmlFor="tg-chat-input">Your question</label>
          <div className="tg-chat-input-row">
            <input id="tg-chat-input" type="text" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask about NexisHub..." maxLength={500} autoComplete="off" />
            <button type="submit" disabled={!draft.trim()}>Send</button>
          </div>
        </form>
        {messages.length > 0 && <button type="button" className="tg-chat-clear" onClick={() => { setMessages([]); setSelected(null); }}>Clear conversation</button>}
        <p className="tg-assistant-disclaimer">This is local keyword retrieval, not generative AI. Questions are processed in your browser and are not sent to an AI provider. Conversation history clears when you leave or refresh. Telegram account access is not enabled. Do not enter sensitive information.</p>
      </div>}
    </section>
  );
}
