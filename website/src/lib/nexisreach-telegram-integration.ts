/**
 * A source-neutral opt-in navigation contract for the completed Telegram Mini App.
 *
 * This module deliberately does NOT modify the Mini App shell or URL, set
 * BotFather configuration, infer user identity, or turn on a feature flag.
 * The five-tab host must import it only after its source has been captured
 * and all explicit preview integration gates have been satisfied.
 */
export type NexisReachIntegrationGate = Readonly<{
  approvedForTestPreview: boolean;
  baselineSourceVerified: boolean;
  telegramClientCertified: boolean;
}>;

export type NexisReachMenuEntry = Readonly<{
  id: "nexisreach-planner" | "nexisreach-publisher-preview";
  title: string;
  description: string;
  href: "/telegram/advertising" | "/telegram/advertising/publisher";
  section: "More";
  isPreview: true;
}>;

const previewMenu: readonly NexisReachMenuEntry[] = Object.freeze([
  Object.freeze({
    id: "nexisreach-planner",
    title: "NexisReach campaign planner",
    description: "Plan a campaign and compare offers you entered. No bookings or payments.",
    href: "/telegram/advertising",
    section: "More",
    isPreview: true,
  }),
  Object.freeze({
    id: "nexisreach-publisher-preview",
    title: "Publisher review packet",
    description: "Prepare a local unverified channel profile. No registration or public listing.",
    href: "/telegram/advertising/publisher",
    section: "More",
    isPreview: true,
  }),
]);

/**
 * Opt-in only. Returning zero menu items is the secure default.
 * Host application owns navigation, BackButton, safe areas, focus, and
 * any eventual route mounting. This is NOT a deployment authorization.
 */
export function getNexisReachMoreEntries(
  gate: NexisReachIntegrationGate = {
    approvedForTestPreview: false,
    baselineSourceVerified: false,
    telegramClientCertified: false,
  },
): readonly NexisReachMenuEntry[] {
  return gate.approvedForTestPreview && gate.baselineSourceVerified && gate.telegramClientCertified
    ? previewMenu
    : [];
}
