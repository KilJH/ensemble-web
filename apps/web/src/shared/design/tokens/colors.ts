/**
 * Color Tokens
 * 시맨틱 색상 클래스 및 상태 클래스
 */

/**
 * 공통 상태 클래스
 */
export const stateClasses = {
  /** Disabled - 투명도 감소, 상호작용 방지 */
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',

  /** Loading - 약간의 투명도, 대기 커서 */
  loading: 'opacity-70 cursor-wait pointer-events-none',

  /** Focus ring - 키보드 접근성 (globals.css 정의) */
  focusRing: 'focus-ring',

  /** Interactive - 클릭 가능 요소 */
  interactive: 'cursor-pointer transition-normal',

  /** Error - 폼 검증 오류 */
  error: 'border-danger focus:outline-danger',
} as const;

/**
 * 시맨틱 색상 variant 타입
 */
export type SemanticVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
