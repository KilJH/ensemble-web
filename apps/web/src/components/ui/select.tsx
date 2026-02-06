'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className = '', children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={`
      flex items-center justify-between
      h-10 w-full px-3
      bg-surface text-text
      border border-border rounded-md
      text-sm
      transition-normal
      placeholder:text-text-subtle
      focus-ring
      hover:border-text-subtle
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg className="w-4 h-4 text-text-muted" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.427 6.427a.75.75 0 011.06-.073L8 8.54l2.513-2.186a.75.75 0 11.987 1.132l-3 2.611a.75.75 0 01-.987 0l-3-2.61a.75.75 0 01-.086-1.06z" />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className = '', children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={`
        z-popover
        min-w-[var(--radix-select-trigger-width)]
        overflow-hidden p-1
        bg-surface-elevated border border-border
        rounded-lg shadow-lg
        animate-in fade-in-0 zoom-in-95
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
        data-[side=bottom]:slide-in-from-top-2
        data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2
        data-[side=top]:slide-in-from-bottom-2
        ${className}
      `}
      {...props}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = 'SelectContent';

export const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className = '', ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={`px-2 py-1.5 text-xs font-medium text-text-muted ${className}`}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

export const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className = '', children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`
      relative flex items-center
      pl-8 pr-2 py-1.5
      text-sm text-text
      rounded-md
      cursor-pointer
      outline-none
      transition-colors
      focus:bg-surface-2
      data-[disabled]:opacity-50 data-[disabled]:pointer-events-none
      ${className}
    `}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className = '', ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={`my-1 h-px bg-border ${className}`} {...props} />
));
SelectSeparator.displayName = 'SelectSeparator';
