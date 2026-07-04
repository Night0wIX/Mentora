import { ArrowLeft } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ROUTES } from "@/shared/config";
import type { PageProps } from "@/shared/types";

import { getCourseBySlug, type LessonSlugParams } from "@/modules/course";
import {
  getPublishedLesson,
  LessonContentBlockRenderer,
} from "@/modules/lesson";

export const generateMetadata = async ({
  params,
}: PageProps<LessonSlugParams>): Promise<Metadata> => {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  const lesson = course
    ? await getPublishedLesson(course.id, lessonSlug)
    : null;

  return {
    title: lesson ? lesson.title : "Lesson not found",
    description: "Lesson content and materials.",
  };
};

const LessonPage = async ({ params }: PageProps<LessonSlugParams>) => {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const lesson = await getPublishedLesson(course.id, lessonSlug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6 md:px-6">
      <Link
        href={ROUTES.course(course.slug) as Route}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="h-3.5 w-3.5" /> Back to course
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1>

      <div className="flex flex-col gap-4">
        {lesson.contentBlocks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            This lesson doesn&apos;t have any content yet.
          </p>
        ) : (
          lesson.contentBlocks.map((block) => (
            <LessonContentBlockRenderer key={block.id} block={block} />
          ))
        )}
      </div>
    </main>
  );
};

export default LessonPage;
