"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FileIcon,
  GripVertical,
  ImageIcon,
  LinkIcon,
  Loader2,
  Trash2,
  Type,
  Video,
} from "lucide-react";
import { type ChangeEvent, useState } from "react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";

import { uploadLessonFileAction } from "../../admin-actions";
import type { LessonContentBlock, LessonContentBlockType } from "../../types";

const BLOCK_TYPE_ICON: Record<LessonContentBlockType, typeof Type> = {
  text: Type,
  image: ImageIcon,
  video: Video,
  file: FileIcon,
  link: LinkIcon,
};

const BLOCK_TYPE_LABEL: Record<LessonContentBlockType, string> = {
  text: "Text",
  image: "Image",
  video: "Video",
  file: "File",
  link: "Link",
};

const TEXT_INPUT_CLASS_NAME = cn(
  "border-input placeholder:text-muted-foreground",
  "flex h-8 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs",
  "outline-none transition-[color,box-shadow]",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
);

interface LessonContentBlockEditorProps {
  block: LessonContentBlock;
  position: number;
  onChange: (block: LessonContentBlock) => void;
  onDelete: () => void;
}

export const LessonContentBlockEditor = ({
  block,
  position,
  onChange,
  onDelete,
}: LessonContentBlockEditorProps) => {
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const BlockTypeIcon = BLOCK_TYPE_ICON[block.type];

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadErrorMessage("");

    const formData = new FormData();
    formData.set("file", file);

    const result = await uploadLessonFileAction(formData);

    if (result.success) {
      onChange({
        ...block,
        content: result.fileUrl,
        label: block.label || file.name,
      });
    } else {
      setUploadErrorMessage(result.error);
    }

    setIsUploading(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-start gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/20",
        isDragging && "opacity-60",
      )}
    >
      <button
        type="button"
        aria-label={`Reorder ${BLOCK_TYPE_LABEL[block.type]} block, position ${position}`}
        className="mt-1.5 cursor-grab text-muted-foreground/40 hover:text-muted-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical aria-hidden className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-1.5 rounded bg-muted px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <BlockTypeIcon aria-hidden className="h-3 w-3" />
          {BLOCK_TYPE_LABEL[block.type]}
        </div>

        {block.type === "text" && (
          <textarea
            aria-label="Text content"
            value={block.content}
            onChange={(event) =>
              onChange({ ...block, content: event.target.value })
            }
            placeholder="Write your content here..."
            rows={4}
            className="min-h-20 w-full resize-y border-0 bg-transparent p-0 text-sm outline-none focus-visible:ring-0"
          />
        )}

        {block.type === "image" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                aria-label="Upload image"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className={cn(TEXT_INPUT_CLASS_NAME, "flex-1 py-1")}
              />
              {isUploading && (
                <Loader2
                  aria-hidden
                  className="h-4 w-4 animate-spin text-muted-foreground"
                />
              )}
            </div>

            {uploadErrorMessage && (
              <p role="alert" className="text-xs text-destructive">
                {uploadErrorMessage}
              </p>
            )}

            <input
              aria-label="Image URL"
              type="url"
              value={block.content}
              onChange={(event) =>
                onChange({ ...block, content: event.target.value })
              }
              placeholder="Or paste image URL..."
              className={TEXT_INPUT_CLASS_NAME}
            />

            {block.content && (
              // biome-ignore lint/performance/noImgElement: user-provided arbitrary URLs, next/image requires domain allowlisting
              <img
                src={block.content}
                alt={block.label ?? ""}
                className="max-h-48 rounded-md border border-border object-contain"
              />
            )}

            <input
              aria-label="Caption"
              value={block.label ?? ""}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
              placeholder="Caption (optional)"
              className={cn(TEXT_INPUT_CLASS_NAME, "text-xs")}
            />
          </div>
        )}

        {block.type === "video" && (
          <div className="space-y-2">
            <input
              aria-label="Video URL"
              type="url"
              value={block.content}
              onChange={(event) =>
                onChange({ ...block, content: event.target.value })
              }
              placeholder="Paste video URL (YouTube, Vimeo, etc.)"
              className={TEXT_INPUT_CLASS_NAME}
            />
            <input
              aria-label="Caption"
              value={block.label ?? ""}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
              placeholder="Caption (optional)"
              className={cn(TEXT_INPUT_CLASS_NAME, "text-xs")}
            />
          </div>
        )}

        {block.type === "file" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                aria-label="Upload file"
                type="file"
                onChange={handleFileInputChange}
                className={cn(TEXT_INPUT_CLASS_NAME, "flex-1 py-1")}
              />
              {isUploading && (
                <Loader2
                  aria-hidden
                  className="h-4 w-4 animate-spin text-muted-foreground"
                />
              )}
            </div>

            {uploadErrorMessage && (
              <p role="alert" className="text-xs text-destructive">
                {uploadErrorMessage}
              </p>
            )}

            {block.content && (
              <p className="truncate text-xs text-muted-foreground">
                Uploaded: {block.label || block.content}
              </p>
            )}

            <input
              aria-label="File name / label"
              value={block.label ?? ""}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
              placeholder="File name / label"
              className={cn(TEXT_INPUT_CLASS_NAME, "text-xs")}
            />
          </div>
        )}

        {block.type === "link" && (
          <div className="space-y-2">
            <input
              aria-label="Link URL"
              type="url"
              value={block.content}
              onChange={(event) =>
                onChange({ ...block, content: event.target.value })
              }
              placeholder="https://..."
              className={TEXT_INPUT_CLASS_NAME}
            />
            <input
              aria-label="Link text"
              value={block.label ?? ""}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
              placeholder="Link text (optional)"
              className={cn(TEXT_INPUT_CLASS_NAME, "text-xs")}
            />
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        iconOnly
        aria-label={`Delete ${BLOCK_TYPE_LABEL[block.type]} block`}
        className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
        onClick={onDelete}
      >
        <Trash2 aria-hidden className="h-3.5 w-3.5" />
      </Button>
    </li>
  );
};
