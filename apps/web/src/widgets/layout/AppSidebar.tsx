'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  MusicIcon,
  SettingsIcon,
} from '@/shared/ui';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="h-full border-r-0">
      <SidebarContent className="p-3">
        <SidebarGroup>
          <NavItem
            href="/dashboard"
            icon={<HomeIcon className="w-5 h-5" />}
            active={pathname === '/dashboard'}
          >
            대시보드
          </NavItem>

          <NavItem
            href="/schedule"
            icon={<CalendarIcon className="w-5 h-5" />}
            active={pathname.startsWith('/schedule')}
          >
            일정
          </NavItem>

          <NavItem
            href="/practice"
            icon={<MusicIcon className="w-5 h-5" />}
            active={pathname.startsWith('/practice')}
          >
            연습
          </NavItem>

          <NavItem
            href="/members"
            icon={<UsersIcon className="w-5 h-5" />}
            active={pathname.startsWith('/members')}
          >
            멤버
          </NavItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <NavItem
          href="/settings"
          icon={<SettingsIcon className="w-5 h-5" />}
          active={pathname.startsWith('/settings')}
        >
          설정
        </NavItem>
      </SidebarFooter>
    </Sidebar>
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
