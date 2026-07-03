import { createPlaceholderKeys } from "@/shared/utils";

import { CATALOG_PAGE_SIZE } from "../../constants";
import { CourseCardSkeleton } from "../course-card";
import { CourseCardGrid } from "../course-card-grid";

export const CatalogResultsSkeleton = () => {
  const placeholders = createPlaceholderKeys(CATALOG_PAGE_SIZE);

  return (
    <CourseCardGrid>
      {placeholders.map((key) => (
        <CourseCardSkeleton key={key} />
      ))}
    </CourseCardGrid>
  );
};
