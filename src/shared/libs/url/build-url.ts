import type {
  BuildUrlOptions,
  PathParams,
  QueryParams,
  SplitUrl,
} from "@/shared/types";

import {
  ABSOLUTE_URL_SCHEME_PATTERN,
  QUERY_STRING_SEPARATOR_FOR_EXISTING_QUERY,
  QUERY_STRING_SEPARATOR_FOR_NEW_QUERY,
} from "./constants";
import { applyPathParams } from "./path";
import { serializeQueryParams } from "./query";

function splitOriginFromPath(path: string): SplitUrl {
  if (!ABSOLUTE_URL_SCHEME_PATTERN.test(path)) {
    return { origin: "", pathname: path, hash: "" };
  }

  const parsedUrl = new URL(path);

  return {
    origin: parsedUrl.origin,
    pathname: parsedUrl.pathname + parsedUrl.search,
    hash: parsedUrl.hash,
  };
}

function resolvePathname(
  pathname: string,
  pathParams: PathParams | undefined,
): string {
  return pathParams ? applyPathParams(pathname, pathParams) : pathname;
}

function resolveQueryString(
  query: QueryParams | undefined,
  options: BuildUrlOptions | undefined,
): string {
  return query ? serializeQueryParams(query, options ?? {}) : "";
}

function appendQueryString(pathname: string, queryString: string): string {
  if (!queryString) {
    return pathname;
  }

  const separator = pathname.includes("?")
    ? QUERY_STRING_SEPARATOR_FOR_EXISTING_QUERY
    : QUERY_STRING_SEPARATOR_FOR_NEW_QUERY;

  return `${pathname}${separator}${queryString}`;
}

export function buildUrl(
  path: string,
  pathParams?: PathParams,
  query?: QueryParams,
  options?: BuildUrlOptions,
): string {
  const { origin, pathname, hash } = splitOriginFromPath(path);

  const resolvedPathname = resolvePathname(pathname, pathParams);
  const queryString = resolveQueryString(query, options);
  const fullPathname = appendQueryString(resolvedPathname, queryString);

  return `${origin}${fullPathname}${hash}`;
}
