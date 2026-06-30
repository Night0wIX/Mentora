import type {
  ParsedUrl,
  ParseQueryParamsOptions,
  SplitPathAndSearch,
} from "@/shared/types";

import { URL_PATH_AND_QUERY_SEPARATOR } from "./constants";
import { extractPathParams } from "./path";
import { parseQueryParams } from "./query";

function splitPathAndSearch(actualUrl: string): SplitPathAndSearch {
  const [pathname, search = ""] = actualUrl.split(URL_PATH_AND_QUERY_SEPARATOR);

  return { pathname, search };
}

export function parseUrl(
  template: string,
  actualUrl: string,
  queryOptions?: ParseQueryParamsOptions,
): ParsedUrl | null {
  const { pathname, search } = splitPathAndSearch(actualUrl);

  const pathParams = extractPathParams(template, pathname);

  if (pathParams === null) {
    return null;
  }

  const query = parseQueryParams(search, queryOptions);

  return { pathParams, query };
}
