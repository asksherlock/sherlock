import { motion } from 'framer-motion';

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
  return (
    <section id="comparison" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', marginBottom: 16, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Usuarios Sintéticos vs Investigación Tradicional
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ width: '100%' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: 64, padding: '32px 48px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px 24px 0 0' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>Criterio</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>Investigación Tradicional</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1' }}>Usuarios Sintéticos</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COMPARISON_DATA.map((row, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1.5fr 1.5fr', 
                  gap: 64, 
                  padding: '32px 48px', 
                  borderBottom: i < COMPARISON_DATA.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', 
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
              >
                <div style={{ fontSize: '17px', color: '#cbd5e1', fontWeight: 500 }}>{row.criterio}</div>
                <div style={{ fontSize: '17px', color: '#94a3b8' }}>{row.tradicional}</div>
                <div style={{ fontSize: '17px', color: '#f8fafc', fontWeight: 600 }}>{row.sintetico}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: 56 }}>
          <div style={{ display: 'inline-block', padding: '20px 40px', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '16px', color: '#94a3b8' }}>
            Los usuarios sintéticos son ideales para etapas exploratorias y prototipado rápido de investigación cualitativa.
          </div>
        </motion.div>
      </div>
      <style>{`
        @media(max-width: 768px) {
          #comparison > div > div:nth-child(2) > div > div:nth-child(2) > div { grid-template-columns: 1fr !important; gap: 20px !important; padding: 24px 20px !important; }
          #comparison > div > div:nth-child(2) > div > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
