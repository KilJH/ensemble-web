'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn, generateId } from '@/lib/utils';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: CheckboxSize;
  label?: string;
  description?: string;
  error?: string;
}

const sizeStyles: Record<CheckboxSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
};

const indicatorSizeStyles: Record<CheckboxSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ size = 'md', label, description, error, className, id, ...props }, ref) => {
    const checkboxId = id || (label ? generateId('checkbox') : undefined);
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            aria-invalid={hasError}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            className={cn(
              'peer',
              'flex items-center justify-center shrink-0',
              'bg-surface border rounded',
              'transition-normal',
              'focus-ring',
              sizeStyles[size],
              hasError ? 'border-danger' : 'border-border hover:border-text-subtle',
              'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="text-primary-foreground">
              <CheckIcon size={size} />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          {(label || description) && (
            <div className="grid gap-0.5">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    'text-sm font-medium cursor-pointer',
                    hasError ? 'text-danger' : 'text-text',
                  )}
                >
                  {label}
                </label>
              )}
              {description && <p className="text-sm text-text-muted">{description}</p>}
            </div>
          )}
        </div>
        {error && (
          <p id={`${checkboxId}-error`} className="text-sm text-danger ml-8">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

function CheckIcon({ size }: { size: CheckboxSize }) {
  return (
    <svg className={indicatorSizeStyles[size]} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
    </svg>
  );
}
