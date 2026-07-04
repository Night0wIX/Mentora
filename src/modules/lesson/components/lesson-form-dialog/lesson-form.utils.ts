export function getFieldErrorMessage(
  errors: unknown[],
  isTouched: boolean,
): string | undefined {
  if (!isTouched || errors.length === 0) return undefined;

  const firstError = errors[0];

  if (typeof firstError === "string") return firstError;

  if (
    firstError &&
    typeof firstError === "object" &&
    "message" in firstError &&
    typeof (firstError as { message: unknown }).message === "string"
  ) {
    return (firstError as { message: string }).message;
  }

  return undefined;
}
