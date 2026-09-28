import { z } from "zod";

export const LeadStatusSchema = z.enum([
  "NEW",
  "REVIEWED",
  "QUALIFIED",
  "DISCOVERY",
  "PROPOSAL",
  "WON",
  "LOST",
  "SPAM",
  "ARCHIVED",
]);

export const AIStatusSchema = z.enum(["PENDING", "AI_READY", "AI_DEFERRED", "AI_INVALID"]);

const optionalText = z.string().trim().min(1).optional();
const timestamp = z.string().datetime({ offset: true });

export const LeadSchema = z.object({
  lead_id: z.string().trim().min(1),
  created_at: timestamp,
  source: z.string().trim().min(1),
  form_type: z.string().trim().min(1),
  name: z.string().trim().min(1),
  email: z.string().email(),
  phone: optionalText,
  company: optionalText,
  website: optionalText,
  service: optionalText,
  timeline: optionalText,
  message: z.string().trim().min(1),
  risk_context: optionalText,
  status: LeadStatusSchema,
  ai_status: AIStatusSchema,
  ai_summary: optionalText,
  ai_intent: optionalText,
  ai_category: optionalText,
  ai_requirements: z.array(z.string()).optional(),
  ai_missing_information: z.array(z.string()).optional(),
  ai_risk_signals: z.array(z.string()).optional(),
  ai_next_action: optionalText,
  ai_discovery_questions: z.array(z.string()).optional(),
  ai_confidence: z.number().min(0).max(1).optional(),
  assigned_to: optionalText,
  last_activity_at: timestamp.optional(),
  follow_up_at: timestamp.optional(),
  notes: optionalText,
}).strict();

export type Lead = z.infer<typeof LeadSchema>;
export type LeadStatus = z.infer<typeof LeadStatusSchema>;
export type AIStatus = z.infer<typeof AIStatusSchema>;

export const Agent001InputSchema = z.object({
  source: z.string().trim().min(1),
  name: z.string().trim().min(1),
  email: z.string().email(),
  company: optionalText,
  website: optionalText,
  service: optionalText,
  timeline: optionalText,
  message: z.string().trim().min(1),
  risk_context: optionalText,
}).strict();

export type Agent001Input = z.infer<typeof Agent001InputSchema>;

export const Agent001ResultSchema = z.object({
  summary: z.string(),
  intent: z.string(),
  category: z.string(),
  requirements: z.array(z.string()),
  missing_information: z.array(z.string()),
  risk_signals: z.array(z.string()),
  suggested_next_action: z.string(),
  discovery_questions: z.array(z.string()),
  confidence: z.number().min(0).max(1),
}).strict();

export type Agent001Result = z.infer<typeof Agent001ResultSchema>;
