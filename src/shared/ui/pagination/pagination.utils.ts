import {
  MAX_VISIBLE_PAGES_WITHOUT_COLLAPSE,
  PAGINATION_ELLIPSIS,
  SIBLING_PAGE_COUNT,
} from "./pagination.constants";
import type { PaginationItem } from "./pagination.types";

export function getVisiblePaginationItems(
  currentPage: number,
  totalPageCount: number,
): PaginationItem[] {
  if (totalPageCount <= MAX_VISIBLE_PAGES_WITHOUT_COLLAPSE) {
    return Array.from({ length: totalPageCount }, (_, index) => index + 1);
  }

  const alwaysVisiblePages = new Set<number>([
    1,
    totalPageCount,
    currentPage,
    currentPage - SIBLING_PAGE_COUNT,
    currentPage + SIBLING_PAGE_COUNT,
  ]);

  const sortedPages = [...alwaysVisiblePages]
    .filter((page) => page >= 1 && page <= totalPageCount)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];
    const hasGapBeforePage = index > 0 && page - previousPage > 1;

    if (hasGapBeforePage) {
      items.push(PAGINATION_ELLIPSIS);
    }

    items.push(page);
  });

  return items;
}
