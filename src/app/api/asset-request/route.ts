import { apiError, apiSuccess, readJson } from "@/lib/api";
import { assetRequestSchema, fieldErrors } from "@/lib/schemas";
import {
  assetRequestBody,
  assetRequestSubject,
  resolveAssetChannels,
  toContext,
} from "@/lib/assetRequest";
import { sendEmail } from "@/lib/email";
import { clientKey, rateLimit, rateLimitHeaders } from "@/lib/rateLimit";
import { logger, requestId } from "@/lib/logger";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/asset-request
 *
 * Records a visual-asset request and returns the resolved Gmail + Canva
 * destinations. The response always contains working hand-off links, so the
 * flow succeeds for the user even when server-side email is unconfigured or
 * upstream delivery fails.
 */
export async function POST(request: Request) {
  const rid = requestId(request);
  const log = logger.child({ requestId: rid, route: "asset-request" });

  // 1. Rate limit — stricter than contact since each request is a commitment.
  const limit = await rateLimit(clientKey(request, "asset-request"), {
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });
  const limitHeaders = rateLimitHeaders(limit);

  if (!limit.success) {
    log.warn("rate_limited", { retryAfter: limit.retryAfterSeconds });
    return apiError("RATE_LIMITED", "Too many requests. Please try again later.", {
      requestId: rid,
      status: 429,
      headers: limitHeaders,
    });
  }

  // 2. Body
  const body = await readJson(request);
  if (!body.ok) {
    return body.reason === "too_large"
      ? apiError("PAYLOAD_TOO_LARGE", "Request body is too large.", {
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

  // 3. Validate
  const parsed = assetRequestSchema.safeParse(body.value);
  if (!parsed.success) {
    log.info("validation_failed");
    return apiError("VALIDATION_ERROR", "Please check the highlighted fields.", {
      requestId: rid,
      status: 422,
      fields: fieldErrors(parsed.error),
      headers: limitHeaders,
    });
  }

  const input = parsed.data;

  // Honeypot tripped → accept silently so bots get no signal.
  if (input.company) {
    log.warn("honeypot_tripped");
    return apiSuccess(
      { received: true, channel: input.channel, delivery: "discarded" as const },
      { requestId: rid, headers: limitHeaders }
    );
  }

  // 4. Resolve the project so we can attach its Canva link (server-authoritative).
  const project = projects.find((p) => p.id === input.projectId);
  const ctx = toContext(input);
  const channels = resolveAssetChannels(ctx, project?.canvaUrl);

  // 5. Notify the owner, then acknowledge the requester.
  const ownerSubject = `[Asset request · ${input.channel}] ${input.projectTitle}`;
  const ownerText = [
    assetRequestBody(ctx),
    "",
    "———",
    `Channel selected: ${input.channel}`,
    `Canva link: ${channels.canva}`,
    `Request ID: ${rid}`,
  ].join("\n");

  const ownerResult = await sendEmail({
    subject: ownerSubject,
    text: ownerText,
    replyTo: input.email,
  });

  if (ownerResult.status === "sent") {
    await sendEmail({
      to: input.email,
      subject: `We received your asset request — ${input.projectTitle}`,
      text: [
        `Hi ${input.name},`,
        "",
        `Thanks for requesting the visual assets for "${input.projectTitle}".`,
        `I'll reply within ${siteConfig.assetRequest.responseTime}.`,
        "",
        input.channel === "canva"
          ? `You can preview the design here in the meantime: ${channels.canva}`
          : `If you'd like to add anything, just reply to this email.`,
        "",
        siteConfig.assetRequest.licenseNote,
        "",
        `— ${siteConfig.author.name}`,
      ].join("\n"),
    });
  }

  log.info("asset_request.received", {
    channel: input.channel,
    projectId: input.projectId,
    useCase: input.useCase,
    delivery: ownerResult.status,
  });

  // 6. Always hand back working links so the UI can complete the journey.
  return apiSuccess(
    {
      received: true,
      channel: input.channel,
      delivery: ownerResult.status,
      subject: assetRequestSubject(ctx),
      channels: {
        gmail: channels.gmail,
        mailto: channels.mailto,
        canva: channels.canva,
      },
      responseTime: siteConfig.assetRequest.responseTime,
    },
    { requestId: rid, status: 202, headers: limitHeaders }
  );
}

export async function GET() {
  return apiError("METHOD_NOT_ALLOWED", "Use POST to submit an asset request.", {
    requestId: "n/a",
    status: 405,
    headers: { Allow: "POST" },
  });
}
