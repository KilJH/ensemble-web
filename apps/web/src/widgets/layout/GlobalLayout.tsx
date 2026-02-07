'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { AppShell } from './AppShell';

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const pathname = usePathname();
  const isPublicPage = pathname === '/' || pathname.startsWith('/auth');

  if (isPublicPage) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-12">{children}</main>
        <Footer />
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
