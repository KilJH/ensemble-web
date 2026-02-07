'use client';

import Link from 'next/link';
import { HomeIcon, PlusIcon } from '@/shared/ui';
import { WorkspaceIcon } from '@/entities/workspace';
import { Tooltip, TooltipProvider } from '@/shared/ui';

interface Workspace {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface WorkspaceRailProps {
  workspaces?: Workspace[];
  activeWorkspaceId?: string | null;
}

export function WorkspaceRail({ workspaces = [], activeWorkspaceId = null }: WorkspaceRailProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <nav className="fixed left-0 top-0 z-fixed w-rail h-screen flex flex-col items-center py-3 gap-2 glass-rail">
        {/* Home */}
        <RailItem tooltip="홈" href="/dashboard">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-2 hover:rounded-xl hover:bg-primary/20 transition-all duration-150">
            <HomeIcon className="w-5 h-5 text-text-muted" />
          </div>
        </RailItem>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-border rounded-full" />

        {/* Workspace list */}
        <div className="flex-1 flex flex-col items-center gap-2 overflow-y-auto scrollbar-none py-1">
          {workspaces.map((ws) => (
            <RailItem key={ws.id} tooltip={ws.name} href={`/workspace/${ws.id}`}>
              <div className="relative">
                {activeWorkspaceId === ws.id && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-10 bg-text rounded-r-full" />
                )}
                <WorkspaceIcon
                  name={ws.name}
                  imageUrl={ws.imageUrl}
                  active={activeWorkspaceId === ws.id}
                />
              </div>
            </RailItem>
          ))}
        </div>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-border rounded-full" />

        {/* Create workspace */}
        <RailItem tooltip="워크스페이스 만들기" href="/workspace/new">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-2 hover:rounded-xl hover:bg-primary/20 transition-all duration-150">
            <PlusIcon className="w-5 h-5 text-primary" />
          </div>
        </RailItem>
      </nav>
    </TooltipProvider>
  );
}

interface RailItemProps {
  tooltip: string;
  href: string;
  children: React.ReactNode;
}

function RailItem({ tooltip, href, children }: RailItemProps) {
  return (
    <Tooltip content={tooltip} side="right">
      <Link href={href}>{children}</Link>
    </Tooltip>
  );
}
