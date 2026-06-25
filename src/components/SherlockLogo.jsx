export default function SherlockLogo({ size = 36, showText = true }) {
  return (
    <div style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Pixel glasses SVG */}
      <svg
        width={size * 2.2}
        height={size * 0.8}
        viewBox="0 0 88 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Left temple */}
        <rect x="0" y="12" width="6" height="4" fill="#6366f1" rx="1"/>
        {/* Left lens outer frame */}
        <rect x="6" y="6" width="30" height="20" rx="3" fill="#6366f1"/>
        {/* Left lens inner (tinted) */}
        <rect x="9" y="9" width="24" height="14" rx="2" fill="rgba(99,102,241,0.35)"/>
        {/* Left lens pixel gradient blocks */}
        <rect x="9" y="9" width="8" height="14" rx="1" fill="rgba(139,92,246,0.25)"/>
        {/* Left lens shine */}
        <rect x="11" y="11" width="4" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>

        {/* Bridge */}
        <rect x="36" y="13" width="16" height="4" fill="#6366f1" rx="2"/>

        {/* Right lens outer frame */}
        <rect x="52" y="6" width="30" height="20" rx="3" fill="#6366f1"/>
        {/* Right lens inner (tinted) */}
        <rect x="55" y="9" width="24" height="14" rx="2" fill="rgba(99,102,241,0.35)"/>
        {/* Right lens pixel gradient blocks */}
        <rect x="55" y="9" width="8" height="14" rx="1" fill="rgba(139,92,246,0.25)"/>
        {/* Right lens shine */}
        <rect x="57" y="11" width="4" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>

        {/* Right temple */}
        <rect x="82" y="12" width="6" height="4" fill="#6366f1" rx="1"/>

        {/* Pixel art bottom shading on lenses */}
        <rect x="6" y="22" width="30" height="4" rx="0" fill="rgba(99,102,241,0.4)"/>
        <rect x="52" y="22" width="30" height="4" rx="0" fill="rgba(99,102,241,0.4)"/>
        <rect x="6" y="22" width="30" height="4" rx="0" style={{ borderRadius: '0 0 3px 3px' }} fill="rgba(0,0,0,0.2)"/>
      </svg>

      {showText && (
        <span style={{
          fontSize: '20px',
          fontWeight: 800,
          fontFamily: 'Space Grotesk, sans-serif',
          background: 'linear-gradient(135deg, #f8fafc 0%, #a5b4fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.01em',
        }}>
          Ask <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Sherlock</span>
        </span>
      )}
    </div>
  );
}
