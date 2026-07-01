"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, type Transition } from "motion/react";

import { formatRelativeDate } from "@/shared/utils";

import type { CourseCardBodyProps } from "./course-card.types";

const ARROW_VARIANTS = {
  rest: { x: 0, y: 1 },
  hover: { x: 2, y: -1 },
};

interface CourseCardBodyInternalProps extends CourseCardBodyProps {
  transition: Transition;
}

export const CourseCardBody = ({
  title,
  description,
  createdAt,
  transition,
}: CourseCardBodyInternalProps) => {
  const { relative, dateTime } = formatRelativeDate(createdAt);

  return (
    <div className="space-y-2 p-4 sm:p-5">
      <h3 className="line-clamp-2 min-h-10 wrap-break-word text-sm font-semibold leading-snug text-foreground">
        {title}
      </h3>

      <p className="line-clamp-2 min-h-8 wrap-break-word text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="flex items-center justify-between gap-2 pt-2">
        <time
          dateTime={dateTime}
          className="text-[11px] text-muted-foreground/70"
        >
          {relative}
        </time>

        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground">
          Open
          <motion.span
            variants={ARROW_VARIANTS}
            transition={transition}
            className="inline-flex"
          >
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </motion.span>
        </span>
      </div>
    </div>
  );
};
