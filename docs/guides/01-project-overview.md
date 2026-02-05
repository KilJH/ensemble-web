# 프로젝트 개요

## 앙상블(Ensemble)이란?

음악 동호인(밴드/아카펠라/오케스트라)을 위한 워크스페이스 기반 SaaS 플랫폼입니다.

### 핵심 기능

1. **워크스페이스 관리**
   - 밴드, 아카펠라, 오케스트라 그룹별 독립 공간
   - 멤버 관리 및 권한 설정

2. **합주 관리**
   - 합주 일정 생성 및 관리
   - 참석 여부 확인
   - 곡 목록 및 파트 배정

3. **연습 트래킹**
   - 개인/그룹 연습 기록
   - 진도 관리
   - 녹음/영상 업로드

4. **멤버 모집**
   - 파트별 모집 공고
   - 지원자 관리
   - 오디션 일정 조율

## 기술적 목표

### 확장성

- Monorepo 구조로 코드 재사용 극대화
- 마이크로서비스 전환 용이한 모듈 구조
- 수평 확장 가능한 아키텍처

### 안정성

- TypeScript strict mode로 타입 안정성 확보
- End-to-end 타입 안정성 (Prisma → BE → FE)
- 검증 레이어 다중화 (클라이언트 + 서버)

### 개발 생산성

- Turborepo 빌드 캐싱
- Hot reload (FE/BE)
- 공유 패키지로 중복 코드 제거
- Git hooks로 코드 품질 자동 관리

### 성능

- Next.js App Router (React Server Components)
- 이미지/에셋 최적화
- DB 쿼리 최적화 (Prisma)

## 아키텍처 원칙

1. **도메인 주도 설계 (DDD)**
   - 비즈니스 도메인별 모듈 분리
   - 명확한 경계 컨텍스트

2. **계층 분리**
   - Presentation (FE)
   - Application (BE Controllers/Services)
   - Domain (Business Logic)
   - Infrastructure (DB, External APIs)

3. **타입 안정성**
   - 모든 데이터는 타입 정의 필수
   - 런타임 검증 + 컴파일타임 검증

4. **테스트 가능성**
   - 의존성 주입
   - Mock/Stub 용이한 구조
   - 단위 테스트 + E2E 테스트

## 프로젝트 구조 철학

### Monorepo 선택 이유

**장점:**

- 코드 공유 간편 (타입, 유틸리티, 설정)
- 원자적 커밋 (FE/BE 동시 변경)
- 일관된 의존성 버전 관리
- 통합 CI/CD

**단점 관리:**

- Turborepo로 빌드 최적화
- 명확한 패키지 경계 설정
- 독립 배포 가능한 구조 유지

### 패키지 분류

1. **Apps** (`apps/`)
   - 독립 실행 가능한 애플리케이션
   - 각 앱은 독립 배포 가능
   - 예: web, api

2. **Packages** (`packages/`)
   - 공유 라이브러리
   - 여러 앱에서 재사용
   - 예: types, shared-schemas, config

## 개발 워크플로우

### 일반적인 기능 개발 순서

1. **기획/설계**
   - 도메인 모델 설계
   - API 명세 작성
   - UI/UX 설계

2. **타입 정의**
   - `packages/types`에 도메인 모델 타입 추가
   - `packages/shared-schemas`에 검증 스키마 추가

3. **백엔드 구현**
   - Prisma 스키마 업데이트
   - NestJS 모듈/서비스/컨트롤러 구현
   - DTO 작성

4. **프론트엔드 구현**
   - API 클라이언트 작성
   - 페이지/컴포넌트 구현
   - 상태 관리

5. **테스트**
   - 단위 테스트
   - 통합 테스트
   - E2E 테스트

6. **배포**
   - 코드 리뷰
   - PR 머지
   - CI/CD 자동 배포

## 다음 단계

- [개발 환경 설정](./02-development-setup.md)
- [아키텍처 상세](./03-architecture.md)
- [공유 패키지 사용법](./04-shared-packages.md)
