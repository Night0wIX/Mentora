import type { CourseStatus } from "../../types";

// Record<CourseStatus, ...> forces you to add a style when you add a new status.
export const STATUS_BADGE_STYLES: Record<CourseStatus, string> = {
  draft: "border-border bg-muted text-muted-foreground",
  published:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};
