# Specification-Driven Development (SDD)

## 대원칙

**"명세 없이 구현 없다"**

모든 새 기능은 명세를 먼저 작성한 후 구현합니다.

## 플로우

```
요구사항 분석 → 명세 작성 → 리뷰/승인 → 구현 → 검증
```

## 폴더 구조

```
spec/
├── README.md           # 이 문서
├── templates/          # 명세 템플릿
│   ├── feature.template.md
│   └── component.template.md
├── features/           # 기능별 명세
│   └── [feature-name]/
│       └── spec.md
└── archive/            # 완료된 명세 보관
```

## 명세 상태

| 상태          | 설명              |
| ------------- | ----------------- |
| `Draft`       | 작성 중           |
| `Review`      | 리뷰 대기         |
| `Approved`    | 승인됨, 구현 가능 |
| `Implemented` | 구현 완료         |

## 명세 작성 원칙

1. **구체적으로**: 모호한 표현 대신 명확한 기준 제시
2. **검증 가능하게**: Acceptance Criteria 필수
3. **독립적으로**: 다른 명세 참조 시 링크 명시
4. **최신 유지**: 변경 시 명세도 업데이트

## 명세 작성 순서

1. `templates/` 에서 적절한 템플릿 복사
2. `features/[feature-name]/spec.md` 생성
3. 템플릿 내용 채우기
4. Status를 `Draft` → `Review`로 변경
5. 리뷰 후 `Approved`로 변경
6. 구현 완료 후 `Implemented`로 변경
7. 프로젝트 완료 시 `archive/`로 이동

## 템플릿

- [Feature Template](./templates/feature.template.md) - 기능 명세
- [Component Template](./templates/component.template.md) - 컴포넌트 명세
