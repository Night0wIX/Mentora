export function createPlaceholderKeys(count: number): string[] {
  const length = Math.max(0, Math.floor(count));
  return Array.from({ length }, (_, index) => `placeholder-${index}`);
}
