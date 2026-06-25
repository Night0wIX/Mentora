export function createPlaceholderKeys(count: number) {
  return Array.from({ length: count }, (_, index) => `placeholder-${index}`);
}
