"use client";

import { type ReactElement, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import type { Lesson } from "../../types";
import { LessonForm } from "./lesson-form";
import type { LessonFormMode } from "./lesson-form.types";

interface LessonFormDialogProps {
  mode: LessonFormMode;
  trigger: ReactElement<{ disabled?: boolean }>;
  onSuccess?: (lesson: Lesson) => void;
}

export const LessonFormDialog = ({
  mode,
  trigger,
  onSuccess,
}: LessonFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (lesson: Lesson): void => {
    setIsOpen(false);
    onSuccess?.(lesson);
  };

  const handleCancel = (): void => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby="lesson-form-description">
        <DialogHeader>
          <DialogTitle>
            {mode.type === "create" ? "Add lesson" : "Edit lesson"}
          </DialogTitle>
          <DialogDescription className="mb-4" id="lesson-form-description">
            {mode.type === "create"
              ? "Give the new lesson a title. You can add content after it's created."
              : `Update the title for "${mode.lesson.title}".`}
          </DialogDescription>
        </DialogHeader>

        {/* Remounted on every open via `isOpen` gating (Radix unmounts closed content),
            so form state always starts fresh per open. */}
        <LessonForm
          mode={mode}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
