import Timeline from "@/components/Timeline";
import GlassCard from "@/components/GlassCard";

const educationItems = [
  {
    title: "B.S. Information Technology",
    subtitle: "Polytechnic University of the Philippines Quezon City Campus",
    date: "2024 - Present",
    description:
      "Currently a 2nd year BS IT student. Active in student organizations and leadership roles.",
  },
  {
    title: "Senior High School",
    subtitle: "Antipolo City National Science and Technology High School",
    date: "2022 - 2024",
    description:
      "Completed senior high school education with a focus on science and technology.",
  },
];

const skills = [
  { category: "Design", items: "Canva, Figma, UI/UX Design, Publication Design" },
  { category: "Programming", items: "Python, C, C#, SQL" },
  { category: "Web Development", items: "HTML, CSS, JavaScript" },
  { category: "Tools", items: "Git, GitHub, VS Code" },
  { category: "Other", items: "Team Leadership, Creative Problem-Solving" },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Bio Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-16 animate-fade-in">
        {/* Avatar Placeholder */}
        <div className="w-32 h-32 rounded-full glass-card flex items-center justify-center flex-shrink-0">
          <div className="text-center font-black text-xl leading-none">
            <div>MA</div>
            <div>RQ</div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg opacity-70 leading-relaxed mb-4">
            I am an Information Technology student at PUP Quezon City with experience in UI/UX
            design, publication materials, and student leadership. Skilled in Canva, Figma, and
            front-end development, with a strong interest in software development and creative
            problem-solving.
          </p>
          <p className="text-lg opacity-70 leading-relaxed">
            Outside of academics, I actively contribute to student organizations as a graphic
            designer, layout designer, and auditor. I enjoy creating visual assets and publication
            materials that communicate ideas effectively.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <GlassCard key={skill.category} className="p-4">
              <h3 className="font-semibold mb-2">{skill.category}</h3>
              <p className="text-sm opacity-60">{skill.items}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Education Timeline */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <Timeline items={educationItems} />
      </div>
    </div>
  );
}
