import { forwardRef, type HTMLAttributes } from 'react';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-2 text-text-muted',
  primary: 'bg-primary-muted text-primary',
  secondary: 'bg-secondary-muted text-secondary',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  outline: 'bg-transparent border border-border text-text-muted',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center
          px-2 py-0.5
          text-xs font-medium
          rounded-full
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

/* Tag - Similar to Badge but with close button */
interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  onRemove?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'default', onRemove, className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1
          px-2 py-0.5
          text-xs font-medium
          rounded-md
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-0.5 hover:opacity-70 transition-normal"
            aria-label="Remove"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
              <path d="M9.354 2.646a.5.5 0 010 .708L6.707 6l2.647 2.646a.5.5 0 01-.708.708L6 6.707l-2.646 2.647a.5.5 0 01-.708-.708L5.293 6 2.646 3.354a.5.5 0 11.708-.708L6 5.293l2.646-2.647a.5.5 0 01.708 0z" />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

/* Chip - Interactive selection element */
interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  disabled?: boolean;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected = false, disabled = false, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={`
          inline-flex items-center
          px-3 py-1.5
          text-sm font-medium
          rounded-full
          border
          transition-normal
          focus-ring
          ${
            selected
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent text-text border-border hover:border-text-subtle'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Chip.displayName = 'Chip';
