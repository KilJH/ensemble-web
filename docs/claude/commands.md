# 개발 명령어

## 개발 서버

```bash
pnpm dev              # 전체 개발 서버 (FE + BE)
pnpm dev:web          # Frontend only (port 3000)
pnpm dev:api          # Backend only (port 3001)
```

## 코드 품질

```bash
pnpm lint             # 린트 검사
pnpm format           # 코드 포맷팅
pnpm typecheck        # 타입 검사
```

## 빌드 & 배포

```bash
pnpm build            # 전체 빌드
pnpm build:web        # Frontend 빌드
pnpm build:api        # Backend 빌드
pnpm clean            # 빌드 캐시 삭제
```

## 패키지 빌드

```bash
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build
```

## 데이터베이스 (Prisma)

```bash
cd apps/api

pnpm prisma generate                        # Prisma Client 생성
pnpm prisma migrate dev --name [name]       # 마이그레이션
pnpm prisma studio                          # DB GUI
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
