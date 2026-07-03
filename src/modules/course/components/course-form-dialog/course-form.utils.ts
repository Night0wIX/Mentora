export function getFieldErrorMessage(
  errors: ReadonlyArray<unknown>,
  isTouched: boolean,
): string | undefined {
  if (!isTouched || errors.length === 0) return undefined;

  const [firstError] = errors;

  if (typeof firstError === "string") return firstError;

  if (
    firstError &&
    typeof firstError === "object" &&
    "message" in firstError &&
    typeof firstError.message === "string"
  ) {
    return firstError.message;
  }

  return undefined;
}
