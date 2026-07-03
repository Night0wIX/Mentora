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
import type { CourseSortField, SortOrder } from "../types";

export function parseSortField(raw: string | undefined): CourseSortField {
  return parseAsEnum(raw ?? null, CATALOG_SORT_FIELDS) ?? DEFAULT_CATALOG_SORT;
}

export function parseSortOrder(raw: string | undefined): SortOrder {
  return parseAsEnum(raw ?? null, SORT_ORDERS) ?? DEFAULT_CATALOG_ORDER;
}

export function parsePage(raw: string | undefined): number {
  const value = parseAsNumber(raw ?? null);

  if (value === undefined || !Number.isInteger(value) || value < 1) {
    return DEFAULT_CATALOG_PAGE;
  }

  return value;
}

export function parseSearch(raw: string | undefined): string | undefined {
  return parseAsString(raw ?? null)?.trim() || undefined;
}
