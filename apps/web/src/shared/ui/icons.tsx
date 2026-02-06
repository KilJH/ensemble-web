import { forwardRef, type SVGProps } from 'react';

/**
 * Icon Design Guidelines
 * ----------------------
 * - Style: Outline (stroke) 기본, fill은 상태/강조용
 * - Stroke: 1.5px (sm) / 2px (md, lg)
 * - Size: 16 / 20 / 24
 * - Color: text-muted (기본) / text-primary (강조) / success, warning, danger (상태)
 * - 의미 모호한 아이콘은 반드시 Tooltip과 함께 사용
 */

type IconSize = 16 | 20 | 24 | number;

type IconProps = SVGProps<SVGSVGElement> & {
  size?: IconSize;
  /** filled 스타일 (지원하는 아이콘만) */
  filled?: boolean;
};

const getStrokeWidth = (size: IconSize) => (size <= 16 ? 1.5 : 2);

const createIcon = (
  path: React.ReactNode,
  displayName: string,
  options?: { defaultFilled?: boolean },
) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, filled = options?.defaultFilled ?? false, className = '', ...props }, ref) => (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={getStrokeWidth(size)}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {path}
      </svg>
    ),
  );
  Icon.displayName = displayName;
  return Icon;
};

/* ========================================
 * Navigation
 * ======================================== */

export const HomeIcon = createIcon(
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </>,
  'HomeIcon',
);

export const MenuIcon = createIcon(
  <>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>,
  'MenuIcon',
);

export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>,
  'SearchIcon',
);

export const SettingsIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>,
  'SettingsIcon',
);

/* ========================================
 * Actions
 * ======================================== */

export const PlusIcon = createIcon(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>,
  'PlusIcon',
);

export const EditIcon = createIcon(
  <>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </>,
  'EditIcon',
);

export const TrashIcon = createIcon(
  <>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </>,
  'TrashIcon',
);

export const CloseIcon = createIcon(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>,
  'CloseIcon',
);

export const CheckIcon = createIcon(<polyline points="20,6 9,17 4,12" />, 'CheckIcon');

/* ========================================
 * Arrows & Chevrons
 * ======================================== */

export const ChevronDownIcon = createIcon(<polyline points="6,9 12,15 18,9" />, 'ChevronDownIcon');
export const ChevronUpIcon = createIcon(<polyline points="18,15 12,9 6,15" />, 'ChevronUpIcon');
export const ChevronLeftIcon = createIcon(<polyline points="15,18 9,12 15,6" />, 'ChevronLeftIcon');
export const ChevronRightIcon = createIcon(
  <polyline points="9,18 15,12 9,6" />,
  'ChevronRightIcon',
);

export const ArrowLeftIcon = createIcon(
  <>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </>,
  'ArrowLeftIcon',
);

export const ArrowRightIcon = createIcon(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </>,
  'ArrowRightIcon',
);

/* ========================================
 * User
 * ======================================== */

export const UserIcon = createIcon(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>,
  'UserIcon',
);

export const UsersIcon = createIcon(
  <>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  'UsersIcon',
);

/* ========================================
 * General
 * ======================================== */

export const CalendarIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>,
  'CalendarIcon',
);

export const ClockIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </>,
  'ClockIcon',
);

export const BellIcon = createIcon(
  <>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </>,
  'BellIcon',
);

/* ========================================
 * Status
 * ======================================== */

export const AlertCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </>,
  'AlertCircleIcon',
);

export const CheckCircleIcon = createIcon(
  <>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </>,
  'CheckCircleIcon',
);

export const InfoIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </>,
  'InfoIcon',
);

/* ========================================
 * Misc
 * ======================================== */

export const MoreHorizontalIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </>,
  'MoreHorizontalIcon',
);

export const MoreVerticalIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </>,
  'MoreVerticalIcon',
);

export const ExternalLinkIcon = createIcon(
  <>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </>,
  'ExternalLinkIcon',
);

export const LogOutIcon = createIcon(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </>,
  'LogOutIcon',
);

export const SunIcon = createIcon(
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
  </>,
  'SunIcon',
);

export const MoonIcon = createIcon(
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  'MoonIcon',
);

export const HeadphonesIcon = createIcon(
  <>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </>,
  'HeadphonesIcon',
);

/* ========================================
 * Music - Playback Controls
 * ======================================== */

export const PlayIcon = createIcon(<polygon points="5,3 19,12 5,21" />, 'PlayIcon');

export const PauseIcon = createIcon(
  <>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </>,
  'PauseIcon',
);

