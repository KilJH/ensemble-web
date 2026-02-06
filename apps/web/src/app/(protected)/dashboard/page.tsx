'use client';

import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { useAuthStore, authApi } from '@/features/auth/session';

export default function DashboardPage() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">안녕하세요, {user?.nickname}님!</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            {user?.profileImageUrl && (
              <img src={user.profileImageUrl} alt="프로필" className="h-10 w-10 rounded-full" />
            )}
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>내 워크스페이스</CardTitle>
              <CardDescription>참여 중인 워크스페이스가 없습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                워크스페이스 찾기
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>다가오는 합주</CardTitle>
              <CardDescription>예정된 합주가 없습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                워크스페이스에 가입하면 합주 일정을 확인할 수 있어요
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>내 프로필</CardTitle>
              <CardDescription>프로필 정보</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">닉네임</span>
                <span className="font-medium">{user?.nickname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">기본 파트</span>
                <span className="font-medium">{user?.defaultPart || '미설정'}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>새로운 알림이 없습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">합주 리마인드 등 알림이 여기에 표시됩니다</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
