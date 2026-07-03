import type { Metadata } from "next";

import type { PageProps } from "@/shared/types";

import type { CourseSlugParams } from "@/modules/course";

export const metadata: Metadata = {
  title: "Course",
  description: "Course details, syllabus, and lessons.",
};

const CoursePage = async ({ params }: PageProps<CourseSlugParams>) => {
  const { courseSlug } = await params;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-6 md:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Course page (public)
      </h1>
      <p className="text-muted-foreground">courseSlug: {courseSlug}</p>
    </main>
  );
};

export default CoursePage;
