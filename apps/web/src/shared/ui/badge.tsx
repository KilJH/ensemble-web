import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-2 text-text-muted',
  primary: 'bg-primary-muted text-primary',
  secondary: 'bg-secondary-muted text-secondary',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
  info: 'bg-info-muted text-info',
  outline: 'bg-transparent border border-border text-text-muted',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-0.5',
  md: 'px-2 py-0.5 text-xs gap-1',
  lg: 'px-2.5 py-1 text-sm gap-1.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', icon, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center',
          'font-medium rounded-full',
          'whitespace-nowrap',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

/* Tag - Similar to Badge but with close button */

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  onRemove?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'default', size = 'md', icon, onRemove, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center',
          'font-medium rounded-md',
          'whitespace-nowrap',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon}
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-0.5 hover:opacity-70 transition-normal focus-ring rounded"
            aria-label="Remove"
          >
            <CloseIcon size={size} />
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

/* Chip - Interactive selection element */

export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

const chipSizeStyles: Record<ChipSize, string> = {
  sm: 'px-2 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    { size = 'md', selected = false, disabled = false, icon, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'inline-flex items-center',
          'font-medium rounded-full',
          'border transition-normal',
          'focus-ring',
          chipSizeStyles[size],
          selected
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-transparent text-text border-border hover:border-text-subtle',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  },
);

Chip.displayName = 'Chip';

/* Close Icon for Tag */

function CloseIcon({ size }: { size: BadgeSize }) {
  const sizeClass = size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  return (
    <svg className={sizeClass} viewBox="0 0 12 12" fill="currentColor">
      <path d="M9.354 2.646a.5.5 0 010 .708L6.707 6l2.647 2.646a.5.5 0 01-.708.708L6 6.707l-2.646 2.647a.5.5 0 01-.708-.708L5.293 6 2.646 3.354a.5.5 0 11.708-.708L6 5.293l2.646-2.647a.5.5 0 01.708 0z" />
    </svg>
  );
}
