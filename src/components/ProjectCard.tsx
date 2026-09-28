"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, ExternalLink, Mail, Palette, Sparkles } from "lucide-react";
import { isRequestOnly, type Project } from "@/data/projects";
import AssetRequestDialog from "@/components/AssetRequestDialog";

interface ProjectCardProps {
  project: Project;
}

function hasValidLiveUrl(project: Project): boolean {
  return !!project.liveUrl && project.liveUrl !== "https://example.com";
}

function MarqCorner({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`poker-card__mark ${inverted ? "poker-card__mark--inverted" : ""}`}
    >
      <span>MA</span>
      <span>RQ</span>
      <Sparkles size={10} strokeWidth={1.8} />
    </span>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [requestOpen, setRequestOpen] = useState(false);
  const showPreview = hasValidLiveUrl(project);
  const requestOnly = isRequestOnly(project);
  const primaryTag = project.techStack[0];

  return (
    <>
      <article className="poker-card group">
        <div className="poker-card__orbit" aria-hidden="true" />
        <MarqCorner />
        <MarqCorner inverted />

        <Link
          href={`/projects/${project.id}`}
          className="poker-card__main"
          aria-label={`View ${project.title}`}
        >
          <div className="poker-card__visual">
            {showPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://image.thum.io/get/width/800/crop/600/nonce/v2/${project.liveUrl}`}
                alt=""
                loading="lazy"
                className="poker-card__img"
              />
            ) : (
              <div className="poker-card__placeholder" aria-hidden="true">
                {project.category === "Visual Assets" ? (
                  <Palette size={46} strokeWidth={1.25} />
                ) : (
                  <Code2 size={46} strokeWidth={1.25} />
                )}
              </div>
            )}
            <span className="poker-card__category">{project.category}</span>
          </div>

          <div className="poker-card__copy">
            <p className="poker-card__kicker">
              {requestOnly ? "Commissioned edition" : "Open project"}
            </p>
            <h3 className="poker-card__title line-clamp-2">{project.title}</h3>
            <p className="poker-card__description line-clamp-3">
              {project.description}
            </p>
          </div>
        </Link>

        <div className="poker-card__footer">
          <span className="poker-card__tech">{primaryTag ?? "MARQ"}</span>
          {requestOnly ? (
            <button
              type="button"
              onClick={() => setRequestOpen(true)}
              className="poker-card__action"
              aria-label={`Request assets for ${project.title}`}
            >
              <Mail size={13} /> Request
            </button>
          ) : (
            <div className="flex items-center gap-1">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live site for ${project.title}`}
                  title="Open live project"
                  className="poker-card__icon-action"
                >
                  <ExternalLink size={15} />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source code for ${project.title}`}
                  title="Open source code"
                  className="poker-card__icon-action"
                >
                  <Code2 size={15} />
                </a>
              ) : null}
            </div>
          )}
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
