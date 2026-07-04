import type { Lesson, LessonContentBlockType } from "../types";

interface LessonContentBlockRow {
  id: string;
  type: LessonContentBlockType;
  content: string;
  label: string | null;
  order_index: number;
}

interface LessonRow {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  is_published: boolean;
  lesson_content_blocks?: LessonContentBlockRow[];
}

export function mapLessonRow(row: LessonRow): Lesson {
  const blocks = [...(row.lesson_content_blocks ?? [])].sort(
    (a, b) => a.order_index - b.order_index,
  );

  return {
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    order: row.order_index,
    isPublished: row.is_published,
    contentBlocks: blocks.map((block) => ({
      id: block.id,
      type: block.type,
      content: block.content,
      label: block.label,
    })),
  };
}
