import { createSupabaseServerClient } from "@/shared/libs/supabase/server";

import { ADMIN_CATALOG_PAGE_SIZE } from "./constants";
import { mapCourseRow } from "./libs/map-course-row";
import type { Course, CourseCatalogParams, CourseCatalogResult } from "./types";

export async function getAdminCourses(
  params: CourseCatalogParams,
): Promise<CourseCatalogResult> {
  const supabase = await createSupabaseServerClient();

  const pageSize = params.pageSize ?? ADMIN_CATALOG_PAGE_SIZE;
  const page = params.page ?? 1;
  const sortColumn = params.sort === "title" ? "title" : "created_at";
  const order = params.order ?? "desc";

  let query = supabase.from("courses").select("*", { count: "exact" });

  if (params.status) query = query.eq("status", params.status);
  if (params.search?.trim())
    query = query.ilike("title", `%${params.search.trim()}%`);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await query
    .order(sortColumn, { ascending: order === "asc" })
    .range(from, to);

  if (error) throw error;

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  return {
    items: (data ?? []).map(mapCourseRow),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getAdminCourse(courseId: string): Promise<Course | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCourseRow(data) : null;
}
