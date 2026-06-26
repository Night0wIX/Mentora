export const ROUTES = {
  home: "/",
  login: "/login",

  course: (courseSlug: string) => `/courses/${courseSlug}`,
  lesson: (courseSlug: string, lessonSlug: string) =>
    `/courses/${courseSlug}/lessons/${lessonSlug}`,

  adminCourses: "/admin/courses",
  adminCourse: (courseSlug: string) => `/admin/courses/${courseSlug}`,
  adminLesson: (courseSlug: string, lessonSlug: string) =>
    `/admin/courses/${courseSlug}/lessons/${lessonSlug}`,
} as const;
