# [Feature Name] Specification

## Overview

- **Author**:
- **Created**: YYYY-MM-DD
- **Status**: Draft | Review | Approved | Implemented
- **Related**: [관련 명세 링크]

## Problem Statement

[해결하려는 문제를 명확히 기술]

## Goals

- [ ] Goal 1
- [ ] Goal 2

## Non-Goals

[이 명세 범위에 포함되지 않는 것]

## Requirements

### Functional Requirements

| ID     | 요구사항 | Acceptance Criteria |
| ------ | -------- | ------------------- |
| FR-001 |          |                     |
| FR-002 |          |                     |

### Non-Functional Requirements

| ID      | 요구사항 | 기준 |
| ------- | -------- | ---- |
| NFR-001 | 성능     |      |
| NFR-002 | 접근성   |      |

## Technical Design

### Data Model

```typescript
// 필요한 데이터 구조
interface Example {
  id: string;
}
```

### API Contract

```typescript
// API 엔드포인트 및 페이로드
// GET /api/example
// Request: {}
// Response: {}
```

### UI Components

| 컴포넌트 | 레이어   | 설명 |
| -------- | -------- | ---- |
|          | features |      |
|          | entities |      |
|          | shared   |      |

### State Management

[상태 관리 방식 - Zustand, React Query 등]

## Dependencies

- [외부 라이브러리]
- [다른 기능 의존성]

## FSD Layer Mapping

```
features/
└── [feature-name]/
    ├── ui/           # UI 컴포넌트
    ├── model/        # 상태, 타입
    ├── api/          # API 호출
    └── index.ts      # Public API
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
| ---- | ------ | ---------- |
|      |        |            |

## Open Questions

- [ ] Question 1
- [ ] Question 2
