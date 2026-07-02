import type { ReactNode } from "react";

import type { MatchRange } from "./match-course-query";

const HIGHLIGHT_CLASS_NAME =
  "rounded-sm bg-transparent font-semibold text-foreground";

export function highlightRanges(text: string, ranges: MatchRange[]): ReactNode {
  if (ranges.length === 0) return text;

  const segments: ReactNode[] = [];
  let cursor = 0;

  for (const [start, end] of ranges) {
    if (start > cursor) {
      segments.push(text.slice(cursor, start));
    }

    segments.push(
      <mark key={`${start}-${end}`} className={HIGHLIGHT_CLASS_NAME}>
        {text.slice(start, end)}
      </mark>,
    );

    cursor = end;
  }

  if (cursor < text.length) {
    segments.push(text.slice(cursor));
  }

  return segments;
}
