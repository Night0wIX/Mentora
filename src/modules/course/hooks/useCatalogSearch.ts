"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { useDebouncedValue } from "@/shared/hooks";

import { searchCourseSuggestions } from "../actions";
import type { CourseSuggestion } from "../api";
import {
  CATALOG_SEARCH_DEBOUNCE_MS,
  CATALOG_SEARCH_MIN_CHARS,
} from "../constants";
import { useCourseCatalogParams } from "./use-course-catalog-params";

interface UseCatalogSearchInputReturn {
  inputValue: string;
  debouncedInputValue: string;
  setInputValue: (value: string) => void;
  commitInputValue: () => void;
  clearInputValue: () => void;
}

export function useCatalogSearchInput(): UseCatalogSearchInputReturn {
  const { params, setSearch } = useCourseCatalogParams();

  const [inputValue, setInputValue] = useState(params.search ?? "");
  const debouncedInputValue = useDebouncedValue(
    inputValue,
    CATALOG_SEARCH_DEBOUNCE_MS,
  );
  const lastSyncedValueRef = useRef(params.search ?? "");

  useEffect(() => {
    const trimmedValue = debouncedInputValue.trim();
    if (trimmedValue === lastSyncedValueRef.current) return;

    lastSyncedValueRef.current = trimmedValue;
    setSearch(trimmedValue);
  }, [debouncedInputValue, setSearch]);

  useEffect(() => {
    const urlValue = params.search ?? "";
    if (urlValue === lastSyncedValueRef.current) return;

    lastSyncedValueRef.current = urlValue;
    setInputValue(urlValue);
  }, [params.search]);

  function commitInputValue(): void {
    const trimmedValue = inputValue.trim();
    lastSyncedValueRef.current = trimmedValue;
    setSearch(trimmedValue);
  }

  function clearInputValue(): void {
    lastSyncedValueRef.current = "";
    setInputValue("");
    setSearch("");
  }

  return {
    inputValue,
    debouncedInputValue,
    setInputValue,
    commitInputValue,
    clearInputValue,
  };
}

interface UseCourseSearchSuggestionsReturn {
  suggestions: CourseSuggestion[];
  isPending: boolean;
}

/**
 * Fetches course suggestions for `query`. Expects an already-debounced
 * query. Guards against out-of-order responses: if `query` changes again
 * before a request resolves, the stale response is discarded.
 */
export function useCourseSearchSuggestions(
  query: string,
): UseCourseSearchSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);
  const [isPending, startTransition] = useTransition();
  const latestRequestIdRef = useRef(0);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < CATALOG_SEARCH_MIN_CHARS) {
      setSuggestions([]);
      return;
    }

    const requestId = ++latestRequestIdRef.current;

    startTransition(async () => {
      const results = await searchCourseSuggestions(trimmedQuery);

      if (requestId === latestRequestIdRef.current) {
        setSuggestions(results);
      }
    });
  }, [query]);

  return { suggestions, isPending };
}
