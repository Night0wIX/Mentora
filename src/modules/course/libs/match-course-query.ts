export type MatchRange = [start: number, end: number];

export interface CourseQueryMatch {
  matched: boolean;
  score: number;
  ranges: MatchRange[];
}

interface WordSpan {
  word: string;
  lowerCaseWord: string;
  start: number;
  end: number;
}

interface FuzzyPrefixMatch {
  prefixLength: number;
  distance: number;
}

interface FuzzyWordMatch {
  range: MatchRange;
  distance: number;
}

const QUERY_TOKEN_SPLIT_PATTERN = /\s+/;
const WORD_PATTERN = /\S+/g;
const WHITESPACE_PATTERN = /\s/;

// Tokens this short can only match exactly — fuzzy matching on 1-2 chars
// produces too many false positives to be useful.
const FUZZY_DISABLED_TOKEN_LENGTH = 2;
const FUZZY_SHORT_TOKEN_LENGTH = 5;
const FUZZY_MAX_DISTANCE_SHORT_TOKEN = 1;
const FUZZY_MAX_DISTANCE_LONG_TOKEN = 2;

const EXACT_MATCH_AT_TITLE_START_SCORE = 3;
const EXACT_MATCH_AT_WORD_BOUNDARY_SCORE = 2;
const EXACT_MATCH_MID_WORD_SCORE = 1;
const FUZZY_MATCH_BASE_SCORE = 1;
const FUZZY_MATCH_DISTANCE_PENALTY = 0.25;
const EXACT_TITLE_MATCH_BONUS = 10;

function tokenizeQuery(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(QUERY_TOKEN_SPLIT_PATTERN)
    .filter(Boolean);
}

function getWordSpans(text: string): WordSpan[] {
  return Array.from(text.matchAll(WORD_PATTERN), (match) => {
    const word = match[0];

    return {
      word,
      lowerCaseWord: word.toLowerCase(),
      start: match.index,
      end: match.index + word.length,
    };
  });
}

function mergeRanges(ranges: MatchRange[]): MatchRange[] {
  const sortedRanges = [...ranges].sort(
    ([aStart], [bStart]) => aStart - bStart,
  );
  const merged: MatchRange[] = [];

  for (const [start, end] of sortedRanges) {
    const lastMerged = merged.at(-1);

    if (lastMerged && start <= lastMerged[1]) {
      merged[merged.length - 1] = [lastMerged[0], Math.max(lastMerged[1], end)];
      continue;
    }

    merged.push([start, end]);
  }

  return merged;
}

function resolveFuzzyMaxDistance(tokenLength: number): number {
  if (tokenLength <= FUZZY_DISABLED_TOKEN_LENGTH) return 0;
  if (tokenLength <= FUZZY_SHORT_TOKEN_LENGTH)
    return FUZZY_MAX_DISTANCE_SHORT_TOKEN;
  return FUZZY_MAX_DISTANCE_LONG_TOKEN;
}

function findBestFuzzyPrefix(
  token: string,
  word: string,
  maxDistance: number,
): FuzzyPrefixMatch | null {
  const rowCount = token.length + 1;
  const columnCount = word.length + 1;

  let previousRow = Array.from({ length: columnCount }, (_, column) => column);

  for (let row = 1; row < rowCount; row++) {
    const currentRow: number[] = [row];

    for (let column = 1; column < columnCount; column++) {
      const substitutionCost = token[row - 1] === word[column - 1] ? 0 : 1;

      currentRow.push(
        Math.min(
          previousRow[column] + 1,
          currentRow[column - 1] + 1,
          previousRow[column - 1] + substitutionCost,
        ),
      );
    }

    previousRow = currentRow;
  }

  let bestPrefixLength = -1;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let column = 0; column < columnCount; column++) {
    if (previousRow[column] < bestDistance) {
      bestDistance = previousRow[column];
      bestPrefixLength = column;
    }
  }

  return bestDistance <= maxDistance
    ? { prefixLength: bestPrefixLength, distance: bestDistance }
    : null;
}

function findExactWordMatch(
  words: WordSpan[],
  token: string,
): MatchRange | null {
  let earliestMatch: MatchRange | null = null;

  for (const word of words) {
    const offset = word.lowerCaseWord.indexOf(token);
    if (offset === -1) continue;

    const start = word.start + offset;

    if (!earliestMatch || start < earliestMatch[0]) {
      earliestMatch = [start, start + token.length];
    }
  }

  return earliestMatch;
}

function findFuzzyWordMatch(
  words: WordSpan[],
  token: string,
): FuzzyWordMatch | null {
  const maxDistance = resolveFuzzyMaxDistance(token.length);
  if (maxDistance === 0) return null;

  let closestMatch: FuzzyWordMatch | null = null;

  for (const word of words) {
    const prefixMatch = findBestFuzzyPrefix(
      token,
      word.lowerCaseWord,
      maxDistance,
    );
    if (!prefixMatch || prefixMatch.prefixLength === 0) continue;

    if (!closestMatch || prefixMatch.distance < closestMatch.distance) {
      closestMatch = {
        range: [word.start, word.start + prefixMatch.prefixLength],
        distance: prefixMatch.distance,
      };
    }
  }

  return closestMatch;
}

function scoreExactMatch(title: string, matchStart: number): number {
  if (matchStart === 0) return EXACT_MATCH_AT_TITLE_START_SCORE;

  const precedingChar = title[matchStart - 1];
  return WHITESPACE_PATTERN.test(precedingChar)
    ? EXACT_MATCH_AT_WORD_BOUNDARY_SCORE
    : EXACT_MATCH_MID_WORD_SCORE;
}

function scoreFuzzyMatch(distance: number): number {
  return FUZZY_MATCH_BASE_SCORE - distance * FUZZY_MATCH_DISTANCE_PENALTY;
}

export function matchCourseTitle(
  title: string,
  query: string,
): CourseQueryMatch {
  const tokens = tokenizeQuery(query);

  if (tokens.length === 0) {
    return { matched: false, score: 0, ranges: [] };
  }

  const words = getWordSpans(title);
  const ranges: MatchRange[] = [];
  let score = 0;

  for (const token of tokens) {
    const exactRange = findExactWordMatch(words, token);

    if (exactRange) {
      ranges.push(exactRange);
      score += scoreExactMatch(title, exactRange[0]);
      continue;
    }

    const fuzzyMatch = findFuzzyWordMatch(words, token);

    if (!fuzzyMatch) {
      return { matched: false, score: 0, ranges: [] };
    }

    ranges.push(fuzzyMatch.range);
    score += scoreFuzzyMatch(fuzzyMatch.distance);
  }

  const isExactTitleMatch =
    title.trim().toLowerCase() === query.trim().toLowerCase();
  if (isExactTitleMatch) score += EXACT_TITLE_MATCH_BONUS;

  return { matched: true, score, ranges: mergeRanges(ranges) };
}
