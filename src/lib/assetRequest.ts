/**
 * Visual-asset request routing: Gmail and Canva.
 *
 * Visual Assets in this portfolio are commissioned design work, not
 * downloadable files. Requests are therefore routed through one of two
 * first-class channels:
 *
 *  1. Gmail  — opens a pre-filled compose window (web Gmail, with a `mailto:`
 *              fallback for users without a Gmail session) so the requester
 *              sends a written brief straight to the inbox.
 *  2. Canva  — opens the Canva design/profile link so the requester can view
 *              or duplicate the source design directly.
 *
 * Both helpers are pure and shared by the client dialog and the server route,
 * guaranteeing the link a user clicks matches what the API reports.
 */

import { siteConfig } from "@/lib/site";
import type { AssetChannel, AssetRequestInput } from "@/lib/schemas";

export interface AssetRequestContext {
  projectTitle: string;
  projectId: string;
  name?: string;
  email?: string;
  organization?: string;
  useCase?: string;
  details?: string;
}

/** Subject line used for every asset request, keeps the inbox filterable. */
export function assetRequestSubject(ctx: AssetRequestContext): string {
  return `Asset request — ${ctx.projectTitle}`;
}

/** Human-readable brief body shared by Gmail and mailto. */
export function assetRequestBody(ctx: AssetRequestContext): string {
  const lines: string[] = [
    `Hi ${siteConfig.author.name.split(" ")[0]},`,
    "",
    `I'd like to request the visual assets for "${ctx.projectTitle}".`,
    "",
    "— Request details —",
    `Project: ${ctx.projectTitle}`,
    `Reference ID: ${ctx.projectId}`,
  ];

  if (ctx.name) lines.push(`Name: ${ctx.name}`);
  if (ctx.email) lines.push(`Email: ${ctx.email}`);
  if (ctx.organization) lines.push(`Organization: ${ctx.organization}`);
  if (ctx.useCase) lines.push(`Intended use: ${ctx.useCase}`);

  if (ctx.details) {
    lines.push("", "— Additional notes —", ctx.details);
  }

  lines.push(
    "",
    `Requested via ${siteConfig.url}`,
    "",
    "Thank you!"
  );

  return lines.join("\n");
}

/**
 * Gmail web compose URL.
 *
 * Uses the `/mail/u/0/` form so it resolves for the signed-in account, and
 * falls back gracefully in the UI via {@link buildMailtoUrl}.
 */
export function buildGmailComposeUrl(ctx: AssetRequestContext): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: siteConfig.assetRequest.inbox,
    su: assetRequestSubject(ctx),
    body: assetRequestBody(ctx),
  });
  return `https://mail.google.com/mail/u/0/?${params.toString()}`;
}

/** Standards-based fallback that works with any default mail client. */
export function buildMailtoUrl(ctx: AssetRequestContext): string {
  const params = new URLSearchParams({
    subject: assetRequestSubject(ctx),
    body: assetRequestBody(ctx),
  });
  return `mailto:${siteConfig.assetRequest.inbox}?${params.toString()}`;
}

/**
 * Canva destination for a project.
 *
 * Prefers a project-specific Canva design link when the project data provides
 * one; otherwise routes to the Canva profile so the request still lands
 * somewhere useful.
 */
export function buildCanvaUrl(canvaUrl?: string): string {
  if (canvaUrl && /^https:\/\/(www\.)?canva\.com\//i.test(canvaUrl)) {
    return canvaUrl;
  }
  return siteConfig.assetRequest.canvaProfileUrl;
}

/** Resolves every channel destination at once for a given project. */
export function resolveAssetChannels(
  ctx: AssetRequestContext,
  canvaUrl?: string
): Record<AssetChannel, string> & { mailto: string } {
  return {
    gmail: buildGmailComposeUrl(ctx),
    canva: buildCanvaUrl(canvaUrl),
    mailto: buildMailtoUrl(ctx),
  };
}

/** Narrows a validated payload into the context object used for link building. */
export function toContext(input: AssetRequestInput): AssetRequestContext {
  return {
    projectTitle: input.projectTitle,
    projectId: input.projectId,
    name: input.name,
    email: input.email,
    organization: input.organization || undefined,
    useCase: input.useCase,
    details: input.details || undefined,
  };
}
