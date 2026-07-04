"use client";

import { ExternalLink, FileIcon } from "lucide-react";

import type { LessonContentBlock } from "../../types";
import { getVideoEmbedUrl } from "./lesson-content-block-renderer.utils";

interface LessonContentBlockRendererProps {
  block: LessonContentBlock;
}

async function handleFileDownload(
  url: string,
  filename: string,
): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(blobUrl);
}

export const LessonContentBlockRenderer = ({
  block,
}: LessonContentBlockRendererProps) => {
  switch (block.type) {
    case "text":
      return (
        <div className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-foreground/90">
          {block.content}
        </div>
      );

    case "image":
      return (
        <figure className="my-2">
          {/* biome-ignore lint/performance/noImgElement: user-provided arbitrary URLs, next/image requires domain allowlisting */}
          <img
            src={block.content}
            alt={block.label ?? ""}
            className="max-w-full rounded-lg border border-border"
          />
          {block.label && (
            <figcaption className="mt-2 text-center text-xs italic text-muted-foreground">
              {block.label}
            </figcaption>
          )}
        </figure>
      );

    case "video": {
      const embedUrl = getVideoEmbedUrl(block.content);

      return (
        <div className="my-2">
          {embedUrl ? (
            <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted">
              <iframe
                src={embedUrl}
                title={block.label || "Video"}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={block.content}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-2"
            >
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
              {block.label || "Watch video"}
            </a>
          )}

          {block.label && embedUrl && (
            <p className="mt-2 text-center text-xs italic text-muted-foreground">
              {block.label}
            </p>
          )}
        </div>
      );
    }

    case "file":
      return (
        <button
          type="button"
          onClick={() =>
            handleFileDownload(block.content, block.label || "file")
          }
          className="group cursor-pointer flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:bg-muted/50"
        >
          <div
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted"
          >
            <FileIcon className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium transition-colors group-hover:text-foreground/80">
              {block.label || "Download file"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Click to download
            </p>
          </div>

          <ExternalLink
            aria-hidden
            className="h-3.5 w-3.5 text-muted-foreground"
          />
        </button>
      );

    case "link":
      return (
        <a
          href={block.content}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
        >
          <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          {block.label || block.content}
        </a>
      );

    default:
      return null;
  }
};
