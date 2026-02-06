/**
 * Size Tokens
 * 컴포넌트 사이즈 일관성을 위한 토큰
 */

export const sizeTokens = {
  xs: {
    height: 'h-6',
    padding: 'px-2',
    paddingY: 'py-1',
    text: 'text-xs',
    gap: 'gap-1',
    iconSize: 12,
  },
  sm: {
    height: 'h-8',
    padding: 'px-3',
    paddingY: 'py-1.5',
    text: 'text-sm',
    gap: 'gap-1.5',
    iconSize: 16,
  },
  md: {
    height: 'h-10',
    padding: 'px-4',
    paddingY: 'py-2',
    text: 'text-base',
    gap: 'gap-2',
    iconSize: 20,
  },
  lg: {
    height: 'h-12',
    padding: 'px-6',
    paddingY: 'py-2.5',
    text: 'text-lg',
    gap: 'gap-2.5',
    iconSize: 24,
  },
  xl: {
    height: 'h-14',
    padding: 'px-8',
    paddingY: 'py-3',
    text: 'text-xl',
    gap: 'gap-3',
    iconSize: 28,
  },
} as const;

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputSize = 'sm' | 'md' | 'lg';
