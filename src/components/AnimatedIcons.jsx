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

import { getIconGeometry } from '../utils/iconGeometry';

function renderGeometry(geom, color) {
    const describeArc = (x, y, r, startAngle, endAngle) => {
        const start = { x: x + Math.cos(startAngle) * r, y: y + Math.sin(startAngle) * r };
        const end = { x: x + Math.cos(endAngle) * r, y: y + Math.sin(endAngle) * r };
        // Determine if arc should be drawn clockwise
        const dAngle = endAngle > startAngle ? endAngle - startAngle : (endAngle + Math.PI*2) - startAngle;
        const largeArcFlag = dAngle > Math.PI ? "1" : "0";
        return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    return (
        <>
            {geom.circles.map((c, i) => <circle key={`c-${i}`} cx={c.cx} cy={c.cy} r={c.r} />)}
            {geom.arcs.map((a, i) => <path key={`a-${i}`} d={describeArc(a.cx, a.cy, a.r, a.start, a.end)} />)}
            {geom.lines.map((l, i) => <line key={`l-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />)}
            {geom.dots.map((d, i) => <circle key={`d-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={color} stroke="none" />)}
        </>
    );
}

export function IconBrain({ size = 48, color = 'currentColor' }) {
  const geom = getIconGeometry(0);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {renderGeometry(geom, color)}
    </svg>
  );
}

export function IconFlow({ size = 48, color = 'currentColor' }) {
  const geom = getIconGeometry(1);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {renderGeometry(geom, color)}
    </svg>
  );
}

export function IconTarget({ size = 48, color = 'currentColor' }) {
  const geom = getIconGeometry(2);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {renderGeometry(geom, color)}
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
