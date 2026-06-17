import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Define tu audiencia objetivo',
    desc: 'Describe a tu usuario ideal: edad, contexto, comportamientos, frustraciones. La IA construye arquetipos psicológicamente coherentes.',
  },
  {
    number: '02',
    title: 'Genera usuarios sintéticos',
    desc: 'Sherlock crea decenas de perfiles únicos con personalidades, historias y motivaciones distintas que reflejan tu mercado real.',
  },
  {
    number: '03',
    title: 'Simula entrevistas y pruebas',
    desc: 'Hazles preguntas, presenta productos, valida ideas. Cada usuario responde desde su perspectiva única con total consistencia.',
  },
  {
    number: '04',
    title: 'Obtén insights accionables',
    desc: 'Recibe análisis automáticos, patrones de comportamiento y recomendaciones concretas para tu producto o estrategia.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        
        {/* Full-width Header at the Top */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, fontFamily: '"Syne", sans-serif', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24, color: '#ffffff' }}>
            ¿Cómo <span style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>funciona?</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, fontWeight: 300 }}>
            En cuatro pasos pasas de una hipótesis a insights accionables — sin reclutamiento, sin bias, sin esperas.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }} className="how-it-works-grid">

          {/* Left Column: Steps List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STEPS.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: 24,
                  paddingBottom: 32,
                  paddingTop: i === 0 ? 0 : 32,
                  borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#6366f1', fontFamily: '"Syne", sans-serif', paddingTop: 2 }}>
                  {step.number}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f8fafc', marginBottom: 12, fontFamily: '"Cabinet Grotesk", sans-serif', letterSpacing: '0.02em' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: 300 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Vimeo Video Embed */}
          <div style={{ position: 'relative', paddingTop: 10 }}>
            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              style={{
                position: 'relative',
                zIndex: 10,
                background: 'rgba(15, 17, 26, 0.8)',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                aspectRatio: '16/9',
                width: '100%'
              }}
            >
              <iframe 
                src="https://player.vimeo.com/video/1099426864?badge=0&autopause=0&player_id=0&app_id=58479" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Sherlock AI"
              ></iframe>
            </motion.div>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width:1024px){
          .how-it-works-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
}
