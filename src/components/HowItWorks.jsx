import { motion } from 'framer-motion';
import { IconDNA, IconFlow, IconPulse, IconBrain, AnimatedIconWrapper } from './AnimatedIcons';

const STEPS = [
  {
    number: '01',
    Icon: IconDNA,
    title: 'Define tu Producto y Objetivo',
    desc: 'Comparte el contexto de tu producto: URL, capturas o una descripción. Define el flujo a analizar y el segmento de usuarios.',
    color: '#6366f1',
    details: ['Onboarding de usuarios', 'Flujo de compra / checkout', 'Retención y re-engagement', 'Soporte y autoservicio'],
    time: '5 min',
  },
  {
    number: '02',
    Icon: IconDNA,
    title: 'Sherlock Genera los Perfiles Sintéticos',
    desc: 'La IA crea perfiles hiperrealistas con demografía, comportamientos y emociones basadas en datos de tu industria.',
    color: '#8b5cf6',
    details: ['Demografía y psicografía detallada', 'Tolerancia a la frustración', 'Motivaciones y objetivos', 'Patrones de comportamiento digital'],
    time: '2 min',
  },
  {
    number: '03',
    Icon: IconFlow,
    title: 'Simulación Automatizada de Flujos',
    desc: 'Los usuarios sintéticos navegan tu producto de forma autónoma, tomando decisiones reales y registrando cada interacción.',
    color: '#22d3ee',
    details: ['Miles de sesiones paralelas', 'Comportamiento no-lineal', 'Generación de casos borde', 'Logs detallados de interacción'],
    time: '15 min',
  },
  {
    number: '04',
    Icon: IconBrain,
    title: 'Insights Accionables al Instante',
    desc: 'Recibe un reporte con fricciones priorizadas, causa raíz documentada y recomendaciones concretas listas para tu equipo.',
    color: '#10b981',
    details: ['Mapa de calor de fricciones', 'Causa raíz automática', 'Priorización por impacto', 'Recomendaciones UX/UI'],
    time: 'Inmediato',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '120px 24px', position: 'relative', background: 'linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.025) 50%, transparent 100%)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 90 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', marginBottom: 20 }}>
            <span style={{ fontSize: '11px', color: '#67e8f9', fontWeight: 600, letterSpacing: '0.08em' }}>CÓMO FUNCIONA</span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            De la pregunta al insight<br />en minutos, no meses
          </h2>
          <p style={{ fontSize: '18px', color: '#475569', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Olvídate de meses de investigación cualitativa. Con Sherlock AI obtienes respuestas profundas en horas.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.3) 10%, rgba(99,102,241,0.3) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {STEPS.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="timeline-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 1fr',
                gap: 16,
                alignItems: 'start',
                marginBottom: 40,
                direction: i % 2 === 0 ? 'ltr' : 'rtl',
              }}
            >
              {/* Content card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 250 }}
                style={{
                  padding: '20px',
                  direction: 'ltr',
                  position: 'relative',
                }}
              >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${step.color}, transparent)`, opacity: 0.7 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <AnimatedIconWrapper color={step.color} size={44}>
                    <step.Icon size={24} color={step.color} />
                  </AnimatedIconWrapper>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: step.color, letterSpacing: '0.1em' }}>PASO {step.number}</div>
                    <div style={{ fontSize: '11px', color: '#475569', marginTop: 1 }}>⏱ {step.time}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: '#f1f5f9', marginBottom: 10, lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: 18 }}>
                  {step.desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {step.details.map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: step.color, boxShadow: `0 0 5px ${step.color}`, flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#475569' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Center node */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'ltr', paddingTop: 16 }}>
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ type: 'spring', delay: i * 0.1 + 0.3 }}
                  style={{
                    width: 40, height: 40,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${step.color}30, ${step.color}10)`,
                    border: `2px solid ${step.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 900,
                    color: step.color,
                    fontFamily: 'Space Grotesk, sans-serif',
                    boxShadow: `0 0 20px ${step.color}30`,
                    zIndex: 1,
                    position: 'relative',
                  }}
                >
                  {step.number}
                  {/* Pulse ring */}
                  <div style={{
                    position: 'absolute', inset: -6,
                    borderRadius: '50%',
                    border: `1px solid ${step.color}30`,
                    animation: 'step-pulse 2s ease-out infinite',
                  }} />
                </motion.div>

                {i < STEPS.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 30, background: `linear-gradient(180deg, ${step.color}50, transparent)`, marginTop: 4 }} />
                )}
              </div>

              {/* Empty right/left side */}
              <div />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: 20 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 14, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <span style={{ fontSize: '15px', color: '#94a3b8' }}>
              Tiempo total desde setup hasta primer insight: <strong style={{ color: '#6366f1' }}>menos de 30 minutos</strong>
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes step-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
        @media(max-width:768px){
          .timeline-row { grid-template-columns: 1fr !important; direction: ltr !important; }
          .timeline-row > *:nth-child(2) { display: none; }
          .timeline-row > *:nth-child(3) { display: none; }
        }
      `}</style>
    </section>
  );
}
