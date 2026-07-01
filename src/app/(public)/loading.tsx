import { createPlaceholderKeys } from "@/shared/utils";

import {
  CATALOG_PAGE_SIZE,
  CourseCardGrid,
  CourseCardSkeleton,
} from "@/modules/course";

const CourseCatalogLoading = () => {
  const placeholders = createPlaceholderKeys(CATALOG_PAGE_SIZE);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 md:px-6">
      <CourseCardGrid>
        {placeholders.map((key) => (
          <CourseCardSkeleton key={key} />
        ))}
      </CourseCardGrid>
    </div>
  );
};

export default CourseCatalogLoading;
