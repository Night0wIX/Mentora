import { createSupabaseServerClient } from "@/shared/libs/supabase/server";

import {
  CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_ORDER,
  DEFAULT_CATALOG_PAGE,
  DEFAULT_CATALOG_SORT,
} from "./constants";
import { mapCourseRow } from "./libs/map-course-row";
import {
  type CourseQueryMatch,
  matchCourseTitle,
} from "./libs/match-course-query";
import type { Course, CourseCatalogParams, CourseCatalogResult } from "./types";

function normalizePageSize(pageSize: number | undefined): number {
  if (pageSize === undefined || !Number.isInteger(pageSize) || pageSize < 1) {
    return CATALOG_PAGE_SIZE;
  }
  return pageSize;
}

async function getPublishedCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published");

  if (error) throw error;

  return (data ?? []).map(mapCourseRow);
}

interface MatchedCourseEntry {
  course: Course;
  match: CourseQueryMatch & { matched: true };
}

export interface CourseSuggestion {
  course: Course;
  ranges: CourseQueryMatch["ranges"];
}

function isMatchedEntry(entry: {
  course: Course;
  match: CourseQueryMatch;
}): entry is MatchedCourseEntry {
  return entry.match.matched;
}

export async function searchCourseSuggestions(
  query: string,
  limit: number,
): Promise<CourseSuggestion[]> {
  const courses = await getPublishedCourses();

  return courses
    .map((course) => ({ course, match: matchCourseTitle(course.title, query) }))
    .filter(isMatchedEntry)
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, limit)
    .map((entry) => ({ course: entry.course, ranges: entry.match.ranges }));
}

function filterBySearch(
  courses: Course[],
  search: string | undefined,
): Course[] {
  const trimmedSearch = search?.trim();
  if (!trimmedSearch) return courses;

  return courses.filter(
    (course) => matchCourseTitle(course.title, trimmedSearch).matched,
  );
}

function sortCourses(
  courses: Course[],
  sort: CourseCatalogParams["sort"],
  order: CourseCatalogParams["order"],
): Course[] {
  const field = sort ?? DEFAULT_CATALOG_SORT;
  const direction = order ?? DEFAULT_CATALOG_ORDER;
  const multiplier = direction === "asc" ? 1 : -1;

  return [...courses].sort((a, b) => {
    if (field === "title") {
      return a.title.localeCompare(b.title) * multiplier;
    }
    return (
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
      multiplier
    );
  });
}

interface PaginationResult {
  items: Course[];
  totalPages: number;
  clampedPage: number;
}

function paginate(
  courses: Course[],
  page: number,
  pageSize: number,
): PaginationResult {
  const totalPages = Math.max(1, Math.ceil(courses.length / pageSize));
  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  const start = (clampedPage - 1) * pageSize;

  return {
    items: courses.slice(start, start + pageSize),
    totalPages,
    clampedPage,
  };
}

export async function getCourses(
  params: CourseCatalogParams = {},
): Promise<CourseCatalogResult> {
  const pageSize = normalizePageSize(params.pageSize);
  const requestedPage = params.page ?? DEFAULT_CATALOG_PAGE;

  const courses = await getPublishedCourses();
  const bySearch = filterBySearch(courses, params.search);
  const sorted = sortCourses(bySearch, params.sort, params.order);

  const { items, totalPages, clampedPage } = paginate(
    sorted,
    requestedPage,
    pageSize,
  );

  return {
    items,
    total: sorted.length,
    page: clampedPage,
    pageSize,
    totalPages,
  };
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data ? mapCourseRow(data) : null;
}
