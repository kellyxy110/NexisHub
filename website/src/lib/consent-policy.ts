export const analyticsConsentKey = "nexishub-analytics-consent";

export function isAnalyticsAllowed(value: string | null) {
  return value === "allow";
}
