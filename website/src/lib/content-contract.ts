import { z } from "zod";

export const ContentBrandSchema = z.enum(["NEXISHUB", "SITENEXIS"]);
export const ContentChannelSchema = z.enum(["BLOG", "YOUTUBE", "LINKEDIN", "MEDIUM", "FACEBOOK"]);
export const ContentStatusSchema = z.enum(["DRAFT", "APPROVED", "PUBLISHED", "ARCHIVED"]);

const timestamp = z.string().datetime({ offset: true });
const canonicalUrl = z.string().url().refine((value) => {
  return value.startsWith("http://") || value.startsWith("https://");
}, "canonical_url must use http or https");

export const ContentRegisterRecordSchema = z.object({
  content_id: z.string().trim().min(1),
  published_at: timestamp,
  brand: ContentBrandSchema,
  channel: ContentChannelSchema,
  title: z.string().trim().min(1),
  canonical_url: canonicalUrl,
  topic: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  status: ContentStatusSchema,
  newsletter_eligible: z.boolean(),
  last_newsletter_date: timestamp.nullable(),
}).strict();

export type ContentRegisterRecord = z.infer<typeof ContentRegisterRecordSchema>;

export function isNewsletterEligible(record: unknown): record is ContentRegisterRecord {
  const parsed = ContentRegisterRecordSchema.safeParse(record);
  return parsed.success && parsed.data.status === "PUBLISHED" && parsed.data.newsletter_eligible;
}
