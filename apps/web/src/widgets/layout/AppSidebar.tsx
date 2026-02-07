'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  MusicIcon,
  EnsembleIcon,
  SettingsIcon,
} from '@/shared/ui';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-rail top-0 z-fixed w-sidebar h-screen flex flex-col glass-panel">
      {/* Workspace name header */}
      <div className="h-12 flex items-center px-4 border-b border-border/50">
        <span className="text-sm font-semibold text-text truncate">HAPZOO</span>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup label="일반">
          <NavItem
            href="/dashboard"
            icon={<HomeIcon className="w-4 h-4" />}
            active={pathname === '/dashboard'}
          >
            대시보드
          </NavItem>
          <NavItem
            href="/schedule"
            icon={<CalendarIcon className="w-4 h-4" />}
            active={pathname.startsWith('/schedule')}
          >
            일정
          </NavItem>
        </SidebarGroup>

        <SidebarGroup label="음악">
          <NavItem
            href="/practice"
            icon={<MusicIcon className="w-4 h-4" />}
            active={pathname.startsWith('/practice')}
          >
            연습
          </NavItem>
          <NavItem
            href="/ensemble"
            icon={<EnsembleIcon className="w-4 h-4" />}
            active={pathname.startsWith('/ensemble')}
          >
            합주
          </NavItem>
        </SidebarGroup>

        <SidebarGroup label="커뮤니티">
          <NavItem
            href="/members"
            icon={<UsersIcon className="w-4 h-4" />}
            active={pathname.startsWith('/members')}
          >
            멤버
          </NavItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-border/50">
        <NavItem
          href="/settings"
          icon={<SettingsIcon className="w-4 h-4" />}
          active={pathname.startsWith('/settings')}
        >
          설정
        </NavItem>
      </SidebarFooter>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link href={href}>
      <SidebarItem icon={icon} active={active}>
        {children}
      </SidebarItem>
    </Link>
  );
}
