'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
} from '@/shared/ui';
import { useAuthStore } from '@/features/auth/session';

interface ContentHeaderProps {
  title: string;
  actions?: ReactNode;
}

export function ContentHeader({ title, actions }: ContentHeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-sticky h-header flex items-center justify-between px-4 glass-header">
      <h1 className="text-sm font-semibold text-text truncate">{title}</h1>

      <div className="flex items-center gap-2">
        {actions}
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}

interface UserMenuProps {
  user: {
    nickname: string | null;
    profileImageUrl: string | null;
    email: string;
  };
}

function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-0.5 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
        >
          <Avatar
            size="sm"
            src={user.profileImageUrl || undefined}
            fallback={user.nickname?.[0] || user.email[0]}
            alt={user.nickname || '사용자'}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 p-1.5">
        <div className="px-3 py-2 border-b border-border/50 mb-1">
          <p className="font-medium text-[13px] text-text truncate">{user.nickname || '사용자'}</p>
          <p className="text-[11px] text-text-muted truncate mt-0.5">{user.email}</p>
        </div>

        <div className="space-y-0.5">
          <MenuItem icon={<UserIcon className="w-4 h-4" />} href="/profile">
            프로필
          </MenuItem>
          <MenuItem icon={<SettingsIcon className="w-4 h-4" />} href="/settings">
            설정
          </MenuItem>
          <div className="border-t border-border/50 my-1" />
          <MenuItem
            icon={<LogOutIcon className="w-4 h-4" />}
            onClick={handleLogout}
            variant="danger"
          >
            로그아웃
          </MenuItem>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

function MenuItem({ icon, children, href, onClick, variant = 'default' }: MenuItemProps) {
  const className = `
    flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-[13px]
    transition-colors
    ${variant === 'danger' ? 'text-danger hover:bg-danger/10' : 'text-text hover:bg-white/[0.06]'}
  `;

  if (href) {
    return (
      <Link href={href} className={className}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {icon}
      {children}
    </button>
  );
}
