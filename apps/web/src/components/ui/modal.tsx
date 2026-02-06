'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export const ModalContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  }
>(({ size = 'md', className = '', children, ...props }, ref) => {
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
  };

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-modal-backdrop bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        className={`
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          z-modal
          w-full ${sizeStyles[size]}
          p-6
          bg-surface-elevated border border-border
          rounded-xl shadow-xl
          animate-in fade-in-0 zoom-in-95
          focus:outline-none
          ${className}
        `}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 p-1 rounded-md text-text-muted hover:text-text hover:bg-surface-2 transition-normal focus-ring">
          <CloseIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
ModalContent.displayName = 'ModalContent';

export const ModalHeader = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props} />
  ),
);
ModalHeader.displayName = 'ModalHeader';

export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className = '', ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold text-text ${className}`}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className = '', ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`mt-1 text-sm text-text-muted ${className}`}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

export const ModalFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`mt-6 flex justify-end gap-2 ${className}`} {...props} />
  ),
);
ModalFooter.displayName = 'ModalFooter';

function CloseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
    </svg>
  );
}

/* Alert Dialog for confirmations */
interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel?: () => void;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalFooter>
          <button
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            className="px-4 py-2 text-sm font-medium text-text bg-surface-2 rounded-md hover:bg-border transition-normal focus-ring"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-normal focus-ring
              ${
                variant === 'danger'
                  ? 'bg-danger text-white hover:bg-red-600'
                  : 'bg-primary text-primary-foreground hover:bg-primary-hover'
              }
            `}
          >
            {confirmLabel}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
