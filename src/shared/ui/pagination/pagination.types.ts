import type { PAGINATION_ELLIPSIS } from "./pagination.constants";

export type PaginationEllipsis = typeof PAGINATION_ELLIPSIS;

export type PaginationItem = number | PaginationEllipsis;

export interface PaginationProps {
  currentPage: number;
  totalPageCount: number;
  getPageHref: (pageNumber: number) => string;
}

export interface PaginationEdgeControlProps {
  direction: "previous" | "next";
  href: string;
  disabled: boolean;
}
