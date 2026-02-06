'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/shared/ui';
import { useAuthStore, authApi } from '@/features/auth/session';
import { PartSelector } from './PartSelector';
import type { PartCategory } from '@ensemble/types';

export function OnboardingForm() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [part, setPart] = useState<PartCategory | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (nickname.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다');
      return;
    }

    if (nickname.length > 20) {
      setError('닉네임은 20자 이하여야 합니다');
      return;
    }

    if (!/^[가-힣a-zA-Z0-9_]+$/.test(nickname)) {
      setError('닉네임은 한글, 영문, 숫자, 밑줄만 사용 가능합니다');
      return;
    }

    setIsLoading(true);

    try {
      const updatedUser = await authApi.completeOnboarding({
        nickname,
        defaultPart: part || undefined,
      });
      updateUser(updatedUser);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('온보딩 중 오류가 발생했습니다');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        {user?.profileImageUrl && (
          <img src={user.profileImageUrl} alt="프로필" className="mx-auto h-20 w-20 rounded-full" />
        )}
        <p className="mt-2 text-gray-600">{user?.email}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="nickname" className="text-sm font-medium text-gray-700">
          닉네임 <span className="text-red-500">*</span>
        </label>
        <Input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="합주할 때 불릴 이름"
          disabled={isLoading}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <PartSelector value={part} onChange={setPart} />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? '처리 중...' : '시작하기'}
      </Button>
    </form>
  );
}
