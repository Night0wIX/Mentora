import { buildUrl } from "@/shared/libs/url";

export const ROUTES = {
  home: "/",
  login: "/login",

  course: (courseSlug: string): string =>
    buildUrl({ path: "/courses/:courseSlug", pathParams: { courseSlug } }),

  lesson: (courseSlug: string, lessonSlug: string): string =>
    buildUrl({
      path: "/courses/:courseSlug/lessons/:lessonSlug",
      pathParams: { courseSlug, lessonSlug },
    }),

  adminCourses: "/admin/courses",

  adminCourse: (courseId: string): string =>
    buildUrl({ path: "/admin/courses/:courseId", pathParams: { courseId } }),

  adminLesson: (courseId: string, lessonId: string): string =>
    buildUrl({
      path: "/admin/courses/:courseId/lessons/:lessonId",
      pathParams: { courseId, lessonId },
    }),
} as const;
