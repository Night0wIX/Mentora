import { FileText } from "lucide-react";

import type { LessonContentBlockType } from "../../types";
import { AddContentBlockMenu } from "../add-content-block-menu";

interface LessonContentEmptyProps {
  onAddBlock: (type: LessonContentBlockType) => void;
}

export const LessonContentEmpty = ({ onAddBlock }: LessonContentEmptyProps) => (
  <div className="space-y-4">
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10 text-center">
      <FileText aria-hidden className="h-8 w-8 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">Empty lesson</p>
        <p className="text-xs text-muted-foreground">
          Add content blocks to build this lesson.
        </p>
      </div>
    </div>
    <AddContentBlockMenu onAddBlock={onAddBlock} />
  </div>
);
