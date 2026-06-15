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
  const col3Ref = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const particlesRef = useRef([]);

  // Initialize particles once
  useEffect(() => {
    particlesRef.current = Array.from({ length: 2000 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: 0,
      targetY: 0,
      color: Math.random() > 0.6 ? '#e2e8f0' : (Math.random() > 0.5 ? '#38bdf8' : '#a78bfa'), 
      size: Math.random() * 1.2 + 0.5,
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

    const getTargetPoints = (rect) => {
      const points = [];
      
      // 1. Horizontal lines under each row (except last)
      rowRefs.current.forEach((row, i) => {
        if (!row || i === COMPARISON_DATA.length - 1) return;
        const rowRect = row.getBoundingClientRect();
        const y = rowRect.bottom - rect.top;
        
        for (let x = 16; x < width - 16; x += 5) {
          points.push({ x, y });
        }
      });

      // 2. Vertical line dividing the two main columns
      if (col3Ref.current) {
        const col3Rect = col3Ref.current.getBoundingClientRect();
        const lineX = col3Rect.left - rect.left - 24; // Middle gap
        for (let y = 16; y < height - 16; y += 5) {
           points.push({ x: lineX, y });
        }
      }

      // 3. Hover outline (Contorno de la celda/fila)
      if (hoveredRow !== null && rowRefs.current[hoveredRow]) {
        const rowRect = rowRefs.current[hoveredRow].getBoundingClientRect();
        const top = rowRect.top - rect.top;
        const bottom = rowRect.bottom - rect.top;
        const left = 0;
        const right = width;

        // Top & Bottom edges of the hovered row
        for (let x = left; x <= right; x += 3) {
          points.push({ x, y: top });
          points.push({ x, y: bottom });
        }
        // Left & Right edges
        for (let y = top; y <= bottom; y += 3) {
          points.push({ x: left, y });
          points.push({ x: right, y });
        }
      }

      return points.length > 0 ? points : [{x: width/2, y: height/2}];
    };

    const rect = container.getBoundingClientRect();
    const targetPoints = getTargetPoints(rect);

    // Assign targets to particles
    particlesRef.current.forEach((p, i) => {
      const pt = targetPoints[i % targetPoints.length];
      if (pt) {
        // Add tiny scatter for organic thickness
        p.targetX = pt.x + (Math.random() - 0.5) * 3;
        p.targetY = pt.y + (Math.random() - 0.5) * 3;
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
        if (dist < 80) {
          const force = (80 - dist) / 80;
          p.x += (mdx / dist) * force * 3;
          p.y += (mdy / dist) * force * 3;
        }

        // Natural floating/drifting
        p.phase += 0.05;
        const floatX = p.x + Math.sin(p.phase) * 1;
        const floatY = p.y + Math.cos(p.phase * 0.8) * 1;

        // Render particle
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(floatX, floatY, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(floatX, floatY, p.size * 2.5, 0, Math.PI * 2);
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
            {/* 3 Column Layout Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: 48, padding: '24px 32px', background: 'rgba(255,255,255,0.02)', borderBottom: 'none', borderRadius: '16px 16px 0 0' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>Criterio</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>Investigación Tradicional</div>
              <div ref={col3Ref} style={{ fontSize: '15px', fontWeight: 700, color: '#6366f1' }}>Usuarios Sintéticos</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {COMPARISON_DATA.map((row, i) => (
                <div 
                  key={i} 
                  ref={el => rowRefs.current[i] = el}
                  onMouseEnter={() => setHoveredRow(i)}
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1.5fr 1.5fr', 
                    gap: 48, 
                    padding: '24px 32px', 
                    borderBottom: 'none', 
                    alignItems: 'center',
                    background: hoveredRow === i ? 'rgba(255,255,255,0.02)' : 'transparent',
                    transition: 'background 0.3s',
                    cursor: 'default'
                  }}
                >
                  <div style={{ fontSize: '15px', color: '#cbd5e1', fontWeight: 500 }}>{row.criterio}</div>
                  <div style={{ fontSize: '15px', color: '#94a3b8' }}>{row.tradicional}</div>
                  <div style={{ fontSize: '15px', color: '#f1f5f9', fontWeight: 500 }}>{row.sintetico}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: 40 }}>
          <div style={{ display: 'inline-block', padding: '16px 32px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: '#94a3b8' }}>
            Los usuarios sintéticos son ideales para etapas exploratorias y prototipado rápido de investigación cualitativa.
          </div>
        </motion.div>
      </div>
      <style>{`
        @media(max-width: 768px) {
          #comparison > div > div:nth-child(2) > div > div:nth-child(2) > div { grid-template-columns: 1fr !important; gap: 16px !important; padding: 20px 16px !important; }
          #comparison > div > div:nth-child(2) > div > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
