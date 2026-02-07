'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  MenuIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
} from '@/shared/ui';
import { useAuthStore } from '@/features/auth/session';

interface HeaderProps {
  showMobileMenu?: boolean;
  onMobileMenuClick?: () => void;
}

export function Header({ showMobileMenu = false, onMobileMenuClick }: HeaderProps) {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-fixed h-14">
      {/* 블러 배경 */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />

      <div className="relative h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          {showMobileMenu && (
            <button
              type="button"
              onClick={onMobileMenuClick}
              className="lg:hidden p-2 -ml-2 rounded-lg text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
              aria-label="메뉴 열기"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold text-primary">HAPZOO</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-surface-2 animate-pulse" />
          ) : isAuthenticated && user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/auth/login">
              <Button variant="primary" size="sm">
                로그인
              </Button>
            </Link>
          )}
        </div>
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
          className="p-1 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
        >
          <Avatar
            size="sm"
            src={user.profileImageUrl || undefined}
            fallback={user.nickname?.[0] || user.email[0]}
            alt={user.nickname || '사용자'}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-2">
        <div className="px-3 py-3 border-b border-border/50 mb-2">
          <p className="font-medium text-sm text-text truncate">{user.nickname || '사용자'}</p>
          <p className="text-xs text-text-muted truncate mt-0.5">{user.email}</p>
        </div>

        <div className="space-y-1">
          <MenuItem icon={<UserIcon className="w-4 h-4" />} href="/profile">
            프로필
          </MenuItem>
          <MenuItem icon={<SettingsIcon className="w-4 h-4" />} href="/settings">
            설정
          </MenuItem>
          <div className="border-t border-border/50 my-2" />
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
    flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm
    transition-colors
    ${variant === 'danger' ? 'text-danger hover:bg-danger/10' : 'text-text hover:bg-surface-2'}
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
