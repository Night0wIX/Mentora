import type { Course, CourseStatus } from "../types";

interface CourseRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  status: CourseStatus;
  created_at: string;
}

export function mapCourseRow(row: CourseRow): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    coverImageUrl: row.cover_image_url,
    status: row.status,
    createdAt: row.created_at,
  };
}
