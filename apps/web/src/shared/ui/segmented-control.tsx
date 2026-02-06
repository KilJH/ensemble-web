'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: SegmentedControlSize;
  disabled?: boolean;
  name?: string;
}

const containerSizeStyles: Record<SegmentedControlSize, string> = {
  sm: 'p-0.5 gap-0.5',
  md: 'p-1 gap-1',
  lg: 'p-1.5 gap-1.5',
};

const buttonSizeStyles: Record<SegmentedControlSize, string> = {
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-3 py-1.5 text-base',
  lg: 'px-4 py-2 text-lg',
};

function SegmentedControlInner<T extends string>(
  {
    options,
    value,
    onChange,
    size = 'md',
    disabled = false,
    name,
    className,
    ...props
  }: SegmentedControlProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={name}
      className={cn(
        'inline-flex items-center',
        'bg-surface-2 rounded-lg',
        containerSizeStyles[size],
        disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(option.value)}
            className={cn(
              'font-medium rounded-md',
              'transition-all',
              'focus-ring',
              buttonSizeStyles[size],
              isSelected ? 'bg-surface text-text shadow-sm' : 'text-text-muted hover:text-text',
              isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export const SegmentedControl = forwardRef(SegmentedControlInner) as <T extends string>(
  props: SegmentedControlProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;
