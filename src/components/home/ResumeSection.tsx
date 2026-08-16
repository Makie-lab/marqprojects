import GlassCard from "@/components/GlassCard";
import Timeline from "@/components/Timeline";
import {
  education,
  organizations,
  skillGroups,
} from "@/data/resume";
import { Download } from "lucide-react";

export default function ResumeSection() {
  const educationTimeline = education.map((edu) => ({
    title: `${edu.degree} in ${edu.field}`,
    subtitle: edu.institution,
    date: `${edu.startDate} - ${edu.endDate}`,
    description: edu.description,
  }));

  return (
    <section
      id="resume"
      aria-label="Resume"
      className="section-scroll max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
        <div>
          <p className="eyebrow mb-2">Background</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Resume
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-glass font-medium text-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
          style={{
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          <Download size={16} /> Download PDF
        </a>
      </div>

      {/* Education timeline */}
      <div className="mb-14">
        <h3 className="text-xl font-bold mb-6">Education</h3>
        <Timeline items={educationTimeline} />
      </div>

      {/* Organizations */}
      <div className="mb-14">
        <h3 className="text-xl font-bold mb-6">Organizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organizations.map((org, i) => (
            <GlassCard key={i} className="p-5">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="font-semibold text-sm leading-tight">
                  {org.role}
                </h4>
                <span className="text-xs opacity-50 whitespace-nowrap">
                  {org.startDate}
                </span>
              </div>
              <p className="text-xs font-medium opacity-70 mb-2">
                {org.organization}
              </p>
              <p className="text-xs opacity-60 line-clamp-3">
                {org.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-xl font-bold mb-6">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <GlassCard key={group.category} className="p-5">
              <h4 className="font-semibold mb-3 text-sm">{group.category}</h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip chip--sm">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
