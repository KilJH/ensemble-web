'use client';

import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from 'react';

/* Sidebar Context */
interface SidebarContextValue {
  collapsed: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false });

function useSidebar() {
  return useContext(SidebarContext);
}

/* Sidebar Root */
interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, className = '', children, ...props }, ref) => {
    return (
      <SidebarContext.Provider value={{ collapsed }}>
        <aside
          ref={ref}
          className={`
            flex flex-col
            h-full
            bg-surface border-r border-border
            transition-normal
            ${collapsed ? 'w-16' : 'w-64'}
            ${className}
          `}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
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
        className={`flex items-center h-16 px-4 border-b border-border ${className}`}
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
    const { collapsed } = useSidebar();

    return (
      <div ref={ref} className={`py-2 ${className}`} {...props}>
        {label && !collapsed && (
          <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wider">
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
    const { collapsed } = useSidebar();

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          relative
          flex items-center gap-3
          w-full px-3 py-2
          text-left text-sm font-medium
          rounded-md
          transition-normal
          focus-ring
          ${
            active
              ? 'bg-primary-muted text-primary'
              : 'text-text-muted hover:bg-surface-2 hover:text-text'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${collapsed ? 'justify-center' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Active indicator */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
        )}
        {icon && <span className="flex-shrink-0 w-5 h-5">{icon}</span>}
        {!collapsed && <span className="truncate">{children}</span>}
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
      <div
        ref={ref}
        className={`flex items-center p-4 border-t border-border ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SidebarFooter.displayName = 'SidebarFooter';
