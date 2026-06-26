export interface CourseSlugParams {
  courseSlug: string;
}

export interface LessonSlugParams extends CourseSlugParams {
  lessonSlug: string;
}

export interface PageProps<TParams> {
  params: Promise<TParams>;
}
