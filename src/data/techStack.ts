import { Node, Edge } from "reactflow";

export interface TechNodeData {
  label: string;
  category: "frontend" | "backend" | "devops" | "database" | "tools";
  proficiency: number;
}

export const techNodes: Node<TechNodeData>[] = [
  // Frontend - y: 100
  { id: "react", position: { x: 100, y: 100 }, data: { label: "React", category: "frontend", proficiency: 95 }, type: "techNode" },
  { id: "nextjs", position: { x: 300, y: 100 }, data: { label: "Next.js", category: "frontend", proficiency: 90 }, type: "techNode" },
  { id: "typescript", position: { x: 500, y: 100 }, data: { label: "TypeScript", category: "frontend", proficiency: 92 }, type: "techNode" },
  { id: "tailwind", position: { x: 700, y: 100 }, data: { label: "Tailwind CSS", category: "frontend", proficiency: 88 }, type: "techNode" },
  { id: "reactnative", position: { x: 900, y: 100 }, data: { label: "React Native", category: "frontend", proficiency: 75 }, type: "techNode" },

  // Backend - y: 280
  { id: "nodejs", position: { x: 100, y: 280 }, data: { label: "Node.js", category: "backend", proficiency: 90 }, type: "techNode" },
  { id: "express", position: { x: 300, y: 280 }, data: { label: "Express", category: "backend", proficiency: 88 }, type: "techNode" },
  { id: "python", position: { x: 500, y: 280 }, data: { label: "Python", category: "backend", proficiency: 80 }, type: "techNode" },
  { id: "go", position: { x: 700, y: 280 }, data: { label: "Go", category: "backend", proficiency: 70 }, type: "techNode" },

  // Database - y: 460
  { id: "postgresql", position: { x: 200, y: 460 }, data: { label: "PostgreSQL", category: "database", proficiency: 85 }, type: "techNode" },
  { id: "mongodb", position: { x: 450, y: 460 }, data: { label: "MongoDB", category: "database", proficiency: 80 }, type: "techNode" },
  { id: "redis", position: { x: 700, y: 460 }, data: { label: "Redis", category: "database", proficiency: 78 }, type: "techNode" },

  // DevOps - y: 640
  { id: "docker", position: { x: 100, y: 640 }, data: { label: "Docker", category: "devops", proficiency: 85 }, type: "techNode" },
  { id: "kubernetes", position: { x: 350, y: 640 }, data: { label: "Kubernetes", category: "devops", proficiency: 72 }, type: "techNode" },
  { id: "aws", position: { x: 600, y: 640 }, data: { label: "AWS", category: "devops", proficiency: 80 }, type: "techNode" },
  { id: "githubactions", position: { x: 850, y: 640 }, data: { label: "GitHub Actions", category: "devops", proficiency: 88 }, type: "techNode" },

  // Tools - y: 820
  { id: "git", position: { x: 250, y: 820 }, data: { label: "Git", category: "tools", proficiency: 95 }, type: "techNode" },
  { id: "figma", position: { x: 550, y: 820 }, data: { label: "Figma", category: "tools", proficiency: 70 }, type: "techNode" },
];

export const techEdges: Edge[] = [
  { id: "e-react-nextjs", source: "react", target: "nextjs", animated: true },
  { id: "e-nextjs-ts", source: "nextjs", target: "typescript" },
  { id: "e-ts-tailwind", source: "typescript", target: "tailwind" },
  { id: "e-react-rn", source: "react", target: "reactnative" },
  { id: "e-nextjs-nodejs", source: "nextjs", target: "nodejs", animated: true },
  { id: "e-nodejs-express", source: "nodejs", target: "express" },
  { id: "e-nodejs-python", source: "nodejs", target: "python" },
  { id: "e-express-go", source: "express", target: "go" },
  { id: "e-nodejs-pg", source: "nodejs", target: "postgresql", animated: true },
  { id: "e-express-mongo", source: "express", target: "mongodb" },
  { id: "e-nodejs-redis", source: "nodejs", target: "redis" },
  { id: "e-docker-k8s", source: "docker", target: "kubernetes", animated: true },
  { id: "e-k8s-aws", source: "kubernetes", target: "aws" },
  { id: "e-docker-ga", source: "docker", target: "githubactions" },
  { id: "e-git-ga", source: "git", target: "githubactions", animated: true },
  { id: "e-pg-docker", source: "postgresql", target: "docker" },
  { id: "e-mongo-docker", source: "mongodb", target: "docker" },
  { id: "e-redis-docker", source: "redis", target: "docker" },
];
