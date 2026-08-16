"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, ExternalLink, Palette, Mail } from "lucide-react";
import { isRequestOnly, type Project } from "@/data/projects";
import AssetRequestDialog from "@/components/AssetRequestDialog";

interface ProjectCardProps {
  project: Project;
}

function hasValidLiveUrl(project: Project): boolean {
  return !!project.liveUrl && project.liveUrl !== "https://example.com";
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [requestOpen, setRequestOpen] = useState(false);
  const showPreview = hasValidLiveUrl(project);
  const requestOnly = isRequestOnly(project);
  const primaryTag = project.techStack[0];

  return (
    <>
      <article className="media-card group">
        <Link
          href={`/projects/${project.id}`}
          className="block"
          aria-label={`View ${project.title}`}
        >
          {/* Media */}
          <div className="media-card__media aspect-[4/3]">
            {showPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://image.thum.io/get/width/800/crop/600/${project.liveUrl}`}
                alt={project.title}
                loading="lazy"
                className="media-card__img"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {project.category === "Visual Assets" ? (
                  <Palette size={44} className="opacity-25" />
                ) : (
                  <Code2 size={44} className="opacity-25" />
                )}
              </div>
            )}

            {/* Category badge */}
            <span
              className="absolute top-3 left-3 chip chip--sm"
              style={{ backdropFilter: "blur(6px)" }}
            >
              {project.category}
            </span>

            {/* Request-only badge */}
            {requestOnly ? (
              <span className="absolute top-3 right-3 chip chip--sm chip--active">
                On request
              </span>
            ) : null}

            {/* Hover overlay */}
            <div className="media-card__overlay">
              <div className="media-card__title line-clamp-2">{project.title}</div>
              <div className="media-card__meta line-clamp-2">
                {project.techStack.slice(0, 4).join(" · ")}
              </div>
              <div className="media-card__actions">
                <span className="media-card__action">
                  {requestOnly ? "Request assets" : "View project"}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-3 py-3">
          <div className="min-w-0">
            <Link
              href={`/projects/${project.id}`}
              className="text-sm font-semibold truncate block hover:opacity-70 transition-opacity"
            >
              {project.title}
            </Link>
            {primaryTag ? (
              <p className="text-xs opacity-55 truncate mt-0.5">{primaryTag}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {requestOnly ? (
              <button
                onClick={() => setRequestOpen(true)}
                className="chip chip--sm"
                aria-label={`Request assets for ${project.title}`}
                title="Request via Gmail or Canva"
              >
                <Mail size={13} /> Request
              </button>
            ) : (
              <>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live site for ${project.title}`}
                    title="Live"
                    className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <ExternalLink size={15} className="opacity-70" />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open source code for ${project.title}`}
                    title="Code"
                    className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <Code2 size={15} className="opacity-70" />
                  </a>
                ) : null}
              </>
            )}
          </div>
        </div>
      </article>

      {requestOnly ? (
        <AssetRequestDialog
          project={project}
          open={requestOpen}
          onClose={() => setRequestOpen(false)}
        />
      ) : null}
    </>
  );
}
