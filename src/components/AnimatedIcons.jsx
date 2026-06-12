import { motion } from 'framer-motion';

// --- Individual animated SVG icon components ---

export function IconDNA({ size = 48, color = '#6366f1' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <style>{`
        @keyframes dna-scroll { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -40; } }
        @keyframes dna-pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>
      {/* Helix strands */}
      <path
        d="M16 4 C28 8, 28 16, 16 20 C4 24, 4 32, 16 36 C28 40, 28 44, 16 44"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 3"
        style={{ animation: 'dna-scroll 2s linear infinite' }}
      />
      <path
        d="M32 4 C20 8, 20 16, 32 20 C44 24, 44 32, 32 36 C20 40, 20 44, 32 44"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 3"
        style={{ animation: 'dna-scroll 2s linear infinite reverse' }}
        opacity="0.7"
      />
      {/* Cross bars */}
      {[10, 18, 26, 34].map((y, i) => (
        <line key={i} x1="16" y1={y} x2="32" y2={y}
          stroke={color} strokeWidth="1.5" opacity="0.5"
          style={{ animation: `dna-pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
      {/* Center nodes */}
      {[10, 18, 26, 34].map((y, i) => (
        <circle key={i} cx="24" cy={y} r="2.5"
          fill={color} opacity="0.8"
          style={{ animation: `dna-pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </svg>
  );
}

export function IconFlow({ size = 48, color = '#22d3ee' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <style>{`
        @keyframes flow-dash { from{stroke-dashoffset:80} to{stroke-dashoffset:0} }
        @keyframes flow-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes flow-glow { 0%,100%{r:3} 50%{r:4.5} }
      `}</style>
      {/* Circular flow path */}
      <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2" opacity="0.2" fill="none"/>
      <path
        d="M24 8 A16 16 0 0 1 40 24 A16 16 0 0 1 24 40"
        stroke={color} strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeDasharray="40 60"
        style={{ animation: 'flow-dash 1.5s ease-in-out infinite', transformOrigin: '24px 24px' }}
      />
      {/* Center icon */}
      <circle cx="24" cy="24" r="6" fill={`${color}30`} stroke={color} strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="3" fill={color}
        style={{ animation: 'flow-glow 1s ease-in-out infinite' }}
      />
      {/* Orbit dots */}
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle key={i}
            cx={24 + 16 * Math.cos(rad)}
            cy={24 + 16 * Math.sin(rad)}
            r="2.5"
            fill={color}
            opacity="0.9"
            style={{ animation: `dna-pulse 1.2s ease-in-out ${i * 0.4}s infinite` }}
          />
        );
      })}
      <style>{`@keyframes dna-pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
    </svg>
  );
}

export function IconPulse({ size = 48, color = '#ec4899' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <style>{`
        @keyframes pulse-draw { from{stroke-dashoffset:120} to{stroke-dashoffset:0} }
        @keyframes pulse-blink { 0%,100%{opacity:0;r:0} 50%{opacity:1;r:6} }
      `}</style>
      {/* ECG line */}
      <path
        d="M4 24 L12 24 L16 12 L20 36 L24 18 L28 30 L32 24 L44 24"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"
        strokeDasharray="120" strokeDashoffset="0"
        style={{ animation: 'pulse-draw 1.5s ease-out infinite' }}
      />
      {/* Pulse wave rings */}
      <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="1" fill="none" opacity="0"
        style={{ animation: 'pulse-ring 1.5s ease-out infinite' }}
      />
      <style>{`
        @keyframes pulse-ring {
          0%{r:0;opacity:0.8} 100%{r:18;opacity:0}
        }
      `}</style>
    </svg>
  );
}

export function IconBrain({ size = 48, color = '#10b981' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <style>{`
        @keyframes brain-spark {
          0%,100%{stroke-dashoffset:30;opacity:0}
          30%{opacity:1}
          70%{opacity:0.5}
        }
        @keyframes brain-glow { 0%,100%{opacity:0.2} 50%{opacity:0.6} }
      `}</style>
      {/* Neural network nodes */}
      {[
        { cx: 12, cy: 16 }, { cx: 24, cy: 10 }, { cx: 36, cy: 16 },
        { cx: 8, cy: 28 }, { cx: 20, cy: 26 }, { cx: 28, cy: 26 }, { cx: 40, cy: 28 },
        { cx: 16, cy: 38 }, { cx: 32, cy: 38 },
      ].map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="3" fill={color}
          style={{ animation: `brain-glow 1.5s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
      {/* Connections */}
      {[
        [12,16,24,10],[24,10,36,16],[12,16,8,28],[24,10,20,26],
        [36,16,40,28],[8,28,20,26],[20,26,28,26],[28,26,40,28],
        [8,28,16,38],[20,26,16,38],[28,26,32,38],[40,28,32,38],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="1" opacity="0.3"
          strokeDasharray="20"
          style={{ animation: `brain-spark 2s ease-in-out ${i * 0.1}s infinite` }}
        />
      ))}
    </svg>
  );
}

export function IconTarget({ size = 48, color = '#f59e0b' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <style>{`
        @keyframes target-spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        @keyframes target-grow { 0%,100%{transform:scale(1)}50%{transform:scale(1.1)} }
      `}</style>
      {/* Outer ring rotating */}
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5" fill="none"
        strokeDasharray="10 5"
        style={{ animation: 'target-spin 6s linear infinite', transformOrigin: '24px 24px' }}
        opacity="0.4"
      />
      {/* Mid ring */}
      <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="1.5" fill="none"
        strokeDasharray="8 4"
        style={{ animation: 'target-spin 4s linear infinite reverse', transformOrigin: '24px 24px' }}
        opacity="0.6"
      />
      {/* Inner ring */}
      <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2" fill={`${color}15`}/>
      {/* Center */}
      <circle cx="24" cy="24" r="4" fill={color}
        style={{ animation: 'target-grow 1.5s ease-in-out infinite', transformOrigin: '24px 24px' }}
      />
      {/* Crosshairs */}
      <line x1="24" y1="4" x2="24" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="38" x2="24" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="4" y1="24" x2="10" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="38" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconAPI({ size = 48, color = '#8b5cf6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <style>{`
        @keyframes api-flow {
          0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}
        }
        @keyframes api-blink{0%,100%{opacity:0.3}50%{opacity:1}}
      `}</style>
      {/* Central hub */}
      <circle cx="24" cy="24" r="7" fill={`${color}25`} stroke={color} strokeWidth="2"/>
      {/* Spokes */}
      {[
        { dx: 0, dy: -16 }, { dx: 14, dy: -8 }, { dx: 14, dy: 8 },
        { dx: 0, dy: 16 }, { dx: -14, dy: 8 }, { dx: -14, dy: -8 },
      ].map(({ dx, dy }, i) => (
        <g key={i}>
          <line x1="24" y1="24" x2={24 + dx} y2={24 + dy}
            stroke={color} strokeWidth="1.5" strokeDasharray="20"
            style={{ animation: `api-flow 1.2s ease-in-out ${i * 0.15}s infinite` }}
            opacity="0.6"
          />
          <circle cx={24 + dx} cy={24 + dy} r="3" fill={color}
            style={{ animation: `api-blink 1.2s ease-in-out ${i * 0.15}s infinite` }}
          />
        </g>
      ))}
      {/* Center dot */}
      <circle cx="24" cy="24" r="3" fill={color}/>
    </svg>
  );
}

// Icon wrapper with hover animation
export function AnimatedIconWrapper({ children, color, size = 56 }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        background: `${color}15`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: `0 0 20px ${color}15`,
      }}
    >
      {children}
    </motion.div>
  );
}
