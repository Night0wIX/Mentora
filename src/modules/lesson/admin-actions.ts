"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/shared/config";
import { createSupabaseServerClient } from "@/shared/libs/supabase/server";

import { mapLessonRow } from "./libs/map-lesson-row";
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

const LESSON_SELECT = "*, lesson_content_blocks(*)";
const LESSON_FILES_BUCKET = "lesson-files";

function revalidateCoursePage(courseId: string): void {
  revalidatePath(ROUTES.adminCourse(courseId));
}

function revalidateLessonPage(courseId: string, lessonId: string): void {
  revalidatePath(ROUTES.adminLesson(courseId, lessonId));
}

export async function createLessonAction(
  payload: CreateLessonPayload,
): Promise<CreateLessonActionResult> {
  const supabase = await createSupabaseServerClient();

  const { count } = await supabase
    .from("lessons")
    .select("id", { count: "exact", head: true })
    .eq("course_id", payload.courseId);

  const { data, error } = await supabase
    .from("lessons")
    .insert({
      course_id: payload.courseId,
      title: payload.title,
      order_index: (count ?? 0) + 1,
      is_published: false,
    })
    .select(LESSON_SELECT)
    .single();

  if (error) return { success: false, error: error.message };

  revalidateCoursePage(payload.courseId);
  return { success: true, lesson: mapLessonRow(data) };
}

export async function updateLessonAction(
  courseId: string,
  lessonId: string,
  payload: UpdateLessonPayload,
): Promise<UpdateLessonActionResult> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("lessons")
    .update({ title: payload.title })
    .eq("id", lessonId)
    .select(LESSON_SELECT)
    .single();

  if (error) return { success: false, error: error.message };

  revalidateCoursePage(courseId);
  return { success: true, lesson: mapLessonRow(data) };
}

export async function updateLessonContentAction(
  courseId: string,
  lessonId: string,
  contentBlocks: LessonContentBlock[],
): Promise<UpdateLessonContentActionResult> {
  const supabase = await createSupabaseServerClient();

  const { error: deleteError } = await supabase
    .from("lesson_content_blocks")
    .delete()
    .eq("lesson_id", lessonId);

  if (deleteError) return { success: false, error: deleteError.message };

  if (contentBlocks.length > 0) {
    const { error: insertError } = await supabase
      .from("lesson_content_blocks")
      .insert(
        contentBlocks.map((block, index) => ({
          lesson_id: lessonId,
          type: block.type,
          content: block.content,
          label: block.label,
          order_index: index,
        })),
      );

    if (insertError) return { success: false, error: insertError.message };
  }

  const { data, error } = await supabase
    .from("lessons")
    .update({ is_published: true })
    .eq("id", lessonId)
    .select(LESSON_SELECT)
    .single();

  if (error) return { success: false, error: error.message };

  revalidateCoursePage(courseId);
  revalidateLessonPage(courseId, lessonId);

  return { success: true, lesson: mapLessonRow(data) };
}

export async function deleteLessonAction(
  courseId: string,
  lessonId: string,
): Promise<DeleteLessonActionResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);

  if (error) return { success: false, error: error.message };

  revalidateCoursePage(courseId);
  return { success: true };
}

export async function reorderLessonsAction(
  courseId: string,
  reorderedLessons: ReorderedLesson[],
): Promise<ReorderLessonsActionResult> {
  const supabase = await createSupabaseServerClient();

  const results = await Promise.all(
    reorderedLessons.map(({ lessonId, order }) =>
      supabase
        .from("lessons")
        .update({ order_index: order })
        .eq("id", lessonId),
    ),
  );

  const failed = results.find((result) => result.error);
  if (failed?.error) return { success: false, error: failed.error.message };

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

  const supabase = await createSupabaseServerClient();
  const filePath = `${crypto.randomUUID()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from(LESSON_FILES_BUCKET)
    .upload(filePath, file);

  if (uploadError) {
    return { success: false, error: uploadError.message };
  }

  const { data } = supabase.storage
    .from(LESSON_FILES_BUCKET)
    .getPublicUrl(filePath);

  return { success: true, fileUrl: data.publicUrl };
}
