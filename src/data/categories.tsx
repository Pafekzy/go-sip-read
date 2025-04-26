
import { Code, Database, Layers } from "lucide-react";
import type { Category } from "@/types/groups";

export const categories: Category[] = [
  {
    id: "frontend",
    name: "Front-End Developers",
    icon: <Code className="h-5 w-5 animate-fade-in" />,
    description: "Focus on UI/UX, React, and modern web technologies",
    subcategories: [
      {
        id: "fe-react",
        name: "React",
        groups: [
          { id: "fe-react-1", name: "FED-Modern React with Hooks", prefix: "FED", description: "Learn modern React development with hooks and context", memberCount: 42 },
          { id: "fe-react-2", name: "FED-React Performance Masters", prefix: "FED", description: "Optimize your React applications for speed", memberCount: 28 },
        ]
      },
      {
        id: "fe-ui",
        name: "UI/UX Design",
        groups: [
          { id: "fe-ui-1", name: "FED-Design Systems", prefix: "FED", description: "Create consistent design systems for apps", memberCount: 35 },
          { id: "fe-ui-2", name: "FED-Accessibility Champions", prefix: "FED", description: "Making the web accessible for everyone", memberCount: 23 },
        ]
      },
    ]
  },
  {
    id: "backend",
    name: "Back-End Developers",
    icon: <Database className="h-5 w-5 animate-fade-in" />,
    description: "Master databases, APIs, and server architecture",
    subcategories: [
      {
        id: "be-node",
        name: "Node.js",
        groups: [
          { id: "be-node-1", name: "BED-Express API Masters", prefix: "BED", description: "Build robust APIs with Express", memberCount: 38 },
          { id: "be-node-2", name: "BED-Node Performance", prefix: "BED", description: "Optimize Node.js applications", memberCount: 25 },
        ]
      },
      {
        id: "be-db",
        name: "Databases",
        groups: [
          { id: "be-db-1", name: "BED-SQL Wizards", prefix: "BED", description: "Master SQL databases and queries", memberCount: 32 },
          { id: "be-db-2", name: "BED-NoSQL Experts", prefix: "BED", description: "Learn MongoDB, Redis and more", memberCount: 21 },
        ]
      },
    ]
  },
  {
    id: "fullstack",
    name: "Full Stack Developers",
    icon: <Layers className="h-5 w-5 animate-fade-in" />,
    description: "Learn both front-end and back-end development",
    subcategories: [
      {
        id: "fs-mern",
        name: "MERN Stack",
        groups: [
          { id: "fs-mern-1", name: "FSD-MERN Masters", prefix: "FSD", description: "Full stack development with MERN", memberCount: 45 },
          { id: "fs-mern-2", name: "FSD-MERN Auth Patterns", prefix: "FSD", description: "Authentication strategies for MERN apps", memberCount: 31 },
        ]
      },
      {
        id: "fs-jamstack",
        name: "JAMstack",
        groups: [
          { id: "fs-jam-1", name: "FSD-Next.js Projects", prefix: "FSD", description: "Building with Next.js and headless CMS", memberCount: 33 },
          { id: "fs-jam-2", name: "FSD-Static Site Generators", prefix: "FSD", description: "Fast sites with SSGs and APIs", memberCount: 27 },
        ]
      },
    ]
  }
];
