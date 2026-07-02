import type { CourseSortField, SortOrder } from "./types";

export const CATALOG_PAGE_SIZE = 8;
export const DEFAULT_CATALOG_PAGE = 1;

export const DEFAULT_CATALOG_SORT: CourseSortField = "createdAt";
export const DEFAULT_CATALOG_ORDER: SortOrder = "desc";

export const CATALOG_SORT_FIELDS = ["title", "createdAt"] as const;
export const SORT_ORDERS = ["asc", "desc"] as const;

export const CATALOG_SEARCH_DEBOUNCE_MS = 300;
export const CATALOG_SEARCH_MIN_CHARS = 2;
export const CATALOG_SUGGESTIONS_LIMIT = 5;
