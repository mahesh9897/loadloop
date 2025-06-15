export function SleepingDriverIllustration() {
  return (
    <svg width="256" height="256" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cactus */}
      <path
        d="M180 240 L180 180 L160 180 L160 220 L140 220 L140 180 L120 180 L120 240"
        fill="#D1FAE5"
        stroke="#047857"
        strokeWidth="4"
      />

      {/* Ground */}
      <path d="M20 240 L380 240" stroke="#047857" strokeWidth="4" strokeLinecap="round" />

      {/* Suitcase */}
      <rect x="240" y="160" width="80" height="80" rx="8" fill="#065F46" />
      <rect x="240" y="160" width="80" height="20" rx="8" fill="#047857" />
      <circle cx="280" cy="170" r="5" fill="#D1FAE5" />
      <rect x="270" y="160" width="20" height="80" fill="#065F46" />

      {/* Person */}
      {/* Head */}
      <circle cx="220" cy="180" r="20" fill="#93C5FD" />
      <path d="M210 175 Q220 185 230 175" stroke="#1E3A8A" strokeWidth="2" fill="none" />
      <circle cx="213" cy="170" r="2" fill="#1E3A8A" />
      <circle cx="227" cy="170" r="2" fill="#1E3A8A" />

      {/* Hat */}
      <path d="M200 170 Q220 150 240 170" stroke="#1E3A8A" strokeWidth="4" fill="#BFDBFE" />

      {/* Body */}
      <path d="M220 200 L220 220 L240 240" stroke="#93C5FD" strokeWidth="8" strokeLinecap="round" />
      <path d="M220 220 L200 240" stroke="#93C5FD" strokeWidth="8" strokeLinecap="round" />
      <rect x="205" y="200" width="30" height="40" rx="15" fill="#93C5FD" />

      {/* Zzz */}
      <text x="260" y="140" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#047857">
        Z
      </text>
      <text x="280" y="120" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="#047857">
        z
      </text>
      <text x="295" y="105" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#047857">
        z
      </text>
    </svg>
  )
}
