import { useState } from 'react';
import { motion } from 'framer-motion';

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '56px', height: '56px', color: '#8b5cf6', filter: 'drop-shadow(0px 0px 16px rgba(139,92,246,0.6))', margin: '0 auto' }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
    <rect x="8" y="14" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const SmileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '64px', color: '#10b981', filter: 'drop-shadow(0px 0px 16px rgba(16,185,129,0.5))', margin: '0 auto' }}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.open('https://calendly.com/innogyzer/workshop?month=2026-06', '_blank');
  };

  return (
    <section id="contact" style={{
      padding: '120px 24px 40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <CalendarIcon />
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 900,
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f8fafc, #cbd5e1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ¿Listo para revolucionar{' '}
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              tus entrevistas
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #f8fafc, #cbd5e1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ?
            </span>
          </h2>
          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Agenda una cita para empezar ahorrar recursos con Sherlock.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 24,
            padding: '44px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(99,102,241,0.08)',
          }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
                <SmileIcon />
              </div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif',
                color: '#f1f5f9',
                marginBottom: 12,
              }}>
                ¡Solicitud recibida!
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7 }}>
                El equipo de Sherlock AI se pondrá en contacto contigo en las próximas 24 horas para agendar tu demo personalizada.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: 6, display: 'block', letterSpacing: '0.04em' }}>
                    NOMBRE COMPLETO
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: 6, display: 'block', letterSpacing: '0.04em' }}>
                    EMPRESA (OPCIONAL)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Nombre de tu empresa"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: 6, display: 'block', letterSpacing: '0.04em' }}>
                  CORREO CORPORATIVO
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f8fafc',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: 6, display: 'block', letterSpacing: '0.04em' }}>
                  ¿QUÉ QUIERES ANALIZAR?
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuentanos sobre tu producto o algo que nos ayude a prepararnos para la reunión"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f8fafc',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  boxShadow: '0 0 30px rgba(99,102,241,0.3)',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 0 50px rgba(99,102,241,0.5)';
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 0 30px rgba(99,102,241,0.3)';
                }}
              >
                Agendar una Cita →
              </button>

              <p style={{ fontSize: '12px', color: '#334155', textAlign: 'center', lineHeight: 1.6 }}>
                Sin compromiso de contratación. Respuesta en menos de 24 horas. 
                Al enviar aceptas nuestra <span style={{ color: '#6366f1', cursor: 'pointer' }}>Política de Privacidad</span>.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
