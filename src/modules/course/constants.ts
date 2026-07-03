import type { CourseSortField, CourseStatus, SortOrder } from "./types";

export const CATALOG_PAGE_SIZE = 8;
export const DEFAULT_CATALOG_PAGE = 1;

export const DEFAULT_CATALOG_SORT: CourseSortField = "createdAt";
export const DEFAULT_CATALOG_ORDER: SortOrder = "desc";

export const CATALOG_SORT_FIELDS = ["title", "createdAt"] as const;
export const SORT_ORDERS = ["asc", "desc"] as const;

export const CATALOG_SEARCH_DEBOUNCE_MS = 300;
export const CATALOG_SEARCH_MIN_CHARS = 2;
export const CATALOG_SUGGESTIONS_LIMIT = 5;

export const ADMIN_CATALOG_PAGE_SIZE = 10;

export const COURSE_STATUSES = [
  "draft",
  "published",
] as const satisfies readonly CourseStatus[];

export const ADMIN_STATUS_FILTER_ALL_VALUE = "all";

export const ADMIN_COURSE_LIST_GRID_TEMPLATE =
  "md:grid-cols-[minmax(0,1fr)_minmax(5rem,7rem)_minmax(6rem,8rem)_minmax(4rem,5rem)]";
