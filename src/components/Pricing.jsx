import { motion } from 'framer-motion';
import Medusae from './medusae/Medusae';

const PLANS = [
  {
    name: 'Starter',
    desc: 'Perfecto para startups y equipos pequeños validando ideas.',
    price: '$49',
    period: '/mes',
    features: ['100 perfiles sintéticos/mes', 'Análisis básico', 'Exportación a PDF', 'Soporte por email'],
    cta: 'Comenzar gratis',
    popular: false,
  },
  {
    name: 'Pro',
    desc: 'Para equipos de producto escalando su investigación continua.',
    price: '$149',
    period: '/mes',
    features: ['Perfiles ilimitados', 'Análisis de sentimiento avanzado', 'Exportación a CSV/API', 'Soporte prioritario', 'Múltiples proyectos'],
    cta: 'Plan Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    desc: 'Soluciones a medida con IA entrenada en tus propios datos.',
    price: 'Personalizado',
    period: '',
    features: ['IA entrenada con tu data', 'SSO & Seguridad Avanzada', 'Onboarding dedicado', 'SLAs garantizados', 'Acceso a beta features'],
    cta: 'Contactar ventas',
    popular: false,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 24px', position: 'relative', background: '#04040A', overflow: 'hidden' }}>
      {/* Sistema de partículas WebGL de fondo */}
      <Medusae style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} config={{ background: { color: '#04040A' } }} />
      
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, fontFamily: '"Syne", sans-serif', color: '#fff', marginBottom: 16 }}
          >
            Invierte en <span style={{ color: '#06b6d4' }}>Certeza</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: '#94a3b8', maxWidth: 600, margin: '0 auto', fontWeight: 300 }}
          >
            Planes flexibles que escalan con la velocidad de tu equipo de producto.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'center' }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
              style={{
                background: plan.popular ? 'linear-gradient(180deg, rgba(99,102,241,0.1) 0%, rgba(15,17,26,0.8) 100%)' : 'rgba(15, 17, 26, 0.4)',
                border: plan.popular ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: 24,
                padding: 40,
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                zIndex: plan.popular ? 10 : 1,
                boxShadow: plan.popular ? '0 20px 40px -10px rgba(99,102,241,0.15)' : 'none',
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #6366f1, #06b6d4)', padding: '4px 16px', borderRadius: 100, fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
                  MÁS POPULAR
                </div>
              )}
              
              <h3 style={{ fontSize: '24px', color: '#f8fafc', marginBottom: 8, fontFamily: '"Cabinet Grotesk", sans-serif', fontWeight: 600 }}>{plan.name}</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: 24, minHeight: 40 }}>{plan.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 32 }}>
                <span style={{ fontSize: '40px', fontWeight: 700, color: '#fff', fontFamily: '"Syne", sans-serif' }}>{plan.price}</span>
                <span style={{ fontSize: '15px', color: '#64748b' }}>{plan.period}</span>
              </div>

              <button style={{ 
                width: '100%', 
                padding: '14px', 
                borderRadius: 12, 
                border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)', 
                background: plan.popular ? '#6366f1' : 'transparent', 
                color: '#fff', 
                fontWeight: 600, 
                fontSize: '15px',
                marginBottom: 32,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                {plan.cta}
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                    </div>
                    <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{feat}</span>
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
      `}</style>
    </section>
  );
}
