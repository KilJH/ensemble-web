import type { ReactNode } from 'react';

/**
 * Icon Registry
 *
 * 모든 아이콘 SVG path를 중앙 관리
 * Icon 컴포넌트에서 name prop으로 참조
 */

export interface IconDefinition {
  path: ReactNode;
  /** solid 스타일 지원 여부 */
  hasSolid?: boolean;
  /** 기본 filled 상태 */
  defaultFilled?: boolean;
}

/* ========================================
 * Navigation
 * ======================================== */

const home: IconDefinition = {
  path: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </>
  ),
};

const menu: IconDefinition = {
  path: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
};

const search: IconDefinition = {
  path: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
};

const settings: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
};

/* ========================================
 * Actions
 * ======================================== */

const plus: IconDefinition = {
  path: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
};

const edit: IconDefinition = {
  path: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),
};

const trash: IconDefinition = {
  path: (
    <>
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </>
  ),
};

const close: IconDefinition = {
  path: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
};

const check: IconDefinition = {
  path: <polyline points="20,6 9,17 4,12" />,
};

/* ========================================
 * Arrows & Chevrons
 * ======================================== */

const chevronDown: IconDefinition = {
  path: <polyline points="6,9 12,15 18,9" />,
};

const chevronUp: IconDefinition = {
  path: <polyline points="18,15 12,9 6,15" />,
};

const chevronLeft: IconDefinition = {
  path: <polyline points="15,18 9,12 15,6" />,
};

const chevronRight: IconDefinition = {
  path: <polyline points="9,18 15,12 9,6" />,
};

const arrowLeft: IconDefinition = {
  path: (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </>
  ),
};

const arrowRight: IconDefinition = {
  path: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </>
  ),
};

/* ========================================
 * User
 * ======================================== */

const user: IconDefinition = {
  path: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
};

const users: IconDefinition = {
  path: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

/* ========================================
 * General
 * ======================================== */

const calendar: IconDefinition = {
  path: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
};

const clock: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </>
  ),
};

const bell: IconDefinition = {
  path: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
};

const headphones: IconDefinition = {
  path: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </>
  ),
};

/* ========================================
 * Status
 * ======================================== */

const alertCircle: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
};

const checkCircle: IconDefinition = {
  path: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </>
  ),
};

const info: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
};

/* ========================================
 * Misc
 * ======================================== */

const moreHorizontal: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </>
  ),
};

const moreVertical: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
};

const externalLink: IconDefinition = {
  path: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
};

const logOut: IconDefinition = {
  path: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>
  ),
};

const sun: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </>
  ),
};

const moon: IconDefinition = {
  path: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
};

/* ========================================
 * Music - Playback Controls
 * ======================================== */

const play: IconDefinition = {
  path: <polygon points="5,3 19,12 5,21" />,
  hasSolid: true,
};

const pause: IconDefinition = {
  path: (
    <>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </>
  ),
};

const stop: IconDefinition = {
  path: <rect x="4" y="4" width="16" height="16" rx="2" />,
};

const skipBack: IconDefinition = {
  path: (
    <>
      <polygon points="19,20 9,12 19,4" />
      <line x1="5" y1="4" x2="5" y2="20" />
    </>
  ),
};

const skipForward: IconDefinition = {
  path: (
    <>
      <polygon points="5,4 15,12 5,20" />
      <line x1="19" y1="4" x2="19" y2="20" />
    </>
  ),
};

const loop: IconDefinition = {
  path: (
    <>
      <polyline points="17,1 21,5 17,9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7,23 3,19 7,15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
};

const repeat: IconDefinition = {
  path: (
    <>
      <polyline points="17,1 21,5 17,9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7,23 3,19 7,15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      <text x="12" y="14" fontSize="6" textAnchor="middle" fill="currentColor" stroke="none">
        1
      </text>
    </>
  ),
};

const shuffle: IconDefinition = {
  path: (
    <>
      <polyline points="16,3 21,3 21,8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21,16 21,21 16,21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </>
  ),
};

/* ========================================
 * Music - Notes & Symbols
 * ======================================== */

const musicNote: IconDefinition = {
  path: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
    </>
  ),
};

