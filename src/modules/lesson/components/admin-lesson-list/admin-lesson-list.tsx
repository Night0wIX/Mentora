"use client";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useTransition } from "react";

import { Button } from "@/shared/ui/button";

import { deleteLessonAction, reorderLessonsAction } from "../../admin-actions";
import type { Lesson } from "../../types";
import { AdminLessonRow } from "../admin-lesson-row";
import { DeleteLessonDialog } from "../delete-lesson-dialog";
import { LessonFormDialog } from "../lesson-form-dialog";
import { LessonListEmpty } from "../lesson-list-empty";

interface AdminLessonListProps {
  courseId: string;
  lessons: Lesson[];
}

export const AdminLessonList = ({
  courseId,
  lessons: initialLessons,
}: AdminLessonListProps) => {
  const [lessons, setLessons] = useState(initialLessons);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleLessonCreated = (lesson: Lesson): void => {
    setLessons((current) => [...current, lesson]);
  };

  const handleLessonUpdated = (lesson: Lesson): void => {
    setLessons((current) =>
      current.map((item) => (item.id === lesson.id ? lesson : item)),
    );
  };

  const handleDeleteRequest = (lesson: Lesson): void => {
    setLessonToDelete(lesson);
  };

  const handleDeleteDialogOpenChange = (isOpen: boolean): void => {
    if (!isOpen) setLessonToDelete(null);
  };

  const handleConfirmDelete = (): void => {
    if (!lessonToDelete) return;

    const lessonId = lessonToDelete.id;
    setDeletingLessonId(lessonId);

    startDeleteTransition(async () => {
      const result = await deleteLessonAction(courseId, lessonId);

      if (result.success) {
        setLessons((current) =>
          current.filter((lesson) => lesson.id !== lessonId),
        );
      }

      setDeletingLessonId(null);
      setLessonToDelete(null);
    });
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = lessons.findIndex((lesson) => lesson.id === active.id);
    const newIndex = lessons.findIndex((lesson) => lesson.id === over.id);
    const reordered = arrayMove(lessons, oldIndex, newIndex).map(
      (lesson, index) => ({
        ...lesson,
        order: index + 1,
      }),
    );

    setLessons(reordered);

    void reorderLessonsAction(
      courseId,
      reordered.map((lesson) => ({ lessonId: lesson.id, order: lesson.order })),
    );
  };

  return (
    <section aria-labelledby="lessons-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="lessons-heading" className="text-sm font-semibold">
          Lessons
        </h2>
        <LessonFormDialog
          mode={{ type: "create", courseId }}
          onSuccess={handleLessonCreated}
          trigger={
            <Button size="sm" variant="outline">
              Add lesson
            </Button>
          }
        />
      </div>

      {lessons.length === 0 ? (
        <LessonListEmpty
          courseId={courseId}
          onLessonCreated={handleLessonCreated}
        />
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={lessons.map((lesson) => lesson.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul aria-label="Lessons" className="space-y-2">
              {lessons.map((lesson, index) => (
                <AdminLessonRow
                  key={lesson.id}
                  lesson={lesson}
                  position={index + 1}
                  isDeletePending={deletingLessonId === lesson.id}
                  onLessonUpdated={handleLessonUpdated}
                  onDeleteRequest={handleDeleteRequest}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <DeleteLessonDialog
        lesson={lessonToDelete}
        isDeleting={isDeleting}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
};
