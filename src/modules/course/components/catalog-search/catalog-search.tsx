"use client";

import { Search, X } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { Popover as PopoverPrimitive } from "radix-ui";
import { type KeyboardEvent, useRef, useState } from "react";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/utils";

import type { CourseSuggestion } from "../../api";
import { CATALOG_SEARCH_MIN_CHARS } from "../../constants";
import {
  useCatalogSearchInput,
  useCourseSearchSuggestions,
} from "../../hooks/useCatalogSearch";
import { highlightRanges } from "../../libs/highlight-ranges";

const NO_ACTIVE_INDEX = -1;

function resolveStatusMessage(isPending: boolean, resultCount: number): string {
  if (isPending) return "Updating results";
  if (resultCount === 0) return "No matches";
  return `${resultCount} ${resultCount === 1 ? "result" : "results"} found`;
}

export function CatalogSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    inputValue,
    debouncedInputValue,
    setInputValue,
    commitInputValue,
    clearInputValue,
  } = useCatalogSearchInput();
  const { suggestions, isPending } =
    useCourseSearchSuggestions(debouncedInputValue);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(NO_ACTIVE_INDEX);

  const previousSuggestionsRef = useRef(suggestions);
  if (previousSuggestionsRef.current !== suggestions) {
    previousSuggestionsRef.current = suggestions;
    if (activeIndex !== NO_ACTIVE_INDEX) setActiveIndex(NO_ACTIVE_INDEX);
  }

  const isDropdownVisible =
    isOpen && inputValue.trim().length >= CATALOG_SEARCH_MIN_CHARS;
  const statusMessage = resolveStatusMessage(isPending, suggestions.length);

  function selectSuggestion(suggestion: CourseSuggestion): void {
    setIsOpen(false);
    router.push(ROUTES.course(suggestion.course.slug) as Route);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (!isDropdownVisible || suggestions.length === 0) {
      if (event.key === "Escape") setIsOpen(false);
      return;
    }

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % suggestions.length);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setActiveIndex((index) =>
          index <= 0 ? suggestions.length - 1 : index - 1,
        );
        break;
      }
      case "Enter": {
        event.preventDefault();
        if (activeIndex !== NO_ACTIVE_INDEX) {
          selectSuggestion(suggestions[activeIndex]);
        } else {
          setIsOpen(false);
          commitInputValue();
        }
        break;
      }
      case "Escape": {
        setIsOpen(false);
        break;
      }
      default:
        break;
    }
  }

  return (
    <PopoverPrimitive.Root open={isDropdownVisible} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Anchor asChild>
        <div className="relative w-full sm:max-w-xs">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isDropdownVisible}
            aria-controls="catalog-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex !== NO_ACTIVE_INDEX
                ? `catalog-search-option-${activeIndex}`
                : undefined
            }
            aria-label="Search courses"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              setIsOpen(true);
              setActiveIndex(NO_ACTIVE_INDEX);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onKeyDown={handleKeyDown}
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
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                clearInputValue();
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <span className="sr-only" role="status" aria-live="polite">
            {isDropdownVisible ? statusMessage : ""}
          </span>
        </div>
      </PopoverPrimitive.Anchor>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          id="catalog-search-listbox"
          role="listbox"
          aria-busy={isPending}
          onOpenAutoFocus={(event) => event.preventDefault()}
          sideOffset={4}
          className={cn(
            "z-50 w-(--radix-popover-trigger-width) overflow-hidden rounded-lg border border-border bg-card shadow-md",
            "data-[state=open]:motion-safe:animate-in data-[state=open]:motion-safe:fade-in-0 data-[state=open]:motion-safe:zoom-in-95",
            "data-[state=closed]:motion-safe:animate-out data-[state=closed]:motion-safe:fade-out-0",
          )}
        >
          {suggestions.length === 0 ? (
            <div className="p-3 text-sm text-muted-foreground">
              {isPending ? "Searching..." : "No matches"}
            </div>
          ) : (
            <ul
              className={cn(
                "max-h-72 overflow-auto p-1",
                isPending && "opacity-60",
              )}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.course.id}
                  id={`catalog-search-option-${index}`}
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectSuggestion(suggestion)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectSuggestion(suggestion);
                    }
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "cursor-pointer truncate rounded-md px-3 py-2 text-sm text-muted-foreground",
                    index === activeIndex && "bg-muted",
                  )}
                >
                  {highlightRanges(suggestion.course.title, suggestion.ranges)}
                </li>
              ))}
            </ul>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
