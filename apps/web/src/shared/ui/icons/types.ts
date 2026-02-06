/**
 * Icon Design System Types
 *
 * Size: xs(12) / sm(16) / md(20) / lg(24) / xl(32)
 * Tone: semantic color tokens
 * State: disabled only (hover/active는 부모가 제어)
 */

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconTone =
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'inherit';

export type IconRotate = 0 | 90 | 180 | 270;

export type IconFlip = 'none' | 'horizontal' | 'vertical';

export interface IconProps {
  /** 아이콘 사이즈 */
  size?: IconSize;
  /** 색상 톤 (semantic token) */
  tone?: IconTone;
  /** filled 스타일 (solid) */
  filled?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 회전 애니메이션 (로딩용) */
  spin?: boolean;
  /** 회전 각도 */
  rotate?: IconRotate;
  /** 뒤집기 */
  flip?: IconFlip;
  /** 추가 클래스 */
  className?: string;

  /* 접근성 */
  /** true면 장식용 (aria-hidden), false면 의미있는 아이콘 */
  decorative?: boolean;
  /** 스크린리더용 제목 (decorative=false 시) */
  title?: string;
  /** 스크린리더용 라벨 (decorative=false 시) */
  ariaLabel?: string;
}

/* Size → px 매핑 */
export const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/* Size → Tailwind 클래스 */
export const SIZE_CLASS_MAP: Record<IconSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

/* Size → strokeWidth */
export const STROKE_WIDTH_MAP: Record<IconSize, number> = {
  xs: 1.5,
  sm: 1.5,
  md: 2,
  lg: 2,
  xl: 2,
};

/* Tone → Tailwind 클래스 */
export const TONE_CLASS_MAP: Record<IconTone, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
  inherit: 'text-current',
};

/* Rotate → Tailwind 클래스 */
export const ROTATE_CLASS_MAP: Record<IconRotate, string> = {
  0: '',
  90: 'rotate-90',
  180: 'rotate-180',
  270: '-rotate-90',
};

/* Flip → Tailwind 클래스 */
export const FLIP_CLASS_MAP: Record<IconFlip, string> = {
  none: '',
  horizontal: 'scale-x-[-1]',
  vertical: 'scale-y-[-1]',
};
