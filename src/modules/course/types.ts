export type CourseStatus = "draft" | "published";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  status: CourseStatus;
  createdAt: string;
}
