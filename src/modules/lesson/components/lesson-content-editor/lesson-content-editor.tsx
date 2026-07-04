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
import { Eye, EyeOff, Upload } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/shared/ui/button";

import { updateLessonContentAction } from "../../admin-actions";
import type {
  Lesson,
  LessonContentBlock,
  LessonContentBlockType,
} from "../../types";
import { AddContentBlockMenu } from "../add-content-block-menu";
import { LessonContentBlockEditor } from "../lesson-content-block-editor";
import { LessonContentBlockRenderer } from "../lesson-content-block-renderer";
import { LessonContentEmpty } from "../lesson-content-empty";

function createContentBlock(type: LessonContentBlockType): LessonContentBlock {
  return { id: crypto.randomUUID(), type, content: "", label: null };
}

interface LessonContentEditorProps {
  lesson: Lesson;
}

export const LessonContentEditor = ({ lesson }: LessonContentEditorProps) => {
  const [contentBlocks, setContentBlocks] = useState(lesson.contentBlocks);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(
    !lesson.isPublished,
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, startPublishTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const updateContentBlocks = (nextBlocks: LessonContentBlock[]): void => {
    setContentBlocks(nextBlocks);
    setHasUnpublishedChanges(true);
  };

  const handleAddBlock = (type: LessonContentBlockType): void => {
    updateContentBlocks([...contentBlocks, createContentBlock(type)]);
  };

  const handleBlockChange = (
    index: number,
    updatedBlock: LessonContentBlock,
  ): void => {
    updateContentBlocks(
      contentBlocks.map((block, blockIndex) =>
        blockIndex === index ? updatedBlock : block,
      ),
    );
  };

  const handleBlockDelete = (index: number): void => {
    updateContentBlocks(
      contentBlocks.filter((_, blockIndex) => blockIndex !== index),
    );
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = contentBlocks.findIndex((block) => block.id === active.id);
    const newIndex = contentBlocks.findIndex((block) => block.id === over.id);

    updateContentBlocks(arrayMove(contentBlocks, oldIndex, newIndex));
  };

  const handlePublishClick = (): void => {
    startPublishTransition(async () => {
      const result = await updateLessonContentAction(
        lesson.courseId,
        lesson.id,
        contentBlocks,
      );

      if (result.success) {
        setHasUnpublishedChanges(false);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsPreviewMode((current) => !current)}
        >
          {isPreviewMode ? (
            <EyeOff aria-hidden className="mr-1.5 h-3.5 w-3.5" />
          ) : (
            <Eye aria-hidden className="mr-1.5 h-3.5 w-3.5" />
          )}
          {isPreviewMode ? "Edit" : "Preview"}
        </Button>

        <Button
          size="sm"
          onClick={handlePublishClick}
          disabled={isPublishing || !hasUnpublishedChanges}
          loading={isPublishing}
          loadingText="Saving"
        >
          <Upload aria-hidden className="mr-1.5 h-3.5 w-3.5" />
          Save
        </Button>
      </div>

      {isPreviewMode ? (
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 border-b border-border pb-4">
            <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Preview
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {lesson.title}
            </h2>
          </div>

          {contentBlocks.length > 0 ? (
            <div className="space-y-6">
              {contentBlocks.map((block) => (
                <LessonContentBlockRenderer key={block.id} block={block} />
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground">
              No content blocks yet.
            </p>
          )}
        </div>
      ) : contentBlocks.length === 0 ? (
        <LessonContentEmpty onAddBlock={handleAddBlock} />
      ) : (
        <div className="space-y-3">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={contentBlocks.map((block) => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul aria-label="Content blocks" className="space-y-3">
                {contentBlocks.map((block, index) => (
                  <LessonContentBlockEditor
                    key={block.id}
                    block={block}
                    position={index + 1}
                    onChange={(updatedBlock) =>
                      handleBlockChange(index, updatedBlock)
                    }
                    onDelete={() => handleBlockDelete(index)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <AddContentBlockMenu onAddBlock={handleAddBlock} />
        </div>
      )}
    </div>
  );
};
