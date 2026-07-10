import GlassCard from "@/components/GlassCard";
import { education, experience, skillGroups, certifications } from "@/data/resume";
import { Download, Award } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 animate-fade-in">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Resume</h1>
          <p className="text-lg opacity-60">My professional background and qualifications.</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 mt-4 sm:mt-0 px-6 py-2.5 rounded-glass font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
        >
          <Download size={16} /> Download PDF
        </a>
      </div>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        <div className="space-y-4">
          {experience.map((exp, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <span className="text-sm opacity-50">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm font-medium opacity-70 mb-3">{exp.company}</p>
              <p className="text-sm opacity-60 mb-3">{exp.description}</p>
              <ul className="space-y-1">
                {exp.highlights.map((highlight, j) => (
                  <li key={j} className="text-sm opacity-60 flex items-start gap-2">
                    <span className="text-xs mt-1.5 block w-1 h-1 rounded-full bg-current opacity-40 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-sm opacity-50">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-sm font-medium opacity-70 mb-2">{edu.institution}</p>
              <p className="text-sm opacity-60">{edu.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <GlassCard key={group.category} className="p-5">
              <h3 className="font-semibold mb-2">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Certifications</h2>
        <div className="space-y-3">
          {certifications.map((cert, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <Award size={20} className="opacity-60 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm opacity-50">
                  {cert.issuer} - {cert.date}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
