import { buildUrl } from "@/shared/libs/url";

import { DEFAULT_CATALOG_ORDER, DEFAULT_CATALOG_SORT } from "../constants";
import type { CourseCatalogParams } from "../types";

export function buildCatalogHref(
  params: CourseCatalogParams,
  overrides: Partial<CourseCatalogParams> = {},
  pathname = "/",
): string {
  const merged = { ...params, ...overrides };

  return buildUrl({
    path: pathname,
    query: {
      search: merged.search,
      sort: merged.sort === DEFAULT_CATALOG_SORT ? undefined : merged.sort,
      order: merged.order === DEFAULT_CATALOG_ORDER ? undefined : merged.order,
      page: merged.page && merged.page > 1 ? merged.page : undefined,
    },
    options: { dropEmptyStrings: true, sortKeys: true },
  });
}
