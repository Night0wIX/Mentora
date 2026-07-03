import { capitalize, cn } from "@/shared/utils";

import type { CourseStatus } from "../../types";
import { STATUS_BADGE_STYLES } from "./course-status-badge.constants";

interface CourseStatusBadgeProps {
  status: CourseStatus;
  className?: string;
}

export const CourseStatusBadge = ({
  status,
  className,
}: CourseStatusBadgeProps) => (
  <span
    role="status"
    className={cn(
      "inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-xs font-medium",
      STATUS_BADGE_STYLES[status],
      className,
    )}
  >
    {capitalize(status)}
  </span>
);
