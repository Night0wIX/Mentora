import type { ExtractedPathParams, PathParams } from "./path-params";
import type {
  ParsedQueryParams,
  QueryParams,
  SerializeQueryParamsOptions,
} from "./query-params";

export type BuildUrlOptions = SerializeQueryParamsOptions;

export interface BuildUrlArguments {
  path: string;
  pathParams?: PathParams;
  query?: QueryParams;
  options?: BuildUrlOptions;
}

export interface SplitUrl {
  origin: string;
  pathname: string;
  hash: string;
}

export interface ParsedUrl {
  pathParams: ExtractedPathParams;
  query: ParsedQueryParams;
}

export interface SplitPathAndSearch {
  pathname: string;
  search: string;
}
