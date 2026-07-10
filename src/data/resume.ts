export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export const education: Education[] = [
  {
    institution: "University of Technology",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2018",
    endDate: "2022",
    description:
      "Focused on software engineering, algorithms, and distributed systems. Dean's List honors. Senior capstone project on real-time collaborative editing.",
  },
  {
    institution: "Tech Academy",
    degree: "Certificate",
    field: "Full-Stack Web Development Bootcamp",
    startDate: "2022",
    endDate: "2022",
    description:
      "Intensive 16-week program covering modern web development with React, Node.js, databases, and cloud deployment. Built 5 production-ready applications.",
  },
];

export const experience: Experience[] = [
  {
    company: "TechCorp Inc.",
    title: "Senior Full-Stack Developer",
    startDate: "2023",
    endDate: "Present",
    description:
      "Lead developer on the core platform team, architecting and building scalable web applications serving 100k+ users.",
    highlights: [
      "Architected microservices migration reducing response times by 40%",
      "Led team of 4 developers on flagship product redesign",
      "Implemented CI/CD pipeline reducing deployment time from hours to minutes",
    ],
  },
  {
    company: "StartupXYZ",
    title: "Full-Stack Developer",
    startDate: "2022",
    endDate: "2023",
    description:
      "Built and maintained multiple client-facing applications using React, Node.js, and PostgreSQL in a fast-paced startup environment.",
    highlights: [
      "Developed real-time dashboard used by 50+ enterprise clients",
      "Reduced API response times by 60% through query optimization",
      "Mentored 2 junior developers on best practices",
    ],
  },
  {
    company: "Digital Agency Co.",
    title: "Software Engineering Intern",
    startDate: "2021",
    endDate: "2022",
    description:
      "Contributed to client projects across various industries, gaining experience in full lifecycle development from design to deployment.",
    highlights: [
      "Built responsive landing pages for 10+ client projects",
      "Developed internal tooling that saved 20 hours/week of manual work",
      "Participated in code reviews and agile ceremonies",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "HTML/CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Go", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "SQL"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Vercel"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub Actions", "Figma", "VS Code", "Linux", "Jira"],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2023",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
  },
  {
    name: "Certified Kubernetes Application Developer",
    issuer: "CNCF",
    date: "2024",
  },
];
