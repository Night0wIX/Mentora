import type { CourseSortField, SortOrder } from "../../types";

export type SortOptionValue = `${CourseSortField}-${SortOrder}`;

export interface SortOption {
  value: SortOptionValue;
  sort: CourseSortField;
  order: SortOrder;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    value: "createdAt-desc",
    sort: "createdAt",
    order: "desc",
    label: "Newest first",
  },
  {
    value: "createdAt-asc",
    sort: "createdAt",
    order: "asc",
    label: "Oldest first",
  },
  { value: "title-asc", sort: "title", order: "asc", label: "Title (A–Z)" },
  { value: "title-desc", sort: "title", order: "desc", label: "Title (Z–A)" },
];

export const SORT_OPTIONS_BY_VALUE = new Map<SortOptionValue, SortOption>(
  SORT_OPTIONS.map((option) => [option.value, option]),
);

export function toSortOptionValue(
  sort: CourseSortField,
  order: SortOrder,
): SortOptionValue {
  return `${sort}-${order}`;
}
