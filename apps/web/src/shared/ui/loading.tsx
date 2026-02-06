import { forwardRef, type HTMLAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`${sizeStyles[size]} ${className}`} {...props}>
        <svg
          className="animate-spin text-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';

/* Skeleton */
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, className = '', style, ...props }, ref) => {
    const variantClass = {
      text: 'rounded-md',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    }[variant];

    return (
      <div
        ref={ref}
        className={`
          animate-pulse
          bg-surface-2
          ${variantClass}
          ${variant === 'text' && !height ? 'h-4' : ''}
          ${className}
        `}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

/* Loading Overlay */
interface LoadingOverlayProps {
  visible?: boolean;
  label?: string;
}

export function LoadingOverlay({ visible = true, label }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-sm z-modal">
      <Spinner size="lg" className="text-primary" />
      {label && <p className="mt-3 text-sm text-text-muted">{label}</p>}
    </div>
  );
}

/* Skeleton Presets */
export function SkeletonCard() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton variant="rectangular" height={120} />
      <div className="space-y-2">
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? '70%' : '100%'} />
      ))}
    </div>
  );
}
