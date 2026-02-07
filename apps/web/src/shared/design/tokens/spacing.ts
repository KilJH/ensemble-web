/**
 * Spacing Tokens (8px Grid System)
 *
 * 기준: 8px 그리드
 * - 4px: 아이콘-텍스트 간격
 * - 8px: 인라인 요소 간격
 * - 16px: 기본 패딩
 * - 24px: 카드 내부, 섹션 간격
 * - 32-48px: 페이지 여백
 */

export const spacingTokens = {
  0: '0px',
  0.5: '2px',
  1: '4px', // 0.25rem
  1.5: '6px',
  2: '8px', // 0.5rem
  2.5: '10px',
  3: '12px', // 0.75rem
  4: '16px', // 1rem
  5: '20px', // 1.25rem
  6: '24px', // 1.5rem
  8: '32px', // 2rem
  10: '40px', // 2.5rem
  12: '48px', // 3rem
  16: '64px', // 4rem
  20: '80px', // 5rem
  24: '96px', // 6rem
} as const;

export type SpacingKey = keyof typeof spacingTokens;

/**
 * 시맨틱 Spacing - 레이아웃 용도별 클래스
 */
export const layoutSpacing = {
  // 페이지 레벨
  page: {
    x: 'px-6 md:px-8 lg:px-12',
    y: 'py-8 md:py-12 lg:py-16',
    all: 'p-6 md:p-8 lg:p-12',
  },

  // 섹션 간격
  section: {
    gap: 'gap-8 md:gap-12',
    margin: 'my-8 md:my-12',
  },

  // 카드/컨테이너
  card: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },

  // 인라인 요소 (아이콘-텍스트, 버튼 내부)
  inline: {
    xs: 'gap-1',
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-3',
  },

  // 스택 (수직 배열)
  stack: {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },

  // 그리드
  grid: {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  },
} as const;

/**
 * 컴포넌트별 기본 spacing
 */
export const componentSpacing = {
  // 버튼
  button: {
    sm: { x: 'px-3', y: 'py-1.5', gap: 'gap-1.5' },
    md: { x: 'px-4', y: 'py-2', gap: 'gap-2' },
    lg: { x: 'px-6', y: 'py-2.5', gap: 'gap-2.5' },
  },

  // 입력 필드
  input: {
    sm: { x: 'px-3', y: 'py-1.5' },
    md: { x: 'px-3', y: 'py-2' },
    lg: { x: 'px-4', y: 'py-3' },
  },

  // 폼 필드 (라벨-입력-에러)
  formField: {
    gap: 'gap-2',
    labelGap: 'gap-1.5',
  },

  // 모달/다이얼로그
  modal: {
    padding: 'p-6',
    headerPadding: 'px-6 py-4',
    footerPadding: 'px-6 py-4',
    gap: 'gap-4',
  },

  // 사이드바
  sidebar: {
    padding: 'p-2',
    itemPadding: 'px-2 py-1.5',
    itemGap: 'gap-0.5',
  },

  // 헤더
  header: {
    height: 'h-12',
    padding: 'px-4',
  },
} as const;
