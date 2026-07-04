import { FileIcon, ImageIcon, LinkIcon, Type, Video } from "lucide-react";

import type { LessonContentBlockType } from "../../types";

interface ContentBlockTypeOption {
  type: LessonContentBlockType;
  label: string;
  icon: typeof Type;
}

export const CONTENT_BLOCK_TYPE_OPTIONS: ContentBlockTypeOption[] = [
  { type: "text", label: "Text", icon: Type },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "video", label: "Video", icon: Video },
  { type: "file", label: "File", icon: FileIcon },
  { type: "link", label: "Link", icon: LinkIcon },
];
