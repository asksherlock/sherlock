import { motion } from 'framer-motion';

const SherlockGlassesIcon = ({ size = 64 }) => (
  <svg
    width={size * 2.2}
    height={size * 0.8}
    viewBox="0 0 88 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ margin: '0 auto', filter: 'drop-shadow(0px 0px 16px rgba(139,92,246,0.6))' }}
  >
    {/* Left temple */}
    <rect x="0" y="12" width="6" height="4" fill="#6366f1" rx="1"/>
    {/* Left lens outer frame */}
    <rect x="6" y="6" width="30" height="20" rx="3" fill="#6366f1"/>
    {/* Left lens inner (tinted) */}
    <rect x="9" y="9" width="24" height="14" rx="2" fill="rgba(99,102,241,0.35)"/>
    {/* Left lens pixel gradient blocks */}
    <rect x="9" y="9" width="8" height="14" rx="1" fill="rgba(139,92,246,0.25)"/>
    {/* Left lens shine */}
    <rect x="11" y="11" width="4" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>

    {/* Bridge */}
    <rect x="36" y="13" width="16" height="4" fill="#6366f1" rx="2"/>

    {/* Right lens outer frame */}
    <rect x="52" y="6" width="30" height="20" rx="3" fill="#6366f1"/>
    {/* Right lens inner (tinted) */}
    <rect x="55" y="9" width="24" height="14" rx="2" fill="rgba(99,102,241,0.35)"/>
    {/* Right lens pixel gradient blocks */}
    <rect x="55" y="9" width="8" height="14" rx="1" fill="rgba(139,92,246,0.25)"/>
    {/* Right lens shine */}
    <rect x="57" y="11" width="4" height="3" rx="1" fill="rgba(255,255,255,0.25)"/>

    {/* Right temple */}
    <rect x="82" y="12" width="6" height="4" fill="#6366f1" rx="1"/>

    {/* Pixel art bottom shading on lenses */}
    <rect x="6" y="22" width="30" height="4" rx="0" fill="rgba(99,102,241,0.4)"/>
    <rect x="52" y="22" width="30" height="4" rx="0" fill="rgba(99,102,241,0.4)"/>
    <rect x="6" y="22" width="30" height="4" rx="0" style={{ borderRadius: '0 0 3px 3px' }} fill="rgba(0,0,0,0.2)"/>

    {/* Text inside lenses */}
    <text x="21" y="16" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="Space Grotesk, sans-serif" style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 0px 3px rgba(255,255,255,0.8))' }}>AGENDA</text>
    <text x="67" y="16" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="Space Grotesk, sans-serif" style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 0px 3px rgba(255,255,255,0.8))' }}>YA</text>
  </svg>
);

export default function CTA() {
  const handleClick = () => {
    window.open('https://calendly.com/innogyzer/workshop?month=2026-06', '_blank');
  };

  return (
    <section id="contact" style={{
      padding: '120px 24px 120px 24px',
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
          <div 
            onClick={handleClick}
            style={{ 
              marginBottom: 20, 
              display: 'flex', 
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.15) translateY(-5px)';
              e.currentTarget.style.filter = 'brightness(1.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            <SherlockGlassesIcon size={180} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
