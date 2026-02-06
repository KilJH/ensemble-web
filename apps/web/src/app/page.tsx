'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/features/auth/session';

export default function Home() {
  const { isAuthenticated, isOnboarded, isLoading } = useAuthStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">HAPZOO</h1>
        <p className="text-center text-lg mb-8 text-gray-600">
          Ensemble Playground for Music Communities
        </p>

        <div className="flex flex-col items-center gap-4 mb-12">
          {isLoading ? (
            <div className="h-12 w-40 animate-pulse rounded-md bg-gray-200" />
          ) : isAuthenticated ? (
            <Link href={isOnboarded ? '/dashboard' : '/auth/onboarding'}>
              <Button size="lg" className="text-lg px-8 py-6">
                {isOnboarded ? '대시보드로 이동' : '프로필 설정 완료하기'}
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button size="lg" className="text-lg px-8 py-6">
                  로그인 / 회원가입
                </Button>
              </Link>
              <p className="text-sm text-gray-500">Google 계정으로 간편하게 시작하세요</p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">합주 관리</h2>
            <p className="text-gray-600">효율적인 합주 일정 및 진행 관리</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">연습 트래킹</h2>
            <p className="text-gray-600">개인 및 그룹 연습 기록 관리</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">멤버 모집</h2>
            <p className="text-gray-600">새로운 멤버 모집 및 관리</p>
          </div>
        </div>
      </div>
    </main>
  );
}
