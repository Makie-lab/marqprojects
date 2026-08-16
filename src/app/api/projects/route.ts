import { apiSuccess } from "@/lib/api";
import { requestId } from "@/lib/logger";
import { projects, categories, isRequestOnly } from "@/data/projects";
import { buildCanvaUrl } from "@/lib/assetRequest";

export const runtime = "nodejs";
/** Catalogue data is static; allow CDN caching with revalidation. */
export const revalidate = 3600;

/**
 * GET /api/projects
 *
 * Public read-only catalogue. Supports `?category=` and `?q=` filtering and
 * annotates each item with how it can be obtained (download vs. request-only
 * through Gmail/Canva), so API consumers get the same routing rules as the UI.
 */
export async function GET(request: Request) {
  const rid = requestId(request);
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q")?.toLowerCase().trim();

  let items = projects;

  if (category && category !== "All") {
    items = items.filter((p) => p.category === category);
  }

  if (q) {
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
    );
  }

  const data = items.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    techStack: p.techStack,
    liveUrl: p.liveUrl ?? null,
    githubUrl: p.githubUrl ?? null,
    /** How this project is obtained. */
    acquisition: isRequestOnly(p)
      ? {
          mode: "request" as const,
          channels: ["gmail", "canva"] as const,
          canvaUrl: buildCanvaUrl(p.canvaUrl),
          endpoint: "/api/asset-request",
        }
      : { mode: "open" as const, channels: [] as const },
  }));

  return apiSuccess(
    {
      projects: data,
      total: data.length,
      categories,
      filters: { category: category ?? "All", q: q ?? null },
    },
    {
      requestId: rid,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
