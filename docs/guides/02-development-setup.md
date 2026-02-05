# 개발 환경 설정

## 사전 요구사항

### 필수 소프트웨어

1. **Node.js** (>= 18.0.0)

   ```bash
   node --version
   # v18.0.0 이상
   ```

2. **pnpm** (>= 8.0.0)

   ```bash
   npm install -g pnpm
   pnpm --version
   # 8.0.0 이상
   ```

3. **PostgreSQL** (>= 14.0)

   ```bash
   # macOS (Homebrew)
   brew install postgresql@14
   brew services start postgresql@14

   # 또는 Docker
   docker run -d \
     --name ensemble-postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=ensemble_dev \
     -p 5432:5432 \
     postgres:14
   ```

4. **Git**
   ```bash
   git --version
   ```

### 권장 도구

- **VS Code** + Extensions:
  - ESLint
  - Prettier
  - Prisma
  - TypeScript
  - Tailwind CSS IntelliSense

- **Database GUI** (선택):
  - Prisma Studio (내장)
  - pgAdmin
  - DBeaver

## 프로젝트 설정

### 1. 저장소 클론

```bash
git clone git@github.com:KilJH/ensemble-web.git
cd ensemble-web
```

### 2. 의존성 설치

```bash
pnpm install
```

이 명령어는:

- 모든 워크스페이스 패키지의 의존성 설치
- Husky git hooks 설정
- Prisma Client 생성 시도 (환경 변수 없으면 경고)

### 3. 환경 변수 설정

#### Backend (.env)

```bash
cp apps/api/.env.example apps/api/.env
```

`apps/api/.env` 파일 편집:

```bash
# Application
NODE_ENV=development
PORT=3001

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/ensemble_dev?schema=public"

# JWT
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRATION=7d
```

#### Frontend (.env)

```bash
cp apps/web/.env.example apps/web/.env
```

`apps/web/.env` 파일 편집:

```bash
# API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

### 4. 데이터베이스 설정

#### 데이터베이스 생성 (PostgreSQL)

```bash
# psql로 접속
psql postgres

# 데이터베이스 생성
CREATE DATABASE ensemble_dev;

# 사용자 생성 (필요시)
CREATE USER ensemble_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ensemble_dev TO ensemble_user;

# 종료
\q
```

#### Prisma 마이그레이션

```bash
cd apps/api

# Prisma Client 생성
pnpm prisma generate

# 초기 마이그레이션 실행
pnpm prisma migrate dev --name init

# Prisma Studio 실행 (선택)
pnpm prisma studio
```

### 5. 공유 패키지 빌드

```bash
# Root 디렉토리에서
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build
```

### 6. 타입 검사

```bash
pnpm typecheck
```

모든 패키지에서 타입 에러가 없어야 합니다.

## 개발 서버 실행

### 전체 실행 (권장)

```bash
pnpm dev
```

Turborepo가 FE/BE를 동시에 실행합니다:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api

### 개별 실행

```bash
# Frontend만
pnpm --filter @ensemble/web dev

# Backend만
pnpm --filter @ensemble/api dev
```

## IDE 설정

### VS Code

#### 권장 Extensions

`.vscode/extensions.json` 생성:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss"
  ]
}
```

#### 설정

`.vscode/settings.json` 생성:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## 일반적인 문제 해결

### pnpm install 실패

```bash
# 캐시 삭제
pnpm store prune

# node_modules 삭제 후 재설치
pnpm clean
pnpm install
```

### Prisma Client 에러

```bash
cd apps/api

# Client 재생성
pnpm prisma generate

# 마이그레이션 재실행
pnpm prisma migrate reset
pnpm prisma migrate dev
```

### 포트 충돌

```bash
# 포트 사용 중인 프로세스 확인
lsof -i :3000  # Frontend
lsof -i :3001  # Backend

# 프로세스 종료
kill -9 <PID>
```

### 타입 에러

```bash
# 공유 패키지 재빌드
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build

# Prisma Client 재생성
cd apps/api && pnpm prisma generate

# 타입 검사
pnpm typecheck
```

### Git hooks 실행 안 됨

```bash
# Husky 재설치
rm -rf .husky
pnpm prepare
```

## 다음 단계

개발 환경 설정이 완료되었습니다!

- [아키텍처 상세](./03-architecture.md)
- [공유 패키지 사용법](./04-shared-packages.md)
- [개발 워크플로우](./05-workflow.md)

## 유용한 명령어 모음

```bash
# 개발
pnpm dev                          # 전체 개발 서버
pnpm build                        # 전체 빌드
pnpm clean                        # 빌드 캐시 삭제

# 코드 품질
pnpm lint                         # 린트 검사
pnpm format                       # 포맷팅
pnpm typecheck                    # 타입 검사

# 데이터베이스
cd apps/api
pnpm prisma studio               # DB GUI
pnpm prisma migrate dev          # 마이그레이션
pnpm prisma generate             # Client 생성

# 특정 패키지
pnpm --filter @ensemble/web dev  # Frontend만
pnpm --filter @ensemble/api dev  # Backend만
```
