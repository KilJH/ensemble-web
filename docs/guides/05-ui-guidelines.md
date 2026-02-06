# UI 가이드라인

## 디자인 시스템 개요

- **Primary**: Green (브랜드 메인)
- **Secondary**: Purple (보조 강조)
- **특징**: Glassmorphism, Light/Dark Mode

---

## 테마 시스템

### 다크/라이트 모드

- CSS 변수 기반 (`globals.css`)
- 클래스 전환: `<html class="dark">`
- `prefers-color-scheme` 초기값 반영

### 색상 토큰 사용법

```tsx
// Tailwind 클래스
<div className="bg-surface text-text border-border" />
<button className="bg-primary text-primary-foreground hover:bg-primary-hover" />

// 직접 색상 필요 시 (Brand Palette)
<div className="bg-green-500" />
<div className="bg-purple-400" />
```

---

## Semantic Colors

### Background & Surface

| Token | Light | Dark | 용도 |
|-------|-------|------|------|
| `bg` | #FFFFFF | #0B1220 | 페이지 배경 |
| `surface` | #F9FAFB | #0F172A | 카드, 섹션 |
| `surface-2` | #F3F4F6 | #111C34 | 중첩 영역 |
| `surface-elevated` | #FFFFFF | #1E293B | 모달, 드롭다운 |

### Text

| Token | Light | Dark | 용도 |
|-------|-------|------|------|
| `text` | #111827 | #E5E7EB | 기본 텍스트 |
| `text-muted` | #6B7280 | #94A3B8 | 보조 텍스트 |
| `text-subtle` | #9CA3AF | #64748B | 힌트, 플레이스홀더 |

### Primary & Secondary

```tsx
// Primary (Green)
<button className="bg-primary hover:bg-primary-hover active:bg-primary-pressed">
  확인
</button>

// Secondary (Purple)
<button className="bg-secondary hover:bg-secondary-hover">
  보조 액션
</button>

// Muted 배경 (투명도)
<div className="bg-primary-muted text-primary">태그</div>
```

### Status Colors

| Token | Color | 용도 |
|-------|-------|------|
| `success` | #10B981 | 성공 |
| `warning` | #F59E0B | 경고 |
| `danger` | #EF4444 | 오류, 삭제 |
| `info` | #3B82F6 | 정보 |

---

## Glassmorphism

### 유틸리티 클래스

```tsx
// 기본 글래스 효과
<div className="glass rounded-lg p-4">
  콘텐츠
</div>

// 약한 효과 (Sidebar, Nav)
<nav className="glass-subtle" />

// 강한 효과 (Modal, Hero)
<div className="glass-strong" />
```

### 구성 요소

- `backdrop-filter: blur(16px)`
- `background: var(--glass-bg)` (반투명)
- `border: 1px solid var(--glass-border)`
- `box-shadow: var(--shadow-glass)`

---

## Shadow System

```tsx
// 레벨별 그림자
<div className="shadow-xs" />  // 미세한 그림자
<div className="shadow-sm" />  // 작은 그림자
<div className="shadow-md" />  // 중간 (카드)
<div className="shadow-lg" />  // 큰 (드롭다운)
<div className="shadow-xl" />  // 매우 큰 (모달)

// 글로우 효과
<button className="shadow-glow-primary" />   // Primary 글로우
<button className="shadow-glow-secondary" /> // Secondary 글로우

// 글래스 그림자
<div className="shadow-glass" />
```

---

## Gradient

```tsx
// 브랜드 그라디언트 (Green → Purple)
<div className="bg-gradient-brand text-white">
  Hero 섹션
</div>

// 호버 시 그라디언트 변경
<button className="bg-gradient-brand hover:bg-gradient-brand-hover">
  CTA 버튼
</button>

// 표면 그라디언트
<div className="bg-gradient-surface" />
```

---

## Border Radius

| Class | Size | 용도 |
|-------|------|------|
| `rounded-sm` | 8px | 작은 요소, 태그 |
| `rounded-md` | 12px | 버튼, 인풋 |
| `rounded-lg` | 16px | 카드 |
| `rounded-xl` | 20px | 큰 카드, 모달 |
| `rounded-2xl` | 24px | 히어로 섹션 |

---

## Z-Index Scale

| Class | Value | 용도 |
|-------|-------|------|
| `z-dropdown` | 50 | 드롭다운 메뉴 |
| `z-sticky` | 100 | 스티키 헤더 |
| `z-fixed` | 200 | 고정 요소 |
| `z-modal-backdrop` | 300 | 모달 배경 |
| `z-modal` | 400 | 모달 |
| `z-popover` | 500 | 팝오버 |
| `z-tooltip` | 600 | 툴팁 |

---

## Animation & Transition

```tsx
// 속도
<div className="transition-fast" />   // 150ms (빠른 피드백)
<div className="transition-normal" /> // 250ms (기본)
<div className="transition-slow" />   // 350ms (부드러운 전환)

// 이징
<div className="ease-default" /> // 기본
<div className="ease-bounce" />  // 바운스 효과
```

---

## Focus Ring

```tsx
// focus-visible 시 링 표시
<button className="focus-ring">버튼</button>
<input className="focus-ring" />
```

---

## 반응형 UI

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Container Query

```tsx
<div className="@container">
  <div className="@lg:flex-row flex-col">...</div>
</div>
```

---

## 최신 CSS 활용

### 허용 CSS 기능

- Container Query (`@container`)
- CSS Layers (`@layer`)
- Scope At-rules (`@scope`)
- Custom Media Queries (`@custom-media`)
- `:has()`, `:is()`, `:where()`
- Logical Properties
- `color-mix()`, `oklch()`

---

## SEO 설정

- **허용**: `/` (메인 홈)
- **불허용**: 나머지 페이지 (`noindex`)

```txt
# robots.txt
User-agent: *
Allow: /$
Disallow: /
```

---

## 파일 위치

- CSS 변수: `apps/web/src/app/globals.css`
- Tailwind 설정: `apps/web/tailwind.config.ts`
