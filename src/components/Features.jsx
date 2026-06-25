import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrain, IconFlow, IconTarget } from './AnimatedIcons';
import ShapeParticleCanvas from './ShapeParticleCanvas';

const TABS_DATA = [
  {
    id: 'perfilamiento',
    tabTitle: 'Definición de Audiencias',
    mainTitle: 'Definición de Audiencias',
    text: 'Construye perfiles de audiencia altamente específicos configurando variables demográficas, socioeconómicas y psicográficas como edad, ubicación, nivel de ingresos, intereses, hábitos y características personalizadas. Esta información permite crear agentes sintéticos que representan con precisión a tu segmento objetivo y sirven como base para las simulaciones de investigación.',
    icon: IconBrain,
  },
  {
    id: 'journeys',
    tabTitle: 'Simulación de Entrevistas',
    mainTitle: 'Simulación de Entrevistas',
    text: 'Realiza cientos o miles de entrevistas simultáneas mediante agentes sintéticos impulsados por modelos avanzados de inteligencia artificial. Cada perfil responde de forma individual y coherente, utilizando lenguaje natural, referencias culturales y comportamientos consistentes con sus motivaciones, necesidades y experiencias definidas, generando conversaciones realistas a escala.',
    icon: IconFlow,
  },
  {
    id: 'cohortes',
    tabTitle: 'Análisis Cualitativo',
    mainTitle: 'Análisis Cualitativo',
    text: 'Transforma miles de respuestas en hallazgos claros y accionables. El sistema procesa automáticamente todas las entrevistas y organiza la información en paneles de análisis con resúmenes ejecutivos, patrones recurrentes, citas representativas, principales retos, oportunidades detectadas y recomendaciones estratégicas listas para la toma de decisiones.',
    icon: IconTarget,
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="features" style={{ padding: '40px 24px', position: 'relative', overflow: 'hidden', background: '#000000', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      
      {/* Sistema de partículas que forman formas vectoriales (Fondo) */}
      <ShapeParticleCanvas activeTab={activeTab} />

      {/* Resplandor cósmico muy sutil */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(34,211,238,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 10 }}>

        {/* Layout literal estilo Antigravity: Tabs en burbujas a la izquierda, Texto central */}
        <div className="antigravity-layout" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          minHeight: '400px'
        }}>
          
          {/* Columna Izquierda: Pestañas en forma de Burbujas (Pills) */}
          <div className="tabs-column" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            width: '280px',
            flexShrink: 0,
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-100px', left: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
                <span style={{ color: '#ffffff' }}>Capacidades de </span>
                <span style={{ color: '#8B5CF6' }}>Sherlock</span>
              </span>
            </div>
            {TABS_DATA.map((tab, idx) => {
              const isActive = activeTab === idx;
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`pill-tab ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                    border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: isActive ? '#fff' : '#64748b',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive ? 1 : 0.4, transition: 'all 0.3s' }} className="tab-icon">
                    <Icon size={20} color={isActive ? "#fff" : "currentColor"} />
                  </div>
                  <span style={{ 
                    fontSize: '15px', 
                    fontFamily: '"DM Sans", sans-serif', 
                    fontWeight: isActive ? 500 : 400,
                  }}>
                    {tab.tabTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Columna Central: Contenido Typográfico Literalmente Centrado */}
          <div className="content-column" style={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            padding: '0 20px'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ maxWidth: '600px' }}
              >
                <h3 style={{ 
                  fontSize: 'clamp(32px, 4vw, 56px)', 
                  color: '#FDFDFF', 
                  marginBottom: '24px', 
                  fontFamily: '"DM Sans", sans-serif', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))'
                }}>
                  {TABS_DATA[activeTab].mainTitle}
                </h3>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#FDFDFF', 
                  lineHeight: 1.8, 
                  fontWeight: 300,
                  margin: '0 auto',
                  textAlign: 'center',
                  opacity: 0.9,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))'
                }}>
                  {TABS_DATA[activeTab].text}
                </p>
                
                {/* Botón removido permanentemente */}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Columna Derecha: Spacer invisible para mantener el centro geométrico perfecto */}
          <div className="spacer-column" style={{ width: '280px', flexShrink: 0 }} />

        </div>
      </div>

      <style>{`
        .pill-tab:hover {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          color: #fff !important;
        }
        .pill-tab:hover .tab-icon {
          opacity: 1 !important;
        }
        .explore-btn:hover {
          background: #e2e8f0 !important;
          transform: translateY(-2px);
        }
        @media(max-width: 1024px) {
          .spacer-column {
            display: none !important;
          }
          .content-column {
            padding: 0 0 0 40px !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
        }
        @media(max-width: 768px) {
          .antigravity-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .tabs-column {
            width: 100% !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 16px !important;
            flex-wrap: nowrap !important;
          }
          .content-column {
            padding: 24px 0 0 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .pill-tab {
            flex-shrink: 0 !important;
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
