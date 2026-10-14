const BREVO_TRANSACTIONAL_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_TIMEOUT_MS = 10_000;

type BrevoResponse = { messageId?: unknown };

export type VerificationEmail = {
  from: string;
  to: string;
  url: string;
};

function isBrevoResponse(value: unknown): value is BrevoResponse {
  return typeof value === "object" && value !== null && typeof (value as BrevoResponse).messageId === "string" && (value as BrevoResponse).messageId !== "";
}

export async function sendBrevoVerificationEmail({ from, to, url }: VerificationEmail): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey || !from.trim()) throw new Error("Authentication email is not configured.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);
  try {
    const response = await fetch(BREVO_TRANSACTIONAL_EMAIL_URL, {
      method: "POST",
      headers: { accept: "application/json", "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { email: from },
        to: [{ email: to }],
        subject: "Your NexisHub sign-in link",
        htmlContent: `<p>Use this secure link to sign in to NexisHub administration:</p><p><a href="${url}">Sign in to NexisHub</a></p><p>This link expires in ten minutes.</p>`,
      }),
      signal: controller.signal,
    });
    const body = await response.json().catch(() => null);
    if (!response.ok || !isBrevoResponse(body)) throw new Error("Authentication email delivery failed.");
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication email delivery failed.") throw error;
    throw new Error("Authentication email delivery failed.");
  } finally {
    clearTimeout(timeout);
  }
}
