"use client";

import dynamic from "next/dynamic";

// TechStackFlow uses reactflow which requires window; load client-only.
const TechStackFlow = dynamic(() => import("@/components/TechStackFlow"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-glass-lg border border-white/10 flex items-center justify-center opacity-40">
      Loading tech stack…
    </div>
  ),
});

const legend = [
  { label: "Frontend", color: "bg-blue-500" },
  { label: "Backend", color: "bg-green-500" },
  { label: "DevOps", color: "bg-orange-500" },
  { label: "Database", color: "bg-purple-500" },
  { label: "Tools", color: "bg-pink-500" },
];

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      aria-label="Tech stack"
      className="section-scroll max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="mb-8">
        <p className="eyebrow mb-2">Tools of the trade</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Tech Stack
        </h2>
        <p className="text-base sm:text-lg opacity-60 max-w-2xl">
          An interactive map of the technologies I use to design and build.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm opacity-70">{item.label}</span>
          </div>
        ))}
      </div>

      <TechStackFlow />
    </section>
  );
}
