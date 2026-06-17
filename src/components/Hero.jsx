import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import SyntheticSimulator from './SyntheticSimulator';
import SherlockLogo from './SherlockLogo';

const revealEffect = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  transition: { duration: 2.0, delay, ease: 'easeInOut' },
});

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)',
      paddingBottom: 100,
    }}>
      {/* Background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* 2. Shape canvas fades in quickly, while internal particles generate over 4 seconds */}
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }} 
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }} 
          transition={{ duration: 1.0, delay: 0.9, ease: 'easeInOut' }}
        >
          <ParticleCanvas />
        </motion.div>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          top: '10%', left: '20%', zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          top: '20%', right: '15%', zIndex: 1,
        }} />
      </div>

      {/* 100vh Text Section */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}>

        {/* 3. Text Tu cliente ideal en minutos (Starts at 2.1s as requested) */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.9, delay: 2.1, ease: 'easeInOut' }}
          style={{ 
            fontSize: 'clamp(56px, 8vw, 96px)', 
            lineHeight: 1.25, 
            letterSpacing: '-0.02em', 
            marginBottom: 0, 
            color: '#ffffff', 
            maxWidth: 1000,
            fontFamily: '"Outfit", sans-serif'
          }}
        >
          <span style={{ fontWeight: 600, display: 'block' }}>Tu Cliente Ideal</span>
          <span style={{ fontWeight: 300, display: 'block', color: '#E9D5FF' }}>En Minutos</span>
        </motion.h1>
        {/* 4. Subtitle at the bottom */}
        <motion.p {...revealEffect(4.0)} style={{ 
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          margin: '0 auto',
          fontSize: 'clamp(18px, 2vw, 24px)', 
          lineHeight: 1.5, 
          color: '#a1a1aa', 
          maxWidth: 800, 
          fontWeight: 400, 
          letterSpacing: '-0.01em' 
        }}>
          Insights reales con Usuarios sintéticos. En minutos, no semanas
        </motion.p>
      </div>


      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left Column: Text + Stats */}
          <motion.div {...revealEffect(4.0)} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: 16, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.2 }}>
                Motor Sintético Interactivo
              </h2>
              <p style={{ fontSize: '18px', color: '#a1a1aa', lineHeight: 1.6 }}>
                Genera perfiles de usuario basados en datos reales y observa cómo interactúan con tu producto. Inicia una simulación ahora mismo para ver un adelanto de Ask-Sherlock en acción.
              </p>
            </div>

            {/* Stats (Moved to Left Column) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 24,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              {[
                { value: '10x', label: 'Más rápido que investigación tradicional' },
                { value: '15+', label: 'Empresas Fortune 500 confían en nosotros' },
                { value: '98%', label: 'Precisión en detección de fricciones' },
              ].map(stat => (
                <div key={stat.value} style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', color: '#a1a1aa', marginTop: 4, lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Simulator */}
          <motion.div {...revealEffect(4.0)} style={{ width: '100%' }}>
            <SyntheticSimulator />
          </motion.div>
        </div>


      </div>

      <style>{`
        @media(max-width: 768px) {
          #hero > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
      `}</style>
    </section>
  );
}
