import { buildUrl } from "@/shared/libs/url";

export const ROUTES = {
  home: "/",
  login: "/login",

  course: (courseSlug: string) =>
    buildUrl("/courses/:courseSlug", { courseSlug }),

  lesson: (courseSlug: string, lessonSlug: string) =>
    buildUrl("/courses/:courseSlug/lessons/:lessonSlug", {
      courseSlug,
      lessonSlug,
    }),

  adminCourses: "/admin/courses",

  adminCourse: (courseId: string) =>
    buildUrl("/admin/courses/:courseId", { courseId }),

  adminLesson: (courseId: string, lessonId: string) =>
    buildUrl("/admin/courses/:courseId/lessons/:lessonId", {
      courseId,
      lessonId,
    }),
} as const;
