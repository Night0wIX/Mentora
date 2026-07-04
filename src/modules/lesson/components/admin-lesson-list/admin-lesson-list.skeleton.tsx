import { createPlaceholderKeys } from "@/shared/utils";

import { AdminLessonRowSkeleton } from "../admin-lesson-row";

interface AdminLessonListSkeletonProps {
  count: number;
}

export const AdminLessonListSkeleton = ({
  count,
}: AdminLessonListSkeletonProps) => (
  <ul aria-hidden className="space-y-2">
    {createPlaceholderKeys(count).map((key) => (
      <AdminLessonRowSkeleton key={key} />
    ))}
  </ul>
);
