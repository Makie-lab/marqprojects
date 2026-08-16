import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

/** Generated sitemap covering the single-page sections and every project. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/tech-stack"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.id}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
