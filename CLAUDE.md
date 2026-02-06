# Claude 작업 가이드 - 앙상블 프로젝트

이 문서는 Claude가 앙상블 프로젝트 작업 시 참조해야 할 핵심 정보를 담고 있습니다.

## SDD (Specification-Driven Development)

### 대원칙

**"명세 없이 구현 없다"**

모든 새 기능은 명세를 먼저 작성한 후 구현합니다.

### 플로우

```
요구사항 분석 → 명세 작성 → 리뷰/승인 → 구현 → 검증
```

### 명세 상태

| 상태          | 설명              |
| ------------- | ----------------- |
| `Draft`       | 작성 중           |
| `Review`      | 리뷰 대기         |
| `Approved`    | 승인됨, 구현 가능 |
| `Implemented` | 구현 완료         |

### 명세 파일 위치

- 명세: `apps/web/spec/features/[feature-name]/spec.md`
- 템플릿: `apps/web/spec/templates/`
- 가이드: `apps/web/spec/README.md`

### 명세 작성 원칙

1. **구체적으로**: 모호한 표현 대신 명확한 기준 제시
2. **검증 가능하게**: Acceptance Criteria 필수
3. **독립적으로**: 다른 명세 참조 시 링크 명시
4. **최신 유지**: 변경 시 명세도 업데이트

## FSD (Feature-Sliced Design) 아키텍처

### 레이어 구조

```
app → widgets → features → entities → shared
```

상위 레이어는 하위 레이어만 import 가능합니다. ESLint `boundaries` 플러그인으로 강제됩니다.

### Import 규칙

| From     | Allowed Imports                     |
| -------- | ----------------------------------- |
| app      | widgets, features, entities, shared |
| widgets  | features, entities, shared          |
| features | entities, shared                    |
| entities | shared                              |
| shared   | shared만                            |

### Slice 내부 구조

```
features/[feature-name]/
├── ui/           # 컴포넌트
├── model/        # 상태, 타입, 훅
├── api/          # API 호출
└── index.ts      # Public API (barrel export)
```

### Public API 원칙

각 slice는 `index.ts`를 통해서만 export:

```typescript
// Good
import { LoginForm } from '@/features/auth/login';

// Bad - 내부 구조 직접 접근
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
```

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

## UI 컴포넌트 작성 원칙

### 1. Variant / Size / State 매트릭스

모든 UI 컴포넌트는 일관된 API를 따름:

```tsx
// 표준 Props 패턴
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | ...;
  size?: 'sm' | 'md' | 'lg';
  // state props
  disabled?: boolean;
  isLoading?: boolean;
  error?: string | boolean;
}
```

### 2. Semantic Token 강제

직접 색상값(HEX) 사용 금지. CSS 변수 기반 토큰만 사용:

```tsx
// Good
'bg-surface text-text border-border';
'bg-primary text-primary-foreground';
'text-danger bg-danger-muted';

// Bad
'bg-white text-gray-900';
'bg-[#10b981]';
```

### 3. cn() 유틸리티 사용

클래스 병합 시 `@/shared/lib/utils`의 `cn()` 함수 사용:

```tsx
import { cn } from '@/shared/lib/utils';

<div
  className={cn(
    'base-styles',
    variant === 'primary' && 'variant-styles',
    disabled && 'opacity-50',
    className,
  )}
/>;
```

### 4. 일관된 State 클래스

| State    | 클래스 패턴                                         |
| -------- | --------------------------------------------------- |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading  | `opacity-70 cursor-wait pointer-events-none`        |
| Focus    | `focus-ring` (globals.css 정의)                     |
| Error    | `border-danger focus:outline-danger`                |

### 5. forwardRef 필수

모든 컴포넌트는 `forwardRef`로 래핑:

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => <button ref={ref} {...props} />,
);
Button.displayName = 'Button';
```

### 6. HTML 속성과 충돌 회피

HTML 기본 속성과 이름이 같은 prop은 `Omit`으로 제외:

```tsx
// input의 size 속성(number)과 커스텀 size(string) 충돌 해결
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}
```

### 7. 접근성 필수

```tsx
// 필수 ARIA 속성
aria-invalid={hasError}
aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}

// IconButton은 aria-label 필수
<IconButton icon={<TrashIcon />} aria-label="삭제" />
```

상세: `docs/guides/component-matrix.md`

## 프로젝트 구조

```
ensemble-web/
├── apps/
│   ├── web/                      # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/             # App Router + FSD app layer
│   │   │   ├── widgets/         # 독립적 UI 블록 (Header, Sidebar)
│   │   │   ├── features/        # 비즈니스 기능 (login, create-workspace)
│   │   │   ├── entities/        # 도메인 모델 (user, workspace, schedule)
│   │   │   └── shared/          # 공유 리소스
│   │   │       ├── ui/          # UI 컴포넌트
│   │   │       ├── design/      # 디자인 시스템
│   │   │       ├── lib/         # 유틸리티
│   │   │       ├── config/      # 설정
│   │   │       └── api/         # API 클라이언트
│   │   ├── spec/                # SDD 명세
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

#### 3. Frontend 기능 개발 (FSD)

```bash
# 1. 명세 작성 (SDD)
apps/web/spec/features/[feature-name]/spec.md

# 2. FSD 레이어에 기능 구현
apps/web/src/features/[feature-name]/
├── ui/           # 컴포넌트
├── model/        # 상태, 타입
├── api/          # API 호출
└── index.ts      # Public API

# 3. App Router 페이지
apps/web/src/app/[route]/page.tsx
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
