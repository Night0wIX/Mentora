import type { Lesson } from "../../types";

export type LessonFormMode =
  | { type: "create"; courseId: string }
  | { type: "edit"; lesson: Lesson };

export interface LessonFormValues {
  title: string;
}
