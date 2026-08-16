import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { projects, isRequestOnly } from "@/data/projects";
import { notFound } from "next/navigation";
import AssetRequestPanel from "@/components/AssetRequestPanel";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = absoluteUrl(`/projects/${project.id}`);

  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.description.slice(0, 200),
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description.slice(0, 200),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const requestOnly = isRequestOnly(project);

  // Structured data so the project surfaces correctly in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.id}`),
    genre: project.category,
    keywords: project.techStack.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    ...(requestOnly
      ? {
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            availabilityStarts: new Date().toISOString().slice(0, 10),
            description: "Available on request via Gmail or Canva",
            url: absoluteUrl(`/projects/${project.id}`),
          },
        }
      : {}),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-8"
      >
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="animate-fade-in">
        {/* Title & Category */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="chip chip--sm">{project.category}</span>
            {requestOnly ? (
              <span className="chip chip--sm chip--active">On request</span>
            ) : null}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Website Preview */}
        {project.liveUrl && project.liveUrl !== "https://example.com" && (
          <div className="glass-card overflow-hidden rounded-glass-lg mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://image.thum.io/get/width/800/crop/500/${project.liveUrl}`}
              alt={`${project.title} preview`}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-lg opacity-70 mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Acquisition: request-only assets get the Gmail/Canva flow */}
        {requestOnly ? (
          <AssetRequestPanel project={project} />
        ) : (
          (project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3 mb-10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-glass font-medium hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "var(--foreground)",
                    color: "var(--background)",
                  }}
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 glass-card font-medium hover:opacity-80 transition-opacity"
                >
                  <Code2 size={16} /> Source Code
                </a>
              )}
            </div>
          )
        )}

        {/* Tech Stack Tags */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">
            {requestOnly ? "Tools used" : "Tech Stack"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="chip chip--sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
