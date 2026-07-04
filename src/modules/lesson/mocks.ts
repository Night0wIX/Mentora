import type { Lesson } from "./types";

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "1-1",
    courseId: "1",
    title: "Introduction to Components",
    order: 1,
    isPublished: true,
    contentBlocks: [],
  },
  {
    id: "1-2",
    courseId: "1",
    title: "Props and State",
    order: 2,
    isPublished: false,
    contentBlocks: [],
  },
  {
    id: "1-3",
    courseId: "1",
    title: "Working with Hooks",
    order: 3,
    isPublished: false,
    contentBlocks: [],
  },
  {
    id: "2-1",
    courseId: "2",
    title: "Generics Deep Dive",
    order: 1,
    isPublished: false,
    contentBlocks: [],
  },
];
