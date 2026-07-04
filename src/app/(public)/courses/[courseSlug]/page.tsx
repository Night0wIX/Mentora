import { ArrowLeft, BookOpen } from "lucide-react";
import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ROUTES } from "@/shared/config";
import type { PageProps } from "@/shared/types";

import { type CourseSlugParams, getCourseBySlug } from "@/modules/course";
import { getPublishedLessons } from "@/modules/lesson";

export const generateMetadata = async ({
  params,
}: PageProps<CourseSlugParams>): Promise<Metadata> => {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  return {
    title: course ? course.title : "Course not found",
    description:
      course?.description ?? "Course details, syllabus, and lessons.",
  };
};

const CoursePage = async ({ params }: PageProps<CourseSlugParams>) => {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const lessons = await getPublishedLessons(course.id);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 md:px-6">
      <Link
        href={ROUTES.home as Route}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="h-3.5 w-3.5" /> Back to courses
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {course.coverImageUrl ? (
          <Image
            src={course.coverImageUrl}
            alt=""
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-muted"
          >
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
        )}

        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">
            {course.title}
          </h1>
          {course.description && (
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {course.description}
            </p>
          )}
        </div>
      </header>

      <section
        aria-labelledby="lessons-heading"
        className="flex flex-col gap-2"
      >
        <h2
          id="lessons-heading"
          className="text-sm font-semibold text-muted-foreground"
        >
          Lessons
        </h2>

        {lessons.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No lessons are published yet. Check back soon.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <Link
                  href={ROUTES.lesson(course.slug, lesson.id) as Route}
                  className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default CoursePage;
