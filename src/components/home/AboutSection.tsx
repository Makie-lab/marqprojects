import GlassCard from "@/components/GlassCard";

const skills = [
  { category: "Design", items: "Canva, Figma, UI/UX Design, Publication Design" },
  { category: "Programming", items: "Python, C, C#, SQL" },
  { category: "Web Development", items: "HTML, CSS, JavaScript" },
  { category: "Tools", items: "Git, GitHub, VS Code" },
  { category: "Other", items: "Team Leadership, Creative Problem-Solving" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="section-scroll max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="mb-10">
        <p className="eyebrow mb-2">About</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          A little about me
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 mb-14">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full glass-card flex items-center justify-center flex-shrink-0">
          <div className="text-center font-black text-xl leading-none">
            <div>MA</div>
            <div>RQ</div>
          </div>
        </div>

        <div>
          <p className="text-lg opacity-70 leading-relaxed mb-4">
            I am an Information Technology student at PUP Quezon City with
            experience in UI/UX design, publication materials, and student
            leadership. Skilled in Canva, Figma, and front-end development,
            with a strong interest in software development and creative
            problem-solving.
          </p>
          <p className="text-lg opacity-70 leading-relaxed">
            Outside of academics, I actively contribute to student
            organizations as a graphic and layout designer. I enjoy creating
            visual assets and publication materials that communicate ideas
            effectively.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <GlassCard key={skill.category} className="p-4">
              <h4 className="font-semibold mb-2">{skill.category}</h4>
              <p className="text-sm opacity-60">{skill.items}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
