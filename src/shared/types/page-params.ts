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

export interface PageProps<TParams> {
  params: Promise<TParams>;
}
