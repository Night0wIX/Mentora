import { parseAsEnum } from "@/shared/libs/url/query";

import { COURSE_STATUSES } from "../constants";
import type {
  AdminCourseCatalogSearchParams,
  CourseStatus,
  ResolvedAdminCourseCatalogParams,
} from "../types";
import {
  parsePage,
  parseSearch,
  parseSortField,
  parseSortOrder,
} from "./catalog-param-parsers";

function parseStatus(raw: string | undefined): CourseStatus | undefined {
  return parseAsEnum(raw ?? null, COURSE_STATUSES) ?? undefined;
}

export function parseAdminCatalogSearchParams(
  searchParams: AdminCourseCatalogSearchParams,
): ResolvedAdminCourseCatalogParams {
  return {
    search: parseSearch(searchParams.search),
    status: parseStatus(searchParams.status),
    sort: parseSortField(searchParams.sort),
    order: parseSortOrder(searchParams.order),
    page: parsePage(searchParams.page),
  };
}
