"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { buildCatalogHref } from "../libs/build-catalog-href";
import { parseCatalogSearchParams } from "../libs/parse-catalog-params";
import type {
  CourseCatalogParams,
  CourseCatalogSearchParams,
  CourseSortField,
  ResolvedCourseCatalogParams,
  SortOrder,
} from "../types";

interface ApplyCatalogParamsOptions {
  /** Reset pagination to page 1 — used whenever search or sort criteria change. */
  resetPage?: boolean;
}

interface UseCourseCatalogParamsReturn {
  params: ResolvedCourseCatalogParams;
  setSearch: (value: string) => void;
  setSort: (sort: CourseSortField, order: SortOrder) => void;
  setPage: (page: number) => void;
  reset: () => void;
}

function readCatalogSearchParams(
  searchParams: URLSearchParams,
): CourseCatalogSearchParams {
  return {
    search: searchParams.get("search") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    order: searchParams.get("order") ?? undefined,
    page: searchParams.get("page") ?? undefined,
  };
}

export function useCourseCatalogParams(): UseCourseCatalogParamsReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => parseCatalogSearchParams(readCatalogSearchParams(searchParams)),
    [searchParams],
  );

  const applyParams = useCallback(
    (
      changes: Partial<CourseCatalogParams>,
      options: ApplyCatalogParamsOptions = {},
    ) => {
      const resolvedPage = options.resetPage
        ? undefined
        : (changes.page ?? params.page);

      const href = buildCatalogHref(
        params,
        { ...changes, page: resolvedPage },
        pathname,
      ) as Route;

      router.replace(href, { scroll: false });
    },
    [params, pathname, router],
  );

  const setSearch = useCallback(
    (value: string) =>
      applyParams({ search: value || undefined }, { resetPage: true }),
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
    router.replace(buildCatalogHref({}, {}, pathname) as Route, {
      scroll: false,
    });
  }, [pathname, router]);

  return { params, setSearch, setSort, setPage, reset };
}
