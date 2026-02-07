/**
 * Design System
 * 디자인 토큰 및 유틸리티 통합 export
 *
 * @searchable design, system, tokens, palette
 */

// Palette (색상 정의)
export { palette, semanticColors, type PaletteColor, type SemanticMode } from './palette';

// Tokens
export {
  // Sizes
  sizeTokens,
  type ComponentSize,
  type InputSize,
  // Colors
  stateClasses,
  type SemanticVariant,
  // Effects
  radiusTokens,
  shadowTokens,
  blurTokens,
  type RadiusSize,
  type ShadowSize,
  // Spacing
  spacingTokens,
  layoutSpacing,
  componentSpacing,
  type SpacingKey,
} from './tokens';

// Utilities
export { cn, generateId } from './utils';
export { createVariants, type VariantPropsOf } from './utils';
