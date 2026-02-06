# 문제 해결

## pnpm install 실패

```bash
pnpm store prune
pnpm install
```

## 타입 에러

```bash
# Prisma Client 재생성
cd apps/api && pnpm prisma generate

# 공유 패키지 재빌드
pnpm --filter @ensemble/types build
pnpm --filter @ensemble/shared-schemas build
```

## Turbo 캐시 문제

```bash
pnpm clean
rm -rf .turbo
pnpm install
```

## ESLint FSD 레이어 에러

FSD 레이어 규칙 위반 시 `boundaries/element-types` 에러 발생.

해결: import 방향 확인 (상위 → 하위만 허용)

```
app → widgets → features → entities → shared
```
