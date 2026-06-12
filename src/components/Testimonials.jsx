import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "Sherlock AI nos permitió detectar en 4 horas una fricción crítica en el flujo de apertura de cuenta que habíamos estado ignorando por meses. El impacto en conversión fue inmediato.",
    author: "Directora de Producto Digital",
    company: "Institución Financiera Líder en México",
    icon: '🏦',
    color: '#6366f1',
  },
  {
    quote: "La capacidad de simular miles de usuarios con diferentes perfiles simultáneamente nos dio una perspectiva que ninguna sesión de usuario testing tradicional podría darnos.",
    author: "VP de Experiencia de Usuario",
    company: "Empresa de Movilidad a Nivel Nacional",
    icon: '🚗',
    color: '#22d3ee',
  },
  {
    quote: "Redujimos el costo de investigación de usuarios en 78% y el tiempo de análisis de 3 meses a 3 días. Es la herramienta que toda empresa de consumo masivo necesita.",
    author: "Head of Digital Innovation",
    company: "Corporativo de Consumo Masivo",
    icon: '🛒',
    color: '#ec4899',
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            borderRadius: 100,
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600, letterSpacing: '0.08em' }}>
              TESTIMONIOS
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #f8fafc, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${t.color}, transparent)`,
                opacity: 0.5,
              }} />

              {/* Quote mark */}
              <div style={{
                fontSize: '48px',
                color: t.color,
                opacity: 0.3,
                lineHeight: 1,
                marginBottom: 16,
                fontFamily: 'Georgia, serif',
              }}>
                "
              </div>

              <p style={{
                fontSize: '15px',
                color: '#94a3b8',
                lineHeight: 1.75,
                marginBottom: 24,
                fontStyle: 'italic',
              }}>
                {t.quote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: t.color + '20',
                  border: `1px solid ${t.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  {t.icon}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>{t.author}</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: 2 }}>{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
