/**
 * Class Name Utilities
 * 클래스 병합 및 ID 생성
 */

type ClassValue = string | number | bigint | undefined | null | boolean | string[];

/**
 * 클래스 이름 병합 - falsy 값 필터링
 * clsx/classnames 대안
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
 * 폼 요소용 고유 ID 생성
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
