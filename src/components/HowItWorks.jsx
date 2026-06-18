import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Define tu audiencia',
    desc: 'Configura las características de tu segmento objetivo mediante variables demográficas, socioeconómicas y psicográficas. Sherlock utiliza esta información para construir perfiles sintéticos que representen a tu mercado.',
  },
  {
    number: '02',
    title: 'Genera usuarios sintéticos',
    desc: 'La plataforma crea decenas de perfiles únicos con motivaciones, preferencias y contextos distintos. Cada agente posee una identidad consistente que permite simular comportamientos y opiniones de manera realista.',
  },
  {
    number: '03',
    title: 'Ejecuta entrevistas a escala',
    desc: 'Realiza entrevistas individuales o masivas con tus usuarios sintéticos. Haz preguntas abiertas, explora necesidades, valida conceptos y descubre objeciones. Cada perfil responde desde su propia perspectiva con lenguaje natural y coherencia contextual.',
  },
  {
    number: '04',
    title: 'Obtén insights accionables',
    desc: 'Sherlock procesa automáticamente las conversaciones y transforma miles de respuestas en resúmenes ejecutivos, patrones de comportamiento, citas representativas y recomendaciones listas para respaldar decisiones estratégicas.',
  },
];

export default function HowItWorks() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scale = useTransform(smoothProgress, [0, 1], [0.8, 1]); // Menos agresivo el escalado inicial

  return (
    <section id="how-it-works" style={{ paddingTop: '100px', paddingBottom: '0px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Contenedor centralizado para los pasos (con padding) */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Full-width Header at the Top */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, fontFamily: '"Syne", sans-serif', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24, color: '#ffffff' }}>
            ¿Cómo <span style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>funciona?</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, fontWeight: 300, maxWidth: 1200, whiteSpace: 'nowrap' }}>
            De una hipótesis a insights accionables en minutos. Sin reclutamiento, sin trabajo de campo y sin semanas de espera.
          </p>
        </motion.div>

        {/* Main Grid Layout (2x2) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          columnGap: '80px',
          rowGap: '60px',
          alignItems: 'start',
          marginBottom: '60px' // Reducido de 100px a 60px para menos hueco
        }} className="how-it-works-grid">

          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1', fontFamily: '"Syne", sans-serif' }}>
                {step.number}
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#f8fafc', marginBottom: 16, fontFamily: '"Cabinet Grotesk", sans-serif', letterSpacing: '0.02em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.7, fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Contenedor del Video (Centrado, con difuminado a negro) */}
      <div style={{ 
        width: '100%', 
        height: 'auto', 
        display: 'flex', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, transparent 0%, #000000 30%, #000000 100%)',
        paddingTop: '20px', // Reducido drásticamente
        paddingBottom: '40px', // Reducido drásticamente
        paddingLeft: '24px',
        paddingRight: '24px'
      }}>
        <motion.div
          ref={videoRef}
          style={{
            scale,
            borderRadius: '32px', // Bordes siempre circulares/redondeados
            width: '100%',
            maxWidth: '630px', // Reducido según lo solicitado
            position: 'relative',
            zIndex: 10,
            background: 'rgba(15, 17, 26, 0.8)',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            aspectRatio: '16/9',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          {!isPlaying && (
            <div 
              onClick={() => setIsPlaying(true)} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Imagen de portada */}
              <img 
                src="/features/video-cover.png" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                alt="Video Cover" 
              />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)' }} />
              {/* Botón de Play estético */}
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, backdropFilter: 'blur(4px)', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(99,102,241,0.5)' }} className="play-btn">
                <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: 6 }} />
              </div>
            </div>
          )}
          
          {isPlaying && (
            <iframe 
              src="https://player.vimeo.com/video/1099426864?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
              title="Sherlock AI"
            ></iframe>
          )}
        </motion.div>
      </div>

      <style>{`
        @media(max-width:1024px){
          .how-it-works-grid { grid-template-columns: 1fr !important; row-gap: 40px !important; }
        }
        .play-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
