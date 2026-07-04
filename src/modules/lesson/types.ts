export type LessonContentBlockType =
  | "text"
  | "image"
  | "video"
  | "file"
  | "link";

export interface LessonContentBlock {
  id: string;
  type: LessonContentBlockType;
  content: string;
  label: string | null;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  isPublished: boolean;
  contentBlocks: LessonContentBlock[];
}

export interface CreateLessonPayload {
  courseId: string;
  title: string;
}

export interface UpdateLessonPayload {
  title: string;
}

export interface ReorderedLesson {
  lessonId: string;
  order: number;
}

export type CreateLessonActionResult =
  | { success: true; lesson: Lesson }
  | { success: false; error?: string };

export type UpdateLessonActionResult =
  | { success: true; lesson: Lesson }
  | { success: false; error?: string };

export type UpdateLessonContentActionResult =
  | { success: true; lesson: Lesson }
  | { success: false; error?: string };

export type DeleteLessonActionResult =
  | { success: true }
  | { success: false; error?: string };

export type ReorderLessonsActionResult =
  | { success: true }
  | { success: false; error?: string };

export type UploadLessonFileActionResult =
  | { success: true; fileUrl: string }
  | { success: false; error: string };
