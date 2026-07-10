import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const maxTags = 4;
  const visibleTags = project.techStack.slice(0, maxTags);
  const overflowCount = project.techStack.length - maxTags;

  return (
    <div className="glass-card-subtle glass-hover p-6 flex flex-col h-full">
      {/* Thumbnail Placeholder */}
      <div className="w-full h-40 rounded-glass bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
        <Code2 size={40} className="opacity-30" />
      </div>

      {/* Title */}
      <Link
        href={`/projects/${project.id}`}
        className="text-lg font-semibold hover:opacity-80 transition-opacity mb-2"
      >
        {project.title}
      </Link>

      {/* Description */}
      <p className="text-sm opacity-60 line-clamp-3 mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {visibleTags.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 opacity-70"
          >
            {tech}
          </span>
        ))}
        {overflowCount > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 opacity-50">
            +{overflowCount}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-2 border-t border-black/5 dark:border-white/10">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
        >
          <ExternalLink size={14} /> Live
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
        >
          <Code2 size={14} /> Code
        </a>
      </div>
    </div>
  );
}
