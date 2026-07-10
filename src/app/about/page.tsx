import Timeline from "@/components/Timeline";
import GlassCard from "@/components/GlassCard";

const educationItems = [
  {
    title: "B.S. Computer Science",
    subtitle: "University of Technology",
    date: "2018 - 2022",
    description:
      "Focused on software engineering, algorithms, and distributed systems. Dean's List honors.",
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    subtitle: "Tech Academy",
    date: "2022",
    description:
      "Intensive 16-week program covering modern web development with React, Node.js, and cloud deployment.",
  },
];

const skills = [
  { category: "Frontend", items: "React, Next.js, TypeScript, Tailwind CSS, React Native" },
  { category: "Backend", items: "Node.js, Express, Python, Go, GraphQL" },
  { category: "Database", items: "PostgreSQL, MongoDB, Redis, Prisma" },
  { category: "DevOps", items: "Docker, Kubernetes, AWS, Terraform, CI/CD" },
  { category: "Tools", items: "Git, Figma, VS Code, GitHub Actions, Linux" },
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
            I am a full-stack developer and designer passionate about building modern web experiences.
            With expertise spanning frontend, backend, and infrastructure, I create scalable
            applications that blend beautiful design with robust engineering.
          </p>
          <p className="text-lg opacity-70 leading-relaxed">
            When I am not coding, you can find me exploring new technologies, contributing to open
            source projects, or designing user interfaces that push the boundaries of what is possible
            on the web.
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
