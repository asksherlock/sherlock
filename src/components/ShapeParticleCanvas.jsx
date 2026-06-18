import { useEffect, useRef } from 'react';
import { getIconGeometry } from '../utils/iconGeometry';

// Genera puntos matemáticos basados exactamente en la geometría compartida
function generateShapePoints(shapeIndex, width, height) {
    const points = [];
    const numContourPoints = 1200; // Drásticamente reducido para evitar encimamientos y dejar espacios elegantes
    const cx = width / 2;
    const cy = height / 2;
    
    // Escala mantenida, grosor de trazo incrementado para líneas más anchas
    const scale = Math.min(width, height) * 0.70 / 12;
    const strokeThickness = scale * 0.5; // El doble de ancho que la versión anterior

    const geom = getIconGeometry(shapeIndex);
    
    let totalLength = 0;
    const segments = [];

    geom.circles.forEach(c => {
        const len = 2 * Math.PI * c.r;
        segments.push({ type: 'circle', ...c, len });
        totalLength += len;
    });
    geom.arcs.forEach(a => {
        const dAngle = a.end > a.start ? a.end - a.start : (a.end + Math.PI*2) - a.start;
        const len = dAngle * a.r;
        segments.push({ type: 'arc', ...a, len, dAngle });
        totalLength += len;
    });
    geom.lines.forEach(l => {
        const dx = l.x2 - l.x1;
        const dy = l.y2 - l.y1;
        const len = Math.sqrt(dx*dx + dy*dy);
        segments.push({ type: 'line', ...l, len, dx, dy });
        totalLength += len;
    });
    geom.dots.forEach(d => {
        const len = 1; 
        segments.push({ type: 'dot', ...d, len });
        totalLength += len;
    });

    const addContourPoint = (px, py) => {
        const randAngle = Math.random() * Math.PI * 2;
        // Distribución uniforme de área para evitar bordes duros o aglomeraciones
        const randR = Math.sqrt(Math.random()) * strokeThickness; 
        points.push({
            x: cx + (px - 12) * scale + Math.cos(randAngle) * randR,
            y: cy + (py - 12) * scale + Math.sin(randAngle) * randR,
            isContour: true
        });
    };

    // Distribuir puntos a lo largo de todos los segmentos
    for (let i = 0; i < numContourPoints; i++) {
        let rTarget = Math.random() * totalLength;
        let selectedSeg = segments[0];
        for (const seg of segments) {
            rTarget -= seg.len;
            if (rTarget <= 0) {
                selectedSeg = seg;
                break;
            }
        }

        const t = Math.random();
        if (selectedSeg.type === 'circle') {
            const angle = t * Math.PI * 2;
            addContourPoint(selectedSeg.cx + Math.cos(angle) * selectedSeg.r, selectedSeg.cy + Math.sin(angle) * selectedSeg.r);
        } else if (selectedSeg.type === 'arc') {
            const angle = selectedSeg.start + t * selectedSeg.dAngle;
            addContourPoint(selectedSeg.cx + Math.cos(angle) * selectedSeg.r, selectedSeg.cy + Math.sin(angle) * selectedSeg.r);
        } else if (selectedSeg.type === 'line') {
            addContourPoint(selectedSeg.x1 + selectedSeg.dx * t, selectedSeg.y1 + selectedSeg.dy * t);
        } else if (selectedSeg.type === 'dot') {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * selectedSeg.r;
            addContourPoint(selectedSeg.cx + Math.cos(angle) * r, selectedSeg.cy + Math.sin(angle) * r);
        }
    }

    return points;
}

export default function ShapeParticleCanvas({ activeTab }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); 
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const totalShapePoints = 1200; // Mismo conteo reducido
    
    const PALETTE = [
      'rgba(34, 211, 238, 0.95)',   // Cian
      'rgba(147, 51, 234, 0.95)',   // Morado claro
      'rgba(67, 56, 202, 0.95)',    // Índigo profundo
      'rgba(255, 255, 255, 0.95)',  // Blanco puro
      'rgba(148, 163, 184, 0.8)'    // Gris pizarra
    ];

    if (particlesRef.current.length === 0) {
      const pShape = [];
      for (let i = 0; i < totalShapePoints; i++) {
        const sizeRand = Math.random();
        let baseSize;
        if (sizeRand > 0.95) baseSize = Math.random() * 2.0 + 2.5; // Muy grandes y escasas
        else if (sizeRand > 0.7) baseSize = Math.random() * 1.5 + 1.5; // Medianas
        else baseSize = Math.random() * 1.0 + 0.8; // Pequeñas y abundantes

        pShape.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          baseSize: baseSize, 
          phase: Math.random() * Math.PI * 2,
          popOffset: Math.random() * 100, 
          popSpeed: Math.random() * 0.5 + 0.2,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
        });
      }
      particlesRef.current = pShape;
    }

    const newTargetPoints = generateShapePoints(activeTab, width, height);

    // Mapeo Inteligente (Sorting por ángulo) para evitar mezclas caóticas en las transiciones
    const cx = width / 2;
    const cy = height / 2;
    
    particlesRef.current.forEach(p => {
        p.angle = Math.atan2(p.y - cy, p.x - cx);
    });
    newTargetPoints.forEach(t => {
        t.angle = Math.atan2(t.y - cy, t.x - cx);
    });

    // Ordenar ambos arreglos para que la partícula N vaya al objetivo N más cercano angularmente
    particlesRef.current.sort((a, b) => a.angle - b.angle);
    newTargetPoints.sort((a, b) => a.angle - b.angle);

    const targetPoints = newTargetPoints;

    let time = 0;

    const render = () => {
      time += 0.015;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Movimiento en conjunto (Todos se mueven en la misma dirección)
      const floatX = Math.sin(time * 0.6) * 40;
      const floatY = Math.cos(time * 0.4) * 30;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const target = targetPoints[i];

        // Movimiento de interpolación aún más suave y elegante (ease-out)
        p.x += ((target.x + floatX) - p.x) * 0.02;
        p.y += ((target.y + floatY) - p.y) * 0.02;
        
        // Efecto de burbujas que explotan y se regeneran
        const popCycle = (time * p.popSpeed + p.popOffset) % 1; 
        let popScale = 1;
        
        if (popCycle > 0.85) {
            popScale = 1 - (popCycle - 0.85) / 0.15;
        } else if (popCycle < 0.15) {
            popScale = popCycle / 0.15;
        }

        const currentSize = p.baseSize * popScale;

        if (currentSize > 0.1) {
            // Usa el color asignado a la partícula de la nueva paleta multicolor
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
        filter: 'blur(0.6px)' // Desenfoque ultra ligero (<3%) para separar plano del texto
      }}
    />
  );
}
