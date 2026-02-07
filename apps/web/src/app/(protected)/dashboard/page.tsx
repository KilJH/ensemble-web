'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/shared/ui';
import { useAuthStore } from '@/features/auth/session';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">안녕하세요, {user?.nickname}님</h2>
        <p className="text-sm text-text-muted mt-1">{user?.email}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>내 워크스페이스</CardTitle>
            <CardDescription>참여 중인 워크스페이스가 없습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
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
            <p className="text-sm text-text-muted">
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
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">닉네임</span>
              <span className="font-medium">{user?.nickname}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">기본 파트</span>
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
            <p className="text-sm text-text-muted">합주 리마인드 등 알림이 여기에 표시됩니다</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
