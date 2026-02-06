'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type TabsVariant = 'underline' | 'pills';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ variant = 'underline', size = 'md', className, ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      className={cn('flex flex-col', className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  ),
);
Tabs.displayName = 'Tabs';

const listVariantStyles: Record<TabsVariant, string> = {
  underline: 'border-b border-border gap-4',
  pills: 'bg-surface-2 p-1 rounded-lg gap-1',
};

const listSizeStyles: Record<TabsSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant = 'underline', size = 'md', className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'flex items-center',
        listVariantStyles[variant],
        listSizeStyles[size],
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = 'TabsList';

const triggerUnderlineSizeStyles: Record<TabsSize, string> = {
  sm: 'px-1 pb-2',
  md: 'px-1 pb-3',
  lg: 'px-1 pb-4',
};

const triggerPillsSizeStyles: Record<TabsSize, string> = {
  sm: 'px-2 py-1',
  md: 'px-3 py-1.5',
  lg: 'px-4 py-2',
};

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ variant = 'underline', size = 'md', className, ...props }, ref) => {
    const isUnderline = variant === 'underline';
    const sizeStyles = isUnderline
      ? triggerUnderlineSizeStyles[size]
      : triggerPillsSizeStyles[size];

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'relative font-medium',
          'text-text-muted',
          'transition-colors',
          'focus-ring rounded-md',
          'disabled:opacity-50 disabled:pointer-events-none',
          sizeStyles,
          // Underline variant
          isUnderline && [
            'hover:text-text',
            'data-[state=active]:text-primary',
            // Active indicator
            'after:absolute after:bottom-0 after:left-0 after:right-0',
            'after:h-0.5 after:bg-transparent',
            'data-[state=active]:after:bg-primary',
            'after:transition-colors',
          ],
          // Pills variant
          !isUnderline && [
            'rounded-md',
            'hover:text-text hover:bg-surface',
            'data-[state=active]:bg-surface data-[state=active]:text-text',
            'data-[state=active]:shadow-sm',
          ],
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-4', 'focus:outline-none', 'data-[state=inactive]:hidden', className)}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
