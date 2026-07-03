import { createPlaceholderKeys } from "@/shared/utils";

import { ADMIN_CATALOG_PAGE_SIZE } from "../../constants";
import { AdminCourseRowSkeleton } from "../admin-course-row";

export const AdminCatalogResultsSkeleton = () => {
  const placeholders = createPlaceholderKeys(ADMIN_CATALOG_PAGE_SIZE);

  return (
    <table className="w-full overflow-hidden rounded-lg border border-border border-separate border-spacing-0">
      <tbody>
        {placeholders.map((key) => (
          <AdminCourseRowSkeleton key={key} />
        ))}
      </tbody>
    </table>
  );
};
