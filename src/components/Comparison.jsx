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
    <section id="comparison" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', marginBottom: 16, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Comparativa: Usuarios Sintéticos vs Investigación Tradicional
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ width: '100%' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 100px', gap: 16, padding: '24px 32px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>Criterio</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>Investigación Tradicional</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#6366f1' }}>Usuarios Sintéticos</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', textAlign: 'center' }}>Ventaja</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COMPARISON_DATA.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 100px', gap: 16, padding: '20px 32px', borderBottom: i < COMPARISON_DATA.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
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
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: 32 }}>
          <div style={{ display: 'inline-block', padding: '16px 32px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', color: '#94a3b8' }}>
            Los usuarios sintéticos son ideales para etapas exploratorias y prototipado rápido de investigación cualitativa.
          </div>
        </motion.div>
      </div>
      <style>{`
        @media(max-width: 768px) {
          #comparison > div > div:nth-child(2) > div { grid-template-columns: 1fr !important; gap: 8px !important; padding: 16px !important; }
          #comparison > div > div:nth-child(2) > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