const musicNotes: IconDefinition = {
  path: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
};

const sheetMusic: IconDefinition = {
  path: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="17" y2="16" />
      <circle cx="10" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="9" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
};

const trebleClef: IconDefinition = {
  path: (
    <path d="M12 2c0 0-2 2-2 5s2 5 2 7c0 3-2 5-2 7s1 3 2 3c2 0 3-2 3-4s-1-3-3-3c-1 0-2 .5-2 2s1 3 2 3c.5 0 1-.5 1-1" />
  ),
};

const bassClef: IconDefinition = {
  path: (
    <>
      <circle cx="6" cy="10" r="4" />
      <path d="M10 10c4 0 6-2 6-5" />
      <circle cx="18" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="13" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
};

const chord: IconDefinition = {
  path: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <text x="12" y="15" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none">
        C
      </text>
    </>
  ),
};

/* ========================================
 * Music - Practice & Tools
 * ======================================== */

const metronome: IconDefinition = {
  path: (
    <>
      <path d="M12 2L6 22h12L12 2z" />
      <line x1="12" y1="22" x2="12" y2="10" />
      <line x1="12" y1="10" x2="16" y2="6" />
      <circle cx="12" cy="18" r="2" fill="currentColor" stroke="none" />
    </>
  ),
};

const practice: IconDefinition = {
  path: (
    <>
      <polygon points="4,4 12,9 4,14" />
      <path d="M16 4l-3 12h6l-3-12z" />
      <line x1="16" y1="16" x2="16" y2="10" />
      <line x1="16" y1="10" x2="18" y2="7" />
    </>
  ),
};

const tempo: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 8,14" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
    </>
  ),
};

/* ========================================
 * Music - Instruments
 * ======================================== */

const mic: IconDefinition = {
  path: (
    <>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </>
  ),
};

const guitar: IconDefinition = {
  path: (
    <>
      <ellipse cx="9" cy="16" rx="5" ry="6" />
      <line x1="14" y1="12" x2="22" y2="4" />
      <line x1="20" y1="2" x2="22" y2="4" />
      <line x1="22" y1="2" x2="22" y2="6" />
      <circle cx="9" cy="16" r="1.5" />
      <line x1="9" y1="10" x2="9" y2="22" strokeWidth="0.5" />
    </>
  ),
};

const bass: IconDefinition = {
  path: (
    <>
      <path d="M5 14c0 4 3 7 7 7s5-3 5-7-2-5-5-5-7 1-7 5z" />
      <line x1="14" y1="10" x2="22" y2="2" />
      <line x1="20" y1="2" x2="22" y2="2" />
      <line x1="22" y1="2" x2="22" y2="4" />
      <rect x="7" y="14" width="4" height="2" rx="0.5" />
    </>
  ),
};

const drum: IconDefinition = {
  path: (
    <>
      <ellipse cx="12" cy="16" rx="8" ry="4" />
      <ellipse cx="12" cy="10" rx="8" ry="4" />
      <line x1="4" y1="10" x2="4" y2="16" />
      <line x1="20" y1="10" x2="20" y2="16" />
      <line x1="8" y1="4" x2="14" y2="10" />
      <line x1="16" y1="4" x2="10" y2="10" />
    </>
  ),
};

const keyboard: IconDefinition = {
  path: (
    <>
      <rect x="2" y="8" width="20" height="10" rx="1" />
      <line x1="5" y1="8" x2="5" y2="18" />
      <line x1="8" y1="8" x2="8" y2="18" />
      <line x1="11" y1="8" x2="11" y2="18" />
      <line x1="14" y1="8" x2="14" y2="18" />
      <line x1="17" y1="8" x2="17" y2="18" />
      <line x1="20" y1="8" x2="20" y2="18" />
      <rect x="4" y="8" width="2" height="5" fill="currentColor" stroke="none" />
      <rect x="7" y="8" width="2" height="5" fill="currentColor" stroke="none" />
      <rect x="13" y="8" width="2" height="5" fill="currentColor" stroke="none" />
      <rect x="16" y="8" width="2" height="5" fill="currentColor" stroke="none" />
      <rect x="19" y="8" width="2" height="5" fill="currentColor" stroke="none" />
    </>
  ),
};

