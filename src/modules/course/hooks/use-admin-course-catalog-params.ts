"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { buildCatalogHref } from "../libs/build-catalog-href";
import { parseAdminCatalogSearchParams } from "../libs/parse-admin-catalog-params";
import type {
  AdminCourseCatalogSearchParams,
  CourseCatalogParams,
  CourseSortField,
  CourseStatus,
  ResolvedAdminCourseCatalogParams,
  SortOrder,
} from "../types";

interface ApplyAdminCatalogParamsOptions {
  resetPage?: boolean;
}

interface UseAdminCourseCatalogParamsReturn {
  params: ResolvedAdminCourseCatalogParams;
  setSearch: (value: string) => void;
  setStatus: (status: CourseStatus | undefined) => void;
  setSort: (sort: CourseSortField, order: SortOrder) => void;
  setPage: (page: number) => void;
  reset: () => void;
}

function readAdminCatalogSearchParams(
  searchParams: URLSearchParams,
): AdminCourseCatalogSearchParams {
  return {
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    order: searchParams.get("order") ?? undefined,
    page: searchParams.get("page") ?? undefined,
  };
}

export function useAdminCourseCatalogParams(): UseAdminCourseCatalogParamsReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () =>
      parseAdminCatalogSearchParams(readAdminCatalogSearchParams(searchParams)),
    [searchParams],
  );

  const navigate = useCallback(
    (href: string) => router.replace(href as Route, { scroll: false }),
    [router],
  );

  const applyParams = useCallback(
    (
      changes: Partial<CourseCatalogParams>,
      options: ApplyAdminCatalogParamsOptions = {},
    ) => {
      const overrides = options.resetPage
        ? { ...changes, page: undefined }
        : changes;

      navigate(buildCatalogHref(params, overrides, pathname));
    },
    [params, pathname, navigate],
  );

  const setSearch = useCallback(
    (value: string) =>
      applyParams({ search: value.trim() || undefined }, { resetPage: true }),
    [applyParams],
  );

  const setStatus = useCallback(
    (status: CourseStatus | undefined) =>
      applyParams({ status }, { resetPage: true }),
    [applyParams],
  );

  const setSort = useCallback(
    (sort: CourseSortField, order: SortOrder) =>
      applyParams({ sort, order }, { resetPage: true }),
    [applyParams],
  );

  const setPage = useCallback(
    (page: number) => applyParams({ page }),
    [applyParams],
  );

  const reset = useCallback(() => {
    navigate(buildCatalogHref({}, {}, pathname));
  }, [pathname, navigate]);

  return { params, setSearch, setStatus, setSort, setPage, reset };
}
