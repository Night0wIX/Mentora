import type { Route } from "next";
import { redirect } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { Pagination } from "@/shared/ui/pagination";
import { pluralize } from "@/shared/utils";

import { getCourses } from "../../api";
import { buildCatalogHref } from "../../libs/build-catalog-href";
import { parseCatalogSearchParams } from "../../libs/parse-catalog-params";
import type { CourseCatalogSearchParams, CourseStatus } from "../../types";
import { CourseCard } from "../course-card";
import { CourseCardGrid } from "../course-card-grid";
import { CatalogEmptyState } from "../course-catalog-empty";

interface CatalogResultsProps {
  searchParams: Promise<CourseCatalogSearchParams>;
}

/** Only published courses are ever shown on the public catalog. */
const PUBLIC_CATALOG_STATUS: CourseStatus = "published";

export const CatalogResults = async ({ searchParams }: CatalogResultsProps) => {
  const rawSearchParams = await searchParams;
  const catalogParams = parseCatalogSearchParams(rawSearchParams);

  const result = await getCourses({
    ...catalogParams,
    status: PUBLIC_CATALOG_STATUS,
  });

  const isRequestedPageOutOfRange = result.page !== catalogParams.page;
  if (isRequestedPageOutOfRange) {
    const canonicalHref = buildCatalogHref(
      catalogParams,
      {
        page: result.page,
      },
      ROUTES.home,
    ) as Route;

    redirect(canonicalHref);
  }

  if (result.items.length === 0) {
    return (
      <CatalogEmptyState
        variant={catalogParams.search ? "no-results" : "no-courses"}
        resetHref={catalogParams.search ? (ROUTES.home as Route) : undefined}
      />
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
        {result.total} {pluralize(result.total, "course")}
      </p>

      <CourseCardGrid>
        {result.items.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </CourseCardGrid>

      <Pagination
        currentPage={result.page}
        totalPageCount={result.totalPages}
        getPageHref={(pageNumber) =>
          buildCatalogHref(
            catalogParams,
            { page: pageNumber },
            ROUTES.home,
          ) as Route
        }
      />
    </>
  );
};
