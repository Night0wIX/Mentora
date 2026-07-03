import { ADMIN_CATALOG_PAGE_SIZE } from "./constants";
import { MOCK_COURSES } from "./mocks";
import type { CourseCatalogParams, CourseCatalogResult } from "./types";

const ADMIN_API_DELAY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function matchesSearch(title: string, search: string): boolean {
  return title.toLowerCase().includes(search.toLowerCase());
}

export async function getAdminCourses(
  params: CourseCatalogParams,
): Promise<CourseCatalogResult> {
  await delay(ADMIN_API_DELAY_MS);

  const pageSize = params.pageSize ?? ADMIN_CATALOG_PAGE_SIZE;
  const page = params.page ?? 1;

  let items = [...MOCK_COURSES];

  if (params.status) {
    items = items.filter((course) => course.status === params.status);
  }

  if (params.search) {
    const search = params.search;
    items = items.filter((course) => matchesSearch(course.title, search));
  }

  const sortField = params.sort ?? "createdAt";
  const order = params.order ?? "desc";

  items.sort((a, b) => {
    const direction = order === "asc" ? 1 : -1;

    if (sortField === "title") {
      return a.title.localeCompare(b.title) * direction;
    }

    return (
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
      direction
    );
  });

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}
