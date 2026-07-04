import { MOCK_LESSONS } from "./mocks";
import type { Lesson } from "./types";

const ADMIN_API_DELAY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAdminLessons(courseId: string): Promise<Lesson[]> {
  await delay(ADMIN_API_DELAY_MS);

  return MOCK_LESSONS.filter((lesson) => lesson.courseId === courseId).sort(
    (a, b) => a.order - b.order,
  );
}

export async function getAdminLesson(
  courseId: string,
  lessonId: string,
): Promise<Lesson | null> {
  await delay(ADMIN_API_DELAY_MS);

  return (
    MOCK_LESSONS.find(
      (lesson) => lesson.courseId === courseId && lesson.id === lessonId,
    ) ?? null
  );
}
