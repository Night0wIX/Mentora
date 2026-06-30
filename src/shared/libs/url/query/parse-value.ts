import { FALSE_BOOLEAN_TOKENS, TRUE_BOOLEAN_TOKENS } from "./constants";

function isBlank(raw: string): boolean {
  return raw.trim() === "";
}

export function parseAsString(raw: string | null): string | undefined {
  if (raw === null) {
    return undefined;
  }

  return raw;
}

export function parseAsNumber(raw: string | null): number | undefined {
  if (raw === null || isBlank(raw)) {
    return undefined;
  }

  const parsedValue = Number(raw);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

export function parseAsBoolean(raw: string | null): boolean | undefined {
  if (raw === null) {
    return undefined;
  }

  if (TRUE_BOOLEAN_TOKENS.has(raw)) {
    return true;
  }

  if (FALSE_BOOLEAN_TOKENS.has(raw)) {
    return false;
  }

  return undefined;
}

export function parseAsDate(raw: string | null): Date | undefined {
  if (raw === null || isBlank(raw)) {
    return undefined;
  }

  const parsedDate = new Date(raw);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}

export function parseAsGuessedPrimitive(
  raw: string | null,
): string | number | boolean | undefined {
  if (raw === null) {
    return undefined;
  }

  if (TRUE_BOOLEAN_TOKENS.has(raw)) {
    return true;
  }

  if (FALSE_BOOLEAN_TOKENS.has(raw)) {
    return false;
  }

  const parsedNumber = parseAsNumber(raw);

  if (parsedNumber !== undefined) {
    return parsedNumber;
  }

  return raw;
}
