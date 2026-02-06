'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/lib/utils';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

const sideStyles: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full border-r',
  right: 'right-0 top-0 h-full border-l',
  top: 'top-0 left-0 w-full border-b',
  bottom: 'bottom-0 left-0 w-full border-t',
};

const sideAnimations: Record<DrawerSide, string> = {
  left: 'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  right: 'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  top: 'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom: 'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
};

const horizontalSizeStyles: Record<DrawerSize, string> = {
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-[480px]',
  xl: 'w-[640px]',
  full: 'w-full',
};

const verticalSizeStyles: Record<DrawerSize, string> = {
  sm: 'h-48',
  md: 'h-72',
  lg: 'h-96',
  xl: 'h-[480px]',
  full: 'h-full',
};

export interface DrawerContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  side?: DrawerSide;
  size?: DrawerSize;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ side = 'right', size = 'md', className, children, ...props }, ref) => {
    const isHorizontal = side === 'left' || side === 'right';
    const sizeClass = isHorizontal ? horizontalSizeStyles[size] : verticalSizeStyles[size];

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-modal-backdrop',
            'bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed z-modal',
            'flex flex-col',
            'bg-surface-elevated border-border',
            'shadow-xl',
            'focus:outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:duration-300 data-[state=closed]:duration-200',
            sideStyles[side],
            sideAnimations[side],
            sizeClass,
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={cn(
              'absolute top-4 right-4 p-1 rounded-md',
              'text-text-muted hover:text-text hover:bg-surface-2',
              'transition-normal focus-ring',
            )}
          >
            <CloseIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 p-6 pb-0', className)} {...props} />
  ),
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-text', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-muted', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

export const DrawerBody = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-y-auto p-6', className)} {...props} />
  ),
);
DrawerBody.displayName = 'DrawerBody';

export const DrawerFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-2',
        'p-6 pt-0 border-t border-border mt-auto',
        className,
      )}
      {...props}
    />
  ),
);
DrawerFooter.displayName = 'DrawerFooter';

function CloseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
    </svg>
  );
}
