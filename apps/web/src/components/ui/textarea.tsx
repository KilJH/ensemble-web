import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn, generateId } from '@/lib/utils';

export type TextareaVariant = 'default' | 'filled' | 'ghost';
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  label?: string;
  error?: string;
  hint?: string;
}

const variantStyles: Record<TextareaVariant, string> = {
  default: 'bg-surface border border-border hover:border-text-subtle',
  filled: 'bg-surface-2 border border-transparent hover:bg-surface-2/80',
  ghost: 'bg-transparent border border-transparent hover:bg-surface',
};

const sizeStyles: Record<TextareaSize, string> = {
  sm: 'px-2.5 py-1.5 text-sm min-h-[80px]',
  md: 'px-3 py-2 text-base min-h-[100px]',
  lg: 'px-4 py-2.5 text-lg min-h-[120px]',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { variant = 'default', size = 'md', label, error, hint, className, id, disabled, ...props },
    ref,
  ) => {
    const textareaId = id || (label ? generateId('textarea') : undefined);
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={cn(
            // Base styles
            'w-full rounded-md resize-y',
            'text-text placeholder:text-text-subtle',
            'transition-normal',
            'focus-ring',
            // Variant & Size
            variantStyles[variant],
            sizeStyles[size],
            // Error state
            hasError && 'border-danger focus:outline-danger hover:border-danger',
            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          aria-invalid={hasError}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-danger">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
