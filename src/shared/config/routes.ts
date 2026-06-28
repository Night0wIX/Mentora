export const ROUTES = {
  home: "/",
  login: "/login",

  course: (courseSlug: string) => `/courses/${courseSlug}`,
  lesson: (courseSlug: string, lessonSlug: string) =>
    `/courses/${courseSlug}/lessons/${lessonSlug}`,

  adminCourses: "/admin/courses",
  adminCourse: (courseId: string) => `/admin/courses/${courseId}`,
  adminLesson: (courseId: string, lessonId: string) =>
    `/admin/courses/${courseId}/lessons/${lessonId}`,
} as const;
