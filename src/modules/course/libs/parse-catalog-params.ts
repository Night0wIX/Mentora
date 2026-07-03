import type {
  CourseCatalogSearchParams,
  ResolvedCourseCatalogParams,
} from "../types";
import {
  parsePage,
  parseSearch,
  parseSortField,
  parseSortOrder,
} from "./catalog-param-parsers";

export function parseCatalogSearchParams(
  searchParams: CourseCatalogSearchParams,
): ResolvedCourseCatalogParams {
  return {
    search: parseSearch(searchParams.search),
    sort: parseSortField(searchParams.sort),
    order: parseSortOrder(searchParams.order),
    page: parsePage(searchParams.page),
  };
}
