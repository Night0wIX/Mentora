import { Skeleton } from "@/shared/ui/skeleton";

import { ADMIN_LESSON_LIST_GRID_TEMPLATE } from "../../constants";

export const AdminLessonRowSkeleton = () => (
  <li
    className={`flex items-center gap-3 rounded-lg border border-border px-3 py-3 md:grid md:gap-4 ${ADMIN_LESSON_LIST_GRID_TEMPLATE}`}
  >
    <Skeleton shape="circular" className="h-4 w-4" />
    <Skeleton shape="text" className="h-4 w-2/3 max-w-64" />
    <div className="flex justify-end gap-1">
      <Skeleton shape="circular" className="h-8 w-8" />
      <Skeleton shape="circular" className="h-8 w-8" />
    </div>
  </li>
);
