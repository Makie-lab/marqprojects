export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  thumbnail: string;
}

export const projects: Project[] = [
  {
    id: "cafe-marahuyo-pos",
    title: "Cafe Marahuyo Inventory and POS System",
    description:
      "A point-of-sale and inventory management system built for Cafe Marahuyo. Features include order tracking, inventory monitoring, sales reports, and receipt generation.",
    category: "Web App",
    techStack: ["HTML", "CSS", "JavaScript", "Python", "SQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/cafe-marahuyo-pos",
    thumbnail: "/placeholder-cafe.png",
  },
  {
    id: "spotcheck-parking",
    title: "SpotCheck - Parking Management System",
    description:
      "A parking management system that helps monitor available parking spots, track vehicle entries/exits, and generate usage reports.",
    category: "Web App",
    techStack: ["HTML", "CSS", "JavaScript", "C#", "SQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/spotcheck",
    thumbnail: "/placeholder-spotcheck.png",
  },
  {
    id: "side-quest-tasks",
    title: "Side Quest - Task Management System",
    description:
      "A task management application designed for students to organize academic tasks, set deadlines, track progress, and prioritize assignments.",
    category: "Web App",
    techStack: ["HTML", "CSS", "JavaScript", "Python", "SQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/side-quest",
    thumbnail: "/placeholder-sidequest.png",
  },
];

export const categories = ["All", "Web App"];
