"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/shared/config";
import { createSupabaseServerClient } from "@/shared/libs/supabase/server";

import { mapCourseRow } from "./libs/map-course-row";
import type { Course, CourseStatus } from "./types";

type SupabaseServerClient = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;

function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(
  supabase: SupabaseServerClient,
  title: string,
): Promise<string> {
  const baseSlug = slugify(title) || "course";
  let candidateSlug = baseSlug;
  let suffix = 2;

  while (true) {
    const { data } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", candidateSlug)
      .maybeSingle();

    if (!data) return candidateSlug;
    candidateSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export interface CreateCoursePayload {
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  status: CourseStatus;
}

export type UpdateCoursePayload = Partial<CreateCoursePayload>;

type CourseMutationResult =
  | { success: true; course: Course }
  | { success: false; error: string };

export async function createCourseAction(
  payload: CreateCoursePayload,
): Promise<CourseMutationResult> {
  const supabase = await createSupabaseServerClient();
  const slug = await generateUniqueSlug(supabase, payload.title);

  const { data, error } = await supabase
    .from("courses")
    .insert({
      slug,
      title: payload.title,
      description: payload.description,
      cover_image_url: payload.coverImageUrl,
      status: payload.status,
    })
    .select("*")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/courses");
  return { success: true, course: mapCourseRow(data) };
}

export async function updateCourseAction(
  courseId: string,
  payload: UpdateCoursePayload,
): Promise<CourseMutationResult> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .update({
      ...(payload.title !== undefined && { title: payload.title }),
      ...(payload.description !== undefined && {
        description: payload.description,
      }),
      ...(payload.coverImageUrl !== undefined && {
        cover_image_url: payload.coverImageUrl,
      }),
      ...(payload.status !== undefined && { status: payload.status }),
    })
    .eq("id", courseId)
    .select("*")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/courses");
  revalidatePath(ROUTES.adminCourse(courseId));

  return { success: true, course: mapCourseRow(data) };
}

export async function deleteCourseAction(
  courseId: string,
): Promise<{ success: boolean }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("courses").delete().eq("id", courseId);

  if (error) return { success: false };

  revalidatePath("/admin/courses");
  return { success: true };
}
