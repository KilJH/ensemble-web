'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi, useAuthStore } from '@/features/auth/session';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      router.push('/auth/login?error=auth_failed');
      return;
    }

    if (!code) {
      router.push('/auth/login?error=no_code');
      return;
    }

    hasProcessed.current = true;

    const redirectUri = `${window.location.origin}/auth/callback`;

    authApi
      .googleAuth({ code, redirectUri })
      .then(({ user, accessToken }) => {
        setAuth(user, accessToken);
        router.push(user.isOnboarded ? '/dashboard' : '/auth/onboarding');
      })
      .catch(() => {
        router.push('/auth/login?error=auth_failed');
      });
  }, [searchParams, router, setAuth]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
