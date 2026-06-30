export type PathParamValue = string | number | string[];

export type PathParams = Record<string, PathParamValue>;

export type ExtractedPathParams = Record<string, string | string[]>;

export type PathSegmentModifier = "?" | "*" | "+";

export interface PathSegmentMatch {
  parameterName: string;
  modifier: PathSegmentModifier | undefined;
}
