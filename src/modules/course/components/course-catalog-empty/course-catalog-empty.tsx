import { BookOpen } from "lucide-react";

export const CatalogEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
        <BookOpen aria-hidden className="h-7 w-7 text-muted-foreground/50" />
      </div>
      <h2 className="text-base font-semibold">No courses yet</h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        New courses will appear here once they&apos;re published.
      </p>
    </div>
  );
};
