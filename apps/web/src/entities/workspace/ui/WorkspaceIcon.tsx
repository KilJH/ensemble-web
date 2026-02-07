'use client';

interface WorkspaceIconProps {
  name: string;
  imageUrl: string | null;
  active?: boolean;
  className?: string;
}

export function WorkspaceIcon({
  name,
  imageUrl,
  active = false,
  className = '',
}: WorkspaceIconProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`
        relative w-12 h-12 flex items-center justify-center
        transition-all duration-150
        ${active ? 'rounded-xl' : 'rounded-2xl hover:rounded-xl'}
        ${className}
      `}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-[inherit]" />
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-[inherit] bg-surface-2 text-text-muted text-sm font-medium">
          {initials}
        </div>
      )}
    </div>
  );
}
