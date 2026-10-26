type WebhookPayload = Record<string, unknown>;

export function buildFormWebhookRequest(payload: WebhookPayload): RequestInit | null {
  const apiKey = process.env.FORM_WEBHOOK_TOKEN;
  if (!apiKey) return null;
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-make-apikey": apiKey,
    },
    body: JSON.stringify(payload),
  };
}
