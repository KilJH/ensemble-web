import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn, generateId } from '@/lib/utils';

export type InputVariant = 'default' | 'filled' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default: 'bg-surface border border-border hover:border-text-subtle',
  filled: 'bg-surface-2 border border-transparent hover:bg-surface-2/80',
  ghost: 'bg-transparent border border-transparent hover:bg-surface',
};

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-2.5 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-lg',
};

const iconPaddingStyles: Record<InputSize, { left: string; right: string }> = {
  sm: { left: 'pl-8', right: 'pr-8' },
  md: { left: 'pl-10', right: 'pr-10' },
  lg: { left: 'pl-12', right: 'pr-12' },
};

const iconSizeStyles: Record<InputSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const iconPositionStyles: Record<InputSize, { left: string; right: string }> = {
  sm: { left: 'left-2', right: 'right-2' },
  md: { left: 'left-3', right: 'right-3' },
  lg: { left: 'left-4', right: 'right-4' },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id || (label ? generateId('input') : undefined);
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 text-text-muted pointer-events-none',
                iconPositionStyles[size].left,
              )}
            >
              <span className={iconSizeStyles[size]}>{leftIcon}</span>
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              // Base styles
              'w-full rounded-md',
              'text-text placeholder:text-text-subtle',
              'transition-normal',
              'focus-ring',
              // Variant & Size
              variantStyles[variant],
              sizeStyles[size],
              // Icon padding
              leftIcon && iconPaddingStyles[size].left,
              rightIcon && iconPaddingStyles[size].right,
              // Error state
              hasError && 'border-danger focus:outline-danger hover:border-danger',
              // Disabled state
              disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 text-text-muted pointer-events-none',
                iconPositionStyles[size].right,
              )}
            >
              <span className={iconSizeStyles[size]}>{rightIcon}</span>
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
