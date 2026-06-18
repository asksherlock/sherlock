import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutSherlock() {
  // Estado para el acordeón: null significa que todos están cerrados.
  const [openIndex, setOpenIndex] = useState(null);

  const accordionItems = [
    {
      title: "01. El Problema",
      content: "La investigación tradicional es lenta, costosa y difícil de escalar. Reclutar participantes, coordinar entrevistas y procesar resultados puede tomar semanas, además de estar sujeto a cancelaciones, muestras limitadas y sesgos inherentes a las respuestas humanas. Esto obliga a muchas organizaciones a tomar decisiones con información insuficiente o retrasar iniciativas críticas mientras esperan resultados."
    },
    {
      title: "02. La Solución",
      content: "Transformamos la investigación cualitativa en un proceso inmediato y escalable. Sherlock permite construir audiencias sintéticas, ejecutar miles de entrevistas simultáneas y analizar automáticamente las respuestas para identificar patrones, motivaciones, objeciones y oportunidades. Lo que antes requería semanas de trabajo, ahora puede obtenerse en minutos, acelerando la toma de decisiones con información estructurada y accionable."
    },
    {
      title: "03. La Tecnología",
      content: "Combinamos modelos avanzados de inteligencia artificial con variables demográficas, socioeconómicas y psicográficas para crear agentes sintéticos con comportamientos consistentes y contextualmente relevantes. Cada perfil configurado, posee motivaciones, preferencias y características propias, permitiendo simular conversaciones masivas y generar análisis cualitativos automatizados que revelan insights estratégicos con una profundidad difícil de alcanzar mediante métodos tradicionales."
    }
  ];

  return (
    <section id="about" style={{ padding: '160px 24px', position: 'relative' }}>
      {/* Tipografía dinámica para cuerpo de texto ultra ligero */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');
        
        .accordion-button {
          transition: all 0.3s ease;
        }
        .accordion-button:hover {
          opacity: 0.8;
        }
        .accordion-button:hover span {
          color: #fff !important;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div className="split-manifesto" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '100px',
          alignItems: 'flex-start'
        }}>

          {/* Columna Izquierda (Fija/Sticky) */}
          <div className="manifesto-left" style={{ 
            gridColumn: 'span 5', 
            position: 'sticky', 
            top: '140px' 
          }}>
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, fontFamily: '"Syne", sans-serif', color: '#fff', lineHeight: 1.1, marginBottom: 32, letterSpacing: '-0.02em' }}>
                QUÉ HACEMOS…
              </h2>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '18px', color: '#cbd5e1', lineHeight: 1.7, maxWidth: 460, fontWeight: 300 }}>
                Desarrollamos una plataforma de investigación cualitativa basada en usuarios sintéticos impulsados por inteligencia artificial. Reemplazamos semanas de reclutamiento y trabajo de campo por simulaciones conversacionales a escala, permitiendo a empresas y equipos obtener insights sobre necesidades, percepciones y comportamientos de sus audiencias en cuestión de minutos.
              </p>
            </motion.div>
          </div>

          {/* Columna Derecha (Sistema de Acordeón Interactivo) */}
          <div className="manifesto-right" style={{ 
            gridColumn: 'span 7',
            paddingTop: '8px' // Para alinear visualmente la primera línea con el título izquierdo
          }}>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Línea superior inicial del acordeón */}
              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

              {accordionItems.map((item, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* Botón de Acordeón */}
                    <button 
                      className="accordion-button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '40px 0', 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer', 
                        textAlign: 'left' 
                      }}
                    >
                      <span style={{ 
                        fontSize: 'clamp(20px, 2vw, 28px)', 
                        color: isOpen ? '#fff' : '#94a3b8', 
                        fontFamily: '"Space Grotesk", sans-serif', 
                        fontWeight: 400, 
                        transition: 'color 0.3s ease',
                        letterSpacing: '0.02em'
                      }}>
                        {item.title}
                      </span>
                      
                      {/* Micro-indicador visual (+ a ✕) */}
                      <motion.div 
                        animate={{ rotate: isOpen ? 45 : 0 }} 
                        transition={{ duration: 0.3, ease: "anticipate" }}
                        style={{ 
                          color: isOpen ? '#fff' : '#64748b', 
                          fontSize: '32px', 
                          fontWeight: 200,
                          lineHeight: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </motion.div>
                    </button>

                    {/* Contenido Expandible */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ 
                            paddingBottom: '48px', 
                            paddingRight: '40px', // Dejar espacio respecto al borde derecho
                            fontSize: '16px', 
                            color: '#94a3b8', 
                            lineHeight: 1.8, 
                            fontFamily: '"DM Sans", sans-serif', 
                            fontWeight: 300 
                          }}>
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .split-manifesto {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .manifesto-left {
            grid-column: span 1 !important;
            position: relative !important;
            top: 0 !important;
          }
          .manifesto-right {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
