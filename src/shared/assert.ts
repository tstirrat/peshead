export class AssertionError extends Error {}

/**
 * Asserts that an expression is truthy, and returns the value with null and
 * undefined removed from its type.
 */
export function assert<T>(
  condition: T | null | undefined,
  message: string = 'value must be truthy',
  ...messageParams: Array<{}>
) {
  if (!condition) {
    throw new AssertionError(`Assertion failed: ${message}`);
  }
  return condition!;
}
