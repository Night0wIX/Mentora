"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2, Pencil, Trash2 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import { ADMIN_LESSON_LIST_GRID_TEMPLATE } from "../../constants";
import type { Lesson } from "../../types";
import { LessonFormDialog } from "../lesson-form-dialog";

interface AdminLessonRowProps {
  lesson: Lesson;
  position: number;
  isDeletePending: boolean;
  onLessonUpdated: (lesson: Lesson) => void;
  onDeleteRequest: (lesson: Lesson) => void;
}

export const AdminLessonRow = ({
  lesson,
  position,
  isDeletePending,
  onLessonUpdated,
  onDeleteRequest,
}: AdminLessonRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteClick = (): void => {
    onDeleteRequest(lesson);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      aria-busy={isDeletePending}
      className={`flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-3 md:grid md:gap-4 ${ADMIN_LESSON_LIST_GRID_TEMPLATE} ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <button
        type="button"
        aria-label={`Reorder ${lesson.title}`}
        className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical aria-hidden className="h-4 w-4" />
        <span className="sr-only">Position {position}</span>
      </button>

      <Link
        href={ROUTES.adminLesson(lesson.courseId, lesson.id) as Route}
        className="min-w-0 truncate text-sm font-medium hover:underline"
      >
        {lesson.title}
      </Link>

      <div className="flex items-center justify-end gap-1">
        <LessonFormDialog
          mode={{ type: "edit", lesson }}
          onSuccess={onLessonUpdated}
          trigger={
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              disabled={isDeletePending}
              aria-label={`Edit ${lesson.title}`}
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
              ? `Deleting ${lesson.title}`
              : `Delete ${lesson.title}`
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
      </div>
    </li>
  );
};
