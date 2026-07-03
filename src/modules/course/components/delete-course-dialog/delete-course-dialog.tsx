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

import type { Course } from "../../types";

interface DeleteCourseDialogProps {
  course: Course | null;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteCourseDialog = ({
  course,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteCourseDialogProps) => {
  const handleConfirmClick = (): void => {
    onConfirm();
  };

  return (
    <Dialog open={course !== null} onOpenChange={onOpenChange}>
      <DialogContent
        role="alertdialog"
        aria-describedby="delete-course-description"
      >
        <DialogHeader>
          <DialogTitle>Delete course</DialogTitle>
          <DialogDescription id="delete-course-description">
            This will permanently delete{" "}
            <strong className="font-medium text-foreground">
              {course?.title}
            </strong>{" "}
            and all of its lessons. This action cannot be undone.
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
              isDeleting ? "Deleting course" : "Confirm delete course"
            }
            onClick={handleConfirmClick}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
