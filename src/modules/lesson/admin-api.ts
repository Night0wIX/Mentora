import { createSupabaseServerClient } from "@/shared/libs/supabase/server";

import { mapLessonRow } from "./libs/map-lesson-row";
import type { Lesson } from "./types";

const LESSON_SELECT = "*, lesson_content_blocks(*)";

export async function getAdminLessons(courseId: string): Promise<Lesson[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("lessons")
    .select(LESSON_SELECT)
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapLessonRow);
}

export async function getAdminLesson(
  courseId: string,
  lessonId: string,
): Promise<Lesson | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("lessons")
    .select(LESSON_SELECT)
    .eq("course_id", courseId)
    .eq("id", lessonId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapLessonRow(data) : null;
}
