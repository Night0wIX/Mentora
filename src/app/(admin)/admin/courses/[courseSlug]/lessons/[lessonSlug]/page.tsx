import type { Metadata } from "next";

import type { LessonSlugParams, PageProps } from "@/shared/types/page-params";

export const metadata: Metadata = {
  title: "Lesson editor",
  description: "Edit lesson content.",
};

export default async function AdminLessonEditorPage({
  params,
}: PageProps<LessonSlugParams>) {
  const { courseSlug, lessonSlug } = await params;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Lesson editor (admin)
      </h1>
      <p className="text-muted-foreground">courseSlug: {courseSlug}</p>
      <p className="text-muted-foreground">lessonSlug: {lessonSlug}</p>
    </div>
  );
}
