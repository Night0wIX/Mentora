import type { Metadata } from "next";

import type { LessonIdParams, PageProps } from "@/shared/types/page-params";

export const metadata: Metadata = {
  title: "Lesson editor",
  description: "Edit lesson content.",
};

export default async function AdminLessonEditorPage({
  params,
}: PageProps<LessonIdParams>) {
  const { courseId, lessonId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Lesson editor (admin)
      </h1>
      <p className="text-muted-foreground">courseId: {courseId}</p>
      <p className="text-muted-foreground">lessonId: {lessonId}</p>
    </div>
  );
}
