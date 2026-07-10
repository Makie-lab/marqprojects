"use client";

import TechStackFlow from "@/components/TechStackFlow";

const legend = [
  { label: "Frontend", color: "bg-blue-500" },
  { label: "Backend", color: "bg-green-500" },
  { label: "DevOps", color: "bg-orange-500" },
  { label: "Database", color: "bg-purple-500" },
  { label: "Tools", color: "bg-pink-500" },
];

export default function TechStackPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Tech Stack</h1>
        <p className="text-lg opacity-60">
          An interactive visualization of the technologies I work with.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm opacity-70">{item.label}</span>
          </div>
        ))}
      </div>

      {/* React Flow Diagram */}
      <TechStackFlow />
    </div>
  );
}
