"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/shared/config";

import { MOCK_LESSONS } from "./mocks";
import type {
  CreateLessonActionResult,
  CreateLessonPayload,
  DeleteLessonActionResult,
  LessonContentBlock,
  ReorderedLesson,
  ReorderLessonsActionResult,
  UpdateLessonActionResult,
  UpdateLessonContentActionResult,
  UpdateLessonPayload,
  UploadLessonFileActionResult,
} from "./types";

function revalidateCoursePage(courseId: string): void {
  revalidatePath(ROUTES.adminCourse(courseId));
}

function revalidateLessonPage(courseId: string, lessonId: string): void {
  revalidatePath(ROUTES.adminLesson(courseId, lessonId));
}

export async function createLessonAction(
  payload: CreateLessonPayload,
): Promise<CreateLessonActionResult> {
  const lesson = {
    id: crypto.randomUUID(),
    courseId: payload.courseId,
    title: payload.title,
    order:
      MOCK_LESSONS.filter((item) => item.courseId === payload.courseId).length +
      1,
    isPublished: false,
    contentBlocks: [],
  };

  MOCK_LESSONS.push(lesson); // 👈 додаємо в "БД"

  revalidateCoursePage(payload.courseId);

  return { success: true, lesson };
}

export async function updateLessonAction(
  courseId: string,
  lessonId: string,
  payload: UpdateLessonPayload,
): Promise<UpdateLessonActionResult> {
  const index = MOCK_LESSONS.findIndex((item) => item.id === lessonId);

  if (index === -1) {
    return { success: false, error: "Lesson not found." };
  }

  const lesson = { ...MOCK_LESSONS[index], title: payload.title };
  MOCK_LESSONS[index] = lesson; // 👈 записуємо оновлення назад

  revalidateCoursePage(courseId);

  return { success: true, lesson };
}

export async function updateLessonContentAction(
  courseId: string,
  lessonId: string,
  contentBlocks: LessonContentBlock[],
): Promise<UpdateLessonContentActionResult> {
  const index = MOCK_LESSONS.findIndex((item) => item.id === lessonId);

  if (index === -1) {
    return { success: false, error: "Lesson not found." };
  }

  const lesson = { ...MOCK_LESSONS[index], contentBlocks, isPublished: true };
  MOCK_LESSONS[index] = lesson; // 👈 записуємо оновлення назад

  revalidateCoursePage(courseId);
  revalidateLessonPage(courseId, lessonId);

  return { success: true, lesson };
}

export async function deleteLessonAction(
  courseId: string,
  lessonId: string,
): Promise<DeleteLessonActionResult> {
  const index = MOCK_LESSONS.findIndex((item) => item.id === lessonId);

  if (index !== -1) {
    MOCK_LESSONS.splice(index, 1); // 👈 видаляємо
  }

  revalidateCoursePage(courseId);

  return { success: true };
}

export async function reorderLessonsAction(
  courseId: string,
  reorderedLessons: ReorderedLesson[],
): Promise<ReorderLessonsActionResult> {
  for (const { lessonId, order } of reorderedLessons) {
    const lesson = MOCK_LESSONS.find((item) => item.id === lessonId);
    if (lesson) lesson.order = order; // 👈 застосовуємо новий порядок
  }

  revalidateCoursePage(courseId);

  return { success: true };
}

export async function uploadLessonFileAction(
  formData: FormData,
): Promise<UploadLessonFileActionResult> {
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { success: false, error: "No file was provided." };
  }

  // TODO: integrate with real storage (S3, Cloudinary, Vercel Blob, etc.)
  return {
    success: false,
    error: "File uploads aren't connected yet — paste a URL instead.",
  };
}
