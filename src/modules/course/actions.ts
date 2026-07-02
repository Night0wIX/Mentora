"use server";

import type { CourseSuggestion } from "./api";
import { searchCourseSuggestions as fetchCourseSuggestions } from "./api";
import { CATALOG_SUGGESTIONS_LIMIT } from "./constants";

export async function searchCourseSuggestions(
  query: string,
): Promise<CourseSuggestion[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) return [];

  return fetchCourseSuggestions(trimmedQuery, CATALOG_SUGGESTIONS_LIMIT);
}
