"use client";

import { ArrowLeft, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { formatRelativeDate } from "@/shared/utils";

import { updateCourseAction } from "../../admin-actions";
import type { Course } from "../../types";
import { CourseStatusBadge } from "../course-status-badge";

interface AdminCourseDetailHeaderProps {
  course: Course;
}

export const AdminCourseDetailHeader = ({
  course: initialCourse,
}: AdminCourseDetailHeaderProps) => {
  const [course, setCourse] = useState(initialCourse);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const createdAt = formatRelativeDate(course.createdAt);
  const isPublished = course.status === "published";

  const handleTogglePublish = (): void => {
    setErrorMessage("");

    startTransition(async () => {
      const nextStatus = isPublished ? "draft" : "published";
      const result = await updateCourseAction(course.id, {
        status: nextStatus,
      });

      if (!result.success) {
        setErrorMessage(
          result.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setCourse(result.course);
    });
  };

  return (
    <div className="space-y-3">
      <Link
        href={ROUTES.adminCourses}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="h-3.5 w-3.5" /> Back to courses
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {course.coverImageUrl ? (
            <Image
              src={course.coverImageUrl}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-lg border border-border object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted"
            >
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="truncate text-xl font-semibold tracking-tight">
                {course.title}
              </h1>
              <CourseStatusBadge status={course.status} />
            </div>

            {course.description && (
              <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                {course.description}
              </p>
            )}

            <p className="mt-1.5 text-xs text-muted-foreground">
              Created{" "}
              <time dateTime={course.createdAt}>{createdAt.relative}</time>
            </p>

            {errorMessage && (
              <p className="mt-1.5 text-xs text-destructive">{errorMessage}</p>
            )}
          </div>
        </div>

        <Button
          variant={isPublished ? "outline" : "default"}
          onClick={handleTogglePublish}
          disabled={isPending}
          loading={isPending}
          loadingText={isPublished ? "Unpublishing" : "Publishing"}
          className="shrink-0"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      </header>
    </div>
  );
};
