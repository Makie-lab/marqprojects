"use client";

import { Liquid } from "liquid-gooey";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

interface LiquidProjectsGridProps {
  projects: Project[];
}

export default function LiquidProjectsGrid({ projects }: LiquidProjectsGridProps) {
  return (
    <Liquid
      blur={10}
      contrast={20}
      fill="var(--foreground)"
      shadow="0 4px 24px rgba(0,0,0,0.10)"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <Liquid.Item
          key={project.id}
          morph={{ bounce: 0.4, speed: 1.2 }}
          transition="smooth"
        >
          <ProjectCard project={project} />
        </Liquid.Item>
      ))}
    </Liquid>
  );
}
