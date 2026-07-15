import { Node, Edge } from "reactflow";

export interface TechNodeData {
  label: string;
  category: "frontend" | "backend" | "devops" | "database" | "tools";
  proficiency: number;
}

export const techNodes: Node<TechNodeData>[] = [
  // Design - y: 100
  { id: "canva", position: { x: 250, y: 100 }, data: { label: "Canva", category: "tools", proficiency: 85 }, type: "techNode" },
  { id: "figma", position: { x: 550, y: 100 }, data: { label: "Figma", category: "tools", proficiency: 75 }, type: "techNode" },

  // Programming - y: 280
  { id: "python", position: { x: 100, y: 280 }, data: { label: "Python", category: "backend", proficiency: 85 }, type: "techNode" },
  { id: "c", position: { x: 325, y: 280 }, data: { label: "C", category: "backend", proficiency: 80 }, type: "techNode" },
  { id: "csharp", position: { x: 550, y: 280 }, data: { label: "C#", category: "backend", proficiency: 80 }, type: "techNode" },
  { id: "sql", position: { x: 775, y: 280 }, data: { label: "SQL", category: "database", proficiency: 85 }, type: "techNode" },

  // Web - y: 460
  { id: "html", position: { x: 150, y: 460 }, data: { label: "HTML", category: "frontend", proficiency: 90 }, type: "techNode" },
  { id: "css", position: { x: 400, y: 460 }, data: { label: "CSS", category: "frontend", proficiency: 88 }, type: "techNode" },
  { id: "javascript", position: { x: 650, y: 460 }, data: { label: "JavaScript", category: "frontend", proficiency: 88 }, type: "techNode" },

  // Tools - y: 640
  { id: "git", position: { x: 150, y: 640 }, data: { label: "Git", category: "tools", proficiency: 90 }, type: "techNode" },
  { id: "github", position: { x: 400, y: 640 }, data: { label: "GitHub", category: "tools", proficiency: 88 }, type: "techNode" },
  { id: "vscode", position: { x: 650, y: 640 }, data: { label: "VS Code", category: "tools", proficiency: 92 }, type: "techNode" },
];

export const techEdges: Edge[] = [
  // Design connections
  { id: "e-canva-figma", source: "canva", target: "figma" },

  // Programming connections
  { id: "e-python-c", source: "python", target: "c" },
  { id: "e-c-csharp", source: "c", target: "csharp" },
  { id: "e-csharp-sql", source: "csharp", target: "sql" },
  { id: "e-python-sql", source: "python", target: "sql", animated: true },

  // Web connections
  { id: "e-html-css", source: "html", target: "css", animated: true },
  { id: "e-css-js", source: "css", target: "javascript" },

  // Cross-category connections
  { id: "e-js-python", source: "javascript", target: "python", animated: true },
  { id: "e-figma-html", source: "figma", target: "html", animated: true },
  { id: "e-git-github", source: "git", target: "github", animated: true },
  { id: "e-github-vscode", source: "github", target: "vscode" },
];
