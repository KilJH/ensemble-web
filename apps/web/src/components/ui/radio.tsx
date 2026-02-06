'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const RadioGroup = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className = '', ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={`grid gap-2 ${className}`} {...props} />
));
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
  description?: string;
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ label, description, className = '', id, ...props }, ref) => {
    const radioId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          className={`
            peer
            flex items-center justify-center
            w-5 h-5 shrink-0
            bg-surface border border-border
            rounded-full
            transition-normal
            focus-ring
            hover:border-text-subtle
            data-[state=checked]:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {(label || description) && (
          <div className="grid gap-0.5">
            {label && (
              <label htmlFor={radioId} className="text-sm font-medium text-text cursor-pointer">
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
RadioGroupItem.displayName = 'RadioGroupItem';
