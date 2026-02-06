# Claude 작업 가이드 - 앙상블 프로젝트

이 문서는 Claude가 앙상블 프로젝트 작업 시 참조해야 할 핵심 정보를 담고 있습니다.

## 프로젝트 개요

**앙상블(Ensemble)** - 음악 동호인(밴드/아카펠라/오케스트라)을 위한 워크스페이스 기반 SaaS

- 합주·연습·모집·일정 관리
- Web + Mobile Web 지원

## 기술 스택

### Monorepo 구조

- **pnpm workspace** - 패키지 관리
- **Turborepo** - 빌드 최적화 및 캐싱

### Frontend (apps/web)

- **Next.js 14** - App Router, React Server Components
- **TypeScript** - Strict mode
- **Tailwind CSS** - 스타일링
- **Port**: 3000

### Backend (apps/api)

- **NestJS** - Node.js 프레임워크
- **Prisma** - ORM (PostgreSQL)
- **TypeScript** - Strict mode
- **Port**: 3001

### 공유 패키지 (packages/)

- `@ensemble/types` - 공유 TypeScript 타입
- `@ensemble/shared-schemas` - Zod 검증 스키마
- `@ensemble/tsconfig` - TypeScript 설정
- `@ensemble/eslint-config` - ESLint 설정

## UI 가이드라인

- **테마**: 라이트/다크 모드 (CSS 변수 기반)
- **반응형**: Mobile-first, Container Query
- **최신 CSS**: `@layer`, `@scope`, `@container`, `:has()`, `@custom-media`
- **SEO**: 메인 홈(`/`)만 크롤링 허용

상세: `docs/guides/05-ui-guidelines.md`

## 프로젝트 구조

```
ensemble-web/
├── apps/
│   ├── web/                      # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/             # App Router (페이지)
│   │   │   ├── components/      # React 컴포넌트
│   │   │   ├── lib/             # 유틸리티
│   │   │   └── hooks/           # Custom hooks
│   │   ├── public/              # 정적 파일
│   │   └── package.json
│   │
│   └── api/                      # NestJS Backend
│       ├── src/
│       │   ├── modules/         # 도메인별 모듈
│       │   │   ├── auth/
│       │   │   ├── workspaces/
│       │   │   ├── users/
│       │   │   └── schedules/
│       │   ├── common/          # 공통 유틸리티
│       │   │   ├── decorators/
│       │   │   ├── filters/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── pipes/
│       │   │   ├── prisma.service.ts
│       │   │   └── prisma.module.ts
│       │   ├── main.ts
│       │   └── app.module.ts
│       ├── prisma/
│       │   ├── schema.prisma    # DB 스키마
│       │   └── migrations/
│       └── package.json
│
├── packages/
│   ├── types/                    # 공유 타입 정의
│   │   └── src/
│   │       ├── models/          # 도메인 모델 타입
│   │       └── index.ts
│   │
│   ├── shared-schemas/           # Zod 검증 스키마
│   │   └── src/
│   │       ├── user.schema.ts
│   │       └── workspace.schema.ts
│   │
│   └── config/                   # 공유 설정
│       ├── tsconfig/
│       └── eslint-config/
│
├── docs/                         # 문서
│   └── guides/
│
├── .husky/                       # Git hooks
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## 핵심 개념

### 1. Workspace Protocol

- 패키지 간 의존성: `"@ensemble/types": "workspace:*"`
- 빌드 순서: shared packages → apps

### 2. 타입 안정성 플로우

```
Prisma Schema → Prisma Client → @ensemble/types → FE/BE
```

### 3. 검증 플로우

```
Frontend: Zod schema → 클라이언트 검증
Backend: class-validator → 서버 검증
```

## 개발 가이드라인

### 새 기능 추가 시

#### 1. 도메인 모델 추가

```bash
# 1. Prisma 스키마 업데이트
apps/api/prisma/schema.prisma

# 2. 타입 정의
packages/types/src/models/[model].ts

# 3. 검증 스키마
packages/shared-schemas/src/[model].schema.ts

# 4. 빌드
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build
```

#### 2. Backend 모듈 생성

```bash
# NestJS 모듈 구조
apps/api/src/modules/[feature]/
├── [feature].module.ts
├── [feature].controller.ts
├── [feature].service.ts
├── dto/
│   ├── create-[feature].dto.ts
│   └── update-[feature].dto.ts
└── entities/
    └── [feature].entity.ts
```

#### 3. Frontend 페이지/컴포넌트 생성

```bash
# App Router 페이지
apps/web/src/app/[route]/page.tsx

# 컴포넌트
apps/web/src/components/[feature]/
```

### 코드 스타일

- **타입 우선**: `any` 사용 금지, 명시적 타입 정의
- **함수형 컴포넌트**: React hooks 사용
- **의존성 주입**: NestJS DI 패턴 준수
- **에러 핸들링**: 명시적 에러 처리
- **네이밍**:
  - 컴포넌트: PascalCase
  - 함수/변수: camelCase
  - 상수: UPPER_SNAKE_CASE
  - 파일명: kebab-case

### Git Workflow

1. 커밋 전 자동 실행 (Husky):
   - ESLint 자동 수정
   - Prettier 포맷팅

2. 커밋 메시지 형식:

   ```
   <type>: <subject>

   <body>

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
   ```

   - type: feat, fix, docs, style, refactor, test, chore

## 주요 명령어

### 개발

```bash
# 전체 개발 서버 실행
pnpm dev

# 개별 실행
pnpm --filter @ensemble/web dev    # Frontend
pnpm --filter @ensemble/api dev    # Backend

# 특정 패키지 빌드
pnpm --filter @ensemble/types build
```

### 코드 품질

```bash
pnpm lint          # 린트 검사
pnpm format        # 코드 포맷팅
pnpm typecheck     # 타입 검사
```

### 데이터베이스

```bash
cd apps/api

# Prisma Client 생성
pnpm prisma generate

# 마이그레이션
pnpm prisma migrate dev --name [migration_name]

# Prisma Studio (DB GUI)
pnpm prisma studio
```

### 빌드 & 배포

```bash
pnpm build         # 전체 빌드
pnpm clean         # 빌드 캐시 삭제
```

## 환경 변수

### Backend (apps/api/.env)

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/ensemble_dev"
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
```

### Frontend (apps/web/.env)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

## 문제 해결

### pnpm install 실패

```bash
# 캐시 삭제 후 재설치
pnpm store prune
pnpm install
```

### 타입 에러

```bash
# Prisma Client 재생성
cd apps/api && pnpm prisma generate

# 공유 패키지 재빌드
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build
```

### Turbo 캐시 문제

```bash
pnpm clean
rm -rf .turbo
pnpm install
```

## 참고 문서

- 상세 가이드: `docs/guides/`
- API 문서: `http://localhost:3001/api/docs` (개발 예정)
- Prisma 스키마: `apps/api/prisma/schema.prisma`

## 주의사항

### 절대 하지 말 것

- ❌ `any` 타입 남발
- ❌ 공유 패키지 빌드 없이 사용
- ❌ `.env` 파일 커밋
- ❌ `console.log` 프로덕션 배포

### 반드시 할 것

- ✅ 타입 먼저 정의
- ✅ 검증 스키마 작성
- ✅ 에러 핸들링
- ✅ 코드 리뷰 전 `pnpm typecheck && pnpm lint`
