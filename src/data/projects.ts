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
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, shopping cart, checkout with Stripe integration, and admin dashboard for inventory management.",
    category: "Web App",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/ecommerce",
    thumbnail: "/placeholder-ecommerce.png",
  },
  {
    id: "fitness-tracker-app",
    title: "Fitness Tracker App",
    description:
      "A cross-platform mobile fitness application with workout tracking, progress visualization, social features, and personalized training plans powered by machine learning.",
    category: "Mobile",
    techStack: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/fitness",
    thumbnail: "/placeholder-fitness.png",
  },
  {
    id: "ai-content-api",
    title: "AI Content API",
    description:
      "A RESTful API service that leverages OpenAI to generate, summarize, and transform content. Features rate limiting, caching with Redis, and comprehensive Swagger documentation.",
    category: "API",
    techStack: ["Node.js", "Express", "OpenAI", "Redis", "Docker", "Swagger"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/ai-content",
    thumbnail: "/placeholder-api.png",
  },
  {
    id: "cicd-pipeline-orchestrator",
    title: "CI/CD Pipeline Orchestrator",
    description:
      "An infrastructure-as-code solution for orchestrating multi-environment deployments with automated testing, rollback capabilities, and real-time monitoring dashboards.",
    category: "DevOps",
    techStack: ["Kubernetes", "Terraform", "GitHub Actions", "Docker", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/cicd",
    thumbnail: "/placeholder-devops.png",
  },
  {
    id: "social-analytics-dashboard",
    title: "Social Analytics Dashboard",
    description:
      "A real-time analytics dashboard for social media metrics with interactive D3.js charts, WebSocket live updates, and exportable reports for marketing teams.",
    category: "Web App",
    techStack: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/analytics",
    thumbnail: "/placeholder-analytics.png",
  },
  {
    id: "notification-microservice",
    title: "Notification Microservice",
    description:
      "A high-performance microservice handling multi-channel notifications (email, SMS, push) with message queuing, delivery tracking, and template management.",
    category: "API",
    techStack: ["Go", "gRPC", "RabbitMQ", "PostgreSQL", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marq/notifications",
    thumbnail: "/placeholder-notification.png",
  },
];

export const categories = ["All", "Web App", "Mobile", "API", "DevOps"];
