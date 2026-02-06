# 앙상블 프로젝트

음악 동호인을 위한 워크스페이스 기반 SaaS (합주/연습/모집/일정 관리)

## 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: NestJS, Prisma, PostgreSQL
- **Monorepo**: pnpm workspace, Turborepo

## 핵심 규칙

### SDD (Specification-Driven Development)

새 기능은 명세 먼저 작성: `apps/web/spec/features/[name]/spec.md`

### FSD (Feature-Sliced Design)

레이어 규칙 (ESLint boundaries 강제):

```
app → widgets → features → entities → shared
```

상위는 하위만 import 가능.

### 코드 품질

- `any` 타입 금지
- `.env` 파일 커밋 금지
- 커밋 전: `pnpm typecheck && pnpm lint`

## 명령어

```bash
pnpm dev           # 전체 개발 서버
pnpm dev:web       # Frontend (port 3000)
pnpm dev:api       # Backend (port 3001)
pnpm typecheck     # 타입 검사
pnpm lint          # 린트 검사
```

## 커밋 메시지

```
<type>: <subject>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

type: feat, fix, docs, style, refactor, test, chore

## 상세 가이드

필요 시 참조:

- @docs/claude/architecture.md - FSD, SDD, 프로젝트 구조
- @docs/claude/commands.md - 전체 명령어, 환경 변수
- @docs/claude/troubleshooting.md - 문제 해결
- @apps/web/spec/README.md - SDD 가이드
