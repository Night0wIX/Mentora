"use client";

import { useState, useTransition } from "react";

import { deleteCourseAction } from "../../admin-actions";
import { ADMIN_COURSE_LIST_GRID_TEMPLATE } from "../../constants";
import type { Course } from "../../types";
import { AdminCourseRow } from "../admin-course-row";
import { DeleteCourseDialog } from "../delete-course-dialog";

interface AdminCourseListProps {
  courses: Course[];
}

const COLUMN_LABEL = {
  title: "Course",
  status: "Status",
  createdAt: "Created",
  actions: "Actions",
} as const;

export const AdminCourseList = ({ courses }: AdminCourseListProps) => {
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDeleteRequest = (course: Course): void => {
    setCourseToDelete(course);
  };

  const handleDeleteDialogOpenChange = (isOpen: boolean): void => {
    if (!isOpen) setCourseToDelete(null);
  };

  const handleConfirmDelete = (): void => {
    if (!courseToDelete) return;

    const courseId = courseToDelete.id;
    setDeletingCourseId(courseId);

    startDeleteTransition(async () => {
      try {
        await deleteCourseAction(courseId);
      } finally {
        setDeletingCourseId(null);
        setCourseToDelete(null);
      }
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table
        aria-label="Courses"
        aria-rowcount={courses.length + 1}
        className="w-full border-separate border-spacing-0"
      >
        <thead className="hidden md:table-header-group">
          <tr
            className={`items-center gap-4 border-b border-border bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground md:grid ${ADMIN_COURSE_LIST_GRID_TEMPLATE}`}
          >
            <th scope="col" className="text-left font-medium">
              {COLUMN_LABEL.title}
            </th>
            <th scope="col" className="text-center font-medium">
              {COLUMN_LABEL.status}
            </th>
            <th scope="col" className="text-center font-medium">
              {COLUMN_LABEL.createdAt}
            </th>
            <th scope="col" className="text-center font-medium">
              {COLUMN_LABEL.actions}
            </th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <AdminCourseRow
              key={course.id}
              course={course}
              isDeletePending={deletingCourseId === course.id}
              onDeleteRequest={handleDeleteRequest}
            />
          ))}
        </tbody>
      </table>

      <DeleteCourseDialog
        course={courseToDelete}
        isDeleting={isDeleting}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
