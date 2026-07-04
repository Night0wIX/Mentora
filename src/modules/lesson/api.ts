import { MOCK_LESSONS } from "./mocks";
import type { Lesson } from "./types";

const MOCK_DELAY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPublishedLessons(courseId: string): Promise<Lesson[]> {
  await delay(MOCK_DELAY_MS);

  return MOCK_LESSONS.filter(
    (lesson) => lesson.courseId === courseId && lesson.isPublished,
  ).sort((a, b) => a.order - b.order);
}

export async function getPublishedLesson(
  courseId: string,
  lessonId: string,
): Promise<Lesson | null> {
  await delay(MOCK_DELAY_MS);

  return (
    MOCK_LESSONS.find(
      (lesson) =>
        lesson.courseId === courseId &&
        lesson.id === lessonId &&
        lesson.isPublished,
    ) ?? null
  );
}
