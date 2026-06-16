import { useEffect, useRef, useCallback } from 'react';

const PARTICLE_COUNT = 4000; // Max density for super crisp outlines

function randomBetween(a, b) { return a + Math.random() * (b - a); }

// Pixel Sampling Utility
function getShapePoints(shapeType, canvasW, canvasH) {
  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  // Randomize scale and position for ALL shapes
  let scale = Math.min(canvasW, canvasH) * randomBetween(0.15, 0.35);
  let cx = randomBetween(scale * 2, canvasW - scale * 2);
  let cy = randomBetween(scale * 2, canvasH - scale * 2);

  // ONLY center and fix size for the very first initial shape
  if (shapeType === 'face_initial') {
    scale = Math.min(canvasW, canvasH) * 0.4;
    cx = canvasW / 2;
    cy = canvasH / 2;
  }

  // Draw outlines (strokes) and fills to create volumetric dot matrix shapes
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  if (shapeType === 'usuario' || shapeType === 'face_initial') {
    ctx.lineWidth = scale * 0.15; 
    // Head
    ctx.beginPath();
    ctx.arc(cx, cy - scale*0.3, scale*0.35, 0, Math.PI*2);
    ctx.stroke();
    // Shoulders (dome)
    ctx.beginPath();
    ctx.moveTo(cx - scale*0.8, cy + scale*0.8);
    ctx.bezierCurveTo(cx - scale*0.8, cy + scale*0.1, cx + scale*0.8, cy + scale*0.1, cx + scale*0.8, cy + scale*0.8);
    ctx.stroke();
  } 
  else if (shapeType === 'grafica') {
    // Chaos to Clarity (Scribble to Sun)
    ctx.lineWidth = scale * 0.08;
    
    // Increased the distance multiplier to make the connecting line much longer
    const leftCx = cx - scale * 1.4;
    const rightCx = cx + scale * 1.4;
    
    // Left: Chaos scribble
    ctx.beginPath();
    let px = leftCx;
    let py = cy;
    ctx.moveTo(px, py);
    // Draw many random overlapping curves to simulate a tangled ball of yarn
    for (let i = 0; i < 35; i++) {
       const nextX = leftCx + randomBetween(-scale*0.4, scale*0.4);
       const nextY = cy + randomBetween(-scale*0.4, scale*0.4);
       const cp1x = leftCx + randomBetween(-scale*0.7, scale*0.7);
       const cp1y = cy + randomBetween(-scale*0.7, scale*0.7);
       const cp2x = leftCx + randomBetween(-scale*0.7, scale*0.7);
       const cp2y = cy + randomBetween(-scale*0.7, scale*0.7);
       ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextX, nextY);
       px = nextX;
       py = nextY;
    }
    ctx.stroke();
    
    // Connecting line (from last point of scribble to the right circle)
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.bezierCurveTo(cx, cy + scale*0.4, cx, cy - scale*0.4, rightCx - scale*0.5, cy);
    ctx.stroke();
    
    // Right: Clarity (Sun/Circle)
    ctx.beginPath();
    ctx.arc(rightCx, cy, scale * 0.5, 0, Math.PI * 2);
    // Draw it twice slightly offset to make it a bit thicker/hand-drawn looking
    ctx.arc(rightCx, cy, scale * 0.48, 0, Math.PI * 2);
    ctx.stroke();
    
    // Sun rays
    const rayCount = 10;
    for(let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const startR = scale * 0.65;
        const endR = scale * 0.85;
        ctx.beginPath();
        ctx.moveTo(rightCx + Math.cos(angle)*startR, cy + Math.sin(angle)*startR);
        ctx.lineTo(rightCx + Math.cos(angle)*endR, cy + Math.sin(angle)*endR);
        ctx.stroke();
    }
  } 
  else if (shapeType === 'lupa') {
    ctx.lineWidth = scale * 0.15;
    ctx.beginPath();
    ctx.arc(cx - scale*0.2, cy - scale*0.2, scale*0.5, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + scale*0.2, cy + scale*0.2);
    ctx.lineTo(cx + scale*0.8, cy + scale*0.8);
    ctx.stroke();
    
    ctx.lineWidth = scale * 0.08;
    ctx.beginPath();
    ctx.moveTo(cx - scale*0.4, cy - scale*0.1);
    ctx.lineTo(cx - scale*0.2, cy - scale*0.4);
    ctx.lineTo(cx, cy - scale*0.2);
    ctx.lineTo(cx + scale*0.2, cy - scale*0.5);
    ctx.stroke();
  } 
  else if (shapeType === 'robot') {
    ctx.lineWidth = scale * 0.12;
    // Head (Main Body)
    ctx.beginPath();
    ctx.roundRect(cx - scale*0.7, cy - scale*0.4, scale*1.4, scale*0.9, scale*0.25);
    ctx.stroke();
    
    // Antenna stem
    ctx.beginPath();
    ctx.moveTo(cx, cy - scale*0.4);
    ctx.lineTo(cx, cy - scale*0.6);
    ctx.stroke();
    // Antenna circle
    ctx.beginPath();
    ctx.arc(cx, cy - scale*0.8, scale*0.2, 0, Math.PI*2);
    ctx.stroke();
    // Antenna inner dot
    ctx.beginPath();
    ctx.arc(cx, cy - scale*0.8, scale*0.08, 0, Math.PI*2);
    ctx.fill();
    
    // Eyes (Pill shapes)
    ctx.beginPath();
    ctx.roundRect(cx - scale*0.4, cy - scale*0.1, scale*0.3, scale*0.15, scale*0.1);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(cx + scale*0.1, cy - scale*0.1, scale*0.3, scale*0.15, scale*0.1);
    ctx.fill();
    
    // Arms
    ctx.beginPath();
    ctx.moveTo(cx - scale*0.7, cy);
    ctx.lineTo(cx - scale*1.0, cy + scale*0.2);
    ctx.lineTo(cx - scale*1.0, cy + scale*0.5);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cx + scale*0.7, cy);
    ctx.lineTo(cx + scale*1.0, cy + scale*0.2);
    ctx.lineTo(cx + scale*1.0, cy + scale*0.5);
    ctx.stroke();
    
    // Legs
    ctx.beginPath();
    ctx.roundRect(cx - scale*0.35, cy + scale*0.5, scale*0.25, scale*0.4, scale*0.1);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(cx + scale*0.1, cy + scale*0.5, scale*0.25, scale*0.4, scale*0.1);
    ctx.fill();
  } 
  else if (shapeType === 'lentes_retro') {
    // Rectangular retro glasses
    const lensW = scale * 1.2; // Made significantly wider
    const lensH = scale * 0.65;
    const bridgeW = scale * 0.4;
    const bridgeH = scale * 0.15;
    const tabW = scale * 0.7; // Much longer ear tabs
    
    // Left Lens
    ctx.beginPath();
    ctx.roundRect(cx - bridgeW/2 - lensW, cy - lensH/2, lensW, lensH, scale * 0.15);
    ctx.fill();
    
    // Right Lens
    ctx.beginPath();
    ctx.roundRect(cx + bridgeW/2, cy - lensH/2, lensW, lensH, scale * 0.15);
    ctx.fill();
    
    // Bridge
    ctx.fillRect(cx - bridgeW/2, cy - bridgeH/2, bridgeW, bridgeH);
    
    // Side tabs (agarrederas)
    ctx.fillRect(cx - bridgeW/2 - lensW - tabW, cy - bridgeH/2, tabW, bridgeH);
    ctx.fillRect(cx + bridgeW/2 + lensW, cy - bridgeH/2, tabW, bridgeH);
    
    // Add the tiny highlight dots
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx - bridgeW/2 - lensW + scale*0.25, cy - lensH/2 + scale*0.25, scale*0.1, 0, Math.PI*2);
    ctx.arc(cx + bridgeW/2 + scale*0.25, cy - lensH/2 + scale*0.25, scale*0.1, 0, Math.PI*2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
  else if (shapeType === 'ai') {
    let fontSize = scale * 3.5;
    if (fontSize * 2 > canvasW) {
      fontSize = canvasW / 2;
    }
    ctx.font = `900 ${fontSize}px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', cx, cy);
  }

  const imgData = ctx.getImageData(0, 0, canvasW, canvasH).data;
  const points = [];
  // Extreme high resolution sampling
  const step = 3; 
  for (let y = 0; y < canvasH; y += step) {
    for (let x = 0; x < canvasW; x += step) {
      const alpha = imgData[(y * canvasW + x) * 4 + 3];
      if (alpha > 128) {
        points.push({x, y});
      }
    }
  }
  return points;
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);

  const initParticles = useCallback((w, h) => {
    const initialPoints = getShapePoints('face_initial', w, h);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      let x, y;
      
      // 100% of particles in Capa 2 belong to the shape
      if (initialPoints.length > 0) {
        const pt = initialPoints[Math.floor(Math.random() * initialPoints.length)];
        x = pt.x;
        y = pt.y;
      } else {
        x = w / 2;
        y = h / 2;
      }
      
      let targetX = x;
      let targetY = y;

      // Palette and depth based on the latest cosmic reference image
      const r = Math.random();
      
      // Base: 3 Tonos (Azules y Morado)
      const baseRand = Math.random();
      let color = [59, 130, 246]; // 45%: Azul brillante
      if (baseRand > 0.75) {
        color = [139, 92, 246]; // 25%: Logo Morado (#8b5cf6)
      } else if (baseRand > 0.45) {
        color = [96, 165, 250]; // 30%: Azul claro
      }
      
      // Size distribution: Micro, Small, and Medium
      const sizeRand = Math.random();
      let radius;
      if (sizeRand > 0.70) {
        radius = randomBetween(1.1, 1.6); // 30% Medio
      } else if (sizeRand > 0.20) {
        radius = randomBetween(0.6, 1.0); // 50% Pequeño
      } else {
        radius = randomBetween(0.2, 0.5); // 20% Muy pequeño (micro)
      }
      
      // Extreme variance in opacity for the dust: translucent to completely solid
      let alpha = Math.random();
      if (alpha < 0.3) alpha = randomBetween(0.05, 0.2); // Muy traslucidas
      else if (alpha > 0.8) alpha = randomBetween(0.85, 1.0); // Muy solidas/brillosas
      else alpha = randomBetween(0.2, 0.8); // Medio

      if (r > 0.98) {
        // Bright Purple/Violet (2%) - Logo Purple
        color = [139, 92, 246]; 
        radius = randomBetween(2.0, 3.2);
        alpha = randomBetween(0.9, 1.0); 
      } else if (r > 0.965) {
        // MUY BRILLOSAS BLANCAS (1.5% - Reducido)
        color = [255, 255, 255];
        radius = randomBetween(2.5, 4.0); // Más grandes
        alpha = 1.0; // Opacidad máxima
      } else if (r > 0.93) {
        // Estrellas Azules Radiantes (3.5%) - Brillantes y grandes
        color = [96, 165, 250]; // Azul claro brillante
        radius = randomBetween(2.0, 3.5); // Más grandes para que destaquen
        alpha = 1.0; // Opacidad máxima
      } else if (r > 0.90) {
        // Cyan accents (3%)
        color = [34, 211, 238];
        radius = randomBetween(1.5, 2.2);
        alpha = randomBetween(0.7, 0.9); 
      } else if (r > 0.85) {
        // Faint Grey/White (5% Large blurry depth)
        color = [200, 200, 200];
        radius = randomBetween(2.5, 4.0);
        alpha = randomBetween(0.05, 0.15); // Extremadamente traslucidas
      }

      return {
        x, y,
        vx: 0, vy: 0, // Inercia para transiciones suaves
        baseX: x, baseY: y, // Currently moving nowhere (scattered)
        targetX, targetY,   // Where they need to go later
        radius, 
        color,
        alpha, 
        phase: randomBetween(0, Math.PI * 2), 
        floatSpeed: randomBetween(0.005, 0.015) // Flotación más lenta y suave
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
    
    // Dynamic Morphing Logic (Sequenced Timeline)
    const shapes = ['grafica', 'lupa', 'ai', 'lentes_retro', 'robot', 'usuario'];
    let shapeIndex = 0;
    let isRunning = true;
    
    const runMorphSequence = () => {
      if (!isRunning) return;
      
      // 1. Visible for 8 seconds
      setTimeout(() => {
        if (!isRunning) return;
        
        // 2. Start global fade out (Toma ~4.5 segundos en total)
        const particles = particlesRef.current;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles[i].morphingOut = true;
          particles[i].morphDelay = Math.random() * 180; // Hasta 3s de delay escalonado
        }
        
        // 3. Wait for all to fade out (3s delay + 1.5s fade out = 4.5s)
        setTimeout(() => {
          if (!isRunning) return;
          
          // 4. Stay in complete darkness for 2 seconds
          setTimeout(() => {
            if (!isRunning) return;
            
            // 5. Pick next shape and teleport particles while dark
            const nextShape = shapes[shapeIndex % shapes.length];
            shapeIndex++;
            const newPoints = getShapePoints(nextShape, w, h);
            
            for (let i = 0; i < PARTICLE_COUNT; i++) {
              if (newPoints.length > 0) {
                const targetPt = newPoints[Math.floor(Math.random() * newPoints.length)];
                particles[i].baseX = targetPt.x;
                particles[i].baseY = targetPt.y;
                
                // Teleport instantáneo en la oscuridad
                particles[i].x = particles[i].baseX + (Math.random() - 0.5) * 50; 
                particles[i].y = particles[i].baseY + (Math.random() - 0.5) * 50;
                particles[i].vx = 0; particles[i].vy = 0;
              }
              // Start fade in (Toma ~4.5 segundos en total)
              particles[i].fadingIn = true;
              particles[i].morphDelay = Math.random() * 180; // Hasta 3s de delay escalonado
            }
            
            // 6. Wait for fade in to finish (4.5s) before resetting cycle
            setTimeout(() => {
              if (isRunning) runMorphSequence();
            }, 4500);
            
          }, 4000); // 4 seconds of darkness (vacío)
          
        }, 4500); // Wait 4.5s for fade out sequence
        
      }, 4000); // 4 seconds of visibility (estático)
    };
    
    // Start the infinite sequence
    runMorphSequence();
    
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
    
    // Track mouse for local repulsion
    let mx = -9999, my = -9999;
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);

    // Track visible particles to simulate gradual generation
    let currentParticleCount = 0;
    let framesPassed = 0;
    let startIncrementing = false;
    setTimeout(() => { 
      startIncrementing = true; 
      currentParticleCount = 50; 
    }, 900); // start at 0.9s

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      const particles = particlesRef.current;
      const ripples = ripplesRef.current;

      // Increment visible particles based on specific timing curve:
      // Start at 0.9s with 50 particles.
      // 1.2s (18 frames later): 200 particles.
      // 2.0s (66 frames later): 600 particles.
      if (startIncrementing && currentParticleCount < particles.length) {
        framesPassed++;
        if (framesPassed <= 66) {
          // From 0.9s to 2.0s (66 frames): ~8.33 particles/frame
          // Frame 18 (1.2s): 50 + (18 * 8.33) = 200
          // Frame 66 (2.0s): 50 + (66 * 8.33) = 600
          currentParticleCount += 8.33; 
        } else {
          // After 2.0s: accelerate to finish the remaining 3400 particles over ~3 seconds
          currentParticleCount += 18.88; 
        }
        
        if (currentParticleCount > particles.length) {
          currentParticleCount = particles.length;
        }
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += ripples[i].speed;
        if (ripples[i].radius > ripples[i].maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Draw particles up to the currently visible limit
      for (let i = 0; i < currentParticleCount; i++) {
        const p = particles[i];
        
        p.phase += p.floatSpeed; 

        // Floating naturally around base position
        let targetX = p.baseX + Math.sin(p.phase) * 20;
        let targetY = p.baseY + Math.cos(p.phase * 0.8) * 20;
        
        let stretch = 1;
        let angle = 0;
        let isActiveRipple = false;

        // Mouse repulsion
        const dxMouse = p.x - mx;
        const dyMouse = p.y - my;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          const force = (150 - distMouse) / 150;
          targetX += (dxMouse / distMouse) * force * 60;
          targetY += (dyMouse / distMouse) * force * 60;
        }

        // Apply shockwave physics
        for (const r of ripples) {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
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

        // Spring physics para un movimiento y transición increíblemente suave (inercia)
        const ax = (targetX - p.x) * 0.015;
        const ay = (targetY - p.y) * 0.015;
        
        p.vx += ax;
        p.vy += ay;
        
        // Fricción para que se deslice suavemente
        p.vx *= 0.88;
        p.vy *= 0.88;
        
        p.x += p.vx;
        p.y += p.vy;

        // Lógica de desvanecimiento global coreografiada
        if (p.currentAlphaMultiplier === undefined) p.currentAlphaMultiplier = 1;
        
        if (p.morphingOut) {
          if (p.morphDelay > 0) {
            p.morphDelay--;
          } else {
            p.currentAlphaMultiplier -= 0.01; // Lento y suave (1.6s fade real)
            if (p.currentAlphaMultiplier <= 0) {
              p.currentAlphaMultiplier = 0;
              p.morphingOut = false;
            }
          }
        } else if (p.fadingIn) {
          if (p.morphDelay > 0) {
            p.morphDelay--;
          } else {
            p.currentAlphaMultiplier += 0.01; // Lento y suave (1.6s fade real)
            if (p.currentAlphaMultiplier >= 1) {
              p.currentAlphaMultiplier = 1;
              p.fadingIn = false;
            }
          }
        }

        // Draw particle con transición de luz más lenta y multiplicador de desvanecimiento
        const currentAlpha = p.alpha * (0.75 + Math.sin(p.phase * 0.8) * 0.25) * p.currentAlphaMultiplier;
        const [r, g, b] = p.color;

        ctx.save();
        ctx.translate(p.x, p.y);
        
        if (isActiveRipple && stretch > 1.5) {
          // Elongated dash/laser when hit by shockwave
          ctx.rotate(angle);
          const length = p.radius * stretch;
          ctx.beginPath();
          ctx.roundRect(-length / 2, -p.radius / 2, length, p.radius, p.radius / 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${currentAlpha})`;
          ctx.fill();
        } else {
          // Clean, simple dot
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${currentAlpha})`;
          ctx.fill();
        }
        
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
