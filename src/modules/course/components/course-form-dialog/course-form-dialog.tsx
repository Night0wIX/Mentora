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

import type { Course } from "../../types";
import { CourseForm } from "./course-form";
import type { CourseFormMode } from "./course-form.types";

interface CourseFormDialogProps {
  mode: CourseFormMode;
  trigger: ReactElement<{ disabled?: boolean }>;
  onSuccess?: (course: Course) => void;
}

export const CourseFormDialog = ({
  mode,
  trigger,
  onSuccess,
}: CourseFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (course: Course): void => {
    setIsOpen(false);
    onSuccess?.(course);
  };

  const handleCancel = (): void => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby="course-form-description">
        <DialogHeader>
          <DialogTitle>
            {mode.type === "create" ? "Create course" : "Edit course"}
          </DialogTitle>
          <DialogDescription className="mb-4" id="course-form-description">
            {mode.type === "create"
              ? "Fill in the details to create a new course."
              : `Update the details for "${mode.course.title}".`}
          </DialogDescription>
        </DialogHeader>

        {/* Remounted on every open via `isOpen` gating in Dialog (Radix unmounts closed content),
            so form state always starts fresh per open. */}
        <CourseForm
          mode={mode}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
