import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 36,
      }}
    >
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" style={{ display: 'flex' }}>
        {/* Music note icon */}
        <path
          d="M9 18V5l12-2v13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="18" r="3" fill="white" />
        <circle cx="18" cy="16" r="3" fill="white" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
