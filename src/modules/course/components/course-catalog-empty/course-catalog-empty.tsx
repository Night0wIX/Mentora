import { BookOpen, SearchX } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

interface CatalogEmptyStateProps {
  variant: "no-courses" | "no-results";
  resetHref?: string;
}

export const CatalogEmptyState = ({
  variant,
  resetHref,
}: CatalogEmptyStateProps) => {
  const isNoResults = variant === "no-results";

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
        {isNoResults ? (
          <SearchX aria-hidden className="h-7 w-7 text-muted-foreground/50" />
        ) : (
          <BookOpen aria-hidden className="h-7 w-7 text-muted-foreground/50" />
        )}
      </div>
      <h2 className="text-base font-semibold">
        {isNoResults ? "No courses found" : "No courses yet"}
      </h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        {isNoResults
          ? "Try a different search term or clear your filters."
          : "New courses will appear here once they're published."}
      </p>
      {isNoResults && resetHref && (
        <Link
          href={resetHref as Route}
          className="mt-4 text-sm font-medium underline underline-offset-4"
        >
          Reset search
        </Link>
      )}
    </div>
  );
};
