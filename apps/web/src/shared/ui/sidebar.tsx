'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/* Sidebar Root */
export const Sidebar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <aside ref={ref} className={`flex flex-col h-full ${className}`} {...props}>
        {children}
      </aside>
    );
  },
);

Sidebar.displayName = 'Sidebar';

/* Sidebar Header */
interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center h-12 px-4 border-b border-border/50 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SidebarHeader.displayName = 'SidebarHeader';

/* Sidebar Content */
interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex-1 overflow-y-auto p-2 ${className}`} {...props}>
        {children}
      </div>
    );
  },
);

SidebarContent.displayName = 'SidebarContent';

/* Sidebar Group */
interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`py-2 ${className}`} {...props}>
        {label && (
          <div className="px-2 py-1.5 text-[11px] font-medium text-text-subtle uppercase tracking-wider">
            {label}
          </div>
        )}
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    );
  },
);

SidebarGroup.displayName = 'SidebarGroup';

/* Sidebar Item */
interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ icon, active = false, disabled = false, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          flex items-center gap-2
          w-full px-2 py-1.5
          text-left text-[13px]
          rounded-md
          transition-colors
          ${
            active
              ? 'bg-white/10 text-text font-medium'
              : 'text-text-muted hover:bg-white/[0.06] hover:text-text'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </button>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';

/* Sidebar Footer */
interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`p-2 ${className}`} {...props}>
        {children}
      </div>
    );
  },
);

SidebarFooter.displayName = 'SidebarFooter';
