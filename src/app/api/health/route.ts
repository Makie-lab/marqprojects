import { apiSuccess } from "@/lib/api";
import { requestId } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/health
 *
 * Minimal public liveness probe. Detailed integration state, environment,
 * version, uptime, and contact destinations stay out of unauthenticated output.
 */
export async function GET(request: Request) {
  return apiSuccess(
    { status: "healthy" as const },
    { requestId: requestId(request), status: 200 }
  );
}
