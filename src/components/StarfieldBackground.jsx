import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COUNT = 700;

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export default function StarfieldBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);

  const initParticles = (w, h) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const isBright = Math.random() > 0.85; 
      const isCyan = Math.random() > 0.90;
      const isPurple = Math.random() > 0.80 && !isCyan;
      const size = isBright ? randomBetween(1.5, 4.5) : randomBetween(0.5, 2.5);
      
      let color = [79, 70, 229]; // #4f46e5 default blue
      if (isBright) color = [255, 255, 255];
      if (isCyan) color = [34, 211, 238];
      if (isPurple) color = [167, 139, 250];

      const initialX = randomBetween(0, w);
      const initialY = randomBetween(0, h);
      
      return {
        x: initialX,
        y: initialY,
        baseX: initialX,
        baseY: initialY,
        vx: 0,
        vy: 0,
        size,
        color,
        speedY: randomBetween(0.1, 0.5), // Upward floating speed
        phase: randomBetween(0, Math.PI * 2),
        floatSpeed: randomBetween(0.01, 0.03)
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimización para fondo sólido no transparente
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(w, h);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    
    // Click for Shockwave
    const onClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(w, h) * 1.5,
        speed: 15,
        width: 100 
      });
    };
    
    // Track mouse for local attraction
    let mx = -9999, my = -9999;
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      // Background is completely black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);
      
      const particles = particlesRef.current;
      const ripples = ripplesRef.current;

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += ripples[i].speed;
        if (ripples[i].radius > ripples[i].maxRadius) {
          ripples.splice(i, 1);
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Infinite vertical upward scroll
        p.baseY -= p.speedY;
        if (p.baseY < -50) {
          p.baseY = h + 50;
          p.baseX = randomBetween(0, w); // re-randomize X when looping
          // Reset physical state to prevent dragging across the screen
          p.x = p.baseX;
          p.y = p.baseY;
          p.vx = 0;
          p.vy = 0;
        }

        p.phase += p.floatSpeed; 

        // Base physics targets
        let targetX = p.baseX + Math.sin(p.phase) * 10;
        let targetY = p.baseY;
        
        let stretch = 1;
        let angle = 0;
        let isActiveRipple = false;

        let opacity = 0.4 + Math.sin(p.phase * 2) * 0.4; // Fading twinkle effect

        // Mouse repulsion (Empuje muy suave y elegante)
        const dxMouse = p.x - mx; // Note: Use physical position p.x instead of targetX for calculation
        const dyMouse = p.y - my;
        const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
        
        // Fast pre-check using squared distance (300 * 300 = 90000)
        if (distSq < 90000) { 
          const distMouse = Math.sqrt(distSq);
          
          // Curva cuadrática para una transición fluida y sin saltos bruscos
          const force = Math.pow((300 - distMouse) / 300, 2);
          
          // Empuje más notorio pero manteniendo la inercia del fluido
          targetX += (dxMouse / distMouse) * force * 25; 
          targetY += (dyMouse / distMouse) * force * 25;
          
          // Brillo que acompaña el empuje
          opacity = Math.min(1.0, opacity + force * 0.4);
        }

        // Apply shockwave physics
        for (const r of ripples) {
          const dx = p.x - r.x; // Use physical position
          const dy = p.y - r.y;
          const distSq = dx * dx + dy * dy;
          
          // Fast pre-check
          const rMax = r.radius + r.width;
          if (distSq < rMax * rMax) {
            const dist = Math.sqrt(distSq);
            const waveDist = Math.abs(dist - r.radius);
            
            if (waveDist < r.width) {
              isActiveRipple = true;
              angle = Math.atan2(dy, dx);
              
              const force = (r.width - waveDist) / r.width;
              targetX += Math.cos(angle) * force * 40;
              targetY += Math.sin(angle) * force * 40;
              
              stretch = Math.max(stretch, 1 + (r.radius * force * 0.015));
            }
          }
        }

        // Spring physics para un movimiento fluido y suave
        const ax = (targetX - p.x) * 0.015;
        const ay = (targetY - p.y) * 0.015;
        
        p.vx += ax;
        p.vy += ay;
        
        // Fricción para deslizarse con inercia
        p.vx *= 0.88;
        p.vy *= 0.88;
        
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        const [rC, gC, bC] = p.color;

        ctx.save();
        ctx.translate(p.x, p.y); // Draw at physical location

        if (p.size > 2.5) {
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = `rgba(${rC},${gC},${bC},1)`;
        }

        if (isActiveRipple && stretch > 1.5) {
          // Elongated dash/laser when hit by shockwave
          ctx.rotate(angle);
          const length = p.size * stretch;
          ctx.beginPath();
          ctx.roundRect(-length / 2, -p.size / 2, length, p.size, p.size / 2);
          ctx.fillStyle = `rgba(${rC},${gC},${bC},${opacity})`;
          ctx.fill();
        } else {
          // Clean, simple dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rC},${gC},${bC},${opacity})`;
          ctx.fill();
        }
        
        ctx.shadowBlur = 0; // reset
        
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.0, delay: 0.0, ease: 'easeOut' }} // Fades in over the first second
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
