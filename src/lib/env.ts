/**
 * Type-safe, fail-soft environment configuration.
 *
 * Enterprise requirement: the app must boot and stay useful even when optional
 * integrations are unconfigured. Missing optional keys degrade a feature to a
 * documented fallback (e.g. email delivery falls back to a Gmail compose link)
 * rather than crashing the request.
 */

import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  /** Transactional email (Resend). Optional — falls back to Gmail handoff. */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** Verified sender. Must be a domain you own in Resend. */
  CONTACT_FROM_EMAIL: z.string().email().default("onboarding@resend.dev"),
  /** Inbox that receives contact + asset-request notifications. */
  CONTACT_TO_EMAIL: z.string().email().default("mebsamson04@gmail.com"),

  /** Public site origin, used for absolute links in emails and metadata. */
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

function loadEnv(): ServerEnv {
  const parsed = serverSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: emptyToUndefined(process.env.RESEND_API_KEY),
    CONTACT_FROM_EMAIL: emptyToUndefined(process.env.CONTACT_FROM_EMAIL),
    CONTACT_TO_EMAIL: emptyToUndefined(process.env.CONTACT_TO_EMAIL),
    NEXT_PUBLIC_SITE_URL: emptyToUndefined(process.env.NEXT_PUBLIC_SITE_URL),
  });

  if (parsed.success) return parsed.data;

  // Never hard-crash on optional misconfiguration: log and use safe defaults.
  console.warn(
    "[env] Invalid environment configuration; falling back to defaults.",
    parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
  );

  return serverSchema.parse({});
}

/** Treats placeholder / empty values as "not configured". */
function emptyToUndefined(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed === "") return undefined;
  // Ignore the placeholders shipped in .env.example
  if (/^(re_xxxxx|pk_test_xxxxx|sk_test_xxxxx|xxxxx)$/i.test(trimmed)) {
    return undefined;
  }
  if (trimmed.includes("xxxxx")) return undefined;
  return trimmed;
}

export const env: ServerEnv = loadEnv();

/** Runtime capability flags consumed by API routes and the health endpoint. */
export const integrations = {
  /** True when transactional email can actually be delivered. */
  email: Boolean(env.RESEND_API_KEY),
} as const;

export const isProduction = env.NODE_ENV === "production";
