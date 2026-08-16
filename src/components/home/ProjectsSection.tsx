"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects, categories } from "@/data/projects";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-scroll max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Selected work</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
        </div>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
        >
          Work with me <ArrowRight size={14} />
        </a>
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`chip ${activeCategory === cat ? "chip--active" : ""}`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
