import { motion } from 'framer-motion';
import { useState } from 'react';

const GlowIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 0px 8px currentColor)' }}>
    {children}
  </svg>
);

const SpeedIcon = () => <GlowIcon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /><path d="M12 2v2" /></GlowIcon>;
const CostIcon = () => <GlowIcon><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></GlowIcon>;
const SampleIcon = () => <GlowIcon><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4" /><circle cx="19" cy="11" r="3" /><path d="M22 21v-2a3 3 0 0 0-3-3h-1" /></GlowIcon>;
const ConsistencyIcon = () => <GlowIcon><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></GlowIcon>;
const BiasIcon = () => <GlowIcon><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></GlowIcon>;
const GeoIcon = () => <GlowIcon><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></GlowIcon>;
const AvailabilityIcon = () => <GlowIcon><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 14h.01" /></GlowIcon>;
const ExtremesIcon = () => <GlowIcon><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></GlowIcon>;
const ConfidentialityIcon = () => <GlowIcon><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></GlowIcon>;

const COMPARISON_DATA = [
  {
    icon: <SpeedIcon />,
    color: '#eab308', // yellow
    criterio: 'Velocidad',
    descCriterio: 'Cada día sin datos retrasa decisiones',
    tradicional: '2–4 semanas',
    descTradicional: 'Reclutamiento, agendas y fieldwork consumen semanas antes de tener un solo insight',
    sintetico: 'Instantáneo',
    descSintetico: 'Genera decenas de perfiles y empieza a entrevistar en minutos'
  },
  {
    icon: <CostIcon />,
    color: '#38bdf8', // cyan
    criterio: 'Costo por ronda',
    descCriterio: 'La investigación real es cara por definición',
    tradicional: '$5k–$30k USD',
    descTradicional: 'Incentivos, agencias de reclutamiento y moderadores se acumulan rápido',
    sintetico: 'Desde $49/mes',
    descSintetico: 'Sin incentivos, sin agencias, sin logística'
  },
  {
    icon: <SampleIcon />,
    color: '#a855f7', // purple
    criterio: 'Tamaño de muestra',
    descCriterio: 'Más muestra = más confianza en los insights',
    tradicional: '8–12 usuarios',
    descTradicional: 'El presupuesto limita cuántas personas puedes incluir',
    sintetico: 'Hasta 500+',
    descSintetico: 'Escala sin costo adicional por perfil'
  },
  {
    icon: <ConsistencyIcon />,
    color: '#10b981', // emerald
    criterio: 'Consistencia',
    descCriterio: 'Resultados comparables entre sesiones',
    tradicional: 'Alta variabilidad',
    descTradicional: 'El humor, el entrevistador o el día afectan las respuestas',
    sintetico: 'Perfiles replicables',
    descSintetico: 'El mismo perfil responde igual en cualquier momento'
  },
  {
    icon: <BiasIcon />,
    color: '#ec4899', // pink
    criterio: 'Sesgo de deseabilidad',
    descCriterio: 'Las personas mienten sin querer',
    tradicional: 'Alto riesgo',
    descTradicional: 'Responden lo que creen que quieres escuchar',
    sintetico: 'Sin sesgo social',
    descSintetico: 'Los sintéticos no tienen filtro ni quieren quedar bien'
  },
  {
    icon: <GeoIcon />,
    color: '#f43f5e', // rose
    criterio: 'Cobertura geográfica',
    descCriterio: 'Tu mercado no vive solo en CDMX',
    tradicional: 'Logística compleja',
    descTradicional: 'Reclutar en regiones alejadas implica viajes y costos extra',
    sintetico: 'Cualquier región',
    descSintetico: 'Oaxaca, Chiapas o Bogotá se generan igual de rápido'
  },
  {
    icon: <AvailabilityIcon />,
    color: '#6366f1', // indigo
    criterio: 'Disponibilidad',
    descCriterio: 'El tiempo de coordinación es tiempo perdido',
    tradicional: 'Agendas y cancelaciones',
    descTradicional: 'No-shows y reagendas retrasan todo el proyecto',
    sintetico: '24/7, sin espera',
    descSintetico: 'Disponibles cuando los necesitas, sin confirmaciones'
  },
  {
    icon: <ExtremesIcon />,
    color: '#14b8a6', // teal
    criterio: 'Escenarios extremos',
    descCriterio: 'Los perfiles atípicos son los más reveladores',
    tradicional: 'Difícil de reclutar',
    descTradicional: 'Encontrar early adopters radicales o perfiles de nicho es casi imposible',
    sintetico: 'Generación inmediata',
    descSintetico: 'Crea cualquier perfil atípico en segundos'
  },
  {
    icon: <ConfidentialityIcon />,
    color: '#f59e0b', // amber
    criterio: 'Confidencialidad',
    descCriterio: 'Tus ideas pre-lanzamiento son tu ventaja',
    tradicional: 'Filtración posible',
    descTradicional: 'Exponer conceptos a personas reales siempre tiene riesgo',
    sintetico: 'Cero datos reales',
    descSintetico: 'Los sintéticos no tienen con quién hablar'
  }
];

