# 앙상블 (Ensemble)

음악 동호인(밴드/아카펠라/오케스트라)을 위한 워크스페이스 분리 기반 합주·연습·모집·일정 관리 SaaS

## 기술 스택

### Frontend

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**

### Backend

- **NestJS**
- **Prisma** (ORM)
- **PostgreSQL**

### Monorepo

- **pnpm** workspace
- **Turborepo** (빌드 최적화)

## 프로젝트 구조

```
ensemble-web/
├── apps/
│   ├── web/          # Next.js 프론트엔드
│   └── api/          # NestJS 백엔드
├── packages/
│   ├── types/        # 공유 TypeScript 타입
│   ├── shared-schemas/  # 공유 validation 스키마
│   └── config/       # 공유 설정 (ESLint, Prettier, TypeScript)
└── ...
```

## 시작하기

### 사전 요구사항

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL

### 설치

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Prisma 초기화
cd apps/api
pnpm prisma generate
pnpm prisma migrate dev
```

### 개발 서버 실행

```bash
# 전체 개발 서버 실행 (FE + BE)
pnpm dev

# 개별 실행
pnpm --filter @ensemble/web dev    # Frontend only
pnpm --filter @ensemble/api dev    # Backend only
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 사용 가능한 명령어

```bash
pnpm dev          # 개발 서버 실행
pnpm build        # 프로덕션 빌드
pnpm lint         # 린트 검사
pnpm format       # 코드 포맷팅
pnpm typecheck    # 타입 검사
pnpm clean        # 빌드 캐시 및 node_modules 삭제
```

## 라이선스

MIT
