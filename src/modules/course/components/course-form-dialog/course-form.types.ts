import type { Course, CourseStatus } from "../../types";

export type CourseFormMode =
  | { readonly type: "create" }
  | { readonly type: "edit"; readonly course: Course };

export interface CourseFormValues {
  title: string;
  description: string;
  coverImageUrl: string;
  status: CourseStatus;
}
