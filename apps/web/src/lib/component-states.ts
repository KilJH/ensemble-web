/**
 * Shared component state classes and size tokens
 * Ensures consistency across all UI components
 */

/**
 * Common state classes for interactive components
 */
export const stateClasses = {
  /** Disabled state - reduces opacity and prevents interaction */
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',

  /** Loading state - slightly reduced opacity with wait cursor */
  loading: 'opacity-70 cursor-wait pointer-events-none',

  /** Focus ring - keyboard accessibility (from globals.css) */
  focusRing: 'focus-ring',

  /** Interactive base - for clickable elements */
  interactive: 'cursor-pointer transition-normal',

  /** Error state - for form validation */
  error: 'border-danger focus:outline-danger',
} as const;

/**
 * Size tokens for consistent sizing across components
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

/**
 * Common size type for components
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common input sizes (without xs/xl)
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Semantic color variants for status/feedback
 */
export type SemanticVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * Border radius tokens
 */
export const radiusTokens = {
  sm: 'rounded-sm', // 8px
  md: 'rounded-md', // 12px
  lg: 'rounded-lg', // 16px
  xl: 'rounded-xl', // 20px
  full: 'rounded-full',
} as const;

/**
 * Shadow tokens
 */
export const shadowTokens = {
  none: '',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;
