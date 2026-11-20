"use client";

import { useState, type FormEvent } from "react";
import {
  createPublisherReviewPacket,
  type PublisherIntake,
  type PublisherReviewPacket,
} from "@/lib/adnexis-publisher";
import type { EvidenceOrigin } from "@/lib/adnexis-evidence";

const initial: PublisherIntake = {
  channel: "",
  displayName: "",
  category: "technology",
  targetAudience: "",
  audienceRegion: "Nigeria",
  contactHandle: "",
  currency: "NGN",
  quotedPrice: null,
  averagePostViews: null,
  evidenceOrigin: "none",
  evidenceReference: "",
  evidenceObservedOn: "",
  permissionToPrepareReviewPacket: false,
  consentToFutureListing: false,
};

function amount(value: string): number | null {
  return value.trim() ? Number(value) : null;
}

export function PublisherIntakePreview() {
  const [draft, setDraft] = useState<PublisherIntake>(initial);
  const [priceText, setPriceText] = useState("");
  const [viewText, setViewText] = useState("");
  const [packet, setPacket] = useState<PublisherReviewPacket | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  function update<K extends keyof PublisherIntake>(field: K, value: PublisherIntake[K]) {
    setDraft((old) => ({ ...old, [field]: value }));
    setPacket(null);
    setError("");
    setCopyStatus("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const prepared = createPublisherReviewPacket({
        ...draft,
        quotedPrice: amount(priceText),
        averagePostViews: amount(viewText),
      });
      setPacket(prepared);
      setError("");
    } catch (cause) {
      setPacket(null);
      setError(cause instanceof Error ? cause.message : "Check the publisher details.");
    }
  }

  async function copyPacket() {
    if (!packet) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(packet, null, 2));
      setCopyStatus("Review packet copied. No information was sent to NexisHub.");
    } catch {
      setCopyStatus("Clipboard unavailable. Select the text below and copy it manually.");
    }
  }

  return (
    <section className="adnx-publisher" aria-label="AdNexis publisher onboarding draft">
      <header className="adnx-intro">
        <p className="adnx-eyebrow">AdNexis · phase 2 · offline preview</p>
        <h1>Prepare your publisher profile.</h1>
        <p>Create a local review packet for a public Telegram channel. This does not register your channel, validate ownership, publish a listing or request bot permissions.</p>
      </header>

      <form className="adnx-form" onSubmit={submit}>
        <fieldset>
          <legend>01 · Public channel identity</legend>
          <label htmlFor="publisher-channel">Public channel username or URL</label>
          <input id="publisher-channel" required maxLength={64} value={draft.channel} onChange={(e) => update("channel", e.target.value)} placeholder="@examplechannel or https://t.me/examplechannel" />
          <p className="adnx-hint">Only public t.me usernames. Do not enter private invite links, passwords or bot tokens.</p>

          <label htmlFor="publisher-name">Public display name</label>
          <input id="publisher-name" required minLength={3} maxLength={100} value={draft.displayName} onChange={(e) => update("displayName", e.target.value)} placeholder="Name shown in the channel" />

          <label htmlFor="publisher-category">Primary advertising category</label>
          <select id="publisher-category" value={draft.category} onChange={(e) => update("category", e.target.value as PublisherIntake["category"])}>
            <option value="technology">Technology and software</option>
            <option value="education">Education</option>
            <option value="business">Business and entrepreneurship</option>
            <option value="events">Events and entertainment</option>
            <option value="local-services">Local services</option>
            <option value="general">General interest</option>
          </select>

          <label htmlFor="publisher-audience">Who normally follows your channel?</label>
          <input id="publisher-audience" required minLength={3} maxLength={160} value={draft.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} placeholder="E.g. Nigerian software developers" />

          <label htmlFor="publisher-region">Claimed audience region</label>
          <input id="publisher-region" required minLength={3} maxLength={100} value={draft.audienceRegion} onChange={(e) => update("audienceRegion", e.target.value)} placeholder="Nigeria" />

          <label htmlFor="publisher-contact">Public contact username (optional)</label>
          <input id="publisher-contact" maxLength={64} value={draft.contactHandle} onChange={(e) => update("contactHandle", e.target.value)} placeholder="@publiccontact" />
          <p className="adnx-hint">Only add a username you want to include in your own offline review packet.</p>
        </fieldset>

        <fieldset>
          <legend>02 · Advertising offer</legend>
          <div className="adnx-two">
            <div>
              <label htmlFor="publisher-currency">Currency</label>
              <select id="publisher-currency" value={draft.currency} onChange={(e) => update("currency", e.target.value as PublisherIntake["currency"])}>
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label htmlFor="publisher-price">Quoted post price (optional)</label>
              <input id="publisher-price" type="number" min="0" max="1000000000" step="1" value={priceText} onChange={(e) => { setPriceText(e.target.value); setPacket(null); }} placeholder="Not provided" />
            </div>
          </div>
          <label htmlFor="publisher-views">Claimed average post views (optional)</label>
          <input id="publisher-views" type="number" min="0" max="1000000000" step="1" value={viewText} onChange={(e) => { setViewText(e.target.value); setPacket(null); }} placeholder="Not provided" />
          <p className="adnx-hint">Numbers are publisher-supplied claims, not verified audience statistics. No commission or income is calculated.</p>
        </fieldset>

        <fieldset>
          <legend>03 · Evidence provenance</legend>
          <label htmlFor="publisher-evidence-origin">Where does the supporting evidence come from?</label>
          <select id="publisher-evidence-origin" value={draft.evidenceOrigin} onChange={(e) => {
            const origin = e.target.value as EvidenceOrigin;
            setDraft((old) => ({ ...old, evidenceOrigin: origin, evidenceReference: origin === "none" ? "" : old.evidenceReference, evidenceObservedOn: origin === "none" ? "" : old.evidenceObservedOn }));
            setPacket(null);
          }}>
            <option value="none">No evidence available</option>
            <option value="publisher-claim">Publisher's own statement</option>
            <option value="public-posts">Public channel posts or statistics</option>
            <option value="third-party-material">Third-party report or material</option>
          </select>
          {draft.evidenceOrigin !== "none" && <>
            <label htmlFor="publisher-evidence-reference">Reference (not checked)</label>
            <input id="publisher-evidence-reference" maxLength={240} value={draft.evidenceReference} onChange={(e) => update("evidenceReference", e.target.value)} placeholder="Public post URL or screenshot description" />
            <label htmlFor="publisher-evidence-date">Evidence observation date</label>
            <input id="publisher-evidence-date" type="date" value={draft.evidenceObservedOn} onChange={(e) => update("evidenceObservedOn", e.target.value)} />
          </>}
        </fieldset>

        <fieldset>
          <legend>04 · Permission and expectations</legend>
          <label className="adnx-publisher-check">
            <input type="checkbox" required checked={draft.permissionToPrepareReviewPacket} onChange={(e) => update("permissionToPrepareReviewPacket", e.target.checked)} />
            I agree to prepare a local review packet using the information I entered.
          </label>
          <label className="adnx-publisher-check">
            <input type="checkbox" checked={draft.consentToFutureListing} onChange={(e) => update("consentToFutureListing", e.target.checked)} />
            If a verified onboarding service becomes available, I would like to be considered for a future public listing. This checkbox does not publish anything.
          </label>
          <p className="adnx-hint">Nothing is submitted or stored. A future public listing would require a new authenticated review and consent process.</p>
        </fieldset>
        {error && <p role="alert" className="adnx-error">{error}</p>}
        <button className="adnx-submit" type="submit">Prepare local review packet</button>
      </form>

      {packet && <section className="adnx-result" aria-label="Local draft review packet" aria-live="polite">
        <p className="adnx-eyebrow">Draft generated, not submitted</p>
        <h2>{packet.displayName}</h2>
        <p>Public channel: {packet.channelUrl}</p>
        <p><strong>Evidence status:</strong> {packet.evidence.status}</p>
        <p><strong>NexisHub verification:</strong> Not performed</p>
        <p><strong>Directory listing:</strong> Not published</p>
        <h3>Before a real approval</h3>
        <ul>{packet.reviewQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Important safeguards</h3>
        <ul>{packet.safeguards.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Copyable offline review packet</h3>
        <p className="adnx-hint">If sharing this draft with someone, review the information first. The button copies it only to your device clipboard.</p>
        <button className="adnx-add" type="button" onClick={copyPacket}>Copy draft packet</button>
        {copyStatus && <p role="status" className="adnx-hint">{copyStatus}</p>}
        <textarea className="adnx-publisher-json" aria-label="Draft publisher review packet" rows={10} readOnly value={JSON.stringify(packet, null, 2)} />
      </section>}
      <p className="adnx-privacy">Session-only prototype. Refreshing clears everything. No server submission, database write, Telegram login, bot permission request, payment or independently verified publisher profile is created.</p>
    </section>
  );
}
