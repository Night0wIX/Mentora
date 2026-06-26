import type { Metadata } from "next";

import type { CourseSlugParams, PageProps } from "@/shared/types/page-params";

export const metadata: Metadata = {
  title: "Course",
  description: "Course details, syllabus, and lessons.",
};

export default async function CoursePage({
  params,
}: PageProps<CourseSlugParams>) {
  const { courseSlug } = await params;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-6 md:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Course page (public)
      </h1>
      <p className="text-muted-foreground">courseSlug: {courseSlug}</p>
    </main>
  );
}
