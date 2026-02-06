# [Component Name] Specification

## Overview

- **Layer**: shared | entities | features | widgets
- **Author**:
- **Created**: YYYY-MM-DD
- **Status**: Draft | Review | Approved | Implemented

## Purpose

[컴포넌트의 목적]

## Props Interface

```typescript
interface [Component]Props {
  // Required
  prop1: Type;

  // Optional
  prop2?: Type;

  // Event handlers
  onClick?: () => void;
}
```

## Variants

| Variant   | Description | Use Case |
| --------- | ----------- | -------- |
| primary   |             |          |
| secondary |             |          |

## Sizes

| Size | Height | Font | Padding |
| ---- | ------ | ---- | ------- |
| sm   |        |      |         |
| md   |        |      |         |
| lg   |        |      |         |

## States

- [ ] Default
- [ ] Hover
- [ ] Focus
- [ ] Active
- [ ] Disabled
- [ ] Loading
- [ ] Error

## Accessibility

- [ ] Keyboard navigation
- [ ] ARIA attributes
- [ ] Focus management
- [ ] Screen reader support

## Usage Examples

```tsx
// Basic
<Component prop1="value" />

// With variants
<Component variant="primary" size="lg" />

// With event handler
<Component onClick={() => {}} />
```

## Dependencies

- [필요한 다른 컴포넌트]
- [외부 라이브러리]

## File Location

```
src/[layer]/[component-name]/
├── ui/
│   └── [Component].tsx
├── model/              # (선택) 컴포넌트 상태
└── index.ts
```
