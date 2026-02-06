'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { GoogleLoginButton } from '@/features/auth/login';
import { useAuthStore } from '@/features/auth/session';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isOnboarded, isLoading } = useAuthStore();

  const error = searchParams.get('error');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(isOnboarded ? '/dashboard' : '/auth/onboarding');
    }
  }, [isAuthenticated, isOnboarded, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">앙상블에 오신 것을 환영합니다</CardTitle>
          <CardDescription>음악 동호인을 위한 합주 관리 플랫폼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error === 'no_code' && '인증 코드를 받지 못했습니다. 다시 시도해주세요.'}
              {error === 'auth_failed' && '로그인에 실패했습니다. 다시 시도해주세요.'}
            </div>
          )}
          <GoogleLoginButton />
        </CardContent>
      </Card>
    </div>
  );
}
