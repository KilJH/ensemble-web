'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, description, className = '', id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-3">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          className={`
            peer
            flex items-center justify-center
            w-5 h-5 shrink-0
            bg-surface border border-border
            rounded
            transition-normal
            focus-ring
            hover:border-text-subtle
            data-[state=checked]:bg-primary data-[state=checked]:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="text-primary-foreground">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {(label || description) && (
          <div className="grid gap-0.5">
            {label && (
              <label htmlFor={checkboxId} className="text-sm font-medium text-text cursor-pointer">
                {label}
              </label>
            )}
            {description && <p className="text-sm text-text-muted">{description}</p>}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
