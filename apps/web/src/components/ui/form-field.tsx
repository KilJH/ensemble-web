import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn, generateId } from '@/lib/utils';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}

/**
 * FormField - Wrapper component for form controls
 * Provides consistent label, error, and hint layout
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, hint, required, htmlFor, className, children, ...props }, ref) => {
    const fieldId = htmlFor || (label ? generateId('field') : undefined);
    const hasError = !!error;

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-text">
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        {children}
        {error && (
          <p
            id={fieldId ? `${fieldId}-error` : undefined}
            className="text-sm text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !hasError && (
          <p id={fieldId ? `${fieldId}-hint` : undefined} className="text-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';

/**
 * Fieldset - Group related form controls
 */
export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  error?: string;
  children: ReactNode;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, error, className, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
        {legend && <legend className="text-sm font-medium text-text mb-1">{legend}</legend>}
        {children}
        {error && (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  },
);

Fieldset.displayName = 'Fieldset';
