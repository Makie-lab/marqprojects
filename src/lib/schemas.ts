/**
 * Shared request schemas.
 *
 * The same schemas are used on the client (inline field validation) and the
 * server (authoritative validation), so the two can never disagree.
 */

import { z } from "zod";

/** Strips control characters and collapses runaway whitespace. */
const cleanText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .transform((s) =>
      s
        .split("")
        .filter((ch) => {
          const code = ch.charCodeAt(0);
          return code > 31 && code !== 127;
        })
        .join("")
        .replace(/\s{3,}/g, "  ")
    );

export const emailSchema = z
  .string()
  .trim()
  .min(3, "Email is required")
  .max(254, "Email is too long")
  .email("Please enter a valid email");

export const contactSchema = z.object({
  name: cleanText(100).pipe(z.string().min(2, "Name is required")),
  email: emailSchema,
  subject: cleanText(150).pipe(z.string().min(3, "Subject is required")),
  message: cleanText(5000).pipe(
    z.string().min(10, "Message must be at least 10 characters")
  ),
  /**
   * Anti-spam honeypot. Deliberately permissive at the schema level so the
   * route can accept-and-discard silently; rejecting here would tell a bot
   * exactly which field tripped it.
   */
  company: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const ASSET_USE_CASES = [
  "Social media / publication",
  "Event or campaign material",
  "Organization branding",
  "Academic / portfolio reference",
  "Commercial use",
  "Other",
] as const;

export const ASSET_CHANNELS = ["gmail", "canva"] as const;
export type AssetChannel = (typeof ASSET_CHANNELS)[number];

export const assetRequestSchema = z.object({
  /** Which integration the visitor chose to route the request through. */
  channel: z.enum(ASSET_CHANNELS),
  projectId: cleanText(120).pipe(z.string().min(1, "Project is required")),
  projectTitle: cleanText(200).pipe(z.string().min(1, "Project is required")),
  name: cleanText(100).pipe(z.string().min(2, "Name is required")),
  email: emailSchema,
  organization: cleanText(150).optional().or(z.literal("")),
  useCase: z.enum(ASSET_USE_CASES),
  details: cleanText(3000).optional().or(z.literal("")),
  /** Honeypot — see note on contactSchema.company. */
  company: z.string().max(200).optional().default(""),
});

export type AssetRequestInput = z.infer<typeof assetRequestSchema>;

/** Flattens a ZodError into `{ field: message }` for form rendering. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
