'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/features/auth/session';

export default function Home() {
  const { isAuthenticated, isOnboarded, isLoading } = useAuthStore();

  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            HAPZOO
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Ensemble Playground for Music Communities
          </p>

          <div className="pt-4">
            {isLoading ? (
              <div className="h-12 w-40 mx-auto animate-pulse rounded-lg bg-surface-2" />
            ) : isAuthenticated ? (
              <Link href={isOnboarded ? '/dashboard' : '/auth/onboarding'}>
                <Button
                  size="lg"
                  className="text-base px-8 py-3 shadow-lg hover:shadow-primary/25 transition-shadow"
                >
                  {isOnboarded ? '대시보드로 이동' : '프로필 설정 완료하기'}
                </Button>
              </Link>
            ) : (
              <div className="space-y-4">
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    className="text-base px-8 py-3 shadow-lg hover:shadow-primary/25 transition-shadow"
                  >
                    로그인 / 회원가입
                  </Button>
                </Link>
                <p className="text-sm text-text-muted">Google 계정으로 간편하게 시작하세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            emoji="🎵"
            title="합주 관리"
            description="효율적인 합주 일정 및 진행 관리"
            accent="primary"
          />
          <FeatureCard
            emoji="📊"
            title="연습 트래킹"
            description="개인 및 그룹 연습 기록 관리"
            accent="secondary"
          />
          <FeatureCard
            emoji="👥"
            title="멤버 모집"
            description="새로운 멤버 모집 및 관리"
            accent="primary"
          />
        </div>
      </div>
    </main>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  accent: 'primary' | 'secondary';
}

function FeatureCard({ emoji, title, description, accent }: FeatureCardProps) {
  return (
    <div className="p-6 md:p-8 rounded-2xl glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
          accent === 'primary' ? 'bg-primary/15' : 'bg-secondary/15'
        }`}
      >
        <span className="text-2xl">{emoji}</span>
      </div>
      <h2 className="text-xl font-semibold mb-3 text-text">{title}</h2>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
