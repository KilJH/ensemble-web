'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/features/auth/session';

export function Header() {
  const { isAuthenticated, isLoading } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-fixed h-12">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />

      <div className="relative h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold text-primary">HAPZOO</span>
        </Link>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-surface-2 animate-pulse" />
          ) : isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                대시보드
              </Button>
            </Link>
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
