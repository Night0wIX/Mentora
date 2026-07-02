import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { cn } from "@/shared/utils";

import { PAGINATION_ELLIPSIS } from "./pagination.constants";
import type {
  PaginationEdgeControlProps,
  PaginationProps,
} from "./pagination.types";
import { getVisiblePaginationItems } from "./pagination.utils";

const NAVIGATION_ITEM_CLASSNAME =
  "flex size-10 items-center justify-center rounded-lg border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const Pagination = ({
  currentPage,
  totalPageCount,
  getPageHref,
}: PaginationProps) => {
  if (totalPageCount <= 1) return null;

  const visibleItems = getVisiblePaginationItems(currentPage, totalPageCount);

  return (
    <nav aria-label="Pagination" className="flex justify-center pt-8">
      <ul className="flex items-center gap-1">
        <li>
          <PaginationEdgeControl
            direction="previous"
            href={getPageHref(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        </li>

        {visibleItems.map((item, index) =>
          item === PAGINATION_ELLIPSIS ? (
            <li
              key={`ellipsis-before-${visibleItems[index + 1]}`}
              aria-hidden="true"
            >
              <span className="flex size-10 items-center justify-center text-sm text-muted-foreground">
                …
              </span>
            </li>
          ) : (
            <li key={item}>
              <Link
                href={getPageHref(item) as Route}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? "page" : undefined}
                className={cn(
                  NAVIGATION_ITEM_CLASSNAME,
                  "hover:border-foreground/40",
                  item === currentPage &&
                    "border-foreground bg-foreground text-background hover:border-foreground",
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}

        <li>
          <PaginationEdgeControl
            direction="next"
            href={getPageHref(currentPage + 1)}
            disabled={currentPage >= totalPageCount}
          />
        </li>
      </ul>
    </nav>
  );
};

const PaginationEdgeControl = ({
  direction,
  href,
  disabled,
}: PaginationEdgeControlProps) => {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
  const label = direction === "previous" ? "Previous page" : "Next page";

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-label={label}
        className={cn(
          NAVIGATION_ITEM_CLASSNAME,
          "cursor-not-allowed opacity-40",
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </button>
    );
  }

  return (
    <Link
      href={href as Route}
      aria-label={label}
      className={cn(NAVIGATION_ITEM_CLASSNAME, "hover:border-foreground/40")}
    >
      <Icon className="size-4" aria-hidden="true" />
    </Link>
  );
};
