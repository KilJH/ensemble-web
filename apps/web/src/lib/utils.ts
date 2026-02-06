/**
 * Utility functions for component styling
 */

type ClassValue = string | number | bigint | undefined | null | boolean | string[];

/**
 * Merges class names, filtering out falsy values
 * Supports arrays for conditional class groups
 * Simple alternative to clsx/classnames
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const c of classes) {
    if (!c) continue;
    if (typeof c === 'string') {
      result.push(c);
    } else if (Array.isArray(c)) {
      for (const item of c) {
        if (typeof item === 'string' && item) {
          result.push(item);
        }
      }
    }
  }

  return result.join(' ');
}

/**
 * Generates a unique ID for form elements
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
