import { ArrowLeft } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ROUTES } from "@/shared/config";

import { getAdminLesson, LessonContentEditor } from "@/modules/lesson";

interface AdminLessonEditorPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export const generateMetadata = async ({
  params,
}: AdminLessonEditorPageProps): Promise<Metadata> => {
  const { courseId, lessonId } = await params;
  const lesson = await getAdminLesson(courseId, lessonId);

  return {
    title: lesson ? `${lesson.title} · Admin` : "Lesson not found",
    robots: { index: false, follow: false },
  };
};

export default async function AdminLessonEditorPage({
  params,
}: AdminLessonEditorPageProps) {
  const { courseId, lessonId } = await params;
  const lesson = await getAdminLesson(courseId, lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header>
        <Link
          href={ROUTES.adminCourse(courseId) as Route}
          className="mb-1.5 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" /> Back to course
        </Link>
        <h1 className="text-xl font-semibold tracking-tight">{lesson.title}</h1>
      </header>

      <LessonContentEditor lesson={lesson} />
    </div>
  );
}
