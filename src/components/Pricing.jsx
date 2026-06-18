import { motion } from 'framer-motion';

const PLANS = [
  {
    name: 'Starter',
    desc: 'Para startups y equipos que necesitan validar ideas rápidamente.',
    price: '$9.99',
    period: '/mes',
    features: [
      '5 usuarios sintéticos /mes', 
      'Análisis básico', 
      'Exportación de reportes PDF', 
      'Soporte por correo electrónico'
    ],
    cta: 'Comenzar Gratis',
    popular: false,
    buttonStyle: { background: 'transparent', border: '1px solid #222', color: '#fff' },
    buttonHover: { background: '#3B82F6', border: '1px solid #3B82F6' },
  },
  {
    name: 'Pro',
    desc: 'Para equipos que realizan investigación continua.',
    price: '$49',
    period: '/mes',
    features: [
      'Todo lo de Starter, más:',
      '50 Usuarios sintéticos /mes', 
      'Múltiples Proyectos', 
      'Análisis avanzados y resúmenes ejecutivos', 
      'Exportación CSV y API', 
      'Soporte prioritario'
    ],
    cta: 'Comenzar con Pro',
    popular: true,
    buttonStyle: { background: 'linear-gradient(90deg, #6366F1, #3B82F6)', border: 'none', color: '#fff' },
    buttonHover: { filter: 'brightness(1.1)' },
  },
  {
    name: 'Enterprise',
    desc: 'Para organizaciones con necesidades avanzadas y modelos personalizados.',
    price: 'Personalizado',
    period: '',
    features: [
      '+50 Usuarios Sintéticos /mes', 
      'Modelos con personalización avanzada', 
      'Integraciones y API personalizadas', 
      'Gestor de cuenta dedicado', 
      'Soporte prioritario 24/7'
    ],
    cta: 'Contáctanos',
    popular: false,
    buttonStyle: { background: 'transparent', border: '1px solid #333', color: '#fff' },
    buttonHover: { background: 'rgba(255,255,255,0.05)' },
  }
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 24px', position: 'relative', background: 'transparent', overflow: 'hidden' }}>
      
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'inline-block', 
              padding: '6px 16px', 
              borderRadius: '100px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 24
            }}
          >
            Precios
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, fontFamily: '"Syne", sans-serif', color: '#FFFFFF', marginBottom: 16 }}
          >
            Elige tu <span style={{ background: 'linear-gradient(90deg, #00D4FF, #0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Plan</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: '#94a3b8', maxWidth: 600, margin: '0 auto', fontWeight: 300 }}
          >
            Escala según tus necesidades de investigación.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'stretch' }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: plan.popular ? 'rgba(99, 102, 241, 0.02)' : 'rgba(255, 255, 255, 0.005)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '20px',
                padding: plan.popular ? '32px 24px' : '24px 20px',
                border: plan.popular ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: plan.popular ? '0 0 40px rgba(99, 102, 241, 0.1), inset 0 0 20px rgba(99, 102, 241, 0.05)' : 'none',
                position: 'relative',
                marginTop: plan.popular ? 0 : 24,
                marginBottom: plan.popular ? 0 : 24,
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #6366F1, #3B82F6)', padding: '6px 20px', borderRadius: 100, fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '0.05em', boxShadow: '0 4px 10px rgba(99,102,241,0.3)' }}>
                  MÁS POPULAR
                </div>
              )}
              
              <h3 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: 8, fontFamily: '"Cabinet Grotesk", sans-serif', fontWeight: 600 }}>{plan.name}</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: 20, minHeight: 40, lineHeight: 1.4 }}>{plan.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#fff', fontFamily: '"Syne", sans-serif' }}>{plan.price}</span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>{plan.period}</span>
              </div>

              <a 
                href="https://calendly.com/innogyzer/workshop?month=2026-06"
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-btn"
                style={{ 
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: 10, 
                  ...plan.buttonStyle,
                  fontWeight: 600, 
                  fontSize: '14px',
                  marginBottom: 24,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  '--hover-bg': plan.buttonHover.background || plan.buttonStyle.background,
                  '--hover-border': plan.buttonHover.border || plan.buttonStyle.border,
                  '--hover-filter': plan.buttonHover.filter || 'none',
                }}
              >
                {plan.cta}
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexGrow: 1 }}>
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {feat.startsWith('Todo lo de Starter') ? (
                      <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600, paddingBottom: 6 }}>{feat}</span>
                    ) : (
                      <>
                        <div style={{ color: '#10b981', fontSize: '14px', fontWeight: 800, marginTop: -1 }}>✓</div>
                        <span style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.4 }}>{feat}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media(max-width:1024px){
          section#pricing > div > div:nth-of-type(2) > div { transform: none !important; }
        }
        .pricing-btn:hover {
          background: var(--hover-bg) !important;
          border: var(--hover-border) !important;
          filter: var(--hover-filter) !important;
        }
      `}</style>
    </section>
  );
}
