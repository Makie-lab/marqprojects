import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-8"
      >
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="animate-fade-in">
        {/* Title & Category */}
        <div className="mb-6">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 mb-3">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
        </div>

        {/* Description */}
        <p className="text-lg opacity-70 mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-glass font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
          >
            <ExternalLink size={16} /> Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 glass-card font-medium hover:opacity-80 transition-opacity"
          >
            <Code2 size={16} /> Source Code
          </a>
        </div>

        {/* Tech Stack Tags */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Architecture</h2>
          <div className="glass-card p-8 flex items-center justify-center h-64">
            <div className="text-center opacity-40">
              <Code2 size={48} className="mx-auto mb-3" />
              <p className="text-sm">Architecture diagram placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
