'use client';

import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            flex items-center gap-3
            w-full max-w-sm p-4
            bg-surface-elevated border border-border
            rounded-lg shadow-lg
            text-sm text-text
          `,
          title: 'font-medium',
          description: 'text-text-muted',
          actionButton: `
            px-3 py-1.5
            bg-primary text-primary-foreground
            rounded-md text-sm font-medium
            hover:bg-primary-hover
            transition-normal
          `,
          cancelButton: `
            px-3 py-1.5
            bg-surface-2 text-text
            rounded-md text-sm font-medium
            hover:bg-border
            transition-normal
          `,
          success: 'border-green-500/50',
          warning: 'border-yellow-500/50',
          error: 'border-red-500/50',
          info: 'border-blue-500/50',
        },
      }}
    />
  );
}

type ToastOptions = Parameters<typeof sonnerToast>[1];

export const toast = {
  success: (message: string, options?: ToastOptions) => sonnerToast.success(message, options),
  error: (message: string, options?: ToastOptions) => sonnerToast.error(message, options),
  warning: (message: string, options?: ToastOptions) => sonnerToast.warning(message, options),
  info: (message: string, options?: ToastOptions) => sonnerToast.info(message, options),
  message: (message: string, options?: ToastOptions) => sonnerToast(message, options),
  promise: <T,>(promise: Promise<T>, options: Parameters<typeof sonnerToast.promise<T>>[1]) =>
    sonnerToast.promise(promise, options),
  dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
};
