import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-primary-foreground
    hover:bg-primary-hover
    active:bg-primary-pressed
  `,
  secondary: `
    bg-secondary text-secondary-foreground
    hover:bg-secondary-hover
    active:bg-secondary-pressed
  `,
  ghost: `
    bg-transparent text-text
    hover:bg-surface-2
    active:bg-border-muted
  `,
  outline: `
    bg-transparent text-primary
    border border-primary
    hover:bg-primary-muted
    active:bg-primary/20
  `,
  danger: `
    bg-danger text-white
    hover:bg-danger-hover
    active:bg-danger-pressed
  `,
  link: `
    bg-transparent text-primary
    underline-offset-4 hover:underline
    p-0 h-auto
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-base gap-2',
  lg: 'h-12 px-6 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-md font-medium',
          'transition-normal',
          'focus-ring',
          // Variant & Size
          variantStyles[variant],
          variant !== 'link' && sizeStyles[size],
          // State
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';

/* IconButton - Square button for icons only */

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: ReactNode;
  'aria-label': string;
}

const iconButtonSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant = 'ghost', size = 'md', isLoading = false, icon, disabled, className, ...props },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-md',
          'transition-normal',
          'focus-ring',
          // Variant & Size
          variantStyles[variant],
          iconButtonSizeStyles[size],
          // State
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {isLoading ? <Spinner /> : icon}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

/* Spinner */

function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}
