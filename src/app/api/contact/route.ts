import { apiError, apiSuccess, readJson } from "@/lib/api";
import { contactSchema, fieldErrors } from "@/lib/schemas";
import { sendEmail } from "@/lib/email";
import { clientKey, rateLimit, rateLimitHeaders } from "@/lib/rateLimit";
import { logger, requestId } from "@/lib/logger";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/contact
 *
 * Validated, rate-limited contact intake. Sends an owner notification plus a
 * requester auto-acknowledgement. When email is unconfigured the route still
 * returns 202 with a Gmail hand-off link so the visitor is never blocked.
 */
export async function POST(request: Request) {
  const rid = requestId(request);
  const log = logger.child({ requestId: rid, route: "contact" });

  const limit = await rateLimit(clientKey(request, "contact"), {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  const limitHeaders = rateLimitHeaders(limit);

  if (!limit.success) {
    log.warn("rate_limited", { retryAfter: limit.retryAfterSeconds });
    return apiError(
      "RATE_LIMITED",
      "Too many messages sent. Please try again later.",
      { requestId: rid, status: 429, headers: limitHeaders }
    );
  }

  const body = await readJson(request);
  if (!body.ok) {
    return body.reason === "too_large"
      ? apiError("PAYLOAD_TOO_LARGE", "Message is too large.", {
          requestId: rid,
          status: 413,
          headers: limitHeaders,
        })
      : apiError("BAD_REQUEST", "Malformed JSON body.", {
          requestId: rid,
          status: 400,
          headers: limitHeaders,
        });
  }

  const parsed = contactSchema.safeParse(body.value);
  if (!parsed.success) {
    log.info("validation_failed");
    return apiError("VALIDATION_ERROR", "Please check the highlighted fields.", {
      requestId: rid,
      status: 422,
      fields: fieldErrors(parsed.error),
      headers: limitHeaders,
    });
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot: accept-and-drop so automated submitters learn nothing.
  if (company) {
    log.warn("honeypot_tripped");
    return apiSuccess(
      { received: true, delivery: "discarded" as const },
      { requestId: rid, status: 202, headers: limitHeaders }
    );
  }

  const ownerResult = await sendEmail({
    subject: `[Contact] ${subject}`,
    text: [
      `New message from ${siteConfig.url}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "— Message —",
      message,
      "",
      "———",
      `Request ID: ${rid}`,
    ].join("\n"),
    replyTo: email,
  });

  if (ownerResult.status === "sent") {
    await sendEmail({
      to: email,
      subject: `Thanks for reaching out — ${siteConfig.name}`,
      text: [
        `Hi ${name},`,
        "",
        "Thanks for your message. I've received it and will reply within",
        `${siteConfig.assetRequest.responseTime}.`,
        "",
        "— Your message —",
        message,
        "",
        `— ${siteConfig.author.name}`,
        siteConfig.author.jobTitle,
      ].join("\n"),
    });
  }

  log.info("contact.received", { delivery: ownerResult.status });

  // Gmail hand-off keeps the flow usable if delivery was skipped or failed.
  const gmailFallback = `https://mail.google.com/mail/u/0/?${new URLSearchParams({
    view: "cm",
    fs: "1",
    to: siteConfig.contact.email,
    su: subject,
    body: message,
  }).toString()}`;

  return apiSuccess(
    {
      received: true,
      delivery: ownerResult.status,
      responseTime: siteConfig.assetRequest.responseTime,
      ...(ownerResult.status === "sent" ? {} : { gmailFallback }),
    },
    { requestId: rid, status: 202, headers: limitHeaders }
  );
}

export async function GET() {
  return apiError("METHOD_NOT_ALLOWED", "Use POST to send a message.", {
    requestId: "n/a",
    status: 405,
    headers: { Allow: "POST" },
  });
}