export const StopIcon = createIcon(<rect x="4" y="4" width="16" height="16" rx="2" />, 'StopIcon');

export const SkipBackIcon = createIcon(
  <>
    <polygon points="19,20 9,12 19,4" />
    <line x1="5" y1="4" x2="5" y2="20" />
  </>,
  'SkipBackIcon',
);

export const SkipForwardIcon = createIcon(
  <>
    <polygon points="5,4 15,12 5,20" />
    <line x1="19" y1="4" x2="19" y2="20" />
  </>,
  'SkipForwardIcon',
);

export const LoopIcon = createIcon(
  <>
    <polyline points="17,1 21,5 17,9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7,23 3,19 7,15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </>,
  'LoopIcon',
);

export const RepeatIcon = createIcon(
  <>
    <polyline points="17,1 21,5 17,9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7,23 3,19 7,15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    <text x="12" y="14" fontSize="6" textAnchor="middle" fill="currentColor" stroke="none">
      1
    </text>
  </>,
  'RepeatIcon',
);

export const ShuffleIcon = createIcon(
  <>
    <polyline points="16,3 21,3 21,8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21,16 21,21 16,21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </>,
  'ShuffleIcon',
);

/* ========================================
 * Music - Notes & Symbols
 * ======================================== */

export const MusicNoteIcon = createIcon(
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
  </>,
  'MusicNoteIcon',
);

export const MusicNotesIcon = createIcon(
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </>,
  'MusicNotesIcon',
);

// Legacy alias
export const MusicIcon = MusicNotesIcon;

export const SheetMusicIcon = createIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
    <circle cx="10" cy="8" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="14" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </>,
  'SheetMusicIcon',
);

export const TrebleClefIcon = createIcon(
  <path d="M12 2c0 0-2 2-2 5s2 5 2 7c0 3-2 5-2 7s1 3 2 3c2 0 3-2 3-4s-1-3-3-3c-1 0-2 .5-2 2s1 3 2 3c.5 0 1-.5 1-1" />,
  'TrebleClefIcon',
);

export const BassClefIcon = createIcon(
  <>
    <circle cx="6" cy="10" r="4" />
    <path d="M10 10c4 0 6-2 6-5" />
    <circle cx="18" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="18" cy="13" r="1.5" fill="currentColor" stroke="none" />
  </>,
  'BassClefIcon',
);

export const ChordIcon = createIcon(
  <>
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <text x="12" y="15" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none">
      C
    </text>
  </>,
  'ChordIcon',
);

/* ========================================
 * Music - Practice & Tools
 * ======================================== */

export const MetronomeIcon = createIcon(
  <>
    <path d="M12 2L6 22h12L12 2z" />
    <line x1="12" y1="22" x2="12" y2="10" />
    <line x1="12" y1="10" x2="16" y2="6" />
    <circle cx="12" cy="18" r="2" fill="currentColor" stroke="none" />
  </>,
  'MetronomeIcon',
);

export const PracticeIcon = createIcon(
  <>
    {/* Play triangle */}
    <polygon points="4,4 12,9 4,14" />
    {/* Metronome */}
    <path d="M16 4l-3 12h6l-3-12z" />
    <line x1="16" y1="16" x2="16" y2="10" />
    <line x1="16" y1="10" x2="18" y2="7" />
  </>,
  'PracticeIcon',
);

export const TempoIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 8,14" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
  </>,
  'TempoIcon',
);

/* ========================================
 * Music - Instruments
 * ======================================== */

export const MicIcon = createIcon(
  <>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </>,
  'MicIcon',
);

export const GuitarIcon = createIcon(
  <>
    {/* Body */}
    <ellipse cx="9" cy="16" rx="5" ry="6" />
    {/* Neck */}
    <line x1="14" y1="12" x2="22" y2="4" />
    {/* Headstock */}
    <line x1="20" y1="2" x2="22" y2="4" />
    <line x1="22" y1="2" x2="22" y2="6" />
    {/* Sound hole */}
    <circle cx="9" cy="16" r="1.5" />
    {/* Strings hint */}
    <line x1="9" y1="10" x2="9" y2="22" strokeWidth="0.5" />
  </>,
  'GuitarIcon',
);

export const BassIcon = createIcon(
  <>
    {/* Body - more angular for bass */}
    <path d="M5 14c0 4 3 7 7 7s5-3 5-7-2-5-5-5-7 1-7 5z" />
    {/* Neck - longer */}
    <line x1="14" y1="10" x2="22" y2="2" />
    {/* Headstock */}
    <line x1="20" y1="2" x2="22" y2="2" />
    <line x1="22" y1="2" x2="22" y2="4" />
    {/* Pickup */}
    <rect x="7" y="14" width="4" height="2" rx="0.5" />
  </>,
  'BassIcon',
);

