'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn, generateId } from '@/lib/utils';

export type RadioSize = 'sm' | 'md';

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  error?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ error, className, id, ...props }, ref) => {
    const groupId = id || generateId('radio-group');
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1">
        <RadioGroupPrimitive.Root
          ref={ref}
          id={groupId}
          aria-invalid={hasError}
          aria-describedby={error ? `${groupId}-error` : undefined}
          className={cn('grid gap-2', className)}
          {...props}
        />
        {error && (
          <p id={`${groupId}-error`} className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  size?: RadioSize;
  label?: string;
  description?: string;
}

const sizeStyles: Record<RadioSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
};

const indicatorSizeStyles: Record<RadioSize, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
};

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ size = 'md', label, description, className, id, ...props }, ref) => {
    const radioId = id || (label ? generateId('radio') : undefined);

    return (
      <div className="flex items-start gap-3">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          className={cn(
            'peer',
            'flex items-center justify-center shrink-0',
            'bg-surface border border-border rounded-full',
            'transition-normal',
            'focus-ring',
            sizeStyles[size],
            'hover:border-text-subtle',
            'data-[state=checked]:border-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className,
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className={cn('rounded-full bg-primary', indicatorSizeStyles[size])} />
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
