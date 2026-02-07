'use client';

import { type ReactNode } from 'react';
import { WorkspaceRail } from './WorkspaceRail';
import { AppSidebar } from './AppSidebar';
import { ContentHeader } from './ContentHeader';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen overflow-hidden gradient-bg">
      <WorkspaceRail />
      <AppSidebar />

      <div className="ml-[calc(var(--rail-width)+var(--sidebar-width))] h-screen flex flex-col">
        <ContentHeader title="대시보드" />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