export const DrumIcon = createIcon(
  <>
    {/* Drum body */}
    <ellipse cx="12" cy="16" rx="8" ry="4" />
    <ellipse cx="12" cy="10" rx="8" ry="4" />
    <line x1="4" y1="10" x2="4" y2="16" />
    <line x1="20" y1="10" x2="20" y2="16" />
    {/* Sticks */}
    <line x1="8" y1="4" x2="14" y2="10" />
    <line x1="16" y1="4" x2="10" y2="10" />
  </>,
  'DrumIcon',
);

export const KeyboardIcon = createIcon(
  <>
    {/* Keyboard body */}
    <rect x="2" y="8" width="20" height="10" rx="1" />
    {/* White keys */}
    <line x1="5" y1="8" x2="5" y2="18" />
    <line x1="8" y1="8" x2="8" y2="18" />
    <line x1="11" y1="8" x2="11" y2="18" />
    <line x1="14" y1="8" x2="14" y2="18" />
    <line x1="17" y1="8" x2="17" y2="18" />
    <line x1="20" y1="8" x2="20" y2="18" />
    {/* Black keys */}
    <rect x="4" y="8" width="2" height="5" fill="currentColor" stroke="none" />
    <rect x="7" y="8" width="2" height="5" fill="currentColor" stroke="none" />
    <rect x="13" y="8" width="2" height="5" fill="currentColor" stroke="none" />
    <rect x="16" y="8" width="2" height="5" fill="currentColor" stroke="none" />
    <rect x="19" y="8" width="2" height="5" fill="currentColor" stroke="none" />
  </>,
  'KeyboardIcon',
);

export const PianoIcon = KeyboardIcon; // Alias

/* ========================================
 * Music - Ensemble & Collaboration
 * ======================================== */

export const EnsembleIcon = createIcon(
  <>
    {/* Group of people */}
    <circle cx="8" cy="6" r="2" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="12" cy="8" r="2" />
    <path d="M4 20v-1a4 4 0 0 1 4-4" />
    <path d="M20 20v-1a4 4 0 0 0-4-4" />
    <path d="M12 20v-2a3 3 0 0 0-3-3h-1" />
    <path d="M12 20v-2a3 3 0 0 1 3-3h1" />
    {/* Music note */}
    <circle cx="19" cy="14" r="1.5" fill="currentColor" stroke="none" />
    <line x1="20.5" y1="14" x2="20.5" y2="10" />
  </>,
  'EnsembleIcon',
);

export const MixerIcon = createIcon(
  <>
    {/* Faders */}
    <line x1="4" y1="4" x2="4" y2="20" />
    <line x1="10" y1="4" x2="10" y2="20" />
    <line x1="16" y1="4" x2="16" y2="20" />
    <line x1="22" y1="4" x2="22" y2="20" />
    {/* Sliders */}
    <rect x="2" y="14" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
    <rect x="8" y="8" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="11" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
    <rect x="20" y="6" width="4" height="3" rx="1" fill="currentColor" stroke="none" />
  </>,
  'MixerIcon',
);

export const BandIcon = createIcon(
  <>
    {/* Three people */}
    <circle cx="6" cy="6" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="18" cy="6" r="2" />
    <path d="M2 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
    <path d="M14 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
    <path d="M8 18v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
  </>,
  'BandIcon',
);

export const VolumeIcon = createIcon(
  <>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </>,
  'VolumeIcon',
);

export const VolumeMuteIcon = createIcon(
  <>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </>,
  'VolumeMuteIcon',
);

/* ========================================
 * Music - Recording
 * ======================================== */

export const RecordIcon = createIcon(
  <circle cx="12" cy="12" r="8" fill="currentColor" stroke="none" />,
  'RecordIcon',
  { defaultFilled: true },
);

export const WaveformIcon = createIcon(
  <>
    <line x1="4" y1="12" x2="4" y2="12" />
    <line x1="7" y1="8" x2="7" y2="16" />
    <line x1="10" y1="5" x2="10" y2="19" />
    <line x1="13" y1="7" x2="13" y2="17" />
    <line x1="16" y1="10" x2="16" y2="14" />
    <line x1="19" y1="6" x2="19" y2="18" />
    <line x1="22" y1="9" x2="22" y2="15" />
  </>,
  'WaveformIcon',
);
