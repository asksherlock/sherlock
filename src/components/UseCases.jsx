import { motion } from 'framer-motion';

const USE_CASES = [
  {
    icon: '🏦',
    category: 'Fintech & Banca',
    title: 'Optimiza tu onboarding financiero',
    desc: 'Detecta exactamente dónde los usuarios abandonan el proceso de apertura de cuenta, solicitud de crédito o incorporación a tu banca digital.',
    metrics: [{ label: 'Reducción en abandono', value: '-42%' }, { label: 'Tiempo de análisis', value: '4 hrs' }],
    color: '#6366f1',
    clients: 'BBVA, SURA',
  },
  {
    icon: '🛒',
    category: 'E-commerce & Retail',
    title: 'Elimina fricciones en el checkout',
    desc: 'Simula el journey de compra con diferentes perfiles de consumidor para descubrir por qué tu tasa de conversión no despega.',
    metrics: [{ label: 'Aumento en conversión', value: '+28%' }, { label: 'ROI promedio', value: '8x' }],
    color: '#ec4899',
    clients: 'Adidas, Bimbo',
  },
  {
    icon: '🚗',
    category: 'Movilidad & Servicios',
    title: 'Mejora la experiencia en apps B2C',
    desc: 'Analiza cómo usuarios con diferentes niveles de tech-savviness interactúan con tu app de movilidad o servicio bajo demanda.',
    metrics: [{ label: 'NPS mejorado', value: '+19pts' }, { label: 'Tickets soporte', value: '-35%' }],
    color: '#22d3ee',
    clients: 'Uber, Bebbia',
  },
  {
    icon: '🎓',
    category: 'Educación & EdTech',
    title: 'Maximiza la retención estudiantil',
    desc: 'Simula el comportamiento de estudiantes en plataformas de aprendizaje para detectar puntos de desmotivación y abandono.',
    metrics: [{ label: 'Retención mejorada', value: '+31%' }, { label: 'Completion rate', value: '+45%' }],
    color: '#f59e0b',
    clients: 'Tec de Monterrey, U. Anáhuac',
  },
  {
    icon: '🏭',
    category: 'B2B & Empresa',
    title: 'Reduce la fricción en sistemas internos',
    desc: 'Evalúa tus portales corporativos, ERP y sistemas internos con usuarios sintéticos que reflejan el perfil de tus empleados.',
    metrics: [{ label: 'Adopción de sistema', value: '+52%' }, { label: 'Tiempo training', value: '-60%' }],
    color: '#10b981',
    clients: 'PEMEX, Rotoplas',
  },
  {
    icon: '🏛️',
    category: 'Gobierno & Sector Público',
    title: 'Simplifica trámites ciudadanos digitales',
    desc: 'Simula cómo ciudadanos con diverso nivel de alfabetización digital usan tus portales de servicios públicos.',
    metrics: [{ label: 'Satisfacción ciudadana', value: '+67%' }, { label: 'Trámites completados', value: '+89%' }],
    color: '#8b5cf6',
    clients: 'Gobierno CDMX Puebla',
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" style={{
      padding: '120px 24px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(4,4,20,0.8) 50%, transparent 100%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            borderRadius: 100,
            background: 'rgba(236,72,153,0.08)',
            border: '1px solid rgba(236,72,153,0.2)',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: '11px', color: '#f472b6', fontWeight: 600, letterSpacing: '0.08em' }}>
              CASOS DE USO
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #f8fafc, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Sherlock AI funciona en<br />cualquier industria
          </h2>
          <p style={{ fontSize: '18px', color: '#475569', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Desde fintech hasta gobierno, nuestros usuarios sintéticos se adaptan al contexto específico de tu negocio.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '28px',
                cursor: 'default',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = uc.color + '40';
                e.currentTarget.style.background = uc.color + '08';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              {/* Top gradient line */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${uc.color}, transparent)`,
                opacity: 0.5,
              }} />

              {/* Category badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 8,
                background: uc.color + '15',
                border: `1px solid ${uc.color}30`,
                marginBottom: 16,
              }}>
                <span style={{ fontSize: '14px' }}>{uc.icon}</span>
                <span style={{ fontSize: '11px', color: uc.color, fontWeight: 600 }}>{uc.category}</span>
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#f1f5f9',
                marginBottom: 10,
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                {uc.title}
              </h3>

              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
                {uc.desc}
              </p>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                {uc.metrics.map((m, j) => (
                  <div key={j} style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    background: uc.color + '10',
                    border: `1px solid ${uc.color}20`,
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: uc.color,
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '10px', color: '#475569', marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Clients tag */}
              <div style={{ fontSize: '11px', color: '#334155' }}>
                📌 Clientes: <span style={{ color: '#475569' }}>{uc.clients}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
