'use client';

import { forwardRef, type SVGProps } from 'react';
import { iconRegistry, type IconName } from './registry';
import {
  type IconProps,
  SIZE_MAP,
  SIZE_CLASS_MAP,
  STROKE_WIDTH_MAP,
  TONE_CLASS_MAP,
  ROTATE_CLASS_MAP,
  FLIP_CLASS_MAP,
} from './types';

export interface IconComponentProps
  extends IconProps, Omit<SVGProps<SVGSVGElement>, 'name' | 'rotate'> {
  /** 아이콘 이름 (registry에서 조회) */
  name: IconName;
}

/**
 * Icon Component
 *
 * Registry 기반 아이콘 컴포넌트.
 * name prop으로 아이콘을 선택하고, 일관된 API로 스타일링.
 *
 * @example
 * // 기본 사용
 * <Icon name="guitar" />
 *
 * // 사이즈 & 톤
 * <Icon name="play" size="lg" tone="primary" />
 *
 * // 상태 & 애니메이션
 * <Icon name="settings" spin disabled />
 *
 * // 접근성
 * <Icon name="close" decorative={false} ariaLabel="닫기" />
 */
export const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      name,
      size = 'md',
      tone = 'inherit',
      filled,
      disabled = false,
      spin = false,
      rotate = 0,
      flip = 'none',
      className = '',
      decorative = true,
      title,
      ariaLabel,
      ...svgProps
    },
    ref,
  ) => {
    // Registry에서 아이콘 가져오기
    const iconDef = iconRegistry[name];

    if (!iconDef) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Icon] Unknown icon name: "${name}". Using fallback.`);
      }
      return (
        <Icon
          ref={ref}
          name="question"
          size={size}
          tone="warning"
          className={className}
          {...svgProps}
        />
      );
    }

    // filled 결정 (prop > defaultFilled > false)
    const isFilled = filled ?? iconDef.defaultFilled ?? false;

    // 클래스 조합
    const classes = [
      SIZE_CLASS_MAP[size],
      TONE_CLASS_MAP[tone],
      disabled && 'opacity-40 pointer-events-none',
      spin && 'animate-spin',
      ROTATE_CLASS_MAP[rotate],
      FLIP_CLASS_MAP[flip],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 접근성 속성
    const a11yProps = decorative
      ? { 'aria-hidden': true as const }
      : {
          role: 'img' as const,
          'aria-label': ariaLabel || title,
        };

    return (
      <svg
        ref={ref}
        width={SIZE_MAP[size]}
        height={SIZE_MAP[size]}
        viewBox="0 0 24 24"
        fill={isFilled ? 'currentColor' : 'none'}
        stroke={isFilled ? 'none' : 'currentColor'}
        strokeWidth={STROKE_WIDTH_MAP[size]}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classes}
        {...a11yProps}
        {...svgProps}
      >
        {title && <title>{title}</title>}
        {iconDef.path}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';
