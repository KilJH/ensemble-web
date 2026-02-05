# 공유 패키지 사용법

## 개요

Monorepo 구조에서 공유 패키지는 코드 중복을 제거하고 일관성을 유지하는 핵심 요소입니다.

### 공유 패키지 목록

1. **@ensemble/types** - TypeScript 타입 정의
2. **@ensemble/shared-schemas** - Zod 검증 스키마
3. **@ensemble/tsconfig** - TypeScript 설정
4. **@ensemble/eslint-config** - ESLint 설정

## @ensemble/types

### 목적

- Frontend와 Backend 간 타입 공유
- API 요청/응답 타입 정의
- 도메인 모델 타입 정의

### 디렉토리 구조

```
packages/types/
├── src/
│   ├── models/              # 도메인 모델
│   │   ├── user.ts
│   │   ├── workspace.ts
│   │   └── schedule.ts
│   ├── api/                 # API 타입 (추가 예정)
│   │   ├── requests/
│   │   └── responses/
│   └── index.ts             # Export
├── package.json
└── tsconfig.json
```

### 사용 예시

#### 1. 타입 정의

```typescript
// packages/types/src/models/workspace.ts
export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  type: WorkspaceType;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkspaceType = 'band' | 'acapella' | 'orchestra';

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
  type: WorkspaceType;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
  type?: WorkspaceType;
}

export interface WorkspaceResponse {
  id: string;
  name: string;
  description: string | null;
  type: WorkspaceType;
  createdAt: string; // ISO string
  updatedAt: string;
}
```

#### 2. Export

```typescript
// packages/types/src/index.ts
export * from './models/user';
export * from './models/workspace';
export * from './models/schedule';

// 공통 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

#### 3. Frontend에서 사용

```tsx
// apps/web/src/app/workspaces/page.tsx
import type { Workspace, WorkspaceResponse } from '@ensemble/types';

async function WorkspacesPage() {
  const response = await fetch('/api/workspaces');
  const workspaces: WorkspaceResponse[] = await response.json();

  return <WorkspaceList workspaces={workspaces} />;
}
```

#### 4. Backend에서 사용

```typescript
// apps/api/src/modules/workspaces/workspaces.controller.ts
import type { CreateWorkspaceDto, WorkspaceResponse } from '@ensemble/types';

@Controller('workspaces')
export class WorkspacesController {
  @Post()
  async create(@Body() createDto: CreateWorkspaceDto): Promise<WorkspaceResponse> {
    return this.workspacesService.create(createDto);
  }
}
```

### 빌드

```bash
# 타입 패키지 빌드
pnpm --filter @ensemble/types build

# 자동 빌드 (다른 패키지 빌드 시)
pnpm build
```

## @ensemble/shared-schemas

### 목적

- Frontend/Backend에서 동일한 검증 로직 사용
- Zod를 이용한 런타임 타입 검증
- 타입 추론으로 TypeScript 타입 자동 생성

### 디렉토리 구조

```
packages/shared-schemas/
├── src/
│   ├── user.schema.ts
│   ├── workspace.schema.ts
│   ├── schedule.schema.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### 사용 예시

#### 1. 스키마 정의

```typescript
// packages/shared-schemas/src/workspace.schema.ts
import { z } from 'zod';

export const workspaceTypeSchema = z.enum(['band', 'acapella', 'orchestra']);

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, '워크스페이스 이름은 2자 이상이어야 합니다')
    .max(100, '워크스페이스 이름은 100자 이하여야 합니다'),
  description: z.string().max(500, '설명은 500자 이하여야 합니다').optional(),
  type: workspaceTypeSchema,
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  type: workspaceTypeSchema.optional(),
});

// 타입 추론
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type WorkspaceType = z.infer<typeof workspaceTypeSchema>;
```

#### 2. Frontend에서 사용 (React Hook Form + Zod)

```tsx
// apps/web/src/components/workspace/WorkspaceForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createWorkspaceSchema } from '@ensemble/shared-schemas';
import type { CreateWorkspaceInput } from '@ensemble/shared-schemas';

export function WorkspaceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceInput>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const onSubmit = async (data: CreateWorkspaceInput) => {
    const response = await fetch('/api/workspaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // ...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* ... */}
    </form>
  );
}
```

