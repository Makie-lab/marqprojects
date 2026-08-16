/**
 * Transactional email delivery.
 *
 * Wraps Resend behind a narrow interface with an explicit "not configured"
 * outcome. Callers must handle `skipped` — that is the branch that powers the
 * Gmail hand-off fallback, so the contact and asset-request flows never dead-end
 * when email credentials are absent.
 */

import { env, integrations } from "@/lib/env";
import { logger } from "@/lib/logger";
import { siteConfig } from "@/lib/site";

export type SendResult =
  | { status: "sent"; id: string }
  | { status: "skipped"; reason: "not_configured" }
  | { status: "failed"; reason: string };

interface SendArgs {
  subject: string;
  /** Plain-text body; also used to derive the HTML fallback. */
  text: string;
  html?: string;
  /** Visitor address used for Reply-To so replies go to the requester. */
  replyTo?: string;
  to?: string;
  tags?: Record<string, string>;
}

/** Lazily imported so the SDK is not bundled when email is unconfigured. */
async function getClient() {
  const { Resend } = await import("resend");
  return new Resend(env.RESEND_API_KEY);
}

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  if (!integrations.email) {
    logger.warn("email.skipped", {
      reason: "not_configured",
      subject: args.subject,
    });
    return { status: "skipped", reason: "not_configured" };
  }

  try {
    const resend = await getClient();
    const { data, error } = await resend.emails.send({
      from: `${siteConfig.name} <${env.CONTACT_FROM_EMAIL}>`,
      to: [args.to ?? env.CONTACT_TO_EMAIL],
      subject: args.subject,
      text: args.text,
      html: args.html ?? textToHtml(args.text),
      ...(args.replyTo ? { replyTo: args.replyTo } : {}),
    });

    if (error) {
      logger.error("email.failed", { reason: error.message });
      return { status: "failed", reason: error.message };
    }

    logger.info("email.sent", { id: data?.id, subject: args.subject });
    return { status: "sent", id: data?.id ?? "unknown" };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "unknown error";
    logger.error("email.exception", { reason });
    return { status: "failed", reason };
  }
}

/** Minimal, safe text→HTML conversion (escapes first, then linebreaks). */
export function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Arial,sans-serif;color:#000000;line-height:1.6;">
<div style="max-width:600px;margin:0 auto;border:1px solid rgba(0,0,0,0.1);border-radius:16px;padding:24px;">
<div style="font-weight:900;letter-spacing:-0.02em;font-size:14px;margin-bottom:16px;">MARQ</div>
<div style="white-space:pre-wrap;font-size:14px;">${escaped}</div>
<hr style="border:none;border-top:1px solid rgba(0,0,0,0.08);margin:24px 0 12px;" />
<div style="font-size:11px;color:rgba(0,0,0,0.5);">Sent from ${siteConfig.url}</div>
</div></body></html>`;
}
