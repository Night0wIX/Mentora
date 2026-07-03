"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { formatRelativeDate } from "@/shared/utils";

import { ADMIN_COURSE_LIST_GRID_TEMPLATE } from "../../constants";
import type { Course } from "../../types";
import { CourseFormDialog } from "../course-form-dialog";
import { CourseStatusBadge } from "../course-status-badge";

interface AdminCourseRowProps {
  course: Course;
  isDeletePending: boolean;
  onDeleteRequest: (course: Course) => void;
}

export const AdminCourseRow = ({
  course,
  isDeletePending,
  onDeleteRequest,
}: AdminCourseRowProps) => {
  const createdAt = formatRelativeDate(course.createdAt);

  const handleDeleteClick = (): void => {
    onDeleteRequest(course);
  };

  return (
    <tr
      aria-busy={isDeletePending}
      className={`flex flex-col gap-3 border-b border-border px-4 py-4 last:border-b-0 md:grid md:items-center md:gap-4 ${ADMIN_COURSE_LIST_GRID_TEMPLATE}`}
    >
      <th scope="row" className="min-w-0 overflow-hidden text-left font-normal">
        <div className="flex min-w-0 items-center gap-2">
          <p className="min-w-0 truncate text-sm font-medium">{course.title}</p>
          <CourseStatusBadge
            status={course.status}
            className="shrink-0 md:hidden"
          />
        </div>
        {course.description && (
          <p className="mt-0.5 min-w-0 truncate text-xs text-muted-foreground">
            {course.description}
          </p>
        )}
      </th>

      <td className="hidden justify-center md:flex">
        <CourseStatusBadge status={course.status} />
      </td>

      <td className="hidden justify-center md:flex">
        <time
          dateTime={createdAt.dateTime}
          className="text-xs text-muted-foreground"
        >
          {createdAt.relative}
        </time>
      </td>

      <td className="flex items-center justify-end gap-1 md:justify-center">
        <CourseFormDialog
          mode={{ type: "edit", course }}
          trigger={
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              disabled={isDeletePending}
              aria-label={`Edit ${course.title}`}
            >
              <Pencil aria-hidden />
            </Button>
          }
        />

        <Button
          variant="ghost"
          size="sm"
          iconOnly
          disabled={isDeletePending}
          aria-label={
            isDeletePending
              ? `Deleting ${course.title}`
              : `Delete ${course.title}`
          }
          className="text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
          onClick={handleDeleteClick}
        >
          {isDeletePending ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : (
            <Trash2 aria-hidden />
          )}
        </Button>
      </td>
    </tr>
  );
};
