import { apiSuccess } from "@/lib/api";
import { requestId } from "@/lib/logger";
import { integrations, env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startedAt = Date.now();

/**
 * GET /api/health
 *
 * Readiness/liveness probe for uptime monitors and deployment gates. Reports
 * which integrations are live so an operator can tell at a glance whether
 * email delivery is active or the site is running in Gmail-handoff mode.
 */
export async function GET(request: Request) {
  const rid = requestId(request);

  const checks = {
    app: { status: "ok" as const },
    catalogue: {
      status: projects.length > 0 ? ("ok" as const) : ("degraded" as const),
      projects: projects.length,
    },
    email: {
      status: integrations.email ? ("ok" as const) : ("degraded" as const),
      provider: "resend",
      mode: integrations.email ? "smtp_api" : "gmail_handoff_fallback",
    },
    assetRequest: {
      status: "ok" as const,
      channels: ["gmail", "canva"],
      inbox: siteConfig.assetRequest.inbox,
    },
  };

  const degraded = Object.values(checks).some((c) => c.status === "degraded");

  return apiSuccess(
    {
      status: degraded ? "degraded" : "healthy",
      version: process.env.npm_package_version ?? "0.1.0",
      environment: env.NODE_ENV,
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      checks,
    },
    { requestId: rid, status: 200 }
  );
}
