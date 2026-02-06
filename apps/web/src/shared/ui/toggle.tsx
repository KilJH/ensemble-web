'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

interface ToggleProps extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-8 px-2',
  md: 'h-10 px-3',
  lg: 'h-12 px-4',
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ size = 'md', className = '', ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={`
        inline-flex items-center justify-center
        rounded-md
        text-sm font-medium
        text-text-muted
        transition-normal
        focus-ring
        hover:bg-surface-2 hover:text-text
        data-[state=on]:bg-primary-muted data-[state=on]:text-primary
        disabled:opacity-50 disabled:pointer-events-none
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    />
  ),
);
Toggle.displayName = 'Toggle';

/* Switch - Toggle variant for on/off states */
interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md';
}

const switchSizeStyles = {
  sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
};

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  size = 'md',
}: SwitchProps) {
  const styles = switchSizeStyles[size];

  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={`
          relative inline-flex shrink-0
          ${styles.track}
          rounded-full
          transition-normal
          focus-ring
          ${checked ? 'bg-primary' : 'bg-surface-2'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          className={`
            pointer-events-none
            inline-block
            ${styles.thumb}
            rounded-full
            bg-white shadow-sm
            transition-transform duration-fast
            ${checked ? styles.translate : 'translate-x-0.5'}
          `}
        />
      </button>
      {label && (
        <span className={`text-sm ${disabled ? 'text-text-muted' : 'text-text'}`}>{label}</span>
      )}
    </label>
  );
}
