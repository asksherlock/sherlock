import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: '¿Qué es exactamente un usuario sintético?',
    a: 'Es un perfil digital impulsado por IA que simula las características demográficas, psicográficas y de comportamiento de un segmento específico de tu audiencia real. Navega, toma decisiones y experimenta frustraciones como un humano.',
  },
  {
    q: '¿Puede reemplazar a la investigación con usuarios reales?',
    a: 'No la reemplaza, la complementa y acelera. Sherlock AI es ideal para etapas exploratorias, validar hipótesis rápidas y encontrar fricciones obvias en minutos. Una vez optimizado, puedes hacer pruebas finales con humanos reales ahorrando tiempo y dinero.',
  },
  {
    q: '¿En qué plataformas funciona?',
    a: 'Sherlock AI puede analizar flujos en páginas web públicas, maquetas interactables de Figma, y aplicaciones móviles (vía grabaciones o acceso de prueba).',
  },
  {
    q: '¿Qué tan precisos son los insights?',
    a: 'Nuestros modelos están entrenados con millones de data points de comportamiento UX real. Identificamos más del 80% de las fricciones críticas que encontraría un humano en un flujo de onboarding o checkout.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 20 }}>
            <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: 600, letterSpacing: '0.08em' }}>PREGUNTAS Y DUDAS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Respuestas rápidas
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#f8fafc',
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                {faq.q}
                <span style={{ fontSize: '20px', color: '#6366f1', transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ padding: '0 24px 24px', color: '#94a3b8', lineHeight: 1.6, fontSize: '15px' }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
