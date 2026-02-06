'use client';

import type { PartCategory } from '@ensemble/types';
import { cn } from '@/shared/design';

interface PartOption {
  value: PartCategory;
  label: string;
  emoji: string;
}

const PARTS: PartOption[] = [
  { value: 'VOCAL', label: '보컬', emoji: '🎤' },
  { value: 'GUITAR', label: '기타', emoji: '🎸' },
  { value: 'BASS', label: '베이스', emoji: '🎸' },
  { value: 'DRUMS', label: '드럼', emoji: '🥁' },
  { value: 'KEYS', label: '키보드', emoji: '🎹' },
  { value: 'BRASS', label: '관악기', emoji: '🎺' },
  { value: 'STRINGS', label: '현악기', emoji: '🎻' },
  { value: 'PERCUSSION', label: '타악기', emoji: '🪘' },
  { value: 'OTHER', label: '기타', emoji: '🎵' },
];

interface PartSelectorProps {
  value: PartCategory | null;
  onChange: (value: PartCategory | null) => void;
}

export function PartSelector({ value, onChange }: PartSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        주로 맡는 파트 <span className="text-gray-400">(선택)</span>
      </label>
      <div className="grid grid-cols-3 gap-2">
        {PARTS.map((part) => (
          <button
            key={part.value}
            type="button"
            onClick={() => onChange(value === part.value ? null : part.value)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors',
              value === part.value
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 hover:border-gray-300',
            )}
          >
            <span className="text-2xl">{part.emoji}</span>
            <span className="text-sm">{part.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
