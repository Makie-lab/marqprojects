"use client";

import { useState } from "react";
import { projects, categories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Projects</h1>
        <p className="text-lg opacity-60">
          A collection of work spanning web apps, mobile, APIs, and infrastructure.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              activeCategory === category
                ? "bg-foreground text-background"
                : "glass-card hover:opacity-80"
            }`}
            style={
              activeCategory === category
                ? { backgroundColor: "var(--foreground)", color: "var(--background)" }
                : undefined
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
