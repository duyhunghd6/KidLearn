export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KidLearn logo"
    >
      {/* Open book - teal & colorful pages */}
      <path
        d="M18 72 Q18 38 50 30 Q82 38 82 72 L50 66 Z"
        fill="#4ECDC4"
        opacity="0.15"
      />
      <path
        d="M20 70 Q20 40 50 32 Q80 40 80 70 L50 64 Z"
        fill="#4ECDC4"
      />
      {/* Left page */}
      <path
        d="M22 68 Q22 42 50 34 L50 62 Z"
        fill="white"
        opacity="0.95"
      />
      {/* Right page */}
      <path
        d="M78 68 Q78 42 50 34 L50 62 Z"
        fill="white"
        opacity="0.85"
      />
      {/* Page color accents */}
      <path d="M24 68 Q24 55 38 50 L38 64 Z" fill="#FF6B6B" opacity="0.15"/>
      <path d="M76 68 Q76 55 62 50 L62 64 Z" fill="#A78BFA" opacity="0.15"/>
      {/* Spine line */}
      <line x1="50" y1="34" x2="50" y2="62" stroke="#3BAEA7" strokeWidth="1.5" opacity="0.4"/>
      {/* Page lines left */}
      <line x1="30" y1="52" x2="46" y2="48" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3" strokeLinecap="round"/>
      <line x1="32" y1="57" x2="46" y2="53" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3" strokeLinecap="round"/>
      {/* Page lines right */}
      <line x1="54" y1="48" x2="70" y2="52" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3" strokeLinecap="round"/>
      <line x1="54" y1="53" x2="68" y2="57" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3" strokeLinecap="round"/>

      {/* Graduation cap */}
      <polygon points="50,14 30,26 50,38 70,26" fill="#A78BFA"/>
      <polygon points="50,14 30,26 50,38 70,26" fill="url(#capGrad)"/>
      <rect x="47.5" y="30" width="5" height="9" fill="#8B5CF6" rx="1.5"/>
      {/* Cap tassel */}
      <line x1="30" y1="26" x2="27" y2="36" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="27" cy="37" r="2.5" fill="#FFE66D"/>

      {/* Sparkle stars */}
      <path d="M82 12 L84 18 L88 14 L84 16 L82 12 Z" fill="#FFE66D" opacity="0.9"/>
      <path d="M84 14 L86 18 L88 14 L86 10 Z" fill="#FFE66D"/>
      <path d="M14 18 L16 22 L18 18 L16 14 Z" fill="#FF6B6B" opacity="0.8"/>
      <circle cx="76" cy="46" r="2.5" fill="#FF6B6B" opacity="0.6"/>
      <circle cx="22" cy="48" r="2" fill="#A78BFA" opacity="0.5"/>
      <circle cx="88" cy="30" r="1.5" fill="#4ECDC4" opacity="0.5"/>
      <path d="M12 36 L13 38 L14 36 L13 34 Z" fill="#FFE66D" opacity="0.6"/>

      {/* Smile face on book */}
      <path d="M42 50 Q44 46 46 50" stroke="#3BAEA7" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M54 50 Q56 46 58 50" stroke="#3BAEA7" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M44 56 Q50 61 56 56" stroke="#3BAEA7" strokeWidth="2" fill="none" strokeLinecap="round"/>

      <defs>
        <linearGradient id="capGrad" x1="30" y1="14" x2="70" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
