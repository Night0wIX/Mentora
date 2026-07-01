import type { Course } from "./types";

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    slug: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Learn the core concepts of React including components, props, state, and hooks. Perfect for developers who want to build modern web applications.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Large-Scale Applications",
    description:
      "Deep dive into TypeScript generics, conditional types, mapped types, and design patterns used in enterprise projects.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-02-03T14:15:00Z",
  },
  {
    id: "3",
    slug: "nodejs-rest-api",
    title: "Building REST APIs with Node.js",
    description:
      "Build production-ready REST APIs using Node.js, Express, and PostgreSQL.",
    coverImageUrl: null,
    status: "published",
    createdAt: "2024-02-20T10:45:00Z",
  },
  {
    id: "4",
    slug: "css-layout-mastery",
    title: "CSS Layout Mastery: Flexbox & Grid",
    description:
      "Master modern CSS layout techniques with Flexbox and Grid through practical projects.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-03-01T09:20:00Z",
  },
  {
    id: "5",
    slug: "nextjs-fullstack",
    title: "Full-Stack Development with Next.js",
    description:
      "Build full-stack applications with Next.js App Router, Server Components, Server Actions, and modern data fetching patterns.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-03-14T16:30:00Z",
  },
  {
    id: "6",
    slug: "python-data-science",
    title: "Python for Data Science",
    description: null,
    coverImageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-03-22T11:00:00Z",
  },
  {
    id: "7",
    slug: "system-design-interviews",
    title:
      "System Design Interview Preparation: Scalable Distributed Systems from Zero to Production",
    description:
      "Comprehensive preparation for system design interviews. Covers distributed systems, databases, caching, message queues, and real-world architecture decisions.",
    coverImageUrl: null,
    status: "published",
    createdAt: "2024-04-05T13:45:00Z",
  },
  {
    id: "8",
    slug: "docker-kubernetes",
    title: "Docker & Kubernetes in Practice",
    description:
      "Containerize applications with Docker and orchestrate them with Kubernetes in production environments.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-04-18T10:15:00Z",
  },
  {
    id: "9",
    slug: "graphql-api-design",
    title: "GraphQL API Design",
    description:
      "Design and implement GraphQL APIs with schema-first approach, resolvers, and performance optimization.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-05-02T15:30:00Z",
  },
  {
    id: "10",
    slug: "web-accessibility",
    title: "Web Accessibility (A11y) in Practice",
    description:
      "Build inclusive web applications that work for everyone, including users with disabilities.",
    coverImageUrl: null,
    status: "published",
    createdAt: "2024-05-20T09:00:00Z",
  },
  {
    id: "11",
    slug: "algorithms-data-structures",
    title: "Algorithms & Data Structures",
    description:
      "Essential algorithms and data structures for software engineers. Covers sorting, searching, graphs, trees, and dynamic programming.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-06-08T12:30:00Z",
  },
  {
    id: "12",
    slug: "git-workflow",
    title: "Git & Team Workflow",
    description:
      "Learn Git branching strategies, code review workflows, and collaboration patterns used in professional teams.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-06-25T14:00:00Z",
  },
  {
    id: "13",
    slug: "react-performance",
    title: "React Performance Optimization",
    description:
      "Profile and optimize React applications using memoization, code splitting, virtualization, and concurrent features.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-07-10T11:20:00Z",
  },
  {
    id: "14",
    slug: "sql-databases",
    title: "SQL & Relational Databases",
    description:
      "Master SQL from basics to advanced query optimization, indexing strategies, and database design.",
    coverImageUrl: null,
    status: "published",
    createdAt: "2024-07-28T10:30:00Z",
  },
  {
    id: "15",
    slug: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    description:
      "Get started with AWS cloud services: compute, storage, networking, security, and cost management fundamentals.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    status: "published",
    createdAt: "2024-08-15T08:45:00Z",
  },
  {
    id: "16",
    slug: "testing-react-apps",
    title: "Testing React Applications",
    description:
      "Write reliable tests for React apps using Vitest, React Testing Library, and Playwright for end-to-end coverage.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop",
    status: "draft",
    createdAt: "2024-09-02T13:15:00Z",
  },
  {
    id: "17",
    slug: "ux-for-developers",
    title: "UX Design Principles for Developers",
    description:
      "Understand UX design fundamentals to build better products: typography, color, hierarchy, and user flows.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    status: "draft",
    createdAt: "2024-09-18T15:45:00Z",
  },
];
