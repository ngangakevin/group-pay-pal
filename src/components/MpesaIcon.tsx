type Props = { className?: string; size?: number };

export function MpesaIcon({ className, size = 32 }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="M-Pesa Moçambique"
      role="img"
    >
      {/* Red rounded background */}
      <rect width="64" height="64" rx="12" fill="#E60000" />

      {/* Phone body */}
      <rect
        x="20"
        y="12"
        width="22"
        height="36"
        rx="3.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
      />
      {/* Speaker */}
      <rect x="28" y="15.5" width="6" height="1.6" rx="0.8" fill="#ffffff" />
      {/* Home button */}
      <rect x="28" y="43.5" width="6" height="1.6" rx="0.8" fill="#ffffff" />

      {/* Green leaf bursting out top-right */}
      <path
        d="M46 14 C 36 14, 28 22, 28 30 C 36 28, 44 22, 50 16 C 49 15, 47 14, 46 14 Z"
        fill="#7AC142"
      />
      <path
        d="M46 14 C 40 18, 34 24, 28 30"
        stroke="#5BA22E"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* MZ badge */}
      <circle cx="16" cy="50" r="9" fill="#E60000" stroke="#ffffff" strokeWidth="2" />
      <text
        x="16"
        y="53.5"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="800"
        fontSize="9"
        fill="#ffffff"
      >
        MZ
      </text>
    </svg>
  );
}
