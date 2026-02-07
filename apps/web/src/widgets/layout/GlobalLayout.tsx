'use client';

import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer, DrawerContent } from '@/shared/ui';
import { Header } from './Header';
import { Footer } from './Footer';
import { AppSidebar } from './AppSidebar';

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = pathname === '/' || pathname.startsWith('/auth');
  const showSidebar = !isPublicPage;

  return (
    <div className={`min-h-screen flex flex-col ${showSidebar ? 'gradient-bg' : 'bg-background'}`}>
      <Header showMobileMenu={showSidebar} onMobileMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex flex-1 pt-14">
        {showSidebar && (
          <aside className="hidden lg:block flex-shrink-0 w-56 border-r border-border/50">
            <AppSidebar />
          </aside>
        )}

        {showSidebar && (
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerContent side="left" className="w-64 p-0">
              <div className="h-14 flex items-center px-6 border-b border-border/50">
                <span className="text-lg font-bold text-primary">HAPZOO</span>
              </div>
              <AppSidebar />
            </DrawerContent>
          </Drawer>
        )}

        <main className="flex-1 overflow-y-auto">
          {showSidebar ? <div className="p-6 md:p-8 lg:p-10">{children}</div> : children}
        </main>
      </div>

      {isPublicPage && <Footer />}
    </div>
  );
}
