/**
 * NexisReach preview: deterministic, session-only planning.
 * Does not fetch publishers, validate Telegram channels, post ads, or process payments.
 */
import { evaluatePublisherEvidence, type PublisherEvidenceInput, type PublisherEvidencePassport } from "./nexisreach-evidence";

export type CampaignGoal = "awareness" | "website-visits" | "enquiries";
export type CampaignCurrency = "NGN" | "USD";

export type ChannelEstimate = {
  name: string;
  placementPrice: number | null;
  averagePostViews: number | null;
  evidence?: PublisherEvidenceInput;
};

export type CampaignDraft = {
  product: string;
  audience: string;
  region: string;
  goal: CampaignGoal;
  currency: CampaignCurrency;
  totalBudget: number;
  channels: ChannelEstimate[];
};

export type ChannelAssessment = ChannelEstimate & {
  estimatedCostPerThousandViews: number | null;
  notes: string[];
  passport: PublisherEvidencePassport;
};

export type CampaignPlan = {
  brief: string;
  tracking: readonly string[];
  publisherQuestions: readonly string[];
  checks: readonly string[];
  channels: ChannelAssessment[];
  warnings: string[];
};

const goalLabels: Record<CampaignGoal, string> = {
  awareness: "reach relevant people and build awareness",
  "website-visits": "bring interested visitors to a relevant page",
  enquiries: "generate consented, qualified enquiries",
};

const metrics: Record<CampaignGoal, readonly string[]> = {
  awareness: ["Post views", "Audience relevance", "Placement duration"],
  "website-visits": ["Tagged link clicks", "Consented landing-page visits", "Relevant page actions"],
  enquiries: ["Consented enquiries", "Enquiry quality", "Verified follow-up outcomes"],
};

function nonBlank(value: string, field: string, max: number) {
  if (typeof value !== "string" || value.trim().length < 3 || value.trim().length > max) {
    throw new Error(`${field} must contain between 3 and ${max} characters.`);
  }
  return value.trim();
}

function optionalWholeNumber(value: number | null, field: string) {
  if (value !== null && (!Number.isSafeInteger(value) || value < 0 || value > 1_000_000_000)) {
    throw new Error(`${field} must be an ordinary non-negative whole number or left blank.`);
  }
}

export function createAdvertisingPlan(draft: CampaignDraft): CampaignPlan {
  const product = nonBlank(draft.product, "Product or service", 160);
  const audience = nonBlank(draft.audience, "Audience", 160);
  const region = nonBlank(draft.region, "Market", 100);
  if (!(draft.goal in goalLabels) || !(["NGN", "USD"] as string[]).includes(draft.currency)) {
    throw new Error("Choose a supported goal and currency.");
  }
  if (!Number.isSafeInteger(draft.totalBudget) || draft.totalBudget <= 0 || draft.totalBudget > 1_000_000_000) {
    throw new Error("Enter a positive whole-number budget of no more than one billion.");
  }
  if (!Array.isArray(draft.channels) || draft.channels.length > 3) {
    throw new Error("Compare at most three manually entered placements.");
  }

  const seen = new Set<string>();
  const channels = draft.channels.map((item, index): ChannelAssessment => {
    const name = nonBlank(item.name, `Placement ${index + 1}`, 100);
    const identity = name.toLocaleLowerCase("en");
    if (seen.has(identity)) throw new Error("Each placement needs a different name.");
    seen.add(identity);
    optionalWholeNumber(item.placementPrice, "Placement price");
    optionalWholeNumber(item.averagePostViews, "Average post views");

    const notes: string[] = ["User-entered figures only; NexisHub has not verified this publisher or its statistics."];
    if (item.placementPrice === null) notes.push("Ask the publisher for the complete price and any extra fees.");
    if (item.averagePostViews === null || item.averagePostViews === 0) {
      notes.push("Request recent, dated post-view evidence before comparing reach.");
    }
    if (item.placementPrice !== null && item.placementPrice > draft.totalBudget) {
      notes.push("This single placement costs more than the entire stated budget.");
    }
    const costPerThousand = item.placementPrice !== null && item.averagePostViews !== null && item.averagePostViews > 0
      ? (item.placementPrice * 1_000) / item.averagePostViews
      : null;

    const passport = evaluatePublisherEvidence(item.evidence);
    return { ...item, name, estimatedCostPerThousandViews: costPerThousand, notes, passport };
  });

  const warnings = [
    "No real channel catalogue, availability, audience authenticity or delivery has been verified by NexisHub.",
    "View counts and estimated cost per thousand views are not guaranteed impressions, unique people, customers or sales.",
    "Do not pay or share passwords or bot administrator permissions based on this plan.",
  ];
  if (channels.length === 0) warnings.unshift("No publisher candidates supplied. Gather real, permissioned offers before booking.");
  if (channels.filter((item) => item.placementPrice !== null).reduce((sum, item) => sum + item.placementPrice!, 0) > draft.totalBudget) {
    warnings.push("The combined entered placement prices exceed the stated budget.");
  }

  return {
    brief: `Promote ${product} to ${audience} in ${region}. Goal: ${goalLabels[draft.goal]}. Maximum total budget: ${draft.currency} ${draft.totalBudget.toLocaleString("en")}. Assess offers without booking or making payment.`,
    tracking: metrics[draft.goal],
    publisherQuestions: [
      "Who is the actual audience, and how do you know their location and interests?",
      "Can you share dated, recent post-view evidence and your normal engagement range?",
      "What exactly is included in the quoted price, and how long will the post remain?",
      "How are cancellations, early removals and disputes resolved?",
      "Can we use a dedicated campaign link without collecting unnecessary personal data?",
    ],
    checks: [
      "Check channel ownership and the publisher's authority to sell placements.",
      "Compare evidence quality and audience fit before comparing price.",
      "Review ad copy, claims, destination, placement terms and disclosure requirements.",
      "Keep a record of approval and confirm delivery independently.",
      "Measure real results where possible; never invent conversions or return on ad spend.",
    ],
    channels,
    warnings,
  };
}
