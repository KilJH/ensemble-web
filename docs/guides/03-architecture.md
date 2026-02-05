# 아키텍처 상세

## 전체 구조

```
┌─────────────────────────────────────────────────────┐
│                   Browser/Client                     │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│              Next.js Frontend (Port 3000)            │
│  ┌──────────────────────────────────────────────┐   │
│  │ App Router (RSC)                             │   │
│  │  - Server Components                         │   │
│  │  - Client Components                         │   │
│  └──────────────┬───────────────────────────────┘   │
│                 │                                    │
│  ┌──────────────▼───────────────────────────────┐   │
│  │ Shared Packages                              │   │
│  │  - @ensemble/types (타입)                    │   │
│  │  - @ensemble/shared-schemas (검증)           │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP/REST API
┌─────────────────────▼───────────────────────────────┐
│              NestJS Backend (Port 3001)              │
│  ┌──────────────────────────────────────────────┐   │
│  │ Controllers (API Endpoints)                  │   │
│  └──────────────┬───────────────────────────────┘   │
│                 │                                    │
│  ┌──────────────▼───────────────────────────────┐   │
│  │ Services (Business Logic)                    │   │
│  └──────────────┬───────────────────────────────┘   │
│                 │                                    │
│  ┌──────────────▼───────────────────────────────┐   │
│  │ Prisma ORM                                   │   │
│  └──────────────┬───────────────────────────────┘   │
└─────────────────┼───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              PostgreSQL Database                     │
└─────────────────────────────────────────────────────┘
```

## Frontend 아키텍처 (Next.js)

### App Router 구조

```
apps/web/src/app/
├── layout.tsx              # Root Layout
├── page.tsx                # Home Page
├── (auth)/                 # Route Group (인증)
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── workspaces/             # 워크스페이스
│   ├── page.tsx           # 목록
│   ├── [id]/              # 상세
│   │   ├── page.tsx
│   │   ├── schedules/     # 일정
│   │   └── members/       # 멤버
│   └── new/
│       └── page.tsx
└── api/                    # Route Handlers (선택)
    └── auth/
        └── route.ts
```

### 컴포넌트 구조

```
apps/web/src/components/
├── ui/                     # 공통 UI 컴포넌트
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── workspace/              # 도메인별 컴포넌트
│   ├── WorkspaceCard.tsx
│   ├── WorkspaceForm.tsx
│   └── MemberList.tsx
└── layout/                 # 레이아웃 컴포넌트
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx
```

### 데이터 흐름

1. **Server Component** (기본)

   ```tsx
   // app/workspaces/page.tsx
   async function WorkspacesPage() {
     const workspaces = await fetch('/api/workspaces').then((r) => r.json());
     return <WorkspaceList workspaces={workspaces} />;
   }
   ```

2. **Client Component** (상호작용 필요 시)

   ```tsx
   'use client';

   function WorkspaceForm() {
     const [data, setData] = useState({});
     // 폼 제출, 상태 관리 등
   }
   ```

## Backend 아키텍처 (NestJS)

### 모듈 구조

```
apps/api/src/modules/
├── auth/                   # 인증/인가
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   └── guards/
│       ├── jwt-auth.guard.ts
│       └── roles.guard.ts
│
├── users/                  # 사용자 관리
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── entities/
│       └── user.entity.ts
│
└── workspaces/             # 워크스페이스 관리
    ├── workspaces.module.ts
    ├── workspaces.controller.ts
    ├── workspaces.service.ts
    ├── dto/
    └── entities/
```

### 계층별 책임

#### Controller

- HTTP 요청/응답 처리
- 요청 검증 (DTO)
- 인증/인가 Guard 적용

```typescript
@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createDto);
  }
}
```

#### Service

- 비즈니스 로직
- 트랜잭션 관리
- 외부 서비스 호출

```typescript
@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data,
    });
  }
}
```

#### Repository (Prisma)

- 데이터베이스 접근
- 쿼리 최적화

```typescript
@Injectable()
export class PrismaService extends PrismaClient {
  // Prisma Client 확장
}
```

### 공통 모듈

```
apps/api/src/common/
├── decorators/             # Custom Decorators
│   ├── current-user.decorator.ts
│   └── roles.decorator.ts
├── filters/                # Exception Filters
│   └── http-exception.filter.ts
├── guards/                 # Guards
│   └── roles.guard.ts
├── interceptors/           # Interceptors
│   ├── logging.interceptor.ts
│   └── transform.interceptor.ts
├── pipes/                  # Pipes
│   └── validation.pipe.ts
├── prisma.service.ts       # Prisma Service
└── prisma.module.ts        # Prisma Module
```

## 데이터베이스 설계

### Prisma 스키마 구조

```prisma
// apps/api/prisma/schema.prisma

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  workspaceMemberships WorkspaceMember[]

  @@map("users")
}

model Workspace {
  id          String   @id @default(uuid())
  name        String
  description String?
  type        String   // "band", "acapella", "orchestra"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  members WorkspaceMember[]

  @@map("workspaces")
}

model WorkspaceMember {
  id          String   @id @default(uuid())
  role        String   // "owner", "admin", "member"
  userId      String
  workspaceId String
  createdAt   DateTime @default(now())

  // Relations
  user      User      @relation(fields: [userId], references: [id])
  workspace Workspace @relation(fields: [workspaceId], references: [id])

  @@unique([userId, workspaceId])
  @@map("workspace_members")
}
```

## 공유 패키지 통합

### 타입 정의 (@ensemble/types)

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
```

### 검증 스키마 (@ensemble/shared-schemas)

```typescript
// packages/shared-schemas/src/workspace.schema.ts
import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['band', 'acapella', 'orchestra']),
});
```

### Frontend에서 사용

```tsx
// apps/web/src/components/workspace/WorkspaceForm.tsx
import { createWorkspaceSchema } from '@ensemble/shared-schemas';
import type { CreateWorkspaceDto } from '@ensemble/types';

function WorkspaceForm() {
  const handleSubmit = (data: CreateWorkspaceDto) => {
    // Zod 검증
    const result = createWorkspaceSchema.safeParse(data);
    if (!result.success) {
      // 에러 처리
    }
  };
}
```

### Backend에서 사용

```typescript
// apps/api/src/modules/workspaces/dto/create-workspace.dto.ts
import { createWorkspaceSchema } from '@ensemble/shared-schemas';
import { z } from 'zod';

export class CreateWorkspaceDto {
  name: string;
  description?: string;
  type: 'band' | 'acapella' | 'orchestra';
}

// ValidationPipe에서 Zod 스키마 사용 가능
```

## 인증/인가 플로우

```
1. 로그인 요청
   POST /api/auth/login
   { email, password }

2. JWT 토큰 발급
   { accessToken, refreshToken }

3. 인증이 필요한 요청
   GET /api/workspaces
   Header: Authorization: Bearer <token>

4. JWT Guard 검증
   - 토큰 유효성 검사
   - 사용자 정보 추출

5. 비즈니스 로직 실행
   - 권한 확인
   - 데이터 반환
```

## 에러 처리

### Frontend

```tsx
try {
  const response = await fetch('/api/workspaces');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
} catch (error) {
  // 에러 처리
  console.error(error);
}
```

### Backend

```typescript
@Injectable()
export class WorkspacesService {
  async findOne(id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }
}
```

## 다음 단계

- [공유 패키지 사용법](./04-shared-packages.md)
- [개발 워크플로우](./05-workflow.md)
