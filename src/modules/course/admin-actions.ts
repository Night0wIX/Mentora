"use server";

import { revalidatePath } from "next/cache";

import { MOCK_COURSES } from "./mocks";
import type { Course, CourseStatus } from "./types";

const ADMIN_ACTION_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateUniqueSlug(title: string): string {
  const baseSlug = slugify(title) || "course";
  let candidateSlug = baseSlug;
  let suffix = 2;

  while (MOCK_COURSES.some((course) => course.slug === candidateSlug)) {
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidateSlug;
}

export interface CreateCoursePayload {
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  status: CourseStatus;
}

export type UpdateCoursePayload = Partial<CreateCoursePayload>;

interface DeleteCourseResult {
  success: boolean;
}

type CourseMutationResult =
  | { success: true; course: Course }
  | { success: false; error: string };

export async function deleteCourseAction(
  courseId: string,
): Promise<DeleteCourseResult> {
  await delay(ADMIN_ACTION_DELAY_MS);

  const index = MOCK_COURSES.findIndex((course) => course.id === courseId);
  if (index === -1) return { success: false };

  MOCK_COURSES.splice(index, 1);
  revalidatePath("/admin/courses");

  return { success: true };
}

export async function createCourseAction(
  payload: CreateCoursePayload,
): Promise<CourseMutationResult> {
  await delay(ADMIN_ACTION_DELAY_MS);

  const newCourse: Course = {
    id: crypto.randomUUID(),
    slug: generateUniqueSlug(payload.title),
    title: payload.title,
    description: payload.description,
    coverImageUrl: payload.coverImageUrl,
    status: payload.status,
    createdAt: new Date().toISOString(),
  };

  MOCK_COURSES.unshift(newCourse);
  revalidatePath("/admin/courses");

  return { success: true, course: newCourse };
}

export async function updateCourseAction(
  courseId: string,
  payload: UpdateCoursePayload,
): Promise<CourseMutationResult> {
  await delay(ADMIN_ACTION_DELAY_MS);

  const index = MOCK_COURSES.findIndex((course) => course.id === courseId);
  if (index === -1) {
    return { success: false, error: "Course not found." };
  }

  const existingCourse = MOCK_COURSES[index];
  const updatedCourse: Course = {
    ...existingCourse,
    ...payload,
  };

  MOCK_COURSES[index] = updatedCourse;
  revalidatePath("/admin/courses");

  return { success: true, course: updatedCourse };
}
