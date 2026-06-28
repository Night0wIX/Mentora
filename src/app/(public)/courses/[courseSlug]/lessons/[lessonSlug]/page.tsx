import type { Metadata } from "next";

import type { LessonSlugParams, PageProps } from "@/shared/types";

export const metadata: Metadata = {
  title: "Lesson",
  description: "Lesson content and materials.",
};

const LessonPage = async ({ params }: PageProps<LessonSlugParams>) => {
  const { courseSlug, lessonSlug } = await params;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-6 md:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Lesson page (public)
      </h1>
      <p className="text-muted-foreground">courseSlug: {courseSlug}</p>
      <p className="text-muted-foreground">lessonSlug: {lessonSlug}</p>
    </main>
  );
};

export default LessonPage;
