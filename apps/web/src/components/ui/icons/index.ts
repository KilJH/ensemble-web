/**
 * Icon System Exports
 *
 * Registry-based icon system with unified API.
 */

// Main component
export { Icon, type IconComponentProps } from './Icon';

// Registry & types
export { iconRegistry, type IconName, type IconDefinition } from './registry';
export {
  type IconSize,
  type IconTone,
  type IconRotate,
  type IconFlip,
  type IconProps,
  SIZE_MAP,
  SIZE_CLASS_MAP,
  STROKE_WIDTH_MAP,
  TONE_CLASS_MAP,
  ROTATE_CLASS_MAP,
  FLIP_CLASS_MAP,
} from './types';
