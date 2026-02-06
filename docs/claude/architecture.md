# 아키텍처 가이드

## SDD (Specification-Driven Development)

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

## FSD (Feature-Sliced Design)

### 레이어 구조

```
app → widgets → features → entities → shared
```

상위 레이어는 하위 레이어만 import 가능. ESLint `boundaries` 플러그인으로 강제.

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

## 프로젝트 구조

```
ensemble-web/
├── apps/
│   ├── web/                      # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/             # App Router + FSD app layer
│   │   │   ├── widgets/         # 독립적 UI 블록
│   │   │   ├── features/        # 비즈니스 기능
│   │   │   ├── entities/        # 도메인 모델
│   │   │   └── shared/          # 공유 리소스 (ui, design, lib)
│   │   └── spec/                # SDD 명세
│   │
│   └── api/                      # NestJS Backend
│       ├── src/modules/         # 도메인별 모듈
│       └── prisma/              # DB 스키마
│
├── packages/
│   ├── types/                   # 공유 TypeScript 타입
│   ├── shared-schemas/          # Zod 검증 스키마
│   └── config/                  # ESLint, TypeScript 설정
│
└── docs/                        # 문서
```

## 핵심 개념

### Workspace Protocol

- 패키지 간 의존성: `"@ensemble/types": "workspace:*"`
- 빌드 순서: shared packages → apps

### 타입 안정성 플로우

```
Prisma Schema → Prisma Client → @ensemble/types → FE/BE
```

### 검증 플로우

```
Frontend: Zod schema → 클라이언트 검증
Backend: class-validator → 서버 검증
```

## 새 기능 추가 시

### 1. 도메인 모델 추가

```bash
# 1. Prisma 스키마: apps/api/prisma/schema.prisma
# 2. 타입 정의: packages/types/src/models/[model].ts
# 3. 검증 스키마: packages/shared-schemas/src/[model].schema.ts
# 4. 빌드
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build
```

### 2. Backend 모듈 생성

```
apps/api/src/modules/[feature]/
├── [feature].module.ts
├── [feature].controller.ts
├── [feature].service.ts
├── dto/
└── entities/
```

### 3. Frontend 기능 개발 (FSD)

```bash
# 1. 명세 작성: apps/web/spec/features/[name]/spec.md
# 2. FSD 레이어에 구현: apps/web/src/features/[name]/
# 3. App Router 페이지: apps/web/src/app/[route]/page.tsx
```