function ExpandableRow({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 64, padding: '24px 48px',
        borderBottom: index < COMPARISON_DATA.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
        background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.3s ease',
        cursor: 'default'
      }}
    >
      {/* Col 1: Icon + Title + Desc */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 20, height: 20, color: item.color, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>{item.criterio}</span>
          <motion.div initial={false} animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingTop: 8, fontSize: '14px', color: '#94a3b8', lineHeight: 1.5 }}>{item.descCriterio}</div>
          </motion.div>
        </div>
      </div>

      {/* Col 2: Tradicional Pill + Desc */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 900 }}>✕</span>
          <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 500 }}>{item.tradicional}</span>
        </div>
        <motion.div initial={false} animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }} style={{ overflow: 'hidden' }}>
          <div style={{ paddingTop: 12, fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>{item.descTradicional}</div>
        </motion.div>
      </div>

      {/* Col 3: Sintético Pill + Desc */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)' }}>
          <span style={{ color: '#34d399', fontSize: '12px', fontWeight: 900 }}>✓</span>
          <span style={{ fontSize: '14px', color: '#34d399', fontWeight: 600 }}>{item.sintetico}</span>
        </div>
        <motion.div initial={false} animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }} style={{ overflow: 'hidden' }}>
          <div style={{ paddingTop: 12, fontSize: '14px', color: '#10b981', opacity: 0.8, lineHeight: 1.5 }}>{item.descSintetico}</div>
        </motion.div>
      </div>
    </div>
  );
}

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
          style={{ width: '100%', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, background: 'rgba(255,255,255,0.01)', overflow: 'hidden' }}
        >
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 64, padding: '32px 48px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Criterio</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>Investigación tradicional</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>Reclutamiento + fieldwork</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>Ask Sherlock</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>Usuarios sintéticos con IA</div>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COMPARISON_DATA.map((row, i) => (
              <ExpandableRow key={i} item={row} index={i} />
            ))}
          </div>

          {/* Footer Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 64, padding: '40px 48px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
            <div></div> {/* Empty Col 1 */}
            
            {/* Col 2 Footer */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Costo Estimado</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#94a3b8', fontFamily: 'Space Grotesk, sans-serif' }}>~$15,000 USD</span>
              <span style={{ fontSize: '13px', color: '#64748b', marginTop: 4 }}>por ronda de 10 entrevistas</span>
            </div>

            {/* Col 3 Footer */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Con Sherlock</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#34d399', fontFamily: 'Space Grotesk, sans-serif' }}>-80% costo · 10x velocidad</span>
              <span style={{ fontSize: '13px', color: '#64748b', marginTop: 4 }}>resultados en horas, no semanas</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