/* ========================================
 * Music - Ensemble & Collaboration
 * ======================================== */

const ensemble: IconDefinition = {
  path: (
    <>
      <circle cx="8" cy="6" r="2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="12" cy="8" r="2" />
      <path d="M4 20v-1a4 4 0 0 1 4-4" />
      <path d="M20 20v-1a4 4 0 0 0-4-4" />
      <path d="M12 20v-2a3 3 0 0 0-3-3h-1" />
      <path d="M12 20v-2a3 3 0 0 1 3-3h1" />
      <circle cx="19" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <line x1="20.5" y1="14" x2="20.5" y2="10" />
    </>
  ),
};

const mixer: IconDefinition = {
  path: (
    <>
      <line x1="4" y1="4" x2="4" y2="20" />
      <line x1="10" y1="4" x2="10" y2="20" />
      <line x1="16" y1="4" x2="16" y2="20" />
      <line x1="22" y1="4" x2="22" y2="20" />
      <rect x="2" y="14" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
      <rect x="8" y="8" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="11" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
      <rect x="20" y="6" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
};

const band: IconDefinition = {
  path: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M2 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
      <path d="M14 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
      <path d="M8 18v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
    </>
  ),
};

const volume: IconDefinition = {
  path: (
    <>
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </>
  ),
};

const volumeMute: IconDefinition = {
  path: (
    <>
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </>
  ),
};

/* ========================================
 * Music - Recording
 * ======================================== */

const record: IconDefinition = {
  path: <circle cx="12" cy="12" r="8" fill="currentColor" stroke="none" />,
  defaultFilled: true,
};

const waveform: IconDefinition = {
  path: (
    <>
      <line x1="4" y1="12" x2="4" y2="12" />
      <line x1="7" y1="8" x2="7" y2="16" />
      <line x1="10" y1="5" x2="10" y2="19" />
      <line x1="13" y1="7" x2="13" y2="17" />
      <line x1="16" y1="10" x2="16" y2="14" />
      <line x1="19" y1="6" x2="19" y2="18" />
      <line x1="22" y1="9" x2="22" y2="15" />
    </>
  ),
};

/* ========================================
 * Fallback
 * ======================================== */

const question: IconDefinition = {
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
};

/* ========================================
 * Registry Export
 * ======================================== */

export const iconRegistry = {
  // Navigation
  home,
  menu,
  search,
  settings,

  // Actions
  plus,
  edit,
  trash,
  close,
  check,

  // Arrows
  chevronDown,
  chevronUp,
  chevronLeft,
  chevronRight,
  arrowLeft,
  arrowRight,

  // User
  user,
  users,

  // General
  calendar,
  clock,
  bell,
  headphones,

  // Status
  alertCircle,
  checkCircle,
  info,

  // Misc
  moreHorizontal,
  moreVertical,
  externalLink,
  logOut,
  sun,
  moon,

  // Music - Playback
  play,
  pause,
  stop,
  skipBack,
  skipForward,
  loop,
  repeat,
  shuffle,

  // Music - Notes
  musicNote,
  musicNotes,
  music: musicNotes, // alias
  sheetMusic,
  trebleClef,
  bassClef,
  chord,

  // Music - Practice
  metronome,
  practice,
  tempo,

  // Music - Instruments
  mic,
  guitar,
  bass,
  drum,
  keyboard,
  piano: keyboard, // alias

  // Music - Ensemble
  ensemble,
  mixer,
  band,
  volume,
  volumeMute,

  // Music - Recording
  record,
  waveform,

  // Fallback
  question,
} as const;

export type IconName = keyof typeof iconRegistry;
