import { forwardRef, type ImgHTMLAttributes } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: AvatarSize;
  fallback?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'md', src, alt = '', fallback, className = '', ...props }, ref) => {
    const initials = fallback || alt.slice(0, 2).toUpperCase();

    if (!src) {
      return (
        <div
          ref={ref}
          className={`
            inline-flex items-center justify-center
            rounded-full
            bg-primary-muted text-primary
            font-medium
            ${sizeStyles[size]}
            ${className}
          `}
        >
          {initials}
        </div>
      );
    }

    return (
      <div ref={ref} className={`relative ${sizeStyles[size]} ${className}`}>
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" {...props} />
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

/* Avatar Group */
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ children, max = 4, size = 'md' }: AvatarGroupProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const visible = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((child, i) => (
        <div key={i} className="ring-2 ring-bg rounded-full">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`
            inline-flex items-center justify-center
            rounded-full ring-2 ring-bg
            bg-surface-2 text-text-muted
            font-medium
            ${sizeStyles[size]}
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