#### 3. Backend에서 사용 (NestJS Pipe)

```typescript
// apps/api/src/common/pipes/zod-validation.pipe.ts
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.errors,
      });
    }
    return result.data;
  }
}
```

```typescript
// apps/api/src/modules/workspaces/workspaces.controller.ts
import { createWorkspaceSchema } from '@ensemble/shared-schemas';

@Controller('workspaces')
export class WorkspacesController {
  @Post()
  async create(@Body(new ZodValidationPipe(createWorkspaceSchema)) createDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createDto);
  }
}
```

### 빌드

```bash
pnpm --filter @ensemble/shared-schemas build
```

## @ensemble/tsconfig

### 목적

- 프로젝트 전체의 TypeScript 설정 통일
- 환경별 (Next.js, NestJS) 프리셋 제공

### 사용 예시

#### Base Config

```json
// packages/config/tsconfig/base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
    // ...
  }
}
```

#### Next.js Config

```json
// apps/web/tsconfig.json
{
  "extends": "@ensemble/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### NestJS Config

```json
// apps/api/tsconfig.json
{
  "extends": "@ensemble/tsconfig/nestjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## @ensemble/eslint-config

### 목적

- 일관된 코드 스타일 유지
- 환경별 (Next.js, NestJS) 규칙 제공

### 사용 예시

#### Next.js ESLint

```json
// apps/web/.eslintrc.json
{
  "extends": ["@ensemble/eslint-config/next"]
}
```

#### NestJS ESLint

```json
// apps/api/.eslintrc.json
{
  "extends": ["@ensemble/eslint-config/nest"]
}
```

## 새로운 공유 패키지 추가하기

### 1. 패키지 생성

```bash
mkdir -p packages/new-package/src
cd packages/new-package
```

### 2. package.json 작성

```json
{
  "name": "@ensemble/new-package",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "@ensemble/tsconfig": "workspace:*",
    "typescript": "^5.3.3"
  }
}
```

### 3. tsconfig.json 작성

```json
{
  "extends": "@ensemble/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### 4. 코드 작성

```typescript
// packages/new-package/src/index.ts
export function hello() {
  return 'Hello from shared package!';
}
```

### 5. 빌드 및 사용

```bash
# 빌드
pnpm --filter @ensemble/new-package build

# 다른 패키지에서 사용
# apps/web/package.json
{
  "dependencies": {
    "@ensemble/new-package": "workspace:*"
  }
}

# 사용
import { hello } from '@ensemble/new-package';
```

## 공유 패키지 수정 시 주의사항

### 1. 빌드 필수

공유 패키지를 수정한 후에는 반드시 빌드해야 합니다:

```bash
pnpm --filter @ensemble/types build
```

### 2. 의존성 순서

Turborepo가 자동으로 의존성 순서를 관리하지만, 순환 참조를 피해야 합니다:

```
❌ types → shared-schemas → types (순환 참조)
✅ types ← shared-schemas (단방향)
```

### 3. Breaking Changes

공유 패키지 변경 시 영향을 받는 모든 앱을 확인:

```bash
# 타입 검사
pnpm typecheck

# 전체 빌드
pnpm build
```

## 베스트 프랙티스

### 1. 타입 먼저 정의

```typescript
// 1. types 패키지에 타입 정의
// packages/types/src/models/feature.ts

// 2. shared-schemas에 검증 스키마
// packages/shared-schemas/src/feature.schema.ts

// 3. 사용
// apps/api, apps/web
```

### 2. 명확한 Export

```typescript
// ❌ 나쁜 예
export * from './everything';

// ✅ 좋은 예
export type { User, CreateUserDto } from './models/user';
export { createUserSchema } from './user.schema';
```

### 3. 버전 관리

workspace protocol 사용:

```json
{
  "dependencies": {
    "@ensemble/types": "workspace:*"
  }
}
```

## 다음 단계

- [개발 워크플로우](./05-workflow.md)
- [테스트 가이드](./06-testing.md)
