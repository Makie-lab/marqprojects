export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
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
  {
    id: "cits-facebook-materials",
    title: "CITS Facebook Page Materials",
    description:
      "Publication materials created for the PUP QC Commonwealth Information Technology Society Facebook page. Includes event posters, announcements, and social media graphics.",
    category: "Visual Assets",
    techStack: ["Canva"],
    thumbnail: "/placeholder-cits.png",
  },
  {
    id: "gdg-pup-promotional",
    title: "GDG on Campus PUP Promotional Materials",
    description:
      "Promotional posters and event graphics designed for Google Developer Groups on Campus PUP.",
    category: "Visual Assets",
    techStack: ["Canva", "Figma"],
    thumbnail: "/placeholder-gdg.png",
  },
  {
    id: "vox-nova-publications",
    title: "Vox Nova Publication Materials",
    description:
      "Publication materials for Vox Nova, an independent student organization focused on political works inside the campus.",
    category: "Visual Assets",
    techStack: ["Canva"],
    thumbnail: "/placeholder-voxnova.png",
  },
  {
    id: "siklaw-visual-assets",
    title: "Siklaw Visual Assets",
    description:
      "Visual assets and publication materials created for Siklaw organization.",
    category: "Visual Assets",
    techStack: ["Canva", "Figma"],
    thumbnail: "/placeholder-siklaw.png",
  },
  {
    id: "office-cultural-affairs-graphics",
    title: "Office of Cultural Affairs Graphics",
    description:
      "Visual assets created for the Office of Cultural Affairs events and announcements.",
    category: "Visual Assets",
    techStack: ["Canva"],
    thumbnail: "/placeholder-oca.png",
  },
];

export const categories = ["All", "Web App", "Visual Assets"];
