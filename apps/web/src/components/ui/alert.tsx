import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertSize = 'sm' | 'md';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-info-muted border-info/30 text-info',
  success: 'bg-success-muted border-success/30 text-success',
  warning: 'bg-warning-muted border-warning/30 text-warning',
  danger: 'bg-danger-muted border-danger/30 text-danger',
};

const variantIconColors: Record<AlertVariant, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

const sizeStyles: Record<AlertSize, string> = {
  sm: 'px-3 py-2 text-sm gap-2',
  md: 'px-4 py-3 text-base gap-3',
};

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      size = 'md',
      title,
      icon,
      dismissible = false,
      onDismiss,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const displayIcon = icon ?? defaultIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex items-start',
          'border rounded-lg',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {displayIcon && (
          <span
            className={cn(
              'shrink-0 mt-0.5',
              variantIconColors[variant],
              size === 'sm' ? 'w-4 h-4' : 'w-5 h-5',
            )}
          >
            {displayIcon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          {title && <h5 className="font-medium mb-0.5 text-text">{title}</h5>}
          <div className="text-text-muted">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              'shrink-0 p-0.5 rounded',
              'text-text-muted hover:text-text',
              'transition-normal focus-ring',
            )}
            aria-label="Dismiss"
          >
            <CloseIcon size={size} />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

/* Icons */

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon({ size }: { size: AlertSize }) {
  const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={sizeClass}>
      <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
    </svg>
  );
}
