"use client";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import type { Lesson } from "../../types";

interface DeleteLessonDialogProps {
  lesson: Lesson | null;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteLessonDialog = ({
  lesson,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteLessonDialogProps) => {
  const handleConfirmClick = (): void => {
    onConfirm();
  };

  return (
    <Dialog open={lesson !== null} onOpenChange={onOpenChange}>
      <DialogContent
        role="alertdialog"
        aria-describedby="delete-lesson-description"
      >
        <DialogHeader>
          <DialogTitle>Delete lesson</DialogTitle>
          <DialogDescription id="delete-lesson-description">
            This will permanently delete{" "}
            <strong className="font-medium text-foreground">
              {lesson?.title}
            </strong>{" "}
            and all of its content. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            loading={isDeleting}
            aria-label={
              isDeleting ? "Deleting lesson" : "Confirm delete lesson"
            }
            onClick={handleConfirmClick}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete lesson
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
