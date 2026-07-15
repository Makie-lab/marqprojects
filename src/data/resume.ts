export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Organization {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ClassroomOfficer {
  position: string;
  period: string;
  semester: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const education: Education[] = [
  {
    institution: "Polytechnic University of the Philippines Quezon City Campus",
    degree: "Bachelor of Science",
    field: "Information Technology",
    startDate: "2024",
    endDate: "Present",
    description:
      "Currently a 2nd year BS IT student. Active in student organizations and leadership roles.",
  },
  {
    institution: "Antipolo City National Science and Technology High School",
    degree: "Senior High School",
    field: "Science and Technology",
    startDate: "2022",
    endDate: "2024",
    description:
      "Completed senior high school education with a focus on science and technology.",
  },
];

export const organizations: Organization[] = [
  {
    organization: "PUP QC - Commonwealth Information Technology Society",
    role: "Creatives Committee",
    startDate: "September 2024",
    endDate: "June 2025",
    description:
      "Tasked to create publication materials for the Facebook page through Canva.",
  },
  {
    organization: "Google Developer Groups on Campus PUP",
    role: "Graphic Designer",
    startDate: "September 2025",
    endDate: "June 2026",
    description:
      "Designed and published promotional materials using Canva and Figma for organizational events and announcements.",
  },
  {
    organization: "PUP QC - Commonwealth Information Technology Society",
    role: "Auditor",
    startDate: "September 2025",
    endDate: "June 2026",
    description:
      "Assisted in auditing financial transactions and collaborated with various student organizations to ensure accurate financial records.",
  },
  {
    organization: "Vox Nova",
    role: "Layout Designer",
    startDate: "September 2025",
    endDate: "June 2026",
    description:
      "Tasked to create publication materials through Canva, an independent student organization towards political works inside the campus.",
  },
  {
    organization: "Siklaw",
    role: "Layout Designer",
    startDate: "September 2025",
    endDate: "June 2026",
    description:
      "Created visual assets through Canva and Figma.",
  },
  {
    organization: "Office of Cultural Affairs",
    role: "Creatives Committee",
    startDate: "September 2025",
    endDate: "Present",
    description:
      "Created visual assets through Canva.",
  },
];

export const classroomOfficer: ClassroomOfficer[] = [
  {
    position: "Public Information Officer",
    period: "September 2024 - February 2025",
    semester: "1st Year, 1st Semester",
  },
  {
    position: "President",
    period: "February 2025 - June 2025",
    semester: "1st Year, 2nd Semester",
  },
  {
    position: "Vice President Internal",
    period: "September 2025 - June 2026",
    semester: "2nd Year, 1st Semester to 2nd Semester",
  },
];

export const projects: Project[] = [
  {
    name: "Cafe Marahuyo Inventory and POS System",
    description: "An inventory management and point-of-sale system for a cafe business.",
  },
  {
    name: "SpotCheck - Parking Management System",
    description: "A parking management system for monitoring and managing parking spaces.",
  },
  {
    name: "Side Quest - Task Management System",
    description: "A task management application for organizing and tracking tasks.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Design",
    skills: ["Canva", "Figma", "UI/UX Design", "Publication Design"],
  },
  {
    category: "Programming",
    skills: ["Python", "C", "C#", "SQL"],
  },
  {
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
  },
  {
    category: "Other",
    skills: ["Team Leadership", "Publication Design", "Creative Problem-Solving"],
  },
];
