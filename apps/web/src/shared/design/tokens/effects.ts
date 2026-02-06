/**
 * Effect Tokens
 * 그림자, 반경, 블러 토큰
 */

/**
 * Border Radius 토큰
 */
export const radiusTokens = {
  sm: 'rounded-sm', // 8px
  md: 'rounded-md', // 12px
  lg: 'rounded-lg', // 16px
  xl: 'rounded-xl', // 20px
  '2xl': 'rounded-2xl', // 24px
  full: 'rounded-full',
} as const;

/**
 * Shadow 토큰
 */
export const shadowTokens = {
  none: '',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  glass: 'shadow-glass',
  glowPrimary: 'shadow-glow-primary',
  glowSecondary: 'shadow-glow-secondary',
} as const;

/**
 * Blur 토큰 (CSS 변수 참조)
 */
export const blurTokens = {
  sm: 'var(--blur-sm)', // 4px
  md: 'var(--blur-md)', // 8px
  lg: 'var(--blur-lg)', // 16px
  xl: 'var(--blur-xl)', // 24px
} as const;

export type RadiusSize = keyof typeof radiusTokens;
export type ShadowSize = keyof typeof shadowTokens;
