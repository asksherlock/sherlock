import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const COMPARISON_DATA = [
  {
    criterio: 'Velocidad y Escalabilidad',
    tradicional: 'Semanas de logística',
    sintetico: 'Generación instantánea',
  },
  {
    criterio: 'Costo',
    tradicional: 'Alto (incentivos, reclutamiento)',
    sintetico: 'Muy bajo',
  },
  {
    criterio: 'Consistencia y Control',
    tradicional: 'Alta variabilidad',
    sintetico: 'Perfiles controlables y replicables',
  },
  {
    criterio: 'Simulación de escenarios extremos',
    tradicional: 'Difícil de encontrar',
    sintetico: 'Fácil creación de perfiles atípicos',
  },
  {
    criterio: 'Iteración rápida',
    tradicional: 'Feedback lento',
    sintetico: 'Feedback inmediato y editable',
  },
];

export default function Comparison() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rowRefs = useRef([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const particlesRef = useRef([]);

  // Initialize particles once
  useEffect(() => {
    particlesRef.current = Array.from({ length: 1500 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: 0,
      targetY: 0,
      color: Math.random() > 0.5 ? '#38bdf8' : '#a78bfa', // Cyan and indigo/purple
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.08 + 0.04,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const container = containerRef.current;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate bracket points by drawing text to an offscreen canvas and sampling pixels
    const getBracketPoints = (rowRect, rect) => {
      const points = [];
      const relativeTop = rowRect.top - rect.top;
      const rowHeight = rowRect.height;
      const yCenter = relativeTop + rowHeight / 2;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      
      // Draw massive brackets
      offCtx.font = `200 ${rowHeight * 2}px 'Space Grotesk', monospace, sans-serif`;
      offCtx.fillStyle = '#fff';
      offCtx.textBaseline = 'middle';
      
      offCtx.textAlign = 'right';
      offCtx.fillText('{', 40, yCenter); 
      
      offCtx.textAlign = 'left';
      offCtx.fillText('}', width - 40, yCenter); 

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, width, height).data;
      for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
          if (imgData[(y * width + x) * 4 + 3] > 128) {
            points.push({ x, y });
          }
        }
      }
      return points.length > 0 ? points : [{x: width/2, y: height/2}];
    };

    // Generate line points based on table row bottoms
    const getLinePoints = (rect) => {
      const points = [];
      rowRefs.current.forEach((row, i) => {
        if (!row || i === COMPARISON_DATA.length - 1) return; // No line under the last item
        const rowRect = row.getBoundingClientRect();
        const y = rowRect.bottom - rect.top;
        
        // Evenly space points horizontally
        for (let x = 32; x < width - 32; x += 6) {
          points.push({ x, y });
        }
      });
      return points.length > 0 ? points : [{x: width/2, y: height/2}];
    };

    const rect = container.getBoundingClientRect();
    let targetPoints = [];
    
    if (hoveredRow !== null && rowRefs.current[hoveredRow]) {
      targetPoints = getBracketPoints(rowRefs.current[hoveredRow].getBoundingClientRect(), rect);
    } else {
      targetPoints = getLinePoints(rect);
    }

    // Assign targets to particles (distribute evenly)
    particlesRef.current.forEach((p, i) => {
      const pt = targetPoints[i % targetPoints.length];
      if (pt) {
        // Add tiny scatter so lines/brackets have some organic thickness
        p.targetX = pt.x + (Math.random() - 0.5) * 4;
        p.targetY = pt.y + (Math.random() - 0.5) * 4;
      }
    });

    let animId;
    let mx = -1000, my = -1000;

    const onMouse = (e) => {
      const currentRect = container.getBoundingClientRect();
      mx = e.clientX - currentRect.left;
      my = e.clientY - currentRect.top;
    };
    window.addEventListener('mousemove', onMouse);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach(p => {
        // Interpolate position towards target
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;

        // Mouse repulsion physics
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const dist = Math.sqrt(mdx*mdx + mdy*mdy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (mdx / dist) * force * 4;
          p.y += (mdy / dist) * force * 4;
        }

        // Natural floating/drifting
        p.phase += 0.04;
        const floatX = p.x + Math.sin(p.phase) * 1.5;
        const floatY = p.y + Math.cos(p.phase * 0.8) * 1.5;

        // Render particle with fake glow (faster than shadowBlur)
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(floatX, floatY, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(floatX, floatY, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(loop);
    };
    
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [hoveredRow]);

  return (
    <section id="comparison" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', marginBottom: 16, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Usuarios Sintéticos vs Investigación Tradicional
          </h2>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ width: '100%', position: 'relative' }}
          onMouseLeave={() => setHoveredRow(null)}
        >
          {/* Interactive Particle Canvas Background */}
          <canvas 
            ref={canvasRef} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 0, 
              pointerEvents: 'none' 
            }} 
          />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 100px', gap: 16, padding: '24px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: 'none' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>Criterio</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>Investigación Tradicional</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#6366f1' }}>Usuarios Sintéticos</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', textAlign: 'center' }}>Ventaja</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {COMPARISON_DATA.map((row, i) => (
                <div 
                  key={i} 
                  ref={el => rowRefs.current[i] = el}
                  onMouseEnter={() => setHoveredRow(i)}
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 1fr 1fr 100px', 
                    gap: 16, 
                    padding: '20px 32px', 
                    borderBottom: 'none', 
                    alignItems: 'center',
                    background: hoveredRow === i ? 'rgba(99,102,241,0.05)' : 'transparent',
                    transition: 'background 0.3s',
                    cursor: 'default'
                  }}
                >
                  <div style={{ fontSize: '15px', color: '#cbd5e1', fontWeight: 500 }}>{row.criterio}</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>{row.tradicional}</div>
                  <div style={{ fontSize: '14px', color: '#f1f5f9', fontWeight: 500 }}>{row.sintetico}</div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 700 }}>
                      Sintética
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: 32 }}>
          <div style={{ display: 'inline-block', padding: '16px 32px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', color: '#94a3b8' }}>
            Los usuarios sintéticos son ideales para etapas exploratorias y prototipado rápido de investigación cualitativa.
          </div>
        </motion.div>
      </div>
      <style>{`
        @media(max-width: 768px) {
          #comparison > div > div:nth-child(2) > div > div:nth-child(2) > div { grid-template-columns: 1fr !important; gap: 8px !important; padding: 16px !important; }
          #comparison > div > div:nth-child(2) > div > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
