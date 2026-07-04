"use client";

import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverMenuItem,
  PopoverTrigger,
} from "@/shared/ui/popover";

import type { LessonContentBlockType } from "../../types";
import { CONTENT_BLOCK_TYPE_OPTIONS } from "./add-content-block-menu.constants";

interface AddContentBlockMenuProps {
  onAddBlock: (type: LessonContentBlockType) => void;
}

export const AddContentBlockMenu = ({
  onAddBlock,
}: AddContentBlockMenuProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="w-full border-dashed">
        <Plus aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Add block
      </Button>
    </PopoverTrigger>

    <PopoverContent align="center" className="w-44">
      <ul aria-label="Block types">
        {CONTENT_BLOCK_TYPE_OPTIONS.map((option) => (
          <li key={option.type}>
            <PopoverClose asChild>
              <PopoverMenuItem
                role="menuitem"
                onClick={() => onAddBlock(option.type)}
              >
                <option.icon
                  aria-hidden
                  className="h-3.5 w-3.5 text-muted-foreground"
                />
                {option.label}
              </PopoverMenuItem>
            </PopoverClose>
          </li>
        ))}
      </ul>
    </PopoverContent>
  </Popover>
);
