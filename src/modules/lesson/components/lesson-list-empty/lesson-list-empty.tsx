import { BookOpen } from "lucide-react";

import { Button } from "@/shared/ui/button";

import type { Lesson } from "../../types";
import { LessonFormDialog } from "../lesson-form-dialog";

interface LessonListEmptyProps {
  courseId: string;
  onLessonCreated: (lesson: Lesson) => void;
}

export const LessonListEmpty = ({
  courseId,
  onLessonCreated,
}: LessonListEmptyProps) => (
  <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10 text-center">
    <BookOpen aria-hidden className="h-8 w-8 text-muted-foreground" />
    <div>
      <p className="text-sm font-medium">No lessons yet</p>
      <p className="text-xs text-muted-foreground">
        Add your first lesson to start building this course.
      </p>
    </div>
    <LessonFormDialog
      mode={{ type: "create", courseId }}
      trigger={<Button size="sm">Add lesson</Button>}
      onSuccess={onLessonCreated}
    />
  </div>
);
