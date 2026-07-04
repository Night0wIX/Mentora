import type { Route } from "next";

import { buildUrl } from "@/shared/libs/url";

export const ROUTES = {
  home: "/",
  login: "/login",

  course: (courseSlug: string): Route =>
    buildUrl({
      path: "/courses/:courseSlug",
      pathParams: { courseSlug },
    }) as Route,

  lesson: (courseSlug: string, lessonSlug: string): Route =>
    buildUrl({
      path: "/courses/:courseSlug/lessons/:lessonSlug",
      pathParams: { courseSlug, lessonSlug },
    }) as Route,

  adminCourses: "/admin/courses" as Route,

  adminCourse: (courseId: string): Route =>
    buildUrl({
      path: "/admin/courses/:courseId",
      pathParams: { courseId },
    }) as Route,

  adminLesson: (courseId: string, lessonId: string): Route =>
    buildUrl({
      path: "/admin/courses/:courseId/lessons/:lessonId",
      pathParams: { courseId, lessonId },
    }) as Route,
} as const;
