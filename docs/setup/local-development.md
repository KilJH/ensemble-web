# 로컬 개발 환경 세팅 가이드

## 1. 사전 요구사항

- Node.js 18+
- pnpm
- PostgreSQL (로컬)
- Google Cloud Console 계정

## 2. PostgreSQL 설치 및 설정

### macOS (Homebrew)

```bash
# 설치
brew install postgresql@15

# 서비스 시작
brew services start postgresql@15

# 데이터베이스 생성
createdb ensemble_dev
```

### 접속 확인

```bash
psql -d ensemble_dev
# \q 로 종료
```

## 3. Google OAuth 설정

### 3.1 Google Cloud Console 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 (예: `ensemble-dev`)

### 3.2 OAuth 동의 화면 설정

1. **API 및 서비스 > OAuth 동의 화면** 이동
2. User Type: **외부** 선택
3. 필수 정보 입력:
   - 앱 이름: `앙상블 (개발)`
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
4. 범위(Scopes) 추가:
   - `email`
   - `profile`
   - `openid`
5. 테스트 사용자 추가 (본인 Gmail 주소)

### 3.3 OAuth 클라이언트 ID 생성

1. **API 및 서비스 > 사용자 인증 정보** 이동
2. **사용자 인증 정보 만들기 > OAuth 클라이언트 ID**
3. 애플리케이션 유형: **웹 애플리케이션**
4. 이름: `Ensemble Web (Local)`
5. 승인된 리디렉션 URI 추가:
   ```
   http://localhost:3000/auth/callback
   ```
6. **만들기** 클릭
7. **클라이언트 ID**와 **클라이언트 보안 비밀번호** 복사 (`.env`에 사용)

## 4. 환경 변수 설정

### Backend (`apps/api/.env`)

```env
# Database
DATABASE_URL="postgresql://사용자명@localhost:5432/ensemble_dev"

# Server
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

# JWT
JWT_SECRET=your-jwt-secret-at-least-32-characters-long
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

### Frontend (`apps/web/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### JWT_SECRET 생성

```bash
# 랜덤 시크릿 생성
openssl rand -base64 32
```

## 5. 프로젝트 설정

### 의존성 설치

```bash
pnpm install
```

### 데이터베이스 마이그레이션

```bash
cd apps/api
pnpm prisma migrate dev --name init
```

### Prisma Client 생성 (자동 실행됨)

```bash
pnpm prisma generate
```

## 6. 개발 서버 실행

### 전체 실행 (Frontend + Backend)

```bash
pnpm dev
```

### 개별 실행

```bash
# Backend only
pnpm dev:api

# Frontend only
pnpm dev:web
```

### 접속 URL

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

## 7. 인증 플로우 테스트

1. http://localhost:3000 접속
2. **시작하기** 버튼 클릭
3. Google 로그인
4. 온보딩 (닉네임 설정)
5. 대시보드 확인

## 8. 문제 해결

### PostgreSQL 연결 실패

```bash
# PostgreSQL 상태 확인
brew services list

# 재시작
brew services restart postgresql@15
```

### Prisma 마이그레이션 오류

```bash
# 스키마 리셋 (개발용, 데이터 삭제됨)
pnpm prisma migrate reset
```

### Google OAuth 오류

- 리디렉션 URI가 정확히 `http://localhost:3000/auth/callback` 인지 확인
- 테스트 사용자에 본인 이메일이 추가되었는지 확인

## 9. 배포 시 변경사항 (나중에)

### Vercel (Frontend)

- `NEXT_PUBLIC_API_URL`을 실제 API URL로 변경
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 유지

### Supabase (Database)

- `DATABASE_URL`을 Supabase connection string으로 변경
- Prisma migrate deploy 실행

### Google OAuth

- 프로덕션 리디렉션 URI 추가
- OAuth 동의 화면 게시 상태로 변경
