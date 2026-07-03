import type { Route } from "next";
import { redirect } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { Pagination } from "@/shared/ui/pagination";
import { pluralize } from "@/shared/utils";

import { getAdminCourses } from "../../admin-api";
import { buildCatalogHref } from "../../libs/build-catalog-href";
import { parseAdminCatalogSearchParams } from "../../libs/parse-admin-catalog-params";
import type { AdminCourseCatalogSearchParams } from "../../types";
import { AdminCourseList } from "../admin-course-list";
import { CatalogEmptyState } from "../course-catalog-empty";

interface AdminCatalogResultsProps {
  searchParams: Promise<AdminCourseCatalogSearchParams>;
}

export const AdminCatalogResults = async ({
  searchParams,
}: AdminCatalogResultsProps) => {
  const rawSearchParams = await searchParams;
  const catalogParams = parseAdminCatalogSearchParams(rawSearchParams);

  const result = await getAdminCourses(catalogParams);

  const isRequestedPageOutOfRange = result.page !== catalogParams.page;
  if (isRequestedPageOutOfRange) {
    redirect(
      buildCatalogHref(
        catalogParams,
        { page: result.page },
        ROUTES.adminCourses,
      ) as Route,
    );
  }

  const hasActiveFilters = Boolean(
    catalogParams.search || catalogParams.status,
  );

  if (result.items.length === 0) {
    return (
      <CatalogEmptyState
        variant={hasActiveFilters ? "no-results" : "no-courses"}
        resetHref={
          hasActiveFilters
            ? (buildCatalogHref({}, {}, ROUTES.adminCourses) as Route)
            : undefined
        }
      />
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
        {result.total} {pluralize(result.total, "course")}
      </p>

      <AdminCourseList courses={result.items} />

      <Pagination
        currentPage={result.page}
        totalPageCount={result.totalPages}
        getPageHref={(pageNumber) =>
          buildCatalogHref(
            catalogParams,
            { page: pageNumber },
            ROUTES.adminCourses,
          ) as Route
        }
      />
    </>
  );
};
