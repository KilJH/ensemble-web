'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { OnboardingForm } from '@/features/auth/onboarding';
import { useAuthStore } from '@/features/auth/session';

export default function OnboardingPage() {
  const router = useRouter();
  const { isAuthenticated, isOnboarded, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else if (isOnboarded) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isOnboarded, isLoading, router]);

  if (isLoading || !isAuthenticated || isOnboarded) {
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
          <CardTitle className="text-2xl">프로필 설정</CardTitle>
          <CardDescription>합주에서 사용할 닉네임과 파트를 설정해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
}
