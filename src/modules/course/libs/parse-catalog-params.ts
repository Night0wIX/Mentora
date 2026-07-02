import {
  parseAsEnum,
  parseAsNumber,
  parseAsString,
} from "@/shared/libs/url/query";

import {
  CATALOG_SORT_FIELDS,
  DEFAULT_CATALOG_ORDER,
  DEFAULT_CATALOG_PAGE,
  DEFAULT_CATALOG_SORT,
  SORT_ORDERS,
} from "../constants";
import type {
  CourseCatalogSearchParams,
  CourseSortField,
  ResolvedCourseCatalogParams,
  SortOrder,
} from "../types";

function parseSortField(raw: string | undefined): CourseSortField {
  return parseAsEnum(raw ?? null, CATALOG_SORT_FIELDS) ?? DEFAULT_CATALOG_SORT;
}

function parseSortOrder(raw: string | undefined): SortOrder {
  return parseAsEnum(raw ?? null, SORT_ORDERS) ?? DEFAULT_CATALOG_ORDER;
}

function parsePage(raw: string | undefined): number {
  const value = parseAsNumber(raw ?? null);

  if (value === undefined || !Number.isInteger(value) || value < 1) {
    return DEFAULT_CATALOG_PAGE;
  }

  return value;
}

export function parseCatalogSearchParams(
  searchParams: CourseCatalogSearchParams,
): ResolvedCourseCatalogParams {
  const search = parseAsString(searchParams.search ?? null)?.trim();

  return {
    search: search || undefined,
    sort: parseSortField(searchParams.sort),
    order: parseSortOrder(searchParams.order),
    page: parsePage(searchParams.page),
  };
}
