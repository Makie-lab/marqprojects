"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { projects, categories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

type SortKey = "recommended" | "az" | "za";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>(initialQuery);
  const [sort, setSort] = useState<SortKey>("recommended");

  const filtered = useMemo(() => {
    let list = projects;

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    if (sort === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [activeCategory, query, sort]);

  return (
    <div className="pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-fade-in mb-8">
          <p className="eyebrow mb-2">Browse</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Projects
          </h1>
          <p className="text-base sm:text-lg opacity-60 max-w-2xl">
            Web apps, publication design, and visual assets. Search or filter to
            explore the collection.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Search projects"
          className="mag-search max-w-3xl mb-6"
        >
          <Search size={18} className="opacity-50 shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tech, or category…"
            aria-label="Search projects"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} className="opacity-60" />
            </button>
          ) : null}
        </form>

        {/* Filter row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Category chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`chip ${
                  activeCategory === cat ? "chip--active" : ""
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-xs opacity-60 inline-flex items-center gap-1"
            >
              <SlidersHorizontal size={14} /> Sort
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none chip pr-8 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Counter */}
        <p className="section-meta mb-5">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {activeCategory !== "All" ? (
            <>
              {" "}
              in{" "}
              <span className="text-foreground font-medium opacity-100">
                {activeCategory}
              </span>
            </>
          ) : null}
          {query ? (
            <>
              {" "}
              matching{" "}
              <span className="text-foreground font-medium opacity-100">
                “{query}”
              </span>
            </>
          ) : null}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-black/10 rounded-2xl">
            <p className="opacity-60 mb-3">
              No projects match your search.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="chip"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center opacity-60">Loading…</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
