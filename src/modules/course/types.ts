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

export type CourseSortField = "title" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface CourseCatalogParams {
  search?: string;
  status?: CourseStatus;
  sort?: CourseSortField;
  order?: SortOrder;
  page?: number;
  pageSize?: number;
}

export interface ResolvedCourseCatalogParams {
  search?: string;
  sort: CourseSortField;
  order: SortOrder;
  page: number;
}

export interface CourseCatalogResult {
  items: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CourseCatalogSearchParams {
  search?: string;
  sort?: string;
  order?: string;
  page?: string;
}

export interface CourseSlugParams {
  courseSlug: string;
}

export interface LessonSlugParams extends CourseSlugParams {
  lessonSlug: string;
}

export interface CourseIdParams {
  courseId: string;
}

export interface LessonIdParams extends CourseIdParams {
  lessonId: string;
}

export interface ResolvedAdminCourseCatalogParams
  extends ResolvedCourseCatalogParams {
  status?: CourseStatus;
}

export interface AdminCourseCatalogSearchParams
  extends CourseCatalogSearchParams {
  status?: string;
}
