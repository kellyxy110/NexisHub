"use client";

import { useState, type FormEvent } from "react";
import {
  createAdvertisingPlan,
  type CampaignCurrency,
  type CampaignDraft,
  type CampaignGoal,
  type CampaignPlan,
} from "@/lib/adnexis-planner";

type EditableChannel = { name: string; price: string; views: string };

const money = (value: number, currency: CampaignCurrency) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);

export function AdvertisingPlanner() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [region, setRegion] = useState("Nigeria");
  const [goal, setGoal] = useState<CampaignGoal>("enquiries");
  const [currency, setCurrency] = useState<CampaignCurrency>("NGN");
  const [budget, setBudget] = useState("50000");
  const [channels, setChannels] = useState<EditableChannel[]>([]);
  const [plan, setPlan] = useState<CampaignPlan | null>(null);
  const [error, setError] = useState("");

  function invalidate() {
    setPlan(null);
    setError("");
  }

  function editChannel(index: number, field: keyof EditableChannel, value: string) {
    setChannels((current) => current.map((channel, i) => i === index ? { ...channel, [field]: value } : channel));
    invalidate();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const draft: CampaignDraft = {
        product,
        audience,
        region,
        goal,
        currency,
        totalBudget: Number(budget),
        channels: channels.map((channel) => ({
          name: channel.name,
          placementPrice: channel.price.trim() === "" ? null : Number(channel.price),
          averagePostViews: channel.views.trim() === "" ? null : Number(channel.views),
        })),
      };
      setPlan(createAdvertisingPlan(draft));
      setError("");
    } catch (cause) {
      setPlan(null);
      setError(cause instanceof Error ? cause.message : "Please check the campaign details.");
    }
  }

  return (
    <div className="adnx">
      <header className="adnx-intro">
        <p className="adnx-eyebrow">AdNexis · private planning preview</p>
        <h1>Plan before you pay.</h1>
        <p>Describe your campaign, review publisher questions and compare manually supplied offers. No account, payment, ad posting or channel access is involved.</p>
      </header>

      <form onSubmit={submit} className="adnx-form">
        <fieldset>
          <legend>01 · Campaign goal</legend>
          <label htmlFor="adnx-product">What are you promoting?</label>
          <input id="adnx-product" required minLength={3} maxLength={160} value={product} onChange={(event) => { setProduct(event.target.value); invalidate(); }} placeholder="e.g. my school software" />

          <label htmlFor="adnx-audience">Who should see it?</label>
          <input id="adnx-audience" required minLength={3} maxLength={160} value={audience} onChange={(event) => { setAudience(event.target.value); invalidate(); }} placeholder="e.g. private school owners" />

          <label htmlFor="adnx-region">Target market</label>
          <input id="adnx-region" required minLength={3} maxLength={100} value={region} onChange={(event) => { setRegion(event.target.value); invalidate(); }} />

          <label htmlFor="adnx-goal">What would count as success?</label>
          <select id="adnx-goal" value={goal} onChange={(event) => { setGoal(event.target.value as CampaignGoal); invalidate(); }}>
            <option value="awareness">Relevant awareness</option>
            <option value="website-visits">Website visitors</option>
            <option value="enquiries">Qualified enquiries</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>02 · Spending limit</legend>
          <p className="adnx-hint">This is a maximum budget for planning, not a payment request.</p>
          <div className="adnx-two">
            <div>
              <label htmlFor="adnx-currency">Currency</label>
              <select id="adnx-currency" value={currency} onChange={(event) => { setCurrency(event.target.value as CampaignCurrency); invalidate(); }}>
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label htmlFor="adnx-budget">Total budget</label>
              <input id="adnx-budget" type="number" min="1" max="1000000000" step="1" required value={budget} onChange={(event) => { setBudget(event.target.value); invalidate(); }} />
            </div>
          </div>
          <p className="adnx-hint">No exchange-rate conversion, platform fees or promised return is calculated.</p>
        </fieldset>

        <fieldset>
          <legend>03 · Compare possible channels (optional)</legend>
          <p className="adnx-hint">Enter up to three offers you found yourself. These are not verified listings or recommendations by NexisHub.</p>
          {channels.map((channel, index) => (
            <section className="adnx-channel" key={index} aria-label={`Publisher offer ${index + 1}`}>
              <div className="adnx-channel-head">
                <strong>Offer {index + 1}</strong>
                <button type="button" className="adnx-remove" onClick={() => { setChannels((current) => current.filter((_, i) => i !== index)); invalidate(); }}>Remove</button>
              </div>
              <label htmlFor={`adnx-name-${index}`}>Channel or placement name</label>
              <input id={`adnx-name-${index}`} required maxLength={100} minLength={3} value={channel.name} onChange={(event) => editChannel(index, "name", event.target.value)} placeholder="Publisher supplied by you" />
              <div className="adnx-two">
                <div>
                  <label htmlFor={`adnx-price-${index}`}>Quoted price</label>
                  <input id={`adnx-price-${index}`} type="number" min="0" max="1000000000" step="1" value={channel.price} onChange={(event) => editChannel(index, "price", event.target.value)} placeholder="Unknown" />
                </div>
                <div>
                  <label htmlFor={`adnx-views-${index}`}>Average post views</label>
                  <input id={`adnx-views-${index}`} type="number" min="0" max="1000000000" step="1" value={channel.views} onChange={(event) => editChannel(index, "views", event.target.value)} placeholder="Unknown" />
                </div>
              </div>
            </section>
          ))}
          {channels.length < 3 && <button className="adnx-add" type="button" onClick={() => { setChannels((current) => [...current, { name: "", price: "", views: "" }]); invalidate(); }}>+ Add a publisher offer</button>}
        </fieldset>
        {error && <p className="adnx-error" role="alert">{error}</p>}
        <button className="adnx-submit" type="submit">Prepare campaign plan</button>
      </form>

      {plan && <section className="adnx-result" aria-live="polite" aria-label="Generated planning brief">
        <p className="adnx-eyebrow">Read-only planning output</p>
        <h2>Your campaign brief</h2>
        <textarea aria-label="Campaign brief you can select and copy" rows={5} readOnly value={plan.brief} />

        {plan.channels.length > 0 && <>
          <h3>Offer comparison</h3>
          <p className="adnx-hint">All prices and view counts were entered by you. Estimated cost per 1,000 views is arithmetic only, not evidence of delivery or audience quality.</p>
          {plan.channels.map((channel) => (
            <div className="adnx-assessment" key={channel.name}>
              <strong>{channel.name}</strong>
              <p>Quoted price: {channel.placementPrice === null ? "Unknown" : money(channel.placementPrice, currency)}</p>
              <p>Entered average views: {channel.averagePostViews === null ? "Unknown" : channel.averagePostViews.toLocaleString("en")}</p>
              <p>Calculated cost / 1,000 stated views: {channel.estimatedCostPerThousandViews === null ? "Not calculable" : money(channel.estimatedCostPerThousandViews, currency)}</p>
              <ul>{channel.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
          ))}
        </>}

        <h3>What to measure</h3>
        <ul>{plan.tracking.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Questions to ask a publisher</h3>
        <ul>{plan.publisherQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Checks before any agreement</h3>
        <ul>{plan.checks.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Important limitations</h3>
        <ul>{plan.warnings.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>}
      <p className="adnx-privacy">Private session-only preview. Inputs stay in this browser page's memory and clear on refresh. No channel data is fetched, stored or independently verified.</p>
    </div>
  );
}
