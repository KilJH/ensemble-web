/**
 * Color Palette - 양파 컨셉 브랜드 색상
 *
 * @searchable palette, colors, brand, onion
 *
 * Primary: 라임 그린 (흰양파 초록)
 * Secondary: 와인 푸시아 (적양파 자주)
 */

/**
 * 브랜드 팔레트 정의
 */
export const palette = {
  /**
   * Primary: Lime Green (흰양파 초록)
   * 연두빛 그린 - 흰 양파의 싱싱한 초록 부분
   */
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16', // Light mode primary
    600: '#65a30d', // Light mode hover
    700: '#4d7c0f', // Light mode pressed
    800: '#3f6212',
    900: '#365314',
  },

  /**
   * Secondary: Fuchsia (적양파 자주)
   * 와인빛 푸시아 - 적양파 껍질의 깊은 자주색
   */
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf', // Dark mode secondary
    800: '#86198f', // Light mode secondary
    900: '#701a75', // Light mode hover
  },

  /** 중립색 - 표면, 텍스트, 보더 */
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  /** 상태 색상 */
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },
} as const;

/**
 * 시맨틱 색상 매핑 (Light/Dark 모드)
 */
export const semanticColors = {
  light: {
    primary: palette.lime[500],
    primaryHover: palette.lime[600],
    primaryPressed: palette.lime[700],
    primaryMuted: 'rgba(132, 204, 22, 0.1)',
    primaryForeground: '#ffffff',

    secondary: palette.fuchsia[800],
    secondaryHover: palette.fuchsia[900],
    secondaryPressed: '#581c87', // purple-900
    secondaryMuted: 'rgba(134, 25, 143, 0.1)',
    secondaryForeground: '#ffffff',

    ring: palette.lime[300],
  },
  dark: {
    primary: palette.lime[400],
    primaryHover: palette.lime[500],
    primaryPressed: palette.lime[600],
    primaryMuted: 'rgba(163, 230, 53, 0.15)',
    primaryForeground: '#1a2e05',

    secondary: palette.fuchsia[700],
    secondaryHover: palette.fuchsia[800],
    secondaryMuted: 'rgba(162, 28, 175, 0.15)',
    secondaryForeground: palette.fuchsia[50],

    ring: palette.lime[200],
  },
} as const;

export type PaletteColor = keyof typeof palette;
export type SemanticMode = keyof typeof semanticColors;
