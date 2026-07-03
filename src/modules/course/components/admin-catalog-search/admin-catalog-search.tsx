"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useDebouncedValue } from "@/shared/hooks";
import { cn } from "@/shared/utils";

import { CATALOG_SEARCH_DEBOUNCE_MS } from "../../constants";
import { useAdminCourseCatalogParams } from "../../hooks/use-admin-course-catalog-params";

export const AdminCatalogSearch = () => {
  const { params, setSearch } = useAdminCourseCatalogParams();
  const [inputValue, setInputValue] = useState(params.search ?? "");
  const debouncedValue = useDebouncedValue(
    inputValue,
    CATALOG_SEARCH_DEBOUNCE_MS,
  );
  const lastSyncedRef = useRef(params.search ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const trimmed = debouncedValue.trim();
    if (trimmed === lastSyncedRef.current) return;

    lastSyncedRef.current = trimmed;
    setSearch(trimmed);

    if (trimmed !== debouncedValue) {
      setInputValue(trimmed);
    }
  }, [debouncedValue, setSearch]);

  useEffect(() => {
    const urlValue = params.search ?? "";
    if (urlValue === lastSyncedRef.current) return;
    lastSyncedRef.current = urlValue;
    setInputValue(urlValue);
  }, [params.search]);

  const handleClear = () => {
    setInputValue("");
    lastSyncedRef.current = "";
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={inputRef}
        type="text"
        aria-label="Search courses"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Search courses..."
        className={cn(
          "h-9 w-full rounded-lg border border-border bg-background pl-9 pr-8 text-sm",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      />
      {inputValue && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
